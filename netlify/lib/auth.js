const {
  NetlifyJwtVerifier,
  removeNamespaces,
  claimToArray,
} = require("@serverless-jwt/netlify");

const ISSUER = process.env.JWT_ISSUER;
const AUDIENCE = process.env.JWT_AUDIENCE;

const verifyJwt = NetlifyJwtVerifier({
  issuer: ISSUER,
  audience: AUDIENCE,

  mapClaims: (claims) => {
    // Custom claims added in Auth0 have a prefix, which are removed here.
    // Copied from plain JS example which had http and schemas - don't know if that is relevant
    // still and if this does anything here or if this entire mapClaims function is needed.
    // It is a function made specifically in this serverless-jwt package but the docs for it are
    // poor.
    const user = removeNamespaces(
      `http://schemas.${ISSUER.replace("https://")}`,
      claims
    );

    user.scope = claimToArray(user.scope);
    user.roles = claimToArray(user.roles);

    return user;
  },
});

function json(statusCode, body) {
  const headers = {
    "Content-Type": "application/json",
  };

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

/**
 * Require the token to contain a certain scope.
 *
 * @param {string} scope
 * @param {*} handler
 */
function requireScope(scope, handler) {
  return verifyJwt(async (event, context, cb) => {
    const { claims } = context.identityContext;

    if (!claims || !claims.scope || claims.scope.indexOf(scope) === -1) {
      return json(403, {
        error: "access_denied",
        error_description: `Token does not contain the required '${scope}' scope`,
      });
    }

    return handler(event, context, cb);
  });
}

/**
 * Require the user to have a specific role.
 *
 * @param {string} role
 * @param {*} handler
 */
function requireRole(role, handler) {
  return verifyJwt(async (event, context, cb) => {
    const { claims } = context.identityContext;

    if (!claims || !claims.roles || claims.roles.indexOf(role) === -1) {
      return json(403, {
        error: "access_denied",
        error_description: `User does not have the '${role}' role`,
      });
    }

    return handler(event, context, cb);
  });
}

module.exports = {
  verifyJwt,
  requireRole,
  requireScope,
};
