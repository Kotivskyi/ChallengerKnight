const { env } = require("../config");
const { ApiError, verifyToken, generateCsrfHmacHash } = require("../utils");

const csrfProtection = (req, res, next) => {
  const csrfToken = req.headers["x-csrf-token"];
  const accessToken = req.cookies.accessToken;

  if (!csrfToken || typeof csrfToken !== "string") {
    throw new ApiError(400, "Invalid csrf token");
  }

  const decodedAccessToken = verifyToken(
    accessToken,
    env.JWT_ACCESS_TOKEN_SECRET
  );
  if (!decodedAccessToken || !decodedAccessToken.csrf_hmac) {
    throw new ApiError(400, "Invalid csrf token");
  }

  const hmacHashedCsrf = generateCsrfHmacHash(csrfToken);
  if (decodedAccessToken.csrf_hmac !== hmacHashedCsrf) {
    throw new ApiError(403, "Forbidden. CSRF token mismatch");
  }

  next();
};

module.exports = { csrfProtection };
