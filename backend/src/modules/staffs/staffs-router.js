const express = require("express");
const router = express.Router();
const staffsController = require("./staffs-controller");

router.get("", staffsController.handleGetAllStaffs);
router.post("", staffsController.handleAddStaff);
router.get("/:id", staffsController.handleGetStaff);
router.put("/:id", staffsController.handleUpdateStaff);
router.post("/:id/status", staffsController.handleReviewStaffStatus);

module.exports = { staffsRoutes: router };
