/**
 * Get details about the authenticated user.
 */
const { verifyJwt } = require("../../lib/auth");

exports.handler = verifyJwt(async (_event, context) => {
  try {
    const { claims } = context.identityContext;

    return {
      statusCode: 200,
      body: JSON.stringify({ claims }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error_description: err.message }),
    };
  }
});
