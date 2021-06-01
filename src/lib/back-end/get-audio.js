import pollyClient from "lib/back-end/polly-client";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";

export default async function getAudio({
  article,
  voiceId = process.env.AWS_POLLY_VOICE_ID_DEFAULT,
}) {
  const synthesizeSpeechParams = {
    Engine: "neural",
    OutputFormat: "mp3",
    Text: `${article.title}. ${article.text}`,
    VoiceId: voiceId,
  };

  // Documentation for "getSynthesizeSpeechUrl": https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_polly_request_presigner.html#getsynthesizespeechurl-1
  const url = await getSynthesizeSpeechUrl({
    client: pollyClient,
    options: { expiresIn: 600 },
    params: synthesizeSpeechParams,
  });

  return url;
}
