import { useState, useEffect } from "react";
import axios from "axios";

const EditExpenseForm = ({ expense, onClose }) => {
  const [formData, setFormData] = useState(expense || {});

  // Update formData when expense changes
  useEffect(() => {
    if (expense) {
      setFormData(expense);
    }
  }, [expense]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/expenses/${expense.id}`, formData);
      alert("Expense updated successfully!");
      onClose(); // Close edit form and go back to table
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="p-6 dark:bg-[#1E1E1E] text-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Expense</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
        <input type="text" name="title" value={formData.title || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Title"/>
        <input type="text" name="category" value={formData.category || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Category"/>
        <input type="number" name="amount" value={formData.amount || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Amount"/>
        <input type="text" name="account" value={formData.account || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Account"/>
        <input type="date" name="date" value={formData.date || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2"/>
        <input type="time" name="time" value={formData.time || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2"/>
        <textarea name="note" value={formData.note || ""} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Note (Optional)"></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Expense</button>
        <button type="button" onClick={onClose} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel</button>
      </form>
    </div>
  );
};

export default EditExpenseForm;
