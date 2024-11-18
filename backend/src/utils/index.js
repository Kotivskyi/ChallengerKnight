const { ApiError } = require("./api-error");
const { generateToken, verifyToken } = require("./jwt-handle");
const { processDBRequest } = require("./process-db-request");
const { generateCsrfHmacHash, verifyCsrfToken } = require("./csrf-handle");
const { isObjectEmpty } = require("./is-object-empty");
const { getAccessItemHierarchy } = require("./get-access-item-hierarchy");
const { generateHashedPassword, verifyPassword } = require("./handle-password");
const { sendMail } = require("./send-email");
const { sendAccountVerificationEmail } = require("./send-account-verification-email");
const { sendPasswordSetupEmail } = require("./send-password-setup-email");
const {
    checkNoticeEditPermission,
    checkNoticeApprovePermission,
    checkNoticeDeletePermission,
    checkNoticeRejectPermission
} = require("./check-notice-permission");
const { validateRequest } = require("./validate-request");
const { formatMyPermission } = require("./format-my-permission");

module.exports = {
    ApiError,
    verifyToken,
    generateToken,
    processDBRequest,
    generateCsrfHmacHash,
    verifyCsrfToken,
    isObjectEmpty,
    getAccessItemHierarchy,
    generateHashedPassword,
    sendMail,
    sendAccountVerificationEmail,
    sendPasswordSetupEmail,
    verifyPassword,
    checkNoticeEditPermission,
    checkNoticeApprovePermission,
    checkNoticeDeletePermission,
    checkNoticeRejectPermission,
    validateRequest,
    formatMyPermission
};
