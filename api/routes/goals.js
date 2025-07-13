const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Create a new goal
router.post("/", auth, async (req, res) => {
  try {
    const { title, targetAmount, deadline, category } = req.body;
    const goal = new Goal({
      userId: req.user.id,
      title,
      targetAmount,
      currentAmount: 0,
      deadline,
      category,
      milestones: [
        { percentage: 25, achieved: false, pointsAwarded: 0 },
        { percentage: 50, achieved: false, pointsAwarded: 0 },
        { percentage: 75, achieved: false, pointsAwarded: 0 },
        { percentage: 100, achieved: false, pointsAwarded: 0 },
      ],
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all goals for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update goal progress
router.put("/:id", auth, async (req, res) => {
  try {
    const { currentAmount } = req.body;
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    goal.currentAmount = currentAmount;
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    // Check and award points for milestones
    const milestones = [25, 50, 75, 100];
    for (const milestone of milestones) {
      if (
        progress >= milestone &&
        !goal.milestones.find((m) => m.percentage === milestone).achieved
      ) {
        const milestoneObj = goal.milestones.find(
          (m) => m.percentage === milestone
        );
        milestoneObj.achieved = true;
        milestoneObj.pointsAwarded = 100; // Award 100 points per milestone
        await User.findByIdAndUpdate(req.user.id, { $inc: { points: 100 } });
      }
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a goal
router.delete("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
