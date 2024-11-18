const { processDBRequest } = require("../../utils");

const changePassword = async (payload, client) => {
    const { userId, hashedPassword } = payload;
    const query = `
        UPDATE users
        SET password = $1
        WHERE id = $2
    `;
    const queryParams = [hashedPassword, userId];
    await client.query(query, queryParams);
}

const getUserRoleNameByUserId = async (id, client) => {
    const query = `
        SELECT lower(t1.name) AS name
        FROM roles t1
        JOIN users t2 ON t1.id = t2.role_id
        WHERE t2.id = $1
    `;
    const queryParams = [id];
    const { rows } = await client.query(query, queryParams);
    return rows[0].name;
}

const getStudentAccountDetail = async (userId) => {
    const studentRoleId = 3;
    const query = `
        SELECT
            t1.id,
            t1.name,
            t1.email,
            t1.is_active AS "systemAccess",
            t3.name as "reporterName",
            t2.phone,
            t2.class_name AS class,
            t2.section_name AS section,
            t2.dob,
            t2.gender,
            t2.roll,
            t2.admission_dt AS "admissionDate",
            t2.current_address AS "currentAddress",
            t2.permanent_address AS "permanentAddress",
            t2.father_name AS "fatherName",
            t2.father_phone AS "fatherPhone",
            t2.mother_name AS "motherName",
            t2.mother_phone AS "motherPhone",
            t2.guardian_name AS "guardianName",
            t2.guardian_phone AS "guardianPhone",
            t2.relation_of_guardian AS "relationOfGuardian"
        FROM users t1
        LEFT JOIN user_profiles t2 ON t1.id = t2.user_id
        LEFT JOIN users t3 ON t1.reporter_id = t3.id
        WHERE t1.id = $1 AND t1.role_id = $2
    `;
    const queryParams = [userId, studentRoleId];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const getStaffAccountDetail = async (userId, userRoleId) => {
    const query = `
        SELECT
            t1.id,
            t1.name,
            t1.email,
            t1.is_active AS "systemAccess",
            t3.name as "reporterName",
            t2.phone,
            t2.dob,
            t2.gender,
            t2.join_dt AS "joinDate",
            t2.marital_status as "maritalStatus",
            t2.qualification,
            t2.experience,
            t2.current_address AS "currentAddress",
            t2.permanent_address AS "permanentAddress",
            t2.father_name AS "fatherName",
            t2.mother_name AS "motherName",
            t2.emergency_phone AS "emergencyPhone",
            t4.name as "roleName"
        FROM users t1
        LEFT JOIN user_profiles t2 ON t1.id = t2.user_id
        LEFT JOIN users t3 ON t1.reporter_id = t3.id
        LEFT JOIN roles t4 ON t1.role_id = t4.id
        WHERE t1.id = $1 AND t1.role_id = $2
    `;
    const queryParams = [userId, userRoleId];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

module.exports = {
    changePassword,
    getUserRoleNameByUserId,
    getStudentAccountDetail,
    getStaffAccountDetail
};