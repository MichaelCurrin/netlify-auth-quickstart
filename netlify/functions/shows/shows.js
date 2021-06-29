/**
 * Get shows from the TV maze API.
 */
const fetch = require("node-fetch");
const { requireScope } = require("../../lib/auth");

exports.handler = requireScope("read:shows", async (_event, _context) => {
  try {
    const resp = await fetch("https://api.tvmaze.com/shows");
    const shows = await resp.json();

    const payload = shows.map((s) => ({
      id: s.id,
      url: s.url,
      name: s.name,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(payload),
    };
  } catch (err) {
    const errorPayload = { error_description: err.message };

    return {
      statusCode: 500,
      body: JSON.stringify(errorPayload),
    };
  }
});
