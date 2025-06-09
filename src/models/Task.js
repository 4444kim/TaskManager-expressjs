const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    category: { type: String },
    deadline: { type: Date },
    image: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Task', taskSchema);
