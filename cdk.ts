import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';


export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket creation
    const websiteBucket = new s3.Bucket(this, 'vlad-test-deploy', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    });

    // Deployment
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./build')],
      destinationBucket: websiteBucket
    });

    // CloudFront
    new s3.Bucket(this, 'Destination');
    const distribution_for_bucket = new cloudfront.CloudFrontWebDistribution(this, 'DistributionForBucket', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket
          },
          behaviors : [ {isDefaultBehavior: true}]
        }
      ]
    });
  }
}
