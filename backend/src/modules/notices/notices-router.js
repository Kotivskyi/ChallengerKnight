const express = require("express");
const router = express.Router();
const noticeController = require("./notices-controller");
const { checkApiAccess } = require("../../middlewares");

router.get(
  "/recipients/list",
  checkApiAccess,
  noticeController.handleFetchNoticeRecipients
);
router.get(
  "/recipients",
  checkApiAccess,
  noticeController.handleGetNoticeRecipients
);
router.get(
  "/recipients/:id",
  checkApiAccess,
  noticeController.handleGetNoticeRecipient
);
router.post(
  "/recipients",
  checkApiAccess,
  noticeController.handleAddNoticeRecipient
);
router.put(
  "/recipients/:id",
  checkApiAccess,
  noticeController.handleUpdateNoticeRecipient
);
router.delete(
  "/recipients/:id",
  checkApiAccess,
  noticeController.handleDeleteNoticeRecipient
);
router.post("/:id/status", checkApiAccess, noticeController.handleNoticeStatus);
router.get(
  "/pending",
  checkApiAccess,
  noticeController.handleFetchAllPendingNotices
);
router.get(
  "/:id",
  checkApiAccess,
  noticeController.handleFetchNoticeDetailById
);
router.get("", checkApiAccess, noticeController.handleFetchAllNotices);
router.post("", checkApiAccess, noticeController.handleAddNotice);
router.put("/:id", checkApiAccess, noticeController.handleUpdateNotice);

module.exports = { noticesRoutes: router };
