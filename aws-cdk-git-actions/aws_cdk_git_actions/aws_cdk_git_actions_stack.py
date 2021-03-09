import os

from aws_cdk import (
    core as cdk,
    aws_s3 as s3,
    aws_cloudfront as cloudfront
)
# For consistency with other languages, `cdk` is the preferred import name for
# the CDK's core module.  The following line also imports it as `core` for use
# with examples from the CDK Developer's Guide, which are in the process of
# being updated to use `cdk`.  You may delete this import if you don't need it.
from aws_cdk import core

AWS_S3_BUCKET_NAME = os.environ["AWS_S3_BUCKET_NAME"]
AWS_CLOUDFRONT_DISTRIBUTION_NAME = AWS_S3_BUCKET_NAME + '-edge-location'

class AwsCdkGitActionsStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create AWS S3 Bucket
        bucket = s3.Bucket(self,
            id = AWS_S3_BUCKET_NAME,
            bucket_name = AWS_S3_BUCKET_NAME,
            public_read_access = True,
            website_index_document = "index.html",
            removal_policy = core.RemovalPolicy.DESTROY,
            # auto_delete_objects = True,
        )

        source_config = cloudfront.SourceConfiguration(
            s3_origin_source = cloudfront.S3OriginConfig(
                s3_bucket_source = bucket
            ),
            behaviors = [cloudfront.Behavior(is_default_behavior=True)]
        )

        # Create CloudFront distribution
        distribution = cloudfront.CloudFrontWebDistribution(self,
            id = AWS_CLOUDFRONT_DISTRIBUTION_NAME,
            origin_configs = [source_config]
        )
