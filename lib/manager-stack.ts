import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dotenv from "dotenv";
import { Duration } from "@aws-cdk/core";

dotenv.config();

export class CvmanagerCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "cvmanager", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("../cvmanager-backend/build"),
      handler: "serverless.handler",
      functionName: `${process.env.STAGE_NAME}-managerHandler`,
      memorySize: 1024,
      timeout: Duration.seconds(120)
    });

    const dynamoDBRole = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["dynamodb:*"],
      resources: ["*"]
    });

    const secretManagerRole = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["secretsmanager:*"],
      resources: ["*"]
    });

    handler.addToRolePolicy(dynamoDBRole);
    handler.addToRolePolicy(secretManagerRole);

    new apigateway.LambdaRestApi(this, "dev0-manager", {
      handler,
      deployOptions: { stageName: "dev" }
    });
    new apigateway.LambdaIntegration(handler);
  }
}
