const jwt = require("jsonwebtoken");
const { ApiError } = require("./api-error");

const generateToken = (payload, secret, time) => {
    return jwt.sign(payload, secret, { expiresIn: time });
}

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(400, "Token expired");
        }
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
