const { env } = require("../config");
const { verifyToken, ApiError } = require("../utils");

const handlePasswordSetupToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    throw new ApiError(404, "Invalid token");
  }

  const decodeToken = verifyToken(token, env.PASSWORD_SETUP_TOKEN_SECRET);
  if (!decodeToken || !decodeToken.id) {
    throw new ApiError(400, "Invalid token");
  }

  req.user = decodeToken;
  next();
};

module.exports = { handlePasswordSetupToken };
