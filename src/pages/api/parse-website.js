export default function parseWebsite(req, res) {
  if (req.method !== "POST") {
    res.status(404);
    return;
  }

  const { articleUrl } = req.body;
  console.log({ articleUrl, body: req.body });
  res.status(200).json({ name: "John Doe" });
}
