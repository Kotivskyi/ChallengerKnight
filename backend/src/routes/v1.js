const express = require("express");
const router = express.Router();

const { authenticateToken, handle404Error, csrfProtection, checkApiAccess } = require("../middlewares");
const { studentsRoutes } = require("../modules/students/sudents-router.js");
const { authRoutes } = require("../modules/auth/auth-router.js");
const { rpRoutes } = require("../modules/roles-and-permissions/rp-router.js");
const { leaveRoutes } = require("../modules/leave/leave-router.js");
const { classesRoutes } = require("../modules/classes/classes-router.js");
const { classTeacherRoutes } = require("../modules/class-teacher/class-teacher-router.js");
const { noticesRoutes } = require("../modules/notices/notices-router.js");
const { handleGetAllTeachers } = require("../modules/class-teacher/class-teacher-controller.js");
const { staffsRoutes } = require("../modules/staffs/staffs-router.js");
const { accountRoutes } = require("../modules/account/account-router.js");
const { sectionRoutes } = require("../modules/sections/section-router.js");
const { departmentRoutes } = require("../modules/departments/department-router.js");
const { handleGetDashboardData } = require("../modules/dashboard/dashboard-controller.js");
const { accessControlRoutes } = require("../modules/access-control/access-control-router.js");

router.get("/teachers", authenticateToken, csrfProtection, checkApiAccess, handleGetAllTeachers);
router.get("/dashboard", authenticateToken, csrfProtection, checkApiAccess, handleGetDashboardData);
router.use("/access-controls", authenticateToken, csrfProtection, accessControlRoutes);
router.use("/auth", authRoutes);
router.use("/account", authenticateToken, csrfProtection, accountRoutes);
router.use("/leave", authenticateToken, csrfProtection, leaveRoutes);
router.use("/classes", authenticateToken, csrfProtection, classesRoutes);
router.use("/class-teachers", authenticateToken, csrfProtection, classTeacherRoutes);
router.use("/sections", authenticateToken, csrfProtection, sectionRoutes);
router.use("/students", authenticateToken, csrfProtection, studentsRoutes);
router.use("/notices", authenticateToken, csrfProtection, noticesRoutes);
router.use("/staffs", authenticateToken, csrfProtection, staffsRoutes);
router.use("/departments", authenticateToken, csrfProtection, departmentRoutes);
router.use("/roles", authenticateToken, csrfProtection, rpRoutes);
router.use(handle404Error);

module.exports = { v1Routes: router };
