const { getUserDashboardData } = require("./dashboard-repository");

const fetchDashboardData = async (id) => {
    const data = await getUserDashboardData(id);

    if (!data) {
        throw new ApiError(404, "Dashboard data not found");
    }

    return data;
}

module.exports = {
    fetchDashboardData
};