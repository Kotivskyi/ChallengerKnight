const asyncHandler = require("express-async-handler");
const { processGetAllSections, processGetSectionById, processUpdateSectionById, processDeleteSectionById, processAddNewSection } = require("./section-service");

const handleGetAllSections = asyncHandler(async (req, res) => {
    const sections = await processGetAllSections();
    res.json({ sections });
});

const handleAddNewSection = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const message = await processAddNewSection(name);
    res.json(message);
});

const handleGetSectionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const section = await processGetSectionById(id);
    res.json(section);
});

const handleUpdateSectionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await processUpdateSectionById({ id, name });
    res.json(message);
});

const handleDeleteSectionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await processDeleteSectionById(id);
    res.json(message);
});

module.exports = {
    handleGetAllSections,
    handleGetSectionById,
    handleUpdateSectionById,
    handleDeleteSectionById,
    handleAddNewSection
};