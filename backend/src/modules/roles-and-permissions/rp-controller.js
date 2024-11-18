const asyncHandler = require("express-async-handler");
const { fetchRoles, addRole, updateRole, processRoleStatus, fetchRole, addRolePermission, getRolePermissions, fetchUsersByRoleId, processSwitchRole } = require("./rp-service");

const handleGetRoles = asyncHandler(async (req, res) => {
    const roles = await fetchRoles();
    res.json({ roles });
});

const handleGetRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const role = await fetchRole(id);
    res.json(role);
});


const handleAddRole = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const message = await addRole(name);
    res.json(message);
});

const handleUpdateRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await updateRole(id, name);
    res.json(message);
});

const handleRoleStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const message = await processRoleStatus(id, status);
    res.json(message);
});

const handleAddRolePermission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;
    const message = await addRolePermission(id, permissions);
    res.json(message);
});

const handleGetRolePermission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const permissions = await getRolePermissions(id);
    res.json({ permissions });
});

const handleGetUsersByRoleId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const users = await fetchUsersByRoleId(id);
    res.json({ users });
});
const handleSwitchRole = asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;
    const message = await processSwitchRole(userId, roleId);
    res.json(message);
});

module.exports = {
    handleAddRole,
    handleGetRoles,
    handleUpdateRole,
    handleRoleStatus,
    handleGetRole,
    handleAddRolePermission,
    handleGetRolePermission,
    handleGetUsersByRoleId,
    handleSwitchRole,
};
