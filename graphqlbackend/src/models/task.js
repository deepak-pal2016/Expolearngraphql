const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    category: {
      type: String,
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },

    priority: {
      type: String,
      required: true,
    },

    dueDate: {
      type: Date,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    priorityColor: {
      type: String,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },

    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    remarks: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Task', taskSchema);
