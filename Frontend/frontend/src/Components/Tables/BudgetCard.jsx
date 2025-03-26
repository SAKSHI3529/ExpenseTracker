import { useState, useEffect } from "react";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import AddBudgetForm from "../Forms/AddBudgetForm";

const BudgetCard = ({
  title,
  categories = [],
  setCategories = [],
  iconMap,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [budgets, setBudgets] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const monthYear = `${currentMonth}, ${currentYear}`;

  useEffect(() => {
    // Function to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownOpen !== null &&
        !event.target.closest(".dropdown-container")
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Handle Delete account
  const handleDelete = async (id) => {
    try {
      console.log("🗑 Attempting to delete category with ID:", id); // ✅ Debugging log

      const response = await axios.delete(
        `http://localhost:8080/api/categories/${id}`
      );
      console.log("✅ Category deleted successfully:", response.data); // ✅ Log success response

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      ); // ✅ Update UI
    } catch (error) {
      console.error("❌ Error deleting category:", error);
    }
  };

  // ✅ Open Edit Form
  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setIsEditing(true);
  };

  // ✅ Handle Budget Update
  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/budget/${updatedBudget.id}`,
        updatedBudget
      );

      // ✅ Update State
      setBudgets((prevBudgets) =>
        prevBudgets.map((b) => (b.id === updatedBudget.id ? response.data : b))
      );

      setIsEditing(false); // Close form
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/budget");

      // ✅ Filter budgets for the current month
      const filteredBudgets = response.data.filter(
        (b) => b.month === monthYear
      );

      setBudgets(filteredBudgets);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
    // fetchCategories();
  }, []);

  useEffect(() => {
    console.log("🔍 Budget Data:", budgets);
  }, [budgets]);
  

  const handleSaveBudget = async (newBudget) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/budget",
        newBudget
      );

      // ✅ Update the state with the newly added budget (to show immediately)
      setBudgets((prevBudgets) => [...prevBudgets, response.data]);

      setIsFormOpen(false); // Close the form
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  const budgetedCategories = budgets.map((b) => b.category);
  const unbudgetedCategories = categories.filter(
    (cat) => !budgetedCategories.includes(cat.name)
  );

  return (
    <>
      <div className="mb-6">
        <div className="p-4">
          <h2 className="text-lg font-bold text-yellow-300 mb-3">
            Budgeted categories: {monthYear}
          </h2>
          <div className="border-b border-gray-600 pb-4 mb-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                const spent = budget.spent || 0;
                const remaining = budget.limit - spent;
                return (
                  <div
                    key={budget.id}
                    className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                        {iconMap[budget.icon] || "📁"}
                      </div>
                      <div>
                        <h3 className="font-semibold">{budget.category}</h3>
                        <p>Limit: ₹{budget.limit.toFixed(2)}</p>
                        <p
                          className={
                            spent > budget.limit
                              ? "text-red-400"
                              : "text-green-400"
                          }
                        >
                          Spent: ₹{spent.toFixed(2)}
                        </p>
                        <p
                          className={
                            remaining >= 0 ? "text-green-400" : "text-red-400"
                          }
                        >
                          Remaining: ₹{remaining.toFixed(2)}
                        </p>
                        <div className="w-full bg-gray-600 rounded-lg h-2 mt-1">
                          <div
                            className={`h-2 rounded-lg ${
                              remaining >= 0 ? "bg-green-400" : "bg-red-400"
                            }`}
                            style={{
                              width: `${
                                budget.limit > 0
                                  ? Math.min((spent / budget.limit) * 100, 100)
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>

                        {remaining < 0 && (
                          <p className="text-red-400 text-sm">
                            *Limit exceeded
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditBudget(budget)}
                      className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-400"
                    >
                      EDIT
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">No budgets set for this month.</p>
            )}
          </div>

          <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
          <div className="border-t border-gray-600"></div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {Array.isArray(categories) && categories.length > 0 ? (
              unbudgetedCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                      {iconMap[category.icon] || "📁"}{" "}
                      {/* ✅ Convert stored icon name into actual icon */}
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

                  {/* <div className="relative dropdown-container">
                  <FaEllipsisH
                    size={20}
                    className="text-gray-400 cursor-pointer"
                    onClick={() => toggleDropdown(category.id)}
                  />
                  {dropdownOpen === category.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg z-50 p-2"> */}
                  {/* <button
                             onClick={() => handleEdit(category)}
                             className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                           >
                             Edit
                           </button> */}
                  {/* ✅ Fix: Pass `id` correctly in delete function */}
                  {/* <button
                        onClick={() => handleDelete(category.id)}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div> */}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No categories added</p>
            )}
          </div>
        </div>

        {isFormOpen && selectedCategory && (
          <AddBudgetForm
            category={selectedCategory}
            onClose={() => setIsFormOpen(false)}
            onSaveBudget={handleSaveBudget}
            onUpdateBudget={handleUpdateBudget}
          />
        )}
      </div>
    </>
  );
};

export default BudgetCard;
