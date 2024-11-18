const express = require("express");
const router = express.Router();
const rpController = require("./rp-controller");

router.get("", rpController.handleGetRoles);
router.post("", rpController.handleAddRole);
router.post("/switch", rpController.handleSwitchRole);
router.put("/:id", rpController.handleUpdateRole);
router.post("/:id/status", rpController.handleRoleStatus);
router.get("/:id", rpController.handleGetRole);
router.get("/:id/permissions", rpController.handleGetRolePermission);
router.post("/:id/permissions", rpController.handleAddRolePermission);
router.get("/:id/users", rpController.handleGetUsersByRoleId);

module.exports = { rpRoutes: router };
