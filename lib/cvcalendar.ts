import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

export class CvcalendarCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "calnedar", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("../cvcalender"),
      handler: "dist/serverless.handler"
    });

    const lambdaRole = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["dynamodb:*"]
    });

    lambdaRole.addAllResources();
    handler.addToRolePolicy(lambdaRole);

    new apigateway.LambdaRestApi(this, "cvcalendar-api", {
      handler
    });
  }
}
