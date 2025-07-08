const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const User = require("../models/User"); // Add this line
const authMiddleware = require("../middleware/auth");

// Add transaction
router.post("/", authMiddleware, async (req, res) => {
  const { type, category, amount, description } = req.body;
  try {
    // Validate input
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ msg: "Invalid transaction type" });
    }
    if (!category) {
      return res.status(400).json({ msg: "Category is required" });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ msg: "Amount must be a positive number" });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      type,
      category,
      amount,
      description,
    });
    await transaction.save();
    try {
      await User.findByIdAndUpdate(req.user.id, { $inc: { points: 10 } });
    } catch (pointError) {
      console.error("Failed to update points:", pointError);
    }
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Transaction POST error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});
// Get user transactions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { month } = req.query; // e.g., "2025-06"
    const query = { userId: req.user.id };
    if (month) {
      const [year, monthNum] = month.split("-");
      const start = new Date(year, monthNum - 1, 1);
      const end = new Date(year, monthNum, 0);
      query.date = { $gte: start, $lte: end };
    }
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
