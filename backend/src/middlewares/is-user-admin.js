const { ApiError } = require("../utils");

const isUserAdmin = (req, res, next) => {
    const { roleId } = req.user;
    if (roleId !== 1) {
        throw new ApiError(403, "You do not have permission to this resource");
    }
    next();
}

module.exports = { isUserAdmin };