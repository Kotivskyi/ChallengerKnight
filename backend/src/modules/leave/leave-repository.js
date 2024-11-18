const { processDBRequest } = require("../../utils");

const createNewLeavePolicy = async (name) => {
    const query = "INSERT INTO leave_policies (name) VALUES ($1)";
    const queryParams = [name];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const updateLeavePolicyById = async (name, id) => {
    const query = "UPDATE leave_policies SET name = $1 WHERE id = $2";
    const queryParams = [name, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getLeavePolicies = async () => {
    const query = `
        SELECT
            t1.id,
            t1.name,
            t1.is_active AS "isActive",
            COUNT(t2.user_id) AS "totalUsersAssociated"
        FROM leave_policies t1
        LEFT JOIN user_leave_policy t2 ON t1.id = t2.leave_policy_id
        GROUP BY t1.id, t1.name, t1.is_active
    `;
    const { rows } = await processDBRequest({ query });
    return rows;
}

const getMyLeavePolicy = async (id) => {
    const query = `
        SELECT
            t2.id,
            t2.name,
            COALESCE(SUM(
                CASE WHEN t3.status = 2 THEN
                    (t3.to_dt - t3.from_dt) + 1
                ELSE 0
                END
            ), 0) AS "totalDaysUsed"
        FROM user_leave_policy t1
        JOIN leave_policies t2 ON t1.leave_policy_id = t2.id
        LEFT JOIN user_leaves t3 ON t1.leave_policy_id = t3.leave_policy_id
        WHERE t1.user_id = $1
        GROUP BY t2.id, t2.name
    `;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

const getUsersByPolicyId = async (policyId) => {
    const query = `
        SELECT
            t2.id,
            t2.name,
            t4.name AS role,
            COALESCE(SUM(
                CASE
                    WHEN t3.status = 2 THEN
                        EXTRACT(DAY FROM age(t3.to_dt + INTERVAL '1 day', t3.from_dt))
                    ELSE 0
                END
            ), 0) AS "totalDaysUsed"
        FROM user_leave_policy t1
        LEFT JOIN users t2 ON t1.user_id = t2.id
        LEFT JOIN user_leaves t3 ON t1.leave_policy_id = t3.leave_policy_id AND t1.user_id = t3.user_id
        LEFT JOIN roles t4 ON t2.role_id = t4.id
        WHERE t1.leave_policy_id = $1
        GROUP BY t2.id, t2.name, t4.name
    `;
    const queryParams = [policyId];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

const updatePolicyUsersById = async (policyId, userIds) => {
    const userIdArray = userIds.split(",");
    const query = `
        INSERT INTO user_leave_policy (user_id, leave_policy_id)
        SELECT unnest($1::int[]),$2
        ON CONFLICT (user_id, leave_policy_id) DO NOTHING
    `;
    const queryParams = [userIdArray, policyId];
    const { rowCount } = await processDBRequest({ query, queryParams });

    return rowCount;
}

const enableDisableLeavePolicy = async (status, policyId) => {
    const query = `UPDATE leave_policies SET is_active = $1 WHERE id = $2`;
    const queryParams = [status, policyId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const deleteUserFromPolicyById = async (userId, policyId) => {
    const query = `DELETE FROM user_leave_policy WHERE user_id = $1 AND leave_policy_id = $2`;
    const queryParams = [userId, policyId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getPolicyEligibleUsers = async () => {
    const query = `SELECT * FROM users WHERE is_active = true`;
    const { rows } = await processDBRequest({ query });
    return rows;
}

const createNewLeaveRequest = async (payload) => {
    const now = new Date();
    const { policy, from, to, note, userId } = payload;
    const query = `
        INSERT INTO user_leaves
        (user_id, leave_policy_id, from_dt, to_dt, note, submitted_dt, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const queryParams = [userId, policy, from, to, note, now, 1];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const updateLeaveRequestById = async (payload) => {
    const { id, policy, from, to, note } = payload;
    const now = new Date();
    const query = `
        UPDATE user_leaves
        SET
            leave_policy_id = $1,
            from_dt = $2,
            to_dt = $3,
            note = $4,
            updated_dt = $5,
            status = 1,
            approved_dt = NULL,
            approver_id = NULL
        WHERE id = $6
    `;
    const queryParams = [policy, from, to, note, now, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getLeaveRequestHistoryByUser = async (userId) => {
    const query = `
        SELECT
            t1.id,
            t2.name as policy,
            t1.leave_policy_id AS "policyId",
            t1.from_dt AS "from",
            t1.to_dt AS "to",
            t1.note,
            t1.status AS "statusId",
            t3.name AS status,
            t1.submitted_dt AS "submitted",
            t1.updated_dt AS "updated",
            t1.approved_dt AS "approved",
            t4.name AS approver,
            t5.name AS user,
            EXTRACT(DAY FROM age(t1.to_dt +  INTERVAL '1 day', t1.from_dt)) AS days
        FROM user_leaves t1
        JOIN leave_policies t2 ON t1.leave_policy_id = t2.id
        JOIN leave_status t3 ON t1.status = t3.id
        LEFT JOIN users t4 ON t1.approver_id = t4.id
        JOIN users t5 ON t1.user_id = t5.id
        WHERE t1.user_id = $1
        ORDER BY submitted_dt DESC
    `;
    const queryParams = [userId];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows;
}

const deleteLeaveRequestByRequestId = async (requestId) => {
    const query = `DELETE FROM user_leaves WHERE id = $1`;
    const queryParams = [requestId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getPendingLeaveRequests = async () => {
    const query = `
        SELECT
            t1.id,
            t2.name as policy,
            t1.leave_policy_id AS "policyId",
            t1.from_dt AS "from",
            t1.to_dt AS "to",
            t1.note,
            t1.submitted_dt AS "submitted",
            t1.updated_dt AS "updated",
            t3.name AS user,
            EXTRACT(DAY FROM age(t1.to_dt + INTERVAL '1 day', t1.from_dt)) AS days
        FROM user_leaves t1
        JOIN leave_policies t2 ON t1.leave_policy_id = t2.id
        JOIN users t3 ON t1.user_id = t3.id
        WHERE t1.status = 1
        ORDER BY submitted_dt DESC
    `;
    const { rows } = await processDBRequest({ query });
    return rows;
}

const approveOrCancelPendingLeaveRequest = async (userId, requestId, status) => {
    const now = new Date();
    const query = `
        UPDATE user_leaves
        SET status = $1, approved_dt = $2, approver_id = $3
        WHERE id = $4
    `;
    const queryParams = [status, now, userId, requestId];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const findReviewerIdByRequestId = async (requestId) => {
    const query = `
        SELECT u.reporter_id, u.role_id
        FROM users u
        JOIN user_leaves ul ON u.id = ul.user_id
        WHERE ul.id = $1
    `;
    const { rows } = await processDBRequest({ query, queryParams: [requestId] });
    return rows[0];
}

const findPolicyStatusById = async (id) => {
    const query = `SELECT is_active FROM leave_policies WHERE id = $1`;
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

module.exports = {
    createNewLeavePolicy,
    updateLeavePolicyById,
    getLeavePolicies,
    getUsersByPolicyId,
    updatePolicyUsersById,
    enableDisableLeavePolicy,
    deleteUserFromPolicyById,
    getPolicyEligibleUsers,
    createNewLeaveRequest,
    updateLeaveRequestById,
    getLeaveRequestHistoryByUser,
    deleteLeaveRequestByRequestId,
    getPendingLeaveRequests,
    approveOrCancelPendingLeaveRequest,
    findReviewerIdByRequestId,
    getMyLeavePolicy,
    findPolicyStatusById,
};