const { processDBRequest } = require("../../utils");

const addAccessControl = async (payload) => {
  const { name, path, type, method, hierarchy_id, id } = payload;
  const query = `
        WITH query_result AS (
            SELECT path FROM access_controls WHERE id = $6
        )
        INSERT INTO access_controls (name, path, parent_path, hierarchy_id, type, method)
        VALUES ($1, $2, COALESCE((SELECT path FROM query_result), NULL), $3, $4, $5)
    `;
  const queryParams = [name, path, hierarchy_id, type, method, id];
  const { rowCount } = await processDBRequest({ query, queryParams });
  return rowCount;
};

const updateAccessControl = async (payload) => {
  const { id, name, path, hierarchy_id, type, method } = payload;
  const query = `
        UPDATE access_controls
        SET
            name = $1,
            path = $2,
            hierarchy_id = $3,
            type = $4,
            method = $5
        WHERE id = $6
    `;
  const queryParams = [name, path, hierarchy_id, type, method, id];
  const { rowCount } = await processDBRequest({ query, queryParams });
  return rowCount;
};

const deleteAccessControl = async (id) => {
  const query = `DELETE FROM access_controls WHERE id = $1`;
  const queryParams = [id];
  const { rowCount } = await processDBRequest({ query, queryParams });
  return rowCount;
};

const getAllAccessControls = async () => {
  const query = `SELECT * FROM access_controls`;
  const { rows } = await processDBRequest({ query });
  return rows;
};

const getMyAccessControl = async (roleId) => {
  const isUserAdmin = Number(roleId) === 1 ? true : false;
  const query = isUserAdmin
    ? `SELECT * FROM access_controls`
    : `
            SELECT
                ac.*
            FROM permissions p
            JOIN access_controls ac ON p.access_control_id = ac.id
            WHERE p.role_id = $1    
        `;
  const queryParams = isUserAdmin ? [] : [roleId];
  const { rows } = await processDBRequest({ query, queryParams });
  return rows;
};

module.exports = {
  addAccessControl,
  updateAccessControl,
  deleteAccessControl,
  getAllAccessControls,
  getMyAccessControl,
};
