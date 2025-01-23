// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  project: { type: String, required: true },
  budget: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  progress: { type: Number, required: true },
  users: [{ type: String }],
  comments: { type: String, default: '' },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
