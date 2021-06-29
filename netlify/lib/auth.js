const {
  NetlifyJwtVerifier,
  removeNamespaces,
  claimToArray,
} = require("@serverless-jwt/netlify");

const DOMAIN = "dev-x1rgzxvi.us.auth0.com";

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,

  mapClaims: (claims) => {
    // Custom claims added in Auth0 have a prefix, which are removed here.
    const user = removeNamespaces(`http://schemas.${DOMAIN}/`, claims);

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
