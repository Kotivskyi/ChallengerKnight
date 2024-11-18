const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils");
const { env } = require("../config");

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "Unauthorized. Please provide valid tokens.");
  }

  jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new ApiError(
        401,
        "Unauthorized. Please provide valid access token."
      );
    }

    jwt.verify(
      refreshToken,
      env.JWT_REFRESH_TOKEN_SECRET,
      (err, refreshToken) => {
        if (err) {
          throw new ApiError(
            401,
            "Unauthorized. Please provide valid refresh token."
          );
        }

        req.user = user;
        req.refreshToken = refreshToken;
        next();
      }
    );
  });
};

module.exports = { authenticateToken };
