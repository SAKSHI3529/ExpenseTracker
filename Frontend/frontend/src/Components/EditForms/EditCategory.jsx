import { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBill, FaHome, FaUtensils, FaShoppingCart, FaFilm, FaHeartbeat, FaCheckCircle } from "react-icons/fa";

// ✅ Icon Mapping
const iconOptions = {
  FaMoneyBill: <FaMoneyBill size={24} />,
  FaHome: <FaHome size={24} />,
  FaUtensils: <FaUtensils size={24} />,
  FaShoppingCart: <FaShoppingCart size={24} />,
  FaFilm: <FaFilm size={24} />,
  FaHeartbeat: <FaHeartbeat size={24} />,
  FaCheckCircle: <FaCheckCircle size={24} />,
};

const EditCategory = ({ category, onClose, onCategoryUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    icon: "",
  });

  // ✅ Load selected category data
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon,
      });
    }
  }, [category]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Icon Selection
  const handleIconSelect = (icon) => {
    setFormData({ ...formData, icon });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/categories/${category.id}`,
        formData
      );
      console.log("✅ Category Updated:", response.data);
      onCategoryUpdated(response.data); // ✅ Update the UI
      onClose(); // ✅ Close modal after update
    } catch (error) {
      console.error("❌ Error updating category:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
              required
            />
          </div>

          {/* Type Selection */}
          <div className="flex justify-between p-2 bg-gray-700 border border-gray-500 rounded-lg">
            <button
              type="button"
              className={`px-4 py-2 ${formData.type === "income" ? "text-yellow-400" : "text-gray-400"}`}
              onClick={() => setFormData({ ...formData, type: "income" })}
            >
              ✓ INCOME
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${formData.type === "expense" ? "text-yellow-400" : "text-gray-400"}`}
              onClick={() => setFormData({ ...formData, type: "expense" })}
            >
              EXPENSE
            </button>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Choose an Icon</label>
            <div className="grid grid-cols-4 gap-3 p-2 bg-gray-900 border border-gray-600 rounded-lg">
              {Object.keys(iconOptions).map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  className={`p-2 rounded-lg ${formData.icon === iconName ? "bg-yellow-500" : "bg-gray-700"} hover:bg-yellow-400`}
                  onClick={() => handleIconSelect(iconName)}
                >
                  {iconOptions[iconName]}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-yellow-500 p-2 rounded-lg text-gray-900 font-bold hover:bg-yellow-400"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
