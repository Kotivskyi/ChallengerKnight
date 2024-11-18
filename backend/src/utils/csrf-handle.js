const { createHmac } = require("crypto");
const { env } = require("../config");

const generateCsrfHmacHash = (csrfToken) => {
  const hash = createHmac("sha256", env.CSRF_TOKEN_SECRET)
    .update(csrfToken)
    .digest("hex");
  return hash;
};

const verifyCsrfToken = (csrfToken, hmacHash) => {
  const hashGenerated = generateCsrfHmacHash(csrfToken);
  return hashGenerated === hmacHash;
};

module.exports = {
  generateCsrfHmacHash,
  verifyCsrfToken,
};
