const { processDBRequest } = require("../../utils");

const findUserById = async (id) => {
    const query = `
        SELECT
            id,
            email,
            role_id,
            password,
            is_active,
            is_email_verified
        FROM users where id = $1
    `;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}


module.exports = { findUserById };
