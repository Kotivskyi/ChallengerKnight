const asyncHandler = require("express-async-handler");
const { fetchAllClasses, fetchClassDetail, addClass, updateClassDetail, deleteClass } = require("./classes-service");

const handleFetchAllClasses = asyncHandler(async (req, res) => {
    const classes = await fetchAllClasses();
    res.json({ classes });
});

const handleFetchClassDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const classDetail = await fetchClassDetail(id);
    res.json(classDetail);
});

const handleAddClass = asyncHandler(async (req, res) => {
    const { name, sections } = req.body;
    const payload = { name, sections };
    const message = await addClass(payload);
    res.json(message);
});

const handleUpdateClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, sections } = req.body;
    const payload = { id, name, sections };
    const message = await updateClassDetail(payload);
    res.json(message);
});

const handleDeleteClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await deleteClass(id);
    res.json(message);
});

module.exports = {
    handleFetchAllClasses,
    handleFetchClassDetail,
    handleAddClass,
    handleUpdateClass,
    handleDeleteClass
};