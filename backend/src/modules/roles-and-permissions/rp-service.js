const { db } = require("../../config");
const { ApiError, isObjectEmpty } = require("../../utils");
const {
  insertRole,
  getRoles,
  doesRoleNameExist,
  doesRoleIdExist,
  enableOrDisableRoleStatusByRoleId,
  getRoleById,
  updateRoleById,
  getPermissionsById,
  getUsersByRoleId,
  getAccessControlByIds,
  insertPermissionForRoleId,
  switchUserRole,
  deletePermissionForRoleId,
} = require("./rp-repository");

const checkIfRoleIdExist = async (id) => {
  const affectedRow = await doesRoleIdExist(id);
  if (affectedRow <= 0) {
    throw new ApiError(404, "Invalid role id");
  }
};

const addRole = async (name) => {
  const roleNameExist = await doesRoleNameExist(name);
  if (roleNameExist > 0) {
    throw new ApiError(409, "Role Name already exists.");
  }

  const affectedRow = await insertRole(name);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to add role");
  }

  return { message: "Role added successfully" };
};

const fetchRoles = async () => {
  const roles = await getRoles();
  if (!Array.isArray(roles) || roles.length <= 0) {
    throw new ApiError(500, "Roles not found");
  }

  return roles;
};

const fetchRole = async (id) => {
  await checkIfRoleIdExist(id);

  const role = await getRoleById(id);
  if (isObjectEmpty(role)) {
    throw new ApiError(500, "Unable to get role detail");
  }

  return role;
};

const updateRole = async (id, name) => {
  await checkIfRoleIdExist(id);

  const affectedRow = await updateRoleById(id, name);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to update role");
  }

  return { message: "Role updated successfully" };
};

const processRoleStatus = async (id, status) => {
  await checkIfRoleIdExist(id);

  const affectedRow = await enableOrDisableRoleStatusByRoleId(id, status);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to disable role");
  }

  const stsText = status ? "enabled" : "disabled";
  return { message: `Role ${stsText} successfully` };
};

const addRolePermission = async (roleId, permissionIds) => {
  await checkIfRoleIdExist(roleId);

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const idArray = permissionIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    if (idArray.length === 0) {
      await deletePermissionForRoleId(roleId, client);
      await client.query("COMMIT");
      return { message: "Permission of given role deleted successfully" };
    }
    const ids = idArray.map((id) => parseInt(id, 10));
    const accessControls = await getAccessControlByIds(ids, client);

    if (accessControls.length > 0) {
      const queryParams = accessControls
        .map(({ id, type }) => `(${roleId}, ${id}, '${type}')`)
        .join(", ");
      await insertPermissionForRoleId(queryParams, client);
    }

    await client.query("COMMIT");

    return { message: "Permission of given role saved successfully" };
  } catch (error) {
    await client.query("ROLLBACK");
    throw new ApiError(500, "Unable to assign permission to given role");
  } finally {
    client.release();
  }
};

const getRolePermissions = async (roleId) => {
  await checkIfRoleIdExist(roleId);

  const permissions = await getPermissionsById(roleId);
  if (permissions.length <= 0) {
    throw new ApiError(404, "Permissions for given role not found");
  }

  return permissions;
};

const fetchUsersByRoleId = async (id) => {
  await checkIfRoleIdExist(id);

  const users = await getUsersByRoleId(id);
  if (!Array.isArray(users) || users.length <= 0) {
    throw new ApiError(404, "Users not found");
  }

  return users;
};

const processSwitchRole = async (userId, newRoleId) => {
  const affectedRow = await switchUserRole(userId, newRoleId);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to switch role");
  }
  return { message: "Role switched successfully" };
};

module.exports = {
  addRole,
  fetchRoles,
  updateRole,
  processRoleStatus,
  fetchRole,
  addRolePermission,
  getRolePermissions,
  fetchUsersByRoleId,
  processSwitchRole,
};
