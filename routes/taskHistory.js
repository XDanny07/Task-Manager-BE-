const express = require("express");
const router = express.Router();
const taskHistoryController = require("../controllers/taskHistoryController");

router.get("/:taskId", taskHistoryController.getTaskHistory);

router.delete("/:taskId", taskHistoryController.deleteTaskHistory);

module.exports = router;
