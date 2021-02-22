"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Export the name of the bucket
exports.bucketName = bucket.id;

//other
const fs = require("fs");
const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket,
    content: fs.readFileSync("site/index.html").toString(),
});
