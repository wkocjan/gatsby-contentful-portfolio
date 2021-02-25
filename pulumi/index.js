"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity("origin_access_identity", {
    comment: "OAI for CF gatsby",
});
const bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
    bucket: bucket.id,
    policy: pulumi.all([bucket.arn, bucket.arn]).apply(([bucketArn, bucketArn1]) => JSON.stringify({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicRead",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject",
                    "s3:GetObjectVersion"
                ],
                "Resource": "arn:aws:s3:::my-bucket-07b2406/*"
            },
        ]
    })),
});

// Export the name of the bucket
exports.bucketName = bucket.id;

const s3OriginId = "myS3Origin";
const s3Distribution = new aws.cloudfront.Distribution("gatsbys3Distribution", {
    origins: [{
        domainName: bucket.bucketRegionalDomainName,
        originId: s3OriginId,
        s3OriginConfig: {
            originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
        },
    }],
    enabled: true,
    isIpv6Enabled: true,
    comment: "Some comment",
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
        allowedMethods: [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "PATCH",
            "POST",
            "PUT",
        ],
        cachedMethods: [
            "GET",
            "HEAD",
        ],
        targetOriginId: s3OriginId,
        forwardedValues: {
            queryString: false,
            cookies: {
                forward: "none",
            },
        },
        viewerProtocolPolicy: "allow-all",
        minTtl: 0,
        defaultTtl: 120,
        maxTtl: 120,
    },
    orderedCacheBehaviors: [
        {
            pathPattern: "/*",
            allowedMethods: [
                "GET",
                "HEAD",
                "OPTIONS",
            ],
            cachedMethods: [
                "GET",
                "HEAD",
                "OPTIONS",
            ],
            targetOriginId: s3OriginId,
            forwardedValues: {
                queryString: false,
                headers: ["Origin"],
                cookies: {
                    forward: "none",
                },
            },
            minTtl: 0,
            defaultTtl: 0,
            maxTtl: 0,
            compress: true,
            viewerProtocolPolicy: "redirect-to-https",
        },

    ],
    priceClass: "PriceClass_200",
    restrictions: {
        geoRestriction: {
            restrictionType: "whitelist",
            locations: [
                "UA",
                "US",
                "CA",
                "GB",
                "DE",
            ],
        },
    },
    tags: {
        Environment: "production",
    },
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
    },
});
