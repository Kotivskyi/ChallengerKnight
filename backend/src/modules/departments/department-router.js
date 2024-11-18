const express = require("express");
const router = express.Router();
const departmentController = require("./department-controller");

router.get("", departmentController.handleGetAllDepartments);
router.post("", departmentController.handleAddNewDepartment);
router.get("/:id", departmentController.handleGetDepartmentById);
router.put("/:id", departmentController.handleUpdateDepartmentById);
router.delete("/:id", departmentController.handleDeleteDepartmentById);

module.exports = { departmentRoutes: router };
