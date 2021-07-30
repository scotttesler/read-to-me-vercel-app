import getAvailableVoices from "lib/back-end/get-available-voices";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(404).json({});
    return;
  }

  try {
    res.json({ voices: await getAvailableVoices() });
  } catch (err) {
    console.error(err);
    res.status(400).json({});
  }
}
