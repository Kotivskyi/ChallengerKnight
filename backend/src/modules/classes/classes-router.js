const express = require("express");
const router = express.Router();
const classesController = require("./classes-controller");
const { checkApiAccess } = require("../../middlewares");

router.get("", checkApiAccess, classesController.handleFetchAllClasses);
router.get("/:id", checkApiAccess, classesController.handleFetchClassDetail);
router.post("", checkApiAccess, classesController.handleAddClass);
router.put("/:id", checkApiAccess, classesController.handleUpdateClass);
router.delete("/:id", checkApiAccess, classesController.handleDeleteClass);

module.exports = { classesRoutes: router };
