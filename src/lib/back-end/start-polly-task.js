// import createS3FriendlyFilename from "lib/back-end/create-s3-friendly-name";
import pollyClient from "lib/back-end/polly-client";
import { StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";

export default async function startPollyTask({
  article,
  voiceId = process.env.AWS_POLLY_VOICE_ID_DEFAULT,
}) {
  const s3Params = {
    Engine: "neural",
    OutputFormat: "mp3",
    OutputS3BucketName: process.env.AWS_S3_BUCKET_NAME_AUDIO,
    // SampleRate: "22050",
    // Text: "article title",
    Text: `${article.title}. ${article.text}`,
    // TextType: "text",
    VoiceId: voiceId,
  };

  const task = await pollyClient.send(
    new StartSpeechSynthesisTaskCommand(s3Params)
  );

  return task.TaskId;
}

// Example task
// {
//   CreationTime: "2021-06-01T02:22:44.889Z";
//   OutputFormat: "mp3";
//   OutputUri: "https://s3.us-east-1.amazonaws.com/read-to-me-back-end-aws-dev-website-to-audio/5514dee7-17a2-4753-a0bd-e5ea17e01805.mp3";
//   RequestCharacters: 13;
//   SampleRate: "22050";
//   TaskId: "5514dee7-17a2-4753-a0bd-e5ea17e01805";
//   TaskStatus: "scheduled";
//   TextType: "text";
//   VoiceId: "Matthew";
// }
