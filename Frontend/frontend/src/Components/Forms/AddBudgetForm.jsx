import { useState } from "react";
import {
  FaCar,
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaAward,
  FaHeartbeat,
  FaGift,
  FaCheckCircle,
  FaWallet,
  FaBus,
} from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { PiFilmSlateDuotone, PiStudentFill } from "react-icons/pi";
import { MdSportsCricket, MdOutlinePhoneIphone } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";
import BudgetCard from "../Tables/BudgetCard";


const iconMap = {
  FaCar: <FaCar size={24} />,
  GiClothes: <GiClothes size={24} />,
  FaHome: <FaHome size={24} />,
  FaUtensils: <FaUtensils size={24} />,
  FaShoppingCart: <FaShoppingCart size={24} />,
  PiFilmSlateDuotone: <PiFilmSlateDuotone size={24} />,
  FaHeartbeat: <FaHeartbeat size={24} />,
  FaCheckCircle: <FaCheckCircle size={24} />,
  MdSportsCricket: <MdSportsCricket size={24} />,
  FaWallet: <FaWallet size={24} />,
  FaAward: <FaAward size={24} />,
  BiSolidCoupon: <BiSolidCoupon size={24} />,
  PiStudentFill: <PiStudentFill size={24} />,
  FaBus: <FaBus size={24} />,
  MdOutlinePhoneIphone: <MdOutlinePhoneIphone size={24} />,
  FaGift: <FaGift size={24} />,
};
const AddBudgetForm = ({ category, onClose, onSaveBudget }) => {
  const [limit, setLimit] = useState("");

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(limit) || limit <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    const budgetData = {
      category: category.name,
      limit: parseFloat(limit),
      month: `${currentMonth}, ${currentYear}`,
    };

    onSaveBudget(budgetData);
    onClose();
  };

//   const handleBudgetSaved = (savedBudget) => {
//     setBudgets((prevBudgets) => [...prevBudgets, savedBudget]); // ✅ Add new budget to state
//   };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">
          Set Budget
        </h2>

        <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
          <img src={category.icon} alt={category.name} className="w-10 h-10 rounded-full" />
          <h3 className="text-lg font-semibold text-yellow-300">{category.name}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Limit</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
              required
              min="1"
            />
          </div>

          <p className="text-gray-400 text-sm">Month: {currentMonth}, {currentYear}</p>

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
              SET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetForm;
