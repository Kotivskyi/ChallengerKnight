const { processDBRequest } = require("../../utils");

const getUserDashboardData = async (userId) => {
    const query = `SELECT * FROM get_dashboard_data($1)`;
    const queryParams = [userId];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0].get_dashboard_data;
};

module.exports = {
    getUserDashboardData
};
