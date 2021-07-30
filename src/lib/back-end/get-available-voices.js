import pollyClient from "lib/back-end/polly-client";

export default async function getAvailableVoices() {
  // TODO: Include additional languages:
  //   "en-AU"
  //   "en-GB"
  //   "en-GB-WLS"
  const voicesRes = await pollyClient.describeVoices({
    Engine: "neural",
    IncludeAdditionalLanguageCodes: true,
    LanguageCode: "en-US",
  });

  const voices = voicesRes.Voices.map((voice) => voice.Id);
  voices.sort();

  return voices;
}
