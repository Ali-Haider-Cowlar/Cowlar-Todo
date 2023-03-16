const express = require("express");
const router = express.Router();
const Task = require("../model/Task");
const taskController = require("../controllers/task-controller");

router.get("/", taskController.getAllTasks);
router.post("/", taskController.addTask);
router.get("/:id", taskController.getById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
