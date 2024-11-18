const { ApiError, getAccessItemHierarchy, formatMyPermission } = require("../../utils");
const { addAccessControl, updateAccessControl, deleteAccessControl, getAllAccessControls, getMyAccessControl } = require("./access-control-repository")

const processAddAccessControl = async (payload) => {
    const affectedRow = await addAccessControl(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to add access control");
    }

    return { message: "New access control added successfully" };
}

const processUpdateAccessContorl = async (payload) => {
    const affectedRow = await updateAccessControl(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update access control");
    }

    return { message: "Access control updated successfully" };
}

const processDeleteAccessControl = async (id) => {
    const affectedRow = await deleteAccessControl(id);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unabe to delete access control");
    }

    return { message: "Access control deleted successfully" };
}

const processGetAllAccessControls = async () => {
    const accessControls = await getAllAccessControls();
    if (accessControls.length <= 0) {
        throw new ApiError(404, "Access controls not found");
    }

    const hierarchialAccessControls = getAccessItemHierarchy(accessControls);
    return hierarchialAccessControls;
}

const processGetMyAccessControl = async (roleId) => {
    const permissions = await getMyAccessControl(roleId);
    if (permissions.length <= 0) {
        throw new ApiError(404, "You do not have permission to the system.");
    }
    const { hierarchialMenus, apis, uis } = formatMyPermission(permissions);
    return {
        menus: hierarchialMenus,
        apis,
        uis
    };
}

module.exports = {
    processAddAccessControl,
    processUpdateAccessContorl,
    processDeleteAccessControl,
    processGetAllAccessControls,
    processGetMyAccessControl
};
