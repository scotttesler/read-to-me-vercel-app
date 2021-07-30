import _get from "lodash/get";
import fetch from "isomorphic-unfetch";
import unfluff from "unfluff";

const CACHES = {
  "archive.today": {
    prefix: process.env.ARCHIVE_TODAY_CACHE_URL_PREFIX,
    search404Method: "startsWith",
    string404: "search examples:",
  },
  google: {
    prefix: process.env.GOOGLE_CACHE_URL_PREFIX,
    search404Method: "includes",
    string404: "/search?q=cache:",
  },
};

async function fetchFromArchiveOrg({ url }) {
  const str = `${process.env.ARCHIVE_ORG_CACHE_AVAILABLE_API}${url}`;
  const res = await fetch(str, {
    headers: { "Content-Type": "application/json" },
  });
  const json = await res.json();
  const newUrl = _get(json, "archived_snapshots.closest.url");

  if (!newUrl) return null;

  return await parse({ url: newUrl });
}

async function fetchFromOtherCache({ cacheName, url }) {
  const cache = CACHES[cacheName];
  const website = await parse({ url: `${cache.prefix}${url}` });
  const text = website.text;

  if (text.length && !text[cache.search404Method](cache.string404)) {
    return website;
  }
}

async function parse({ url }) {
  const res = await fetch(url);
  const html = await res.text();

  return unfluff(html);
}

async function parseWebsite({ url }) {
  const website = await parse({ url });
  if (website.text.length) return website;

  const googleCache = await fetchFromOtherCache({ cacheName: "google", url });
  if (googleCache) return googleCache;

  const archiveOrg = await fetchFromArchiveOrg({ url });
  if (archiveOrg) return archiveOrg;

  const archiveToday = await fetchFromOtherCache({
    cacheName: "archive.today",
    url,
  });
  if (archiveToday) return archiveToday;

  throw new Error("Article could not be parsed.");
}

export default parseWebsite;
