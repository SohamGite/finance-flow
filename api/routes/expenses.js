const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Add expense
router.post("/", auth, async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const expense = new Expense({
      userId: req.user.id,
      amount,
      category,
      description,
    });
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all expenses for a user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
