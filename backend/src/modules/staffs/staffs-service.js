const { ApiError, sendAccountVerificationEmail } = require("../../utils");
const { addOrUpdateStaff, reviewStaffStatus, getAllStaffs, getStaffDetailById } = require("./staffs-repository");

const processGetAllStaffs = async (payload) => {
    const staffs = await getAllStaffs(payload);
    if (staffs.length <= 0) {
        throw new ApiError(404, "Staffs not found");
    }
    return staffs;
}

const processGetStaff = async (id) => {
    const staff = await getStaffDetailById(id);
    if (!staff) {
        throw new ApiError(404, "Staff detail not found");
    }
    return staff;
}

const processReviewStaffStatus = async (payload) => {
    const affectedRow = await reviewStaffStatus(payload);
    if (affectedRow <= 0) {
        throw new ApiError(500, "Unable to update staff status");
    }
    return { message: "Staff status updated successfully" };
}

const processAddStaff = async (payload) => {
    const ADD_STADD_AND_EMAIL_SEND_SUCCESS = "Staff added and verification email sent successfully.";
    const ADD_STAFF_AND_BUT_EMAIL_SEND_FAIL = "Staff added, but failed to send verification email.";
    try {
        const result = await addOrUpdateStaff(payload);
        if (!result.status) {
            throw new ApiError(500, result.message);
        }

        try {
            await sendAccountVerificationEmail({ userId: result.userId, userEmail: payload.email });
            return { message: ADD_STADD_AND_EMAIL_SEND_SUCCESS };
        } catch (error) {
            return { message: ADD_STAFF_AND_BUT_EMAIL_SEND_FAIL };
        }
    } catch (error) {
        throw new ApiError(500, "Unable to add staff");
    }
}

const processUpdateStaff = async (payload) => {
    const result = await addOrUpdateStaff(payload);
    if (!result.status) {
        throw new ApiError(500, result.message);
    }

    return { message: result.message };
}

module.exports = {
    processGetAllStaffs,
    processGetStaff,
    processReviewStaffStatus,
    processAddStaff,
    processUpdateStaff
};