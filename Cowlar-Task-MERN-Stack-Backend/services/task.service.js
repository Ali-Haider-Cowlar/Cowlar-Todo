const Task = require("../model/Task");

module.exports.getAllTasks = async () => {
  const tasks = await Task.find();
  if (!tasks) {
    throw new Error("No tasks found");
  }
  return tasks;
};

//----------------------------------------------------------------------------------------------

module.exports.getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error("No task found");
  }
  return task;
};

//----------------------------------------------------------------------------------------------

module.exports.addTask = async (taskName, completed, completedTime) => {
  const task = new Task({ taskName, completed, completedTime });
  await task.save();
  return task;
};

//----------------------------------------------------------------------------------------------

module.exports.updateTask = async (id, taskName, completed, completedTime) => {
  let task = await Task.findByIdAndUpdate(id, {
    taskName,
    completed,
    completedTime,
  });
  if (!task) {
    throw new Error("Unable To Update By this ID");
  }
  task = await task.save();
  return task;
};

//----------------------------------------------------------------------------------------------

module.exports.deleteTask = async (id) => {
  const task = await Task.findByIdAndRemove(id);
  if (!task) {
    throw new Error("Unable To Delete By this ID");
  }
};
