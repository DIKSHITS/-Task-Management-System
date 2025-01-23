const mongoose = require('mongoose');

const workAssignmentSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    workName: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember', required: true },
    dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('WorkAssignment', workAssignmentSchema);
