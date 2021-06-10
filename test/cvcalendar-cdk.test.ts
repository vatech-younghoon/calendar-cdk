import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as CvcalendarCdk from "../lib/cvcalendar";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CvcalendarCdk.CvcalendarCdkStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {}
      },
      MatchStyle.EXACT
    )
  );
});
