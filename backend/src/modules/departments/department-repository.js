const { processDBRequest } = require("../../utils");

const getAllDepartments = async () => {
    const query = "SELECT * FROM departments";
    const { rows } = await processDBRequest({ query });
    return rows;
}

const addNewDepartment = async (name) => {
    const query = "INSERT INTO departments(name) VALUES ($1)";
    const queryParams = [name];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getDepartmentById = async (id) => {
    const query = "SELECT * FROM departments WHERE id = $1";
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const updateDepartmentById = async (payload) => {
    const { id, name } = payload;
    const query = `
        UPDATE departments
            SET name = $1
        WHERE id = $2
    `;
    const queryParams = [name, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const deleteDepartmentById = async (id) => {
    const query = `DELETE FROM departments WHERE id = $1`;
    const queryParams = [id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
    addNewDepartment
};
