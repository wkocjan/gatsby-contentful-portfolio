"use strict";

const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");
const mime = require("mime");

// Create a bucket and expose a website index document
let siteBucket = new aws.s3.Bucket("s3-website-bucket", {
    bucket: config.targetDomain,
    website: {
        indexDocument: "index.html",
        errorDocument: "404.html",
    },
});

let siteDir = "."; // directory for content files
// For each file in the directory, create an S3 
//---
//---

// Create an S3 Bucket Policy to allow public read of all objects in bucket
function publicReadPolicyForBucket(bucketName) {
    return {
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Principal: "*",
            Action: [
                "s3:GetObject"
            ],
            Resource: [
                `arn:aws:s3:::s3-website-bucket-7ac1931/*` // policy refers to bucket name explicitly
            ]
        }]
    };
}

// Set the access policy for the bucket so all objects are readable
let bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
    bucket: siteBucket.bucket, // refer to the bucket created earlier
    policy: siteBucket.bucket.apply(publicReadPolicyForBucket) // use output property `siteBucket.bucket`
});


// CLOUDFRONT

// Sync the contents of the source directory with the S3 bucket, which will in-turn show up on the CDN.
const webContentsRootPath = path.join(process.cwd(), config.pathToWebsiteContents);
console.log("Syncing contents from local disk at", webContentsRootPath);
crawlDirectory(
    webContentsRootPath,
    (filePath: string) => {
        const relativeFilePath = filePath.replace(webContentsRootPath + "/", "");
        const contentFile = new aws.s3.BucketObject(
            relativeFilePath,
            {
                key: relativeFilePath,

                acl: "public-read",
                bucket: siteBucket
                contentType: mime.getType(filePath) || undefined,
                source: new pulumi.asset.FileAsset(filePath),
            },
            {
                parent: siteBucket,
            });
    });

const distributionArgs: aws.cloudfront.DistributionArgs = {
    enabled: true,
    // Alternate aliases the CloudFront distribution can be reached at, in addition to https://xxxx.cloudfront.net.
    // Required if you want to access the distribution via config.targetDomain as well.
    aliases: [ config.targetDomain ],

    // We only specify one origin for this distribution, the S3 content bucket.
    origins: [
        {
            originId: siteBuckett.arn,
            domainName: contentBucket.websiteEndpoint,
            customOriginConfig: {
                // Amazon S3 doesn't support HTTPS connections when using an S3 bucket configured as a website endpoint.
                // https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesOriginProtocolPolicy
                originProtocolPolicy: "http-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"],
            },
        },
    ],
    
    defaultRootObject: "index.html",

    defaultCacheBehavior: {
        targetOriginId: siteBucket.arn,

        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD", "OPTIONS"],

        forwardedValues: {
            cookies: { forward: "none" },
            queryString: false,
        },

        minTtl: 0,
        defaultTtl: tenMinutes,
        maxTtl: tenMinutes,
    },
    priceClass: "PriceClass_100",  
  
    customErrorResponses: [
        { errorCode: 404, responseCode: 404, responsePagePath: "/404.html" },
    ],  
  
const cdn = new aws.cloudfront.Distribution("cdn", distributionArgs);

  
// Creates a new Route53 DNS record pointing the domain to the CloudFront distribution.
function createAliasRecord(
    targetDomain: string, distribution: aws.cloudfront.Distribution): aws.route53.Record {
    const domainParts = getDomainAndSubdomain(targetDomain);
    const hostedZoneId = aws.route53.getZone({ name: domainParts.parentDomain }, { async: true }).then(zone => zone.zoneId);
    return new aws.route53.Record(
        targetDomain,
        {
            name: domainParts.subdomain,
            zoneId: hostedZoneId,
            type: "A",
            aliases: [
                {
                    name: distribution.domainName,
                    zoneId: distribution.hostedZoneId,
                    evaluateTargetHealth: true,
                },
            ],
        });
}

const aRecord = createAliasRecord(config.targetDomain, cdn);
  

// Stack exports
exports.bucketName = siteBucket.bucket;
exports.websiteUrl = siteBucket.websiteEndpoint;


export const contentBucketUri = pulumi.interpolate `s3://${siteBucket.bucket}`;
export const contentBucketWebsiteEndpoint = siteBucket.websiteEndpoint;
export const cloudFrontDomain = cdn.domainName;
export const targetDomainEndpoint = `https://${config.targetDomain}/`;

