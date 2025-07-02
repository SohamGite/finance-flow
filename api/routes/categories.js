const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { name, type } = req.body;
  try {
    const category = new Category({ userId: req.user.id, name, type });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
