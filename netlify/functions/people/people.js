/**
 * Sample people endpoint.
 *
 * The JSON file referenced here can be ready by the Function but not accessed directly, keeping it
 * private. The JSON file has mock data provided on the jQuery DataTables docs.
 *
 * The JSON data could be replaced with a call to another API or to your database.
 */
const { verifyJwt } = require("../../lib/auth");

const PEOPLE_DATA = require("../../lib/peopleData.json");

exports.handler = verifyJwt(async (_event, _context) => {
  let statusCode = 200;
  let payload;

  try {
    payload = PEOPLE_DATA;
  } catch (err) {
    statusCode = 500;
    payload = { error_description: err.message };
  }

  return {
    statusCode,
    body: JSON.stringify(payload),
  };
});
