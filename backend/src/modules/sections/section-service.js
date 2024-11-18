const { ApiError } = require("../../utils");
const { getAllSections, getSectionById, updateSectionById, deleteSectionById, addNewSection } = require("./section-repository")

const processGetAllSections = async () => {
    const sections = await getAllSections();
    if (sections.length <= 0) {
        throw new ApiError(404, "Sections not found");
    }

    return sections;
}

const processAddNewSection = async (name) => {
    const affectedRow = await addNewSection(name);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to add new section");
    }

    return { message: "Section added successfully" };
}

const processGetSectionById = async (id) => {
    const section = await getSectionById(id);
    if (!section) {
        throw new ApiError(404, "Section does not exist");
    }

    return section;
}

const processUpdateSectionById = async (payload) => {
    const affectedRow = await updateSectionById(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update section detail");
    }

    return { message: "Section updated successfully" };
}

const processDeleteSectionById = async (id) => {
    const affectedRow = await deleteSectionById(id);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to delete section detail");
    }

    return { message: "Section deleted successfully" };
}
module.exports = {
    processGetAllSections,
    processGetSectionById,
    processUpdateSectionById,
    processDeleteSectionById,
    processAddNewSection
};
