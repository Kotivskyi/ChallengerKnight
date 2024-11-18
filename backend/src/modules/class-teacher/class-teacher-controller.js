const asyncHandler = require("express-async-handler");
const { fetchAllClassTeachers, fetchClassTeacherDetailById, addNewClassTeacher, updateClassTeacher, getAllTeachers } = require("./class-teacher-service");

const handleGetClassTeachers = asyncHandler(async (req, res) => {
    const classTeachers = await fetchAllClassTeachers();
    res.json({ classTeachers });
});

const handleGetClassTeacherDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const detail = await fetchClassTeacherDetailById(id);
    res.json(detail);
});

const handleAddClassTeacher = asyncHandler(async (req, res) => {
    const { class: className, section, teacher } = req.body;
    const message = await addNewClassTeacher({ className, section, teacher });
    res.json(message);
});

const handleUpdateClassTeacherDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { class: className, section, teacher } = req.body;
    const message = await updateClassTeacher({ className, section, teacher, id });
    res.json(message);
});

const handleGetAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await getAllTeachers();
    res.json({ teachers });
});

module.exports = {
    handleGetClassTeachers,
    handleGetClassTeacherDetail,
    handleAddClassTeacher,
    handleUpdateClassTeacherDetail,
    handleGetAllTeachers
};