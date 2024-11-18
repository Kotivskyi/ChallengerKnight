const asyncHandler = require("express-async-handler");
const { processUpdateStaff, processGetAllStaffs, processReviewStaffStatus, processGetStaff, processAddStaff } = require("./staffs-service");

const handleGetAllStaffs = asyncHandler(async (req, res) => {
    const { userId, roleId, name } = req.query;
    const staffs = await processGetAllStaffs({ userId, roleId, name });
    res.json({ staffs });
});

const handleGetStaff = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const staff = await processGetStaff(id);
    res.json(staff);

});

const handleReviewStaffStatus = asyncHandler(async (req, res) => {
    const payload = req.body;
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const message = await processReviewStaffStatus({ ...payload, userId, reviewerId });
    res.json(message);
});

const handleAddStaff = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await processAddStaff(payload);
    res.json(message);
});

const handleUpdateStaff = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;
    const message = await processUpdateStaff({ ...payload, userId });
    res.json(message);
});

module.exports = {
    handleGetAllStaffs,
    handleGetStaff,
    handleReviewStaffStatus,
    handleAddStaff,
    handleUpdateStaff
};