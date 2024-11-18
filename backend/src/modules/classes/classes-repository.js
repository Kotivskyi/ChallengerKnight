const { processDBRequest } = require("../../utils");

const getAllClasses = async () => {
    const query = "SELECT * FROM classes ORDER BY name";
    const { rows } = await processDBRequest({ query });
    return rows;
}

const getClassDetail = async (id) => {
    const query = "SELECT * from classes WHERE id = $1";
    const { rows } = await processDBRequest({ query, queryParams: [id] });
    return rows[0];
}

const addNewClass = async (payload) => {
    const { name, sections } = payload;
    const query = `
        INSERT INTO classes (name, sections)
        VALUES ($1, $2)
    `;
    const queryParams = [name, sections];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const updateClassDetailById = async (payload) => {
    const { id, name, sections } = payload;
    const query = `
        UPDATE classes
        SET name = $1, sections = $2
        WHERE id = $3
    `;
    const queryParams = [name, sections, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const deleteClassById = async (id) => {
    const query = "DELETE FROM classes WHERE id = $1";
    const queryParams = [id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

module.exports = {
    getAllClasses,
    getClassDetail,
    addNewClass,
    updateClassDetailById,
    deleteClassById
};