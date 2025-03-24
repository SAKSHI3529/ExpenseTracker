import { useState } from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaPiggyBank,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";
import { assets } from "../../assets/assets";

const iconMap = {
  money: assets.cash_img,
  card: assets.card_img,
  piggy: assets.piggy_bank,
  mastercard: assets.master_card,
  visa: assets.visa_card,
};

const AddAccountForm = ({ onClose, onAddAccount }) => {
  const [formData, setFormData] = useState({
    name: "Untitled",
    amount: 0,
    icon: assets.cash_img,
  });

  // const icons = [
  //   { name:"💵", icon: <FaMoneyBillWave size={28} className="text-gray-200" /> },
  //   { name:"💳", icon: <FaCreditCard size={28} className="text-gray-200" /> },
  //   { name: "", icon: <FaPiggyBank size={28} className="text-gray-200" /> },
  //   { name: "", icon: <FaCcMastercard size={28} className="text-gray-200" /> },
  //   { name: "visa", icon: <FaCcVisa size={28} className="text-gray-200" /> }
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddAccount(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-gray-800 bg-opacity-40 border border-gray-500 p-6 rounded-2xl shadow-xl w-96 backdrop-blur-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">
          Add New Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Initial Amount */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">
              Initial Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full p-2 bg-gray-900 bg-opacity-50 text-yellow-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {/* <p className="text-xs text-gray-400 mt-1">
              *Initial amount will not be reflected in analysis
            </p> */}
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 bg-gray-900 bg-opacity-50 text-yellow-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Icon Selection */}
          {/* <div>
            <label className="block text-sm text-yellow-400 mb-1">Icon</label>
            <div className="flex gap-3 p-2 bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg">
              {icons.map(({ name, icon }) => (
                <button
                  key={name}
                  type="button"
                  className={`p-2 rounded-lg transition ${
                    formData.icon === name ? "bg-yellow-500 text-gray-900" : "bg-gray-700 text-gray-300"
                  } hover:bg-yellow-400`}
                  onClick={() => setFormData({ ...formData, icon: name })}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div> */}

          {/* Selected Image Preview */}
          <div className="flex justify-center items-center gap-2 p-2 bg-gray-700 bg-opacity-50 border border-gray-500 rounded-lg">
            <span className="text-lg text-yellow-400">Selected Image:</span>
            <img
              src={formData.icon}
              alt="Selected Icon"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">
              Choose an Image
            </label>
            <div className="flex gap-3 p-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg">
              {Object.keys(iconMap).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`p-2 rounded-lg transition ${
                    formData.icon === iconMap[key]
                      ? "bg-yellow-500"
                      : "bg-gray-700"
                  } hover:bg-yellow-400`}
                  onClick={() =>
                    setFormData({ ...formData, icon: iconMap[key] })
                  } // ✅ Store image URL
                >
                  <img
                    src={iconMap[key]}
                    alt={key}
                    className="w-12 h-12 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 transition"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-yellow-500 p-2 rounded-lg text-gray-900 font-bold hover:bg-yellow-400 transition"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountForm;
