const asyncHandler = require("express-async-handler");
const { fetchDashboardData } = require("./dashboard-service");

const handleGetDashboardData = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const dashboard = await fetchDashboardData(id);
    res.json(dashboard);
});

module.exports = {
    handleGetDashboardData
};
