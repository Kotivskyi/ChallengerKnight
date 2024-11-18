const asyncHandler = require("express-async-handler");
const { processAddAccessControl, processUpdateAccessContorl, processDeleteAccessControl, processGetAllAccessControls, processGetMyAccessControl } = require("./access-control-service");

const handleAddAccessControl = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await processAddAccessControl(payload);
    res.json(message);
});

const handleUpdateAccessControl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const message = await processUpdateAccessContorl({ ...payload, id });
    res.json(message);
});

const handleDeleteAccessControl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await processDeleteAccessControl(id);
    res.json(message);
});

const handleGetAllAccessControls = asyncHandler(async (req, res) => {
    const permissions = await processGetAllAccessControls();
    res.json({ permissions });
});

const handleGetMyAccessControl = asyncHandler(async (req, res) => {
    const { roleId } = req.user;
    const permissions = await processGetMyAccessControl(roleId);
    res.json({ permissions });
});

module.exports = {
    handleAddAccessControl,
    handleUpdateAccessControl,
    handleDeleteAccessControl,
    handleGetAllAccessControls,
    handleGetMyAccessControl
};