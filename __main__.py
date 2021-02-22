import json
import mimetypes
import os

from pulumi import export, FileAsset, ResourceOptions, Config, Output
import pulumi_aws
import pulumi_aws.acm
import pulumi_aws.cloudfront
import pulumi_aws.config
import pulumi_aws.route53
import pulumi_aws.s3

# Read the configuration for this stack.
stack_config = Config()
#target_domain = stack_config.require('targetDomain')
path_to_website_contents = './public'
#certificate_arn = stack_config.get('certificateArn')

# Create an S3 bucket configured as a website bucket.
content_bucket = pulumi_aws.s3.Bucket('contentBucket',
    acl='public-read',
    website=pulumi_aws.s3.BucketWebsiteArgs(
        index_document='index.html',
        error_document='404/index.html'
    ))

def crawl_directory(content_dir, f):
    """
    Crawl `content_dir` (including subdirectories) and apply the function `f` to each file.
    """
    for file in os.listdir(content_dir):
        filepath = os.path.join(content_dir, file)

        if os.path.isdir(filepath):
            crawl_directory(filepath, f)
        elif os.path.isfile(filepath):
            f(filepath)

web_contents_root_path = os.path.join(os.getcwd(), path_to_website_contents)
def bucket_object_converter(filepath):
    """
    Takes a file path and returns an bucket object managed by Pulumi
    """
    relative_path = filepath.replace(web_contents_root_path + '/', '')
    # Determine the mimetype using the `mimetypes` module.
    mime_type, _ = mimetypes.guess_type(filepath)
    content_file = pulumi_aws.s3.BucketObject(
        relative_path,
        key=relative_path,
        acl='public-read',
        bucket=content_bucket.id,
        content_type=mime_type,
        source=FileAsset(filepath),
        opts=ResourceOptions(parent=content_bucket)
    )

# Crawl the web content root path and convert the file paths to S3 object resources.
crawl_directory(web_contents_root_path, bucket_object_converter)

TEN_MINUTES = 60 * 10

# Create a logs bucket for the CloudFront logs
logs_bucket = pulumi_aws.s3.Bucket('requestLogs', bucket='contentBucket-logs', acl='private')

# Create the CloudFront distribution
cdn = pulumi_aws.cloudfront.Distribution('cdn',
    enabled=True,
    origins=[pulumi_aws.cloudfront.DistributionOriginArgs(
        origin_id=content_bucket.arn,
        domain_name=content_bucket.website_endpoint,
        custom_origin_config=pulumi_aws.cloudfront.DistributionOriginCustomOriginConfigArgs(
            origin_protocol_policy='http-only',
            http_port=80,
            https_port=443,
            origin_ssl_protocols=['TLSv1.2'],
        )
    )],
    default_root_object='index.html',
    default_cache_behavior=pulumi_aws.cloudfront.DistributionDefaultCacheBehaviorArgs(
        target_origin_id=content_bucket.arn,
        viewer_protocol_policy='redirect-to-https',
        allowed_methods=['GET', 'HEAD', 'OPTIONS'],
        cached_methods=['GET', 'HEAD', 'OPTIONS'],
        forwarded_values=pulumi_aws.cloudfront.DistributionDefaultCacheBehaviorForwardedValuesArgs(
            cookies=pulumi_aws.cloudfront.DistributionDefaultCacheBehaviorForwardedValuesCookiesArgs(forward='none'),
            query_string=False,
        ),
        min_ttl=0,
        default_ttl=TEN_MINUTES,
        max_ttl=TEN_MINUTES,
    ),
    # PriceClass_100 is the lowest cost tier (US/EU only).
    price_class= 'PriceClass_100',
    custom_error_responses=[pulumi_aws.cloudfront.DistributionCustomErrorResponseArgs(
        error_code=404,
        response_code=404,
        response_page_path='/404.html'
    )],
    # Use the certificate we generated for this distribution.
    viewer_certificate=pulumi_aws.cloudfront.DistributionViewerCertificateArgs(
        acm_certificate_arn='cloudfront',
        ssl_support_method='sni-only',
        #MinimumProtocolVersion='TLSv1',
        #CertificateSource=,
    ),
    restrictions=pulumi_aws.cloudfront.DistributionRestrictionsArgs(
        geo_restriction=pulumi_aws.cloudfront.DistributionRestrictionsGeoRestrictionArgs(
            restriction_type='none'
        )
    ),
    # Put access logs in the log bucket we created earlier.
    logging_config=pulumi_aws.cloudfront.DistributionLoggingConfigArgs(
        bucket=logs_bucket.bucket_domain_name,
        include_cookies=False,
        prefix=f'${content_bucket.arn}/',
    ),
    # CloudFront typically takes 15 minutes to fully deploy a new distribution.
    # Skip waiting for that to complete.
    wait_for_deployment=False)

# Export the bucket URL, bucket website endpoint, and the CloudFront distribution information.
export('content_bucket_url', Output.concat('s3://', content_bucket.bucket))
export('content_bucket_website_endpoint', content_bucket.website_endpoint)
export('cloudfront_domain', cdn.domain_name)
#export('target_domain_endpoint', f'https://{target_domain}/')