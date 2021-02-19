
"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");


const bucket = new aws.s3.Bucket("test-project-site", 
{
	acl: "public-read",
	website: {
		indexDocument: "index.html",
		errorDocument: "404.html",
	},

});

const bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", 
{
	bucket: bucket.id,
	policy: pulumi.all([bucket.arn, bucket.arn]).apply(([bucketArn, bucketArn1]) => JSON.stringify ({
		Version: "2012-10-17",
		Statement: [{
			Sid: "PublicAccessRead",
			Effect: "Allow",
			Principal: "*",
			Action: "s3:GetObject",	
			Resource: [
				bucketArn,
				'${bucketArn1}/*'
			],
		}],
	})),
});


const s3OriginId = "myS3Origin";
const s3Distribution = new aws.cloudfront.Distribution("s3Distribution", {
    origins: [{
        domainName: bucket.bucketRegionalDomainName,
        originId: s3OriginId,
    }],
    enabled: true,
    defaultRootObject: "index.html",

    defaultCacheBehavior: {
        allowedMethods: [
            "GET",
            "HEAD",
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
        viewerProtocolPolicy: "https-only",
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "whitelist",
            locations: [
                "UA",
                "US",
                "PL",
		"UK",
		"DE",
            ],
        },
    },
    priceClass: "PriceClass_100",
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
    },
});




exports.bucketName = bucket.id

