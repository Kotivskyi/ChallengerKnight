const argon2 = require("argon2");
const { ApiError } = require("./api-error");

const generateHashedPassword = async (password) => {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
}

const verifyPassword = async (passwordFromDb, passwordFromUser) => {
    const isPasswordValid = await argon2.verify(passwordFromDb, passwordFromUser);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credential");
    }
}

module.exports = {
    generateHashedPassword,
    verifyPassword
};