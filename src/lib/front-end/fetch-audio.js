import { DISPATCHES } from "lib/front-end/use-index-reducer";
import fetch from "isomorphic-unfetch";

export default async function fetchAudio({
  articleUrl,
  dispatch = () => {},
  voiceId = "Matthew",
}) {
  try {
    const httpOptions = {
      body: JSON.stringify({ articleUrl, voiceId }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    };

    // const resArticle = await fetch("/api/parse-website", httpOptions);
    // if (!resArticle.ok) throw new Error("Error parsing website.");
    // const article = await resArticle.json();

    const resAudio = await fetch("/api/website-to-audio", httpOptions);
    if (!resAudio.ok) throw new Error("Error converting website to audio.");
    const { audio, article } = await resAudio.json();

    dispatch({
      payload: {
        article,
        audioUrl: audio.url,
        articleUrl: article.canonicalLink,
      },
      type: DISPATCHES.AUDIO_FETCHED,
    });
  } catch (err) {
    dispatch({ type: DISPATCHES.AUDIO_FETCH_ERROR });
  }
}
