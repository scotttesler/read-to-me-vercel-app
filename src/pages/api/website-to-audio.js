// import createS3FriendlyFilename from "lib/back-end/create-s3-friendly-name";
import parseWebsite from "lib/back-end/parse-website";
import startPollyTask from "lib/back-end/start-polly-task";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({});
    return;
  }

  try {
    const { articleUrl, voiceId = process.env.AWS_POLLY_VOICE_ID_DEFAULT } =
      req.body;
    const article = await parseWebsite({ url: articleUrl });
    const audioTaskId = await startPollyTask({ article, voiceId });

    res.json({ article, audio });
  } catch (err) {
    console.error(err);
    res.status(400).json({});
  }
}
