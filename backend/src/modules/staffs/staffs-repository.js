const { processDBRequest } = require("../../utils");

const getAllStaffs = async (payload) => {
    const { userId, roleId, name } = payload;
    let query = `
        SELECT
            t1.id,
            t1.name,
            t1.email,
            t3.name AS role,
            t1.is_active AS "systemAccess",
            t1.last_login AS "lastLogin"
        FROM users t1
        LEFT JOIN user_profiles t2 ON t1.id = t2.user_id
        LEFT JOIN roles t3 ON t1.role_id = t3.id
        WHERE 1=1 AND t1.role_id != 3
    `;
    let queryParams = [];
    if (userId) {
        query += ` AND t1.id = $${queryParams.length + 1}`;
        queryParams.push(userId);
    }
    if (roleId) {
        query += ` AND t1.role_id = $${queryParams.length + 1}`;
        queryParams.push(roleId);
    }
    if (name) {
        query += ` AND t1.name = $${queryParams.length + 1}`;
        queryParams.push(name);
    }

    query += ` ORDER  by t1.id`;

    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

const getStaffDetailById = async (id) => {
    const query = `
        SELECT
            t1.id,
            t1.name,
            t1.is_active AS "systemAccess",
            t1.role_id AS role,
            t4.name AS "roleName",
            t1.email,
            t1.reporter_id AS "reporterId",
            t2.name AS "reporterName",
            t3.gender,
            t3.marital_status AS "maritalStatus",
            t3.join_dt AS "joinDate",
            t3.qualification,
            t3.experience,
            t3.dob,
            t3.phone,
            t3.father_name AS "fatherName",
            t3.mother_name AS "motherName",
            t3.emergency_phone AS "emergencyPhone",
            t3.current_address AS "currentAddress",
            t3.permanent_address AS "permanentAddress"
        FROM users t1
        LEFT JOIN users t2 ON t1.reporter_id = t2.id
        LEFT JOIN user_profiles t3 ON t1.id = t3.user_id
        LEFT JOIN roles t4 ON t1.role_id = t4.id
        WHERE t1.id = $1
    `;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const addOrUpdateStaff = async (payload) => {
    const query = `SELECT * FROM staff_add_update($1)`;
    const queryParams = [payload];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
};

const reviewStaffStatus = async (payload) => {
    const now = new Date();
    const { status, userId, reviewerId } = payload;
    const query = `
        UPDATE users
        SET
            is_active = $1,
            status_last_reviewed_dt = $3,
            status_last_reviewer_id = $4
        WHERE id = $2
        AND is_email_verified = true
    `;
    const queryParams = [status, userId, now, reviewerId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

module.exports = {
    getAllStaffs,
    getStaffDetailById,
    addOrUpdateStaff,
    reviewStaffStatus,
};