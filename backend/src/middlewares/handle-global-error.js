const { ApiError } = require("../utils");

const handleGlobalError = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal server error" });
}

module.exports = { handleGlobalError };
