const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");
const mongoose = require("mongoose"); // Add this to use Types.ObjectId

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("User ID from req.user:", userId); // Log the raw userId

    // Convert userId to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    // Category-wise breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { userId: objectIdUserId, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    // Monthly spending trends
    const monthlyTrends = await Transaction.aggregate([
      { $match: { userId: objectIdUserId, type: "expense" } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // console.log("Category Breakdown:", categoryBreakdown); // Log the result
    // console.log("Monthly Trends:", monthlyTrends); // Log the result

    res.json({ categoryBreakdown, monthlyTrends });
  } catch (error) {
    // console.error("Error in insights route:", error); // Log the error
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
