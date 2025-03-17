import { useState, useEffect } from "react";
import axios from "axios";

const IncomeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    time: "",
    category: "",
    account: "",
    note: "",
  });
     // Auto-fill date & time on load
  useEffect(() => {
    const now = new Date();
    setFormData((prevData) => ({
      ...prevData,
      date: now.toISOString().split("T")[0], // YYYY-MM-DD format
      time: now.toTimeString().split(" ")[0].slice(0, 5), // HH:MM format
    }));
  }, []);

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update specific field dynamically
    });
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formData.title.trim() || !formData.amount.trim() || !formData.date || !formData.time || !formData.category || !formData.account) {
      alert("All fields except 'Note' are required!");
      return false;
    }
    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert("Amount must be a valid number greater than zero!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await axios.post("http://localhost:8080/api/expenses", formData);
      console.log("Expense Added:", response.data);
      alert("Expense added successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0], // Reset with today's date
        time: new Date().toTimeString().split(" ")[0].slice(0, 5), // Reset with current time
        category: "",
        account: "",
        note: "", // Keep note optional
      });
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    }
  };
  return (
    <div className="p-10 bg-white dark:bg-[#1e1e1e8a] shadow-md rounded-lg lg:w-[700px]">
    <h2 className="text-2xl font-bold mb-4 pb-4 text-gray-800 dark:text-white">Add Expense</h2>
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1 ">Title</label>
        <input 
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Amount</label>
        <input 
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount (e.g., 444 or 444.50)"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Date */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Date</label>
        <input 
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
        />
      </div>

      {/* Time */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Time</label>
        <input 
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Category</label>
        <select 
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
        >
           <option value="">Select Category</option>
            <option value="awards">Awards</option>
            <option value="coupons">Coupons</option>
            <option value="lottery">Lottery</option>
            <option value="refunds">Refunds</option>
            <option value="rental">Rental</option>
            <option value="salary">Salary</option>
        </select>
      </div>

      {/* Account Dropdown */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Account</label>
        <select 
          name="account"
          value={formData.account}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
        >
          <option value="">Select Account</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="saving">Saving</option>
          <option value="untitled">Untitled</option>
        </select>
      </div>

      {/* Add Note (Optional) */}
      <div className="flex flex-col mb-4">
        <label className="text-base mb-1">Add Note (Optional)</label>
        <textarea 
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Enter Note (optional)"
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
        Submit
      </button>
    </form>
  </div>
  )
}

export default IncomeForm
