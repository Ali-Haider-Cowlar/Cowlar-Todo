const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedTime: {
    type: Date,
  },
  creationTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

// To-do List Schema
