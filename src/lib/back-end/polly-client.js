import { Polly } from "@aws-sdk/client-polly";

// Documentation for Polly: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-polly/classes/polly.html
export default new Polly({
  credentials: {
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
});
