export default function createS3FriendlyFilename({ articleUrl, voiceId }) {
  const articleUrlBase64 = Buffer.from(articleUrl).toString("base64");

  return `${articleUrlBase64}-${voiceId}.${process.env.POLLY_OUTPUT_FORMAT}`;
}
