const { handle404Error } = require("./handle-404-error");
const { authenticateToken } = require("./authenticate-token");
const { csrfProtection } = require("./csrf-protection");
const { handleGlobalError } = require("./handle-global-error");
const { handleEmailVerificationToken } = require("./handle-email-verification-token");
const { handlePasswordSetupToken } = require("./handle-password-setup-token");
const { checkApiAccess } = require("./check-api-access");
const { isUserAdmin } = require("./is-user-admin");

module.exports = {
    authenticateToken,
    csrfProtection,
    handleGlobalError,
    handle404Error,
    handleEmailVerificationToken,
    handlePasswordSetupToken,
    checkApiAccess,
    isUserAdmin
};
