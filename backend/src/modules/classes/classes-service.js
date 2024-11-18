const { ApiError } = require("../../utils");
const { getAllClasses, getClassDetail, addNewClass, updateClassDetailById, deleteClassById } = require("./classes-repository")

const fetchAllClasses = async () => {
    const classes = await getAllClasses();
    if (!Array.isArray(classes) || classes.length <= 0) {
        throw new ApiError(404, "Classes not found");
    }

    return classes;
}

const fetchClassDetail = async (id) => {
    const classDetail = await getClassDetail(id);
    if (!classDetail) {
        throw new ApiError(404, "Class detail not found");
    }

    return classDetail;
}

const addClass = async (payload) => {
    const affectedRow = await addNewClass(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to add new class");
    }

    return { message: "Class added successfully" };
}

const updateClassDetail = async (payload) => {
    const affectedRow = await updateClassDetailById(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update class detail");
    }
    return { message: "Class detail updated successfully" };
}

const deleteClass = async (id) => {
    const affectedRow = await deleteClassById(id);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to delete class");
    }
    return { message: "Class deleted successfully" };
}

module.exports = {
    fetchAllClasses,
    fetchClassDetail,
    addClass,
    updateClassDetail,
    deleteClass
};