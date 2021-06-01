// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";

// // Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:21cf1161-7c56-401d-97e0-8a43e351d3fb',
// });

// Documentation for Polly: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-polly/classes/polly.html
export default new Polly({
  credentials: {
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
  },
  // credentials: fromCognitoIdentityPool({
  //   client: new CognitoIdentityClient({ region: "us-east-1" }),
  //   identityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  // }),
  region: "us-east-1",
});
