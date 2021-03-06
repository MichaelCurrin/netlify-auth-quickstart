/**
 * People endpoint.
 */
const { verifyJwt } = require("../../lib/auth");

const PEOPLE_DATA = require("../../lib/peopleData.json");

async function people(_event, _context) {
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
}

exports.handler = verifyJwt(people);
