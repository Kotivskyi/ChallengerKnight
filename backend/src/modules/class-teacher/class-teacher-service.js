const { ApiError } = require("../../utils");
const { getClassTeachers, addClassTeacher, getClassTeacherById, updateClassTeacherById, findAllTeachers } = require("./class-teacher-repository")

const fetchAllClassTeachers = async () => {
    const data = await getClassTeachers();
    if (!Array.isArray(data) || data.length <= 0) {
        throw new ApiError(404, "Class teachers not found");
    }

    return data;
}

const addNewClassTeacher = async (payload) => {
    const affectedRow = await addClassTeacher(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to add class teacher");
    }

    return { message: "Class teacher added successfully" };
}

const fetchClassTeacherDetailById = async (id) => {
    const classTeacherDetail = await getClassTeacherById(id);
    if (!classTeacherDetail) {
        throw new ApiError(404, "Class teacher detail not found");
    }

    return classTeacherDetail;
}

const updateClassTeacher = async (payload) => {
    const affectedRow = await updateClassTeacherById(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update class teacher detail");
    }

    return { message: "Class teacher detail updated successfully" };
}

const getAllTeachers = async () => {
    const teachers = await findAllTeachers();
    if (teachers.length <= 0) {
        throw new ApiError(404, "Teachers not found");
    }
    return teachers;
}

module.exports = {
    fetchAllClassTeachers,
    addNewClassTeacher,
    fetchClassTeacherDetailById,
    updateClassTeacher,
    getAllTeachers
};