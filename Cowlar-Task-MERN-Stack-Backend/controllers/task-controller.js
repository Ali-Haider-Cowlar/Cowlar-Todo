const taskService = require("../services/task.service");

module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskService.getTaskById(id);
    return res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.addTask = async (req, res) => {
  const { taskName, completed, completedTime } = req.body;
  try {
    const task = await taskService.addTask(taskName, completed, completedTime);
    return res.status(201).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const { taskName, completed, completedTime } = req.body;
  try {
    const task = await taskService.updateTask(
      id,
      taskName,
      completed,
      completedTime
    );
    return res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------

module.exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await taskService.deleteTask(id);
    return res.status(200).json({ message: "Task Successfully Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//----------------------------------------------------------------------------------------------
