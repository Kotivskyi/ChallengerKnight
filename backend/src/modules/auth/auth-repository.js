const { db } = require("../../config");
const { processDBRequest } = require("../../utils");

const findUserByUsername = async (username, client) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await client.query(query, [username]);
    return rows[0];
};

const invalidateRefreshToken = async (token) => {
    const query = "DELETE FROM user_refresh_tokens WHERE token = $1";
    const queryParams = [token];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const findUserByRefreshToken = async (refreshToken) => {
    const query = `
        SELECT u.* 
        FROM users u
        JOIN user_refresh_tokens rt ON u.id = rt.user_id
        WHERE rt.token = $1`;
    const { rows } = await db.query(query, [refreshToken]);
    return rows[0];
};

const updateUserRefreshToken = async (newRefreshToken, expiresAt, userId, oldRefreshToken) => {
    const query = `
    UPDATE user_refresh_tokens
    SET token = $1, expires_at = $2
    WHERE user_id = $3 AND token = $4`;
    await db.query(query, [newRefreshToken, expiresAt, userId, oldRefreshToken]);
};

const getMenusByRoleId = async (roleId, client) => {
    const isUserAdmin = Number(roleId) === 1 ? true : false;
    const query = isUserAdmin
        ? `SELECT * FROM access_controls`
        : `
            SELECT
                ac.id,
                ac.name,
                ac.path,
                ac.icon,
                ac.parent_path,
                ac.hierarchy_id,
                ac.type
            FROM permissions p
            JOIN access_controls ac ON p.access_control_id = ac.id
            WHERE p.role_id = $1
        `;
    const queryParams = isUserAdmin ? [] : [roleId];
    const { rows } = await client.query(query, queryParams);
    return rows;
}

const getRoleNameByRoleId = async (id, client) => {
    const query = "SELECT lower(name) AS name from roles WHERE id = $1";
    const queryParams = [id];
    const { rows } = await client.query(query, queryParams);
    return rows[0].name;
}

const saveUserLastLoginDate = async (userId, client) => {
    const now = new Date();
    const query = `UPDATE users SET last_login = $1 WHERE id = $2`;
    const queryParams = [now, userId];
    await client.query(query, queryParams);
}

const deleteOldRefreshTokenByUserId = async (userId, client) => {
    const query = `DELETE FROM user_refresh_tokens WHERE user_id = $1`;
    const queryParams = [userId];
    await client.query(query, queryParams);
}

const isEmailVerified = async (id) => {
    const query = 'SELECT is_email_verified FROM users WHERE id = $1';
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0].is_email_verified;
}

const verifyAccountEmail = async (id) => {
    const query = `
        UPDATE users
        SET is_email_verified = true
        WHERE id = $1
        RETURNING *
    `;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const doesEmailExist = async (id, email) => {
    const query = `SELECT email FROM users WHERE email = $1 AND id = $2`;
    const queryParams = [email, id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0]
}

const setupUserPassword = async (payload) => {
    const { userId, userEmail, password } = payload;
    const query = `
        UPDATE users
        SET password = $1, is_active = true
        WHERE id = $2 AND email = $3
    `;
    const queryParams = [password, userId, userEmail];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

module.exports = {
    findUserByUsername,
    invalidateRefreshToken,
    findUserByRefreshToken,
    updateUserRefreshToken,
    getMenusByRoleId,
    getRoleNameByRoleId,
    saveUserLastLoginDate,
    deleteOldRefreshTokenByUserId,
    isEmailVerified,
    verifyAccountEmail,
    doesEmailExist,
    setupUserPassword,
};
