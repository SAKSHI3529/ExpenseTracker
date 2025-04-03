import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash ,FaWallet} from "react-icons/fa";
import AddBudgetForm from "../Forms/AddBudgetForm";
import ExpenseForm from "../Forms/ExpenseForm"; // ✅ Make sure ExpenseForm is imported

const BudgetCard = ({ title, categories = [], iconMap }) => {
  const [budgets, setBudgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const monthYear = `${currentMonth}, ${currentYear}`;

  // ✅ Fetch Budgets
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/budget");
      const filteredBudgets = response.data.filter((b) => b.month === monthYear);
      setBudgets(filteredBudgets);
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // ✅ Handle Expense Reduction
  const handleExpense = async (category, amount) => {
    try {
      console.log("📤 Sending expense update:", { category, month: monthYear, amount });
  
      const response = await axios.put("http://localhost:8080/api/budget/spent", {
        category,
        month: monthYear,
        amount: parseFloat(amount), // ✅ Ensure amount is a number
      });
  
      console.log("✅ API Response:", response.data);
  
      // ✅ Update UI dynamically
      setBudgets((prevBudgets) =>
        prevBudgets.map((b) =>
          b.category === category ? { ...b, spent: (b.spent || 0) + amount } : b
        )
      );
    } catch (error) {
      console.error("❌ Error updating spent amount:", error.response?.data || error.message);
    }
  };
  

  // ✅ Handle Save Budget
  const handleSaveBudget = async (newBudget) => {
    try {
      const response = await axios.post("http://localhost:8080/api/budget", newBudget);
      setBudgets((prevBudgets) => [...prevBudgets, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("❌ Error saving budget:", error);
    }
  };

  // ✅ Handle Delete Budget
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/budget/${id}`);
      setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("❌ Error deleting budget:", error);
    }
  };

  const budgetedCategories = budgets.map((b) => b.category);
  const unbudgetedCategories = categories.filter((cat) => !budgetedCategories.includes(cat.name));

  return (
    <div className="mb-6">
      <div className="p-4">
        {/* ✅ Budgeted Categories */}
        <h2 className="text-lg font-bold text-yellow-300 mb-3">
          Budgeted Categories: {monthYear}
        </h2>
        <div className="border-b border-gray-600 pb-4 mb-4">
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const spent = budget.spent || 0;
              const remaining = budget.limit - spent;
              const progress = (spent / budget.limit) * 100;

              return (
                <div key={budget.id} className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                    {iconMap[categories.icon] || <FaWallet />}
                    </div>
                    

                    <div>
                      <h3 className="font-semibold">{budget.category}</h3>
                      <p>Limit: ₹{budget.limit.toFixed(2)}</p>
                      <p className={spent > budget.limit ? "text-red-400" : "text-green-400"}>
                        Spent: ₹{spent.toFixed(2)}
                      </p>
                      <p className={remaining >= 0 ? "text-green-400" : "text-red-400"}>
                        Remaining: ₹{remaining.toFixed(2)}
                      </p>

                      {/* ✅ Fixed Progress Bar */}
                      <div className="w-full bg-gray-600 rounded-lg h-2 mt-1">
                        <div
                          className={`h-2 rounded-lg ${remaining >= 0 ? "bg-green-400" : "bg-red-400"}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>

                      {remaining < 0 && <p className="text-red-400 text-sm">*Limit exceeded</p>}
                    </div>
                  </div>

                  {/* Delete Budget */}
                  <FaTrash className="cursor-pointer text-red-400" onClick={() => handleDelete(budget.id)} />
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No budgets set for this month.</p>
          )}
        </div>

        {/* ✅ Unbudgeted Categories */}
        <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
        <div className="border-t border-gray-600"></div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {unbudgetedCategories.length > 0 ? (
            unbudgetedCategories.map((category) => (
              <div key={category.id} className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                    {iconMap[category.icon] || "📁"}
                  </div>
                  <span className="text-base">{category.name}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFormOpen(true);
                  }}
                  className="bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-bold hover:bg-yellow-400"
                >
                  SET BUDGET
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No categories available.</p>
          )}
        </div>
      </div>

      {/* ✅ Expense Form */}
      {/* <ExpenseForm handleExpense={handleExpense} /> */}

      {/* ✅ Budget Form Modal */}
      {isFormOpen && (
        <AddBudgetForm
          category={selectedCategory}
          onClose={() => setIsFormOpen(false)}
          onSaveBudget={handleSaveBudget}
          iconMap={iconMap}
        />
      )}
    </div>
  );
};

export default BudgetCard;
