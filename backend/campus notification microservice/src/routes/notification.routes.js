const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/notification.controller");

router.post("/", ctrl.createNotification);
router.get("/", ctrl.getNotifications);
router.get("/unread", ctrl.getUnreadNotifications);
router.get("/priority", ctrl.getPriorityNotifications);
router.post("/notify-all", ctrl.notifyAllUsers);

module.exports = router;