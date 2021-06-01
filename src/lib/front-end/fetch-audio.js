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

    const resAudio = await fetch("/api/website-to-audio", httpOptions);
    if (!resAudio.ok) throw new Error("Error converting website to audio.");
    const { article, audioUrl } = await resAudio.json();

    dispatch({
      payload: {
        article,
        articleUrl: article.canonicalLink,
        audioUrl,
      },
      type: DISPATCHES.AUDIO_FETCHED,
    });
  } catch (err) {
    dispatch({ type: DISPATCHES.AUDIO_FETCH_ERROR });
  }
}
