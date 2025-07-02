const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/suggestions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
User has an annual income of ₹${
      totalIncome * 12
    } and monthly expenses of ₹${totalExpenses}.
Provide budget allocation using the 50-30-20 rule or similar model.
Respond with:

1. Budget allocation (as bullet points or a markdown table).
2. Specific, actionable spending tips (in a numbered or bulleted list).
3. Format the response with clear sections and markdown-like formatting.
`;
    // const prompt = `User has an annual income of ₹${
    //   totalIncome * 12
    // }. Monthly expenses are ₹${totalExpenses}. Suggest a budget allocation (e.g., 50-30-20 rule) and specific tips to optimize spending.`;
    const result = await model.generateContent(prompt);
    res.json({ suggestions: result.response.text() });
  } catch (error) {
    // console.error("Budget suggestions error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});
router.post("/advisor", authMiddleware, async (req, res) => {
  const { query } = req.body;
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `User has an annual income of ₹${
      totalIncome * 12
    }, monthly expenses of ₹${totalExpenses}. They asked: "${query}". Provide a concise financial recommendation.`;
    const result = await model.generateContent(prompt);
    res.json({ advice: result.response.text() });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
