const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Savings", "Debt", "Investment", "Other"],
  },
  milestones: [
    {
      percentage: {
        type: Number,
        enum: [25, 50, 75, 100],
      },
      achieved: {
        type: Boolean,
        default: false,
      },
      pointsAwarded: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
