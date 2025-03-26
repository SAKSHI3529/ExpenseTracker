import { useState } from "react";
import axios from "axios";
import { FaCar , FaHome, FaUtensils, FaShoppingCart, FaAward, FaHeartbeat, FaCheckCircle ,FaGift, FaWallet,FaBus } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { PiFilmSlateDuotone, PiStudentFill  } from "react-icons/pi";
import { MdSportsCricket,MdOutlinePhoneIphone  } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";


// ✅ Icon mapping
const iconOptions = {
  FaCar: <FaCar  size={24} />,
    GiClothes: <GiClothes  size={24} />,
    FaHome: <FaHome size={24} />,
    FaUtensils: <FaUtensils size={24} />,
    FaShoppingCart: <FaShoppingCart size={24} />,
    PiFilmSlateDuotone : <PiFilmSlateDuotone  size={24} />,
    FaHeartbeat: <FaHeartbeat size={24} />,
    FaCheckCircle: <FaCheckCircle size={24} />,
    MdSportsCricket:<MdSportsCricket  size={24} />,
    FaWallet :<FaWallet  size={24} />,
    FaAward :<FaAward  size={24} />,
    BiSolidCoupon :<BiSolidCoupon  size={24} />,
    PiStudentFill  :<PiStudentFill  size={24} />,
    FaBus  :<FaBus  size={24} />,
    MdOutlinePhoneIphone:<MdOutlinePhoneIphone  size={24} />,
     FaGift :<FaGift  size={24} />,
};

const AddCategory = ({ onClose, onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    name: "Untitled",
    type: "income", // Default type
    icon: "FaMoneyBill", // Default icon name
  });

  // ✅ Fix handleSubmit to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/categories", formData);
      // console.log("✅ Category Added:", response.data); // Debugging log
      onCategoryAdded(response.data); // ✅ Update UI
      onClose(); // ✅ Close modal
    } catch (error) {
      console.error("❌ Error adding category:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">Add New Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div className="flex justify-between p-2 bg-gray-700 border border-gray-500 rounded-lg">
            <button
              type="button"
              className={`px-4 py-2 ${formData.type === "income" ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setFormData({ ...formData, type: "income" })}
            >
               INCOME
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${formData.type === "expense" ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setFormData({ ...formData, type: "expense" })}
            >
              EXPENSE
            </button>
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-sm text-yellow-500 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-900 text-yellow-500 border border-gray-600 rounded-lg"
              required
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm text-yellow-500 mb-1">Choose Icon</label>
            <div className="grid grid-cols-4 gap-3 p-2 bg-gray-900 border border-gray-600 rounded-lg">
              {Object.keys(iconOptions).map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  className={`p-2 rounded-lg ${formData.icon === iconName ? "bg-yellow-500" : "bg-gray-700"} hover:bg-yellow-500`}
                  onClick={() => setFormData({ ...formData, icon: iconName })} // ✅ Store icon name
                >
                  {iconOptions[iconName]}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600">
              CANCEL
            </button>
            <button type="submit" className="bg-[#E2E2B6] p-2 rounded-lg text-gray-900 font-bold hover:bg-yellow-400">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
