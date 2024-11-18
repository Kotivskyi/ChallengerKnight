const express = require("express");
const router = express.Router();
const accessControlController = require("./access-control-controller");
const { isUserAdmin } = require("../../middlewares");

router.get("", isUserAdmin, accessControlController.handleGetAllAccessControls);
router.post("", isUserAdmin, accessControlController.handleAddAccessControl);
router.put("/:id", isUserAdmin, accessControlController.handleUpdateAccessControl);
router.delete("/:id", isUserAdmin, accessControlController.handleDeleteAccessControl);
router.get("/me", accessControlController.handleGetMyAccessControl);

module.exports = { accessControlRoutes: router };
