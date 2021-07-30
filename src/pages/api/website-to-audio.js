import parseWebsite from "lib/back-end/parse-website";
import getAudio from "lib/back-end/get-audio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({});
    return;
  }

  try {
    const { articleUrl, voiceId = process.env.AWS_POLLY_VOICE_ID_DEFAULT } =
      req.body;
    const article = await parseWebsite({ url: articleUrl });
    const audioUrl = await getAudio({ article, voiceId });

    res.json({ article, audioUrl });
  } catch (err) {
    console.error(err);
    res.status(400).json({});
  }
}
