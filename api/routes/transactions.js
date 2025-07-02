const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction"); // Transaction model
const authMiddleware = require("../middleware/auth"); // JWT middleware

// Add transaction
router.post("/", authMiddleware, async (req, res) => {
  const { type, category, amount, description } = req.body;
  try {
    const transaction = new Transaction({
      userId: req.user.id,
      type,
      category,
      amount,
      description,
    });
    await transaction.save();
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: 10 } });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
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
