import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets"; // Ensure correct import

const iconMap = {
    money: assets.cash_img,
    card: assets.card_img,
    piggy: assets.piggy_bank,
    mastercard: assets.master_card,
    visa: assets.visa_card,
  };

const EditAccount = ({ account, onClose, onUpdateAccount }) => {
  const [formData, setFormData] = useState({
    name: account.name,
    amount: account.amount,
    icon: account.icon,
  });

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/account/${account.id}`,
        formData
      );
      onUpdateAccount(response.data); // ✅ Update UI
      onClose(); // ✅ Close modal after update
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md">
      <div className="bg-gray-800 bg-opacity-40 border border-gray-500 p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">
          Edit Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
              required
            />
          </div>

          {/* Initial Amount */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-2 bg-gray-900 text-yellow-300 border border-gray-600 rounded-lg"
              required
            />
          </div>

          {/* Selected Icon Preview */}
          <div className="flex justify-center items-center gap-2 p-2 bg-gray-700 border border-gray-500 rounded-lg">
            <span className="text-lg text-yellow-400">Selected Icon:</span>
            <img src={formData.icon} alt="Selected Icon" className="w-12 h-12 object-contain" />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm text-yellow-400 mb-1">Choose an Icon</label>
            <div className="flex gap-3 p-2 bg-gray-900 border border-gray-600 rounded-lg">
              {Object.keys(iconMap).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`p-2 rounded-lg transition ${
                    formData.icon === iconMap[key] ? "bg-yellow-500" : "bg-gray-700"
                  } hover:bg-yellow-400`}
                  onClick={() => setFormData({ ...formData, icon: iconMap[key] })}
                >
                  <img src={iconMap[key]} alt={key} className="w-12 h-12 object-contain" />
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

export default EditAccount;
