const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow Vite frontend
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/budget", require("./routes/budget"));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
