import { useState } from "react";

const EditBudgetForm = ({ budget, onClose, onUpdateBudget }) => {
  const [limit, setLimit] = useState(budget.limit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(limit) || limit <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    const updatedBudget = { ...budget, limit: parseFloat(limit) };
    onUpdateBudget(updatedBudget);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">Edit Budget</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

export default EditBudgetForm;
