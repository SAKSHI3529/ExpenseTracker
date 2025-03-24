import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../ui/Alert";

const EditExpenseForm = ({ expense, onClose }) => {
  const [formData, setFormData] = useState(expense || {});
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Automatically hide alert after 10 seconds
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({ show: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

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
      setAlert({ show: true, type: "success", message: "Expense updated successfully!" });
      setTimeout(() => {
        onClose(); // ✅ Closes form after update
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlert({ show: true, type: "error", message: "Failed to update expense." });
    }
  };

  return (
    <>
      <div className="md:ml-64 pl-70 pt-6 w-50px">
        {/* Show Alert if Needed */}
        {alert.show && (
          <Alert
            variant={alert.type} // ✅ Use `variant` instead of `type` if needed
            message={alert.message}
            onClose={() => setAlert({ show: false })}
          />
        )}
      </div>
      <div className="p-6 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="p-4 dark:bg-gray-800 rounded-lg">
          <input type="text" name="title" value={formData.title || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Title"/>
          <input type="text" name="category" value={formData.category || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Category"/>
          <input type="number" name="amount" value={formData.amount || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Amount"/>
          <input type="text" name="account" value={formData.account || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2" placeholder="Account"/>
          <input type="date" name="date" value={formData.date || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2"/>
          <input type="time" name="time" value={formData.time || ""} onChange={handleChange} required className="w-full p-2 border rounded mb-2"/>
          <textarea name="note" value={formData.note || ""} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Note (Optional)"></textarea>
          <button type="submit" className="w-full bg-blue-300 text-white p-2 rounded hover:bg-blue-500">Update Expense</button>
          <button type="button" onClick={onClose} className="w-full bg-gray-300 text-white p-2 rounded mt-2 hover:bg-gray-500">Cancel</button>
        </form>
      </div>
    </>
  );
};

export default EditExpenseForm;
