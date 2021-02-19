
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

exports.bucketName = bucket.id

