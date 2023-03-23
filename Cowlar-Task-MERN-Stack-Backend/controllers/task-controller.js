const Task = require("../model/Task");

//----------------------------------------------------------------------------------------------

module.exports.getAllTasks = async (req, res, next) => {
	let tasks;
	try {
		tasks = await Task.find();
	} catch (err) {
		console.log(err);
	}

	if (!tasks) {
		return res.status(404).json({ message: "No tasks found" });
	}
	return res.status(200).json({ tasks });
};

//----------------------------------------------------------------------------------------------

module.exports.getById = async (req, res, next) => {
	const id = req.params.id;
	let task;
	try {
		task = await Task.findById(id);
	} catch (err) {
		console.log(err);
	}
	if (!task) {
		return res.status(404).json({ message: "No Task found" });
	}
	return res.status(200).json({ task });
};

//----------------------------------------------------------------------------------------------

module.exports.addTask = async (req, res, next) => {
	const { task_Name, completed, completed_Time } = req.body;
	let task;
	try {
		task = new Task({
			task_Name,
			completed,
			completed_Time,
		});
		await task.save();
	} catch (err) {
		console.log(err);
	}
	if (!task) {
		return res.status(500).json({ message: "Unable To Add" });
	}
	return res.status(201).json({ task });
};

//----------------------------------------------------------------------------------------------

module.exports.updateTask = async (req, res, next) => {
	const id = req.params.id;
	const { task_Name, completed, completed_Time } = req.body;
	let task;
	try {
		task = await Task.findByIdAndUpdate(id, {
			task_Name,
			completed,
			completed_Time,
		});
		task = await task.save();
	} catch (err) {
		console.log(err);
	}
	if (!task) {
		return res.status(404).json({ message: "Unable To Update By this ID" });
	}
	return res.status(200).json({ task });
};

//----------------------------------------------------------------------------------------------

module.exports.deleteTask = async (req, res, next) => {
	const id = req.params.id;
	let task;
	try {
		task = await Task.findByIdAndRemove(id);
	} catch (err) {
		console.log(err);
	}
	if (!task) {
		return res.status(404).json({ message: "Unable To Delete By this ID" });
	}
	return res.status(200).json({ message: "Task Successfully Deleted" });
};


