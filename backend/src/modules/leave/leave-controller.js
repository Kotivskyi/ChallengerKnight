const asyncHandler = require("express-async-handler");
const { addNewLeaveRequest, reviewPendingLeaveRequest, makeNewLeavePolicy, fetchLeavePolicies, updateLeavePolicy, updatePolicyUsers, fetchPolicyUsers, deletePolicyUser, fetchPolicyEligibleUsers, reviewLeavePolicy, getUserLeaveHistory, deleteLeaveRequest, fetchPendingLeaveRequests, updateLeaveRequest, processGetMyLeavePolicy } = require("./leave-service");

const handleMakeNewPolicy = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const newPolicy = await makeNewLeavePolicy(name);
    res.json(newPolicy);
});

const handleGetLeavePolicies = asyncHandler(async (req, res) => {
    const leavePolicies = await fetchLeavePolicies();
    res.json({ leavePolicies });
});

const handleGetMyLeavePolicy = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const leavePolicies = await processGetMyLeavePolicy(id);
    res.json({ leavePolicies });
});

const handleUpdateLeavePlicy = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const updatedPolicy = await updateLeavePolicy(name, id);
    res.json(updatedPolicy);
});

const handleUpdatePolicyUsers = asyncHandler(async (req, res) => {
    const { users } = req.body;
    const { id } = req.params;
    const message = await updatePolicyUsers(id, users);
    res.json(message);
});

const handleGetPolicyUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const users = await fetchPolicyUsers(id);
    res.json({ users });
});

const handleRemovePolicyUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const message = await deletePolicyUser(user, id);
    res.json(message);
});

const handleFetchPolicyEligibleUsers = asyncHandler(async (req, res) => {
    const users = await fetchPolicyEligibleUsers();
    res.json({ users });
});

const handleCreateNewLeaveRequest = asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { policy, from, to, note } = req.body;
    const message = await addNewLeaveRequest({ policy, from, to, note, userId });
    res.json(message);
});

const handleReviewLeaveRequest = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id: userId } = req.user;
    const { id: leaveRequestId } = req.params;

    const message = await reviewPendingLeaveRequest(userId, leaveRequestId, status);
    res.json(message);
});

const handleReviewLeavePolicy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const message = await reviewLeavePolicy(status, id);
    res.json(message);
});

const handleUpdateLeaveRequest = asyncHandler(async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    const payload = { ...body, id };

    const message = await updateLeaveRequest(payload);
    res.json(message);
});

const handleGetUserLeaveHistory = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const leaveHistory = await getUserLeaveHistory(id);
    res.json({ leaveHistory });
});

const handleDeleteLeaveRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await deleteLeaveRequest(id);
    res.json(message);
});

const handleFetchPendingLeaveRequests = asyncHandler(async (req, res) => {
    const pendingLeaves = await fetchPendingLeaveRequests();
    res.json({ pendingLeaves });
});

module.exports = {
    handleCreateNewLeaveRequest,
    handleReviewLeaveRequest,
    handleMakeNewPolicy,
    handleGetLeavePolicies,
    handleUpdateLeavePlicy,
    handleUpdatePolicyUsers,
    handleGetPolicyUsers,
    handleRemovePolicyUser,
    handleFetchPolicyEligibleUsers,
    handleReviewLeavePolicy,
    handleUpdateLeaveRequest,
    handleGetUserLeaveHistory,
    handleDeleteLeaveRequest,
    handleFetchPendingLeaveRequests,
    handleGetMyLeavePolicy,
};
