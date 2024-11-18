const { env } = require("../config");
const { ApiError, verifyToken } = require("../utils");

const handleEmailVerificationToken = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    throw new ApiError(404, "Invalid token");
  }

  const decodeToken = verifyToken(token, env.EMAIL_VERIFICATION_TOKEN_SECRET);
  if (!decodeToken || !decodeToken.id) {
    throw new ApiError(400, "Invalid token");
  }

  req.user = decodeToken;
  next();
};

module.exports = {
  handleEmailVerificationToken,
};
