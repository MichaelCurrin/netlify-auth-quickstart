/**
 * Get shows from the TV maze API.
 */
const fetch = require("node-fetch");
const { requireScope } = require("../../lib/auth");

const SCOPE = "read:shows";
const SHOWS_SERVICE_URL = "https://api.tvmaze.com/shows";

async function _request(url) {
  const resp = await fetch(url);
  const shows = await resp.json();

  return shows.map((s) => ({
    id: s.id,
    url: s.url,
    name: s.name,
  }));
}

exports.handler = requireScope(SCOPE, async (_event, _context) => {
  let statusCode = 200;
  let payload;

  try {
    payload = await _request(SHOWS_SERVICE_URL);
  } catch (err) {
    payload = { error_description: err.message };
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify(payload),
  };
});
