const express = require("express");
const router = express.Router();
const accountController = require("./account-controller");

router.post("/change-password", accountController.handlePasswordChange);
router.get("/me", accountController.handleGetAccountDetail);

module.exports = { accountRoutes: router };
