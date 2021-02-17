"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

const bucket = new aws.s3.Bucket("static-website-ALPACKED",
{
    acl: "public-read",
    website: {
        indexDocument: "index.html",
        errorDocument: "404.html",
    },
});


exports.bucketName = bucket.id;
