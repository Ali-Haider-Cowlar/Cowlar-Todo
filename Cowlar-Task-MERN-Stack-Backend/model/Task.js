const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	task_Name: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	completed_Time: {
		type: Date,
	},
	creation_Time: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model("Task", taskSchema);

// To-do List Schema
