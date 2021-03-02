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

let siteDir = "./public"; // directory for content files
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
const contentBucket = new aws.s3.Bucket("contentBucket",
    {

    });

const stackConfig = new pulumi.Config("static-website");
const config = {
    // pathToWebsiteContents is a relativepath to the website's contents.
    pathToWebsiteContents: stackConfig.require("."),
    // targetDomain is the domain/host to serve content at.
    targetDomain: stackConfig.require("s3-website-bucket-7ac1931"),
};


const webContentsRootPath = path.join(process.cwd(), config.pathToWebsiteContents);
console.log("Syncing contents from local disk at", webContentsRootPath);


const distributionArgs: aws.cloudfront.DistributionArgs = {
    enabled: true,
    aliases: [ config.targetDomain ],

    // A CloudFront distribution can configure different cache behaviors based on the request path.
    // Here we just specify a single, default cache behavior which is just read-only requests to S3.
    defaultCacheBehavior: {
        targetOriginId: contentBucket.arn,

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

};

// Creates a new Route53 DNS record pointing the domain to the CloudFront distribution.
async function createAliasRecord(
    targetDomain: string, distribution: aws.cloudfront.Distribution): Promise {
    const domainParts = getDomainAndSubdomain(targetDomain);
    const hostedZone = await aws.route53.getZone({ name: domainParts.parentDomain });
    return new aws.route53.Record(
        targetDomain,
        {
            name: domainParts.subdomain,
            zoneId: hostedZone.zoneId,
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

//export const contentBucketUri = pulumi.interpolate `s3://${siteBucket.bucket}`;
//export const contentBucketWebsiteEndpoint = siteBucket.websiteEndpoint;
//export const cloudFrontDomain = cdn.domainName;
//export const targetDomainEndpoint = `https://${config.targetDomain}/`;

