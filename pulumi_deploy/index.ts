import * as aws from "@pulumi/aws";
const bucket = new aws.s3.Bucket("my-bucket1");

const bucketMetric = new aws.s3.BucketMetric("my-bucket-metric1", {
    bucket: bucket.bucket
});

const bucketNotification = new aws.s3.BucketNotification("my-bucket-notification11", {
    bucket: bucket.bucket
});



const bucketPolicy = new aws.s3.BucketPolicy("my-bucket-policy1", {
    bucket: bucket.bucket,
    policy: bucket.bucket.apply(publicReadPolicyForBucket)
})

function publicReadPolicyForBucket(bucketName: string) {
    return JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Principal: "*",
            Action: [
                "s3:GetObject"
            ],
            Resource: [
                `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
            ]
        }]
    });
}
const s3OriginId = "myS3Origin";
const s3Distribution = new aws.cloudfront.Distribution("s3Distribution1", {
    origins: [{
        domainName: bucket.bucketRegionalDomainName,
        originId: s3OriginId,
        s3OriginConfig: {
            originAccessIdentity: "origin-access-identity/cloudfront/ABCDEFG1234567",
        },
    }],
    enabled: true,
    isIpv6Enabled: true,
    comment: "Some comment",
    defaultRootObject: "index.html",
    loggingConfig: {
        includeCookies: false,
        bucket: "mylogs.s3.amazonaws.com",
        prefix: "myprefix",
    },
    aliases: [
        "mysite.example.com",
        "yoursite.example.com",
    ],
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
        defaultTtl: 3600,
        maxTtl: 86400,
    },
    orderedCacheBehaviors: [
        {
            pathPattern: "/content/immutable/*",
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
            defaultTtl: 86400,
            maxTtl: 31536000,
            compress: true,
            viewerProtocolPolicy: "redirect-to-https",
        },
        {
            pathPattern: "/content/*",
            allowedMethods: [
                "GET",
                "HEAD",
                "OPTIONS",
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
            minTtl: 0,
            defaultTtl: 3600,
            maxTtl: 86400,
            compress: true,
            viewerProtocolPolicy: "redirect-to-https",
        },
    ],
    priceClass: "PriceClass_200",
    restrictions: {
        geoRestriction: {
            restrictionType: "whitelist",
            locations: [
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
