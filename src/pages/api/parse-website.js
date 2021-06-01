import parseWebsite from "lib/back-end/parse-website";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({});
    return;
  }

  try {
    const { articleUrl } = req.body;
    const website = await parseWebsite({ url: articleUrl });
    res.json(website);
  } catch (err) {
    console.error(err);
    res.status(400).json({});
  }
}
