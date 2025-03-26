import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";

const Main = () => {
  const [monthlySummary, setMonthlySummary] = useState([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get("http://localhost:8080/api/income"),  // ✅ Fetch all income
        axios.get("http://localhost:8080/api/expenses"), // ✅ Fetch all expenses
      ]);

      console.log("✅ Income API Response:", incomeRes.data); // Debugging income data
      console.log("✅ Expense API Response:", expenseRes.data); // Debugging expense data

      const transactions = [
        ...incomeRes.data.map(item => ({ ...item, type: "income" })), // Ensure type is set
        ...expenseRes.data.map(item => ({ ...item, type: "expense" })),
      ];
  
      console.log("✅ Merged Transactions:", transactions);

      const summaryByMonth = transactions.reduce((acc, transaction) => {
        
        if (!transaction.date) {
          console.warn("⚠️ Skipping transaction due to missing date:", transaction);
          return acc;
        }
        
        const date = new Date(transaction.date);
        const monthKey = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;

        if (!acc[monthKey]) {
          acc[monthKey] = { income: 0, expenses: 0 };
        }

        if (transaction.type === "income") {
          acc[monthKey].income += transaction.amount;
        } else {
          acc[monthKey].expenses += transaction.amount;
        }

        return acc;
      }, {});

      console.log("✅ Final Monthly Summary:", summaryByMonth);

      // ✅ Convert to array format
      const summaryArray = Object.entries(summaryByMonth).map(([month, data]) => ({
        month,
        ...data,
      }));

      setMonthlySummary(summaryArray);
    } catch (error) {
      console.error("❌ Error fetching summary:", error);
    }
  };

  return (
    <div className="p-6">
      <main className="flex-1 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-yellow-400" />
          Monthly Summary
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {monthlySummary.length > 0 ? (
            monthlySummary.map((data, index) => (
              <div
                key={index}
                className="bg-[#2A2A2A] dark:bg-[#FFFFFF] p-4 rounded-lg shadow-lg rounded-2xl border border-gray-200 p-5 dark:border-gray-800 md:p-6"
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">{data.month}</h3>
                <p>Income: ₹{data.income.toFixed(2)}</p>
                <p>Expenses: ₹{data.expenses.toFixed(2)}</p>
                <p>Net: ₹{(data.income - data.expenses).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
