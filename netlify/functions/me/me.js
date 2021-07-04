/**
 * Get details about the authenticated user.
 */
const { verifyJwt } = require("../../lib/auth");

async function me(_event, context) {
  let statusCode = 200;
  let payload;

  try {
    const { claims } = context.identityContext;
    payload = { claims };
  } catch (err) {
    statusCode = 500;
    payload = { error_description: err.message };
  }

  return {
    statusCode,
    body: JSON.stringify(payload),
  };
}

exports.handler = verifyJwt(me);
