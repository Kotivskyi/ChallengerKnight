const { db } = require("../config");
const { ERROR_MESSAGES } = require("../constants");
const { ApiError } = require("./api-error");

const processDBRequest = async ({ query, queryParams }) => {
    try {
        const result = await db.query(query, queryParams);
        return result;
    } catch (error) {
        console.log(error);
        // console.error(error.message); //save this error log in db
        throw new ApiError(500, ERROR_MESSAGES.DATABASE_ERROR);
    }
}

module.exports = { processDBRequest };