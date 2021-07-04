/**
 * Get shows from the TV maze API.
 */
const fetch = require("node-fetch");
const { requireScope } = require("../../lib/auth");

const SHOWS_SERVICE_URL = "https://api.tvmaze.com/shows";
const SCOPE = "read:shows";

async function request(url) {
  const resp = await fetch(url);
  const shows = await resp.json();

  return shows.map((s) => ({
    id: s.id,
    url: s.url,
    name: s.name,
  }));
}

async function shows(_event, _context) {
  let statusCode = 200;
  let payload;

  try {
    payload = await request(SHOWS_SERVICE_URL);
  } catch (err) {
    payload = { error_description: err.message };
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify(payload),
  };
}

exports.handler = requireScope(SCOPE, shows);
