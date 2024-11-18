const express = require("express");
const router = express.Router();
const classTeacherController = require("./class-teacher-controller");
const { checkApiAccess } = require("../../middlewares");

router.get("", checkApiAccess, classTeacherController.handleGetClassTeachers);
router.post("", checkApiAccess, classTeacherController.handleAddClassTeacher);
router.get("/:id", checkApiAccess, classTeacherController.handleGetClassTeacherDetail);
router.put("/:id", checkApiAccess, classTeacherController.handleUpdateClassTeacherDetail);

module.exports = { classTeacherRoutes: router };
