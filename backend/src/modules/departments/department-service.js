const { ApiError } = require("../../utils");
const { getAllDepartments, addNewDepartment, getDepartmentById, updateDepartmentById, deleteDepartmentById } = require("./department-repository");

const processGetAllDepartments = async () => {
    const departments = await getAllDepartments();
    if (departments.length <= 0) {
        throw new ApiError(404, "Departments not found");
    }

    return departments;
}

const processAddNewDepartment = async (name) => {
    const affectedRow = await addNewDepartment(name);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to add new department");
    }

    return { message: "Department added successfully" };
}

const processGetDepartmentById = async (id) => {
    const department = await getDepartmentById(id);
    if (!department) {
        throw new ApiError(404, "Department does not exist");
    }

    return department;
}

const processUpdateDepartmentById = async (payload) => {
    const affectedRow = await updateDepartmentById(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update department detail");
    }

    return { message: "Department updated successfully" };
}

const processDeleteDepartmentById = async (id) => {
    const affectedRow = await deleteDepartmentById(id);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to delete department detail");
    }

    return { message: "Department deleted successfully" };
}
module.exports = {
    processGetAllDepartments,
    processGetDepartmentById,
    processUpdateDepartmentById,
    processDeleteDepartmentById,
    processAddNewDepartment
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  require("./.svn/index")
