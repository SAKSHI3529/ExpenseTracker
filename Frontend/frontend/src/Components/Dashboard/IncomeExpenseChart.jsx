import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend } from "recharts";

const IncomeExpenseChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalData, setTotalData] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Monthly Summary for Line Chart
      const monthlyResponse = await axios.get("http://localhost:8080/api/stats/monthly-summary");
      setMonthlyData(monthlyResponse.data);

      // Fetch Total Income & Expense for Pie Chart
      const totalResponse = await axios.get("http://localhost:8080/api/stats/total");
      setTotalData(totalResponse.data);
    } catch (error) {
      console.error("❌ Error fetching chart data:", error);
    }
  };

  // Colors for Pie Chart
  const COLORS = ["#4CAF50", "#F44336"];

  // Data for Pie Chart
  const pieData = [
    { name: "Income", value: totalData.income },
    { name: "Expense", value: totalData.expense }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Pie Chart - Income vs Expense */}
      <div className="bg-white p-4 rounded-xl shadow-lg w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-center mb-2">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Monthly Income & Expense Trend */}
      <div className="bg-white p-4 rounded-xl shadow-lg w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-center mb-2">Income & Expense Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#F44336" name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
