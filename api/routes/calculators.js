const express = require("express");
const router = express.Router();

// SIP Calculator
router.post("/sip", (req, res) => {
  const { monthlyInvestment, years, annualReturn, inflation } = req.body;
  let nominalAnnualRate = annualReturn / 100;
  let effectiveAnnualRate = nominalAnnualRate;
  if (inflation) {
    const inflationRate = inflation / 100;
    effectiveAnnualRate = (1 + nominalAnnualRate) / (1 + inflationRate) - 1;
  }
  const months = years * 12;
  const monthlyRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1;
  const futureValue =
    monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalInvestment = monthlyInvestment * months;
  res.json({
    totalInvestment,
    futureValue,
    chartData: {
      labels: ["Total Investment", "Returns"],
      data: [totalInvestment, futureValue - totalInvestment],
    },
  });
});

// Lumpsum Calculator
router.post("/lumpsum", (req, res) => {
  const { initialAmount, years, annualReturn, inflation } = req.body;
  let nominalAnnualRate = annualReturn / 100;
  let effectiveAnnualRate = nominalAnnualRate;
  if (inflation) {
    const inflationRate = inflation / 100;
    effectiveAnnualRate = (1 + nominalAnnualRate) / (1 + inflationRate) - 1;
  }
  const futureValue = initialAmount * Math.pow(1 + effectiveAnnualRate, years);
  res.json({
    initialAmount,
    futureValue,
    chartData: {
      labels: ["Initial Investment", "Returns"],
      data: [initialAmount, futureValue - initialAmount],
    },
  });
});

// SWP Calculator
router.post("/swp", (req, res) => {
  const { initialAmount, withdrawalAmount, years, annualReturn, inflation } =
    req.body;
  let nominalAnnualRate = annualReturn / 100;
  let effectiveAnnualRate = nominalAnnualRate;
  if (inflation) {
    const inflationRate = inflation / 100;
    effectiveAnnualRate = (1 + nominalAnnualRate) / (1 + inflationRate) - 1;
  }
  const months = years * 12;
  const monthlyRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1;
  let amount = initialAmount;
  let totalWithdrawals = 0;
  for (let i = 0; i < months && amount > 0; i++) {
    amount *= 1 + monthlyRate;
    if (amount < withdrawalAmount) {
      totalWithdrawals += amount;
      amount = 0;
    } else {
      amount -= withdrawalAmount;
      totalWithdrawals += withdrawalAmount;
    }
  }
  res.json({
    remainingAmount: amount,
    totalWithdrawals,
    chartData: {
      labels: ["Remaining Amount", "Total Withdrawals"],
      data: [amount, totalWithdrawals],
    },
  });
});

// Inflation Calculator (Updated for future worth)
router.post("/inflation", (req, res) => {
  const { currentAmount, inflationRate, years } = req.body;
  const futureWorth = currentAmount / Math.pow(1 + inflationRate / 100, years);
  res.json({
    currentAmount,
    futureWorth,
    chartData: {
      labels: ["Current Value", "Future Worth"],
      data: [currentAmount, futureWorth],
    },
  });
});

module.exports = router;
