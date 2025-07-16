import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import api from "../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Calculators = () => {
  const [calculatorType, setCalculatorType] = useState("sip");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTypeChange = (type) => {
    setCalculatorType(type);
    setFormData({});
    setResult(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || "",
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCalculate = async () => {
    const newErrors = {};
    if (calculatorType === "sip") {
      if (!formData.monthlyInvestment) newErrors.monthlyInvestment = "Required";
      if (!formData.years) newErrors.years = "Required";
      if (!formData.annualReturn) newErrors.annualReturn = "Required";
    } else if (calculatorType === "lumpsum") {
      if (!formData.initialAmount) newErrors.initialAmount = "Required";
      if (!formData.years) newErrors.years = "Required";
      if (!formData.annualReturn) newErrors.annualReturn = "Required";
    } else if (calculatorType === "swp") {
      if (!formData.initialAmount) newErrors.initialAmount = "Required";
      if (!formData.withdrawalAmount) newErrors.withdrawalAmount = "Required";
      if (!formData.years) newErrors.years = "Required";
      if (!formData.annualReturn) newErrors.annualReturn = "Required";
    } else if (calculatorType === "inflation") {
      if (!formData.currentAmount) newErrors.currentAmount = "Required";
      if (!formData.inflationRate) newErrors.inflationRate = "Required";
      if (!formData.years) newErrors.years = "Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const res = await api.post(`/calculators/${calculatorType}`, formData);
      setResult(res.data);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    const commonStyles = "text-sm font-medium text-gray-700";
    const inputStyles = "w-full p-2 bg-gray-100 text-gray-900 border rounded";

    switch (calculatorType) {
      case "sip":
        return (
          <div className="space-y-6">
            <div>
              <label className={commonStyles}>Monthly Investment (₹)</label>
              <div className="text-lg font-semibold text-gray-900">
                ₹{formData.monthlyInvestment || 5000}
              </div>
              <Slider
                min={1000}
                max={100000}
                step={500}
                value={formData.monthlyInvestment || 5000}
                onChange={(value) =>
                  handleSliderChange("monthlyInvestment", value)
                }
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
              {errors.monthlyInvestment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.monthlyInvestment}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Time Period (Years)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.years || 5} Yrs
              </div>
              <Slider
                min={1}
                max={30}
                step={1}
                value={formData.years || 5}
                onChange={(value) => handleSliderChange("years", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Annual Return (%)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.annualReturn || 12}%
              </div>
              <Slider
                min={8}
                max={30}
                step={0.5}
                value={formData.annualReturn || 12}
                onChange={(value) => handleSliderChange("annualReturn", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>8%</span>
                <span>30%</span>
              </div>
              {errors.annualReturn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.annualReturn}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Inflation (%) (Optional)</label>
              <input
                type="number"
                name="inflation"
                value={formData.inflation || ""}
                placeholder="Inflation (%)"
                onChange={handleInputChange}
                className={inputStyles}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setFormData({});
                  setResult(null);
                  setErrors({});
                }}
                className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        );
      case "lumpsum":
        return (
          <div className="space-y-6">
            <div>
              <label className={commonStyles}>Initial Amount (₹)</label>
              <div className="text-lg font-semibold text-gray-900">
                ₹{formData.initialAmount || 10000}
              </div>
              <Slider
                min={1000}
                max={1000000}
                step={1000}
                value={formData.initialAmount || 10000}
                onChange={(value) => handleSliderChange("initialAmount", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹1,000</span>
                <span>₹10,00,000</span>
              </div>
              {errors.initialAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.initialAmount}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Time Period (Years)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.years || 5} Yrs
              </div>
              <Slider
                min={1}
                max={30}
                step={1}
                value={formData.years || 5}
                onChange={(value) => handleSliderChange("years", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Annual Return (%)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.annualReturn || 12}%
              </div>
              <Slider
                min={8}
                max={30}
                step={0.5}
                value={formData.annualReturn || 12}
                onChange={(value) => handleSliderChange("annualReturn", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>8%</span>
                <span>30%</span>
              </div>
              {errors.annualReturn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.annualReturn}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Inflation (%) (Optional)</label>
              <input
                type="number"
                name="inflation"
                value={formData.inflation || ""}
                placeholder="Inflation (%)"
                onChange={handleInputChange}
                className={inputStyles}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setFormData({});
                  setResult(null);
                  setErrors({});
                }}
                className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        );
      case "swp":
        return (
          <div className="space-y-6">
            <div>
              <label className={commonStyles}>Initial Amount (₹)</label>
              <div className="text-lg font-semibold text-gray-900">
                ₹{formData.initialAmount || 10000}
              </div>
              <Slider
                min={1000}
                max={1000000}
                step={1000}
                value={formData.initialAmount || 10000}
                onChange={(value) => handleSliderChange("initialAmount", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹1,000</span>
                <span>₹10,00,000</span>
              </div>
              {errors.initialAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.initialAmount}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Monthly Withdrawal (₹)</label>
              <div className="text-lg font-semibold text-gray-900">
                ₹{formData.withdrawalAmount || 5000}
              </div>
              <Slider
                min={1000}
                max={50000}
                step={500}
                value={formData.withdrawalAmount || 5000}
                onChange={(value) =>
                  handleSliderChange("withdrawalAmount", value)
                }
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹1,000</span>
                <span>₹50,000</span>
              </div>
              {errors.withdrawalAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.withdrawalAmount}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Time Period (Years)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.years || 5} Yrs
              </div>
              <Slider
                min={1}
                max={30}
                step={1}
                value={formData.years || 5}
                onChange={(value) => handleSliderChange("years", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Annual Return (%)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.annualReturn || 12}%
              </div>
              <Slider
                min={8}
                max={30}
                step={0.5}
                value={formData.annualReturn || 12}
                onChange={(value) => handleSliderChange("annualReturn", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>8%</span>
                <span>30%</span>
              </div>
              {errors.annualReturn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.annualReturn}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Inflation (%) (Optional)</label>
              <input
                type="number"
                name="inflation"
                value={formData.inflation || ""}
                placeholder="Inflation (%)"
                onChange={handleInputChange}
                className={inputStyles}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setFormData({});
                  setResult(null);
                  setErrors({});
                }}
                className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        );
      case "inflation":
        return (
          <div className="space-y-6">
            <div>
              <label className={commonStyles}>Current Amount (₹)</label>
              <div className="text-lg font-semibold text-gray-900">
                ₹{formData.currentAmount || 10000}
              </div>
              <Slider
                min={100000}
                max={10000000}
                step={10000}
                value={formData.currentAmount || 10000}
                onChange={(value) => handleSliderChange("currentAmount", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹1,00,000</span>
                <span>₹1,00,00,000</span>
              </div>
              {errors.currentAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentAmount}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Inflation Rate (%)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.inflationRate || 5}%
              </div>
              <Slider
                min={0}
                max={15}
                step={0.5}
                value={formData.inflationRate || 5}
                onChange={(value) => handleSliderChange("inflationRate", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>15%</span>
              </div>
              {errors.inflationRate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.inflationRate}
                </p>
              )}
            </div>
            <div>
              <label className={commonStyles}>Time Period (Years)</label>
              <div className="text-lg font-semibold text-gray-900">
                {formData.years || 5} Yrs
              </div>
              <Slider
                min={1}
                max={30}
                step={1}
                value={formData.years || 5}
                onChange={(value) => handleSliderChange("years", value)}
                trackStyle={{ backgroundColor: "#4F46E5", height: 8 }}
                handleStyle={{
                  borderColor: "#4F46E5",
                  backgroundColor: "#fff",
                  height: 20,
                  width: 20,
                }}
                railStyle={{ backgroundColor: "#E5E7EB", height: 8 }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
              {errors.years && (
                <p className="text-red-500 text-sm mt-1">{errors.years}</p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setFormData({});
                  setResult(null);
                  setErrors({});
                }}
                className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-gray-600 mt-2">Calculating...</p>
        </div>
      );
    }
    if (!result) return null;

    const pieData = {
      labels: result.chartData.labels,
      datasets: [
        {
          data: result.chartData.data,
          backgroundColor: ["#FF6B6B", "#4F46E5"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
    const pieOptions = {
      responsive: true,
      plugins: {
        legend: { position: "right", labels: { color: "#374151" } },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ₹${context.raw.toFixed(2)}`,
          },
        },
      },
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Results</h3>
        {calculatorType === "sip" && (
          <>
            <p className="text-lg text-gray-700">
              The total value of your investment after {formData.years} Years
              will be
            </p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{result.futureValue.toFixed(2)}
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </>
        )}
        {calculatorType === "lumpsum" && (
          <>
            <p className="text-lg text-gray-700">
              The total value of your investment after {formData.years} Years
              will be
            </p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{result.futureValue.toFixed(2)}
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </>
        )}
        {calculatorType === "swp" && (
          <>
            <p className="text-lg text-gray-700">
              Remaining Amount after {formData.years} Years
            </p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{result.remainingAmount.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Total Withdrawals: ₹{result.totalWithdrawals.toFixed(2)}
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </>
        )}
        {calculatorType === "inflation" && (
          <>
            <p className="text-lg text-gray-700">
              The future worth of your amount after {formData.years} Years will
              be
            </p>
            <p className="text-3xl font-bold text-gray-900">
              ₹{result.futureWorth.toFixed(2)}
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Estimation is based on past performance.
        </p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-white">
            Investment Calculators
          </h2>
          <p className="mt-2 text-white/80">Plan your investments with ease</p>
        </div>
        <div className="flex space-x-4 mb-6">
          {["SIP", "Lumpsum", "SWP", "Inflation"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type.toLowerCase())}
              className={`pb-2 text-lg font-medium ${
                calculatorType === type.toLowerCase()
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              {type} Calculator
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            {renderForm()}
          </div>
          <div>{renderResult()}</div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
