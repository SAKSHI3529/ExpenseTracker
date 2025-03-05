import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../Components/ui/table";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    account: "",
    date: "",
    time: "",
    note: "",
  });

  // Fetch expenses from API
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add / Edit Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        // Update existing expense
        await axios.put(`http://localhost:8080/api/expenses/${editingExpense._id}`, {
          title: formData.title,
          category: formData.category,
          amount: parseFloat(formData.amount), // Convert amount to number
          account: formData.account,
          date: formData.date,
          time: formData.time,
          note: formData.note,
        });
      } else {
        // Add new expense
        await axios.post("http://localhost:8080/api/expenses", formData);
      }
      fetchExpenses(); // Refresh data
      setFormData({ title: "", category: "", amount: "", account: "", date: "", time: "", note: "" });
      setEditingExpense(null);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  // Handle Edit Button
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData(expense);
  };

  // Handle Delete Expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      fetchExpenses(); // Refresh data
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="p-6 dark:bg-[#1E1E1E] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📊 Expenses</h2>

      {/* Expense Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="text" name="account" placeholder="Account" value={formData.account} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required className="p-2 border rounded"/>
          <input type="text" name="note" placeholder="Note" value={formData.note} onChange={handleChange} className="p-2 border rounded"/>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* Expense Table */}
      <Table className="min-w-full dark:bg-[#35343453] rounded-lg">
        <TableHeader className="dark:bg-[#35343453]">
          <TableRow>
            <TableHead className="text-left">📌 Title</TableHead>
            <TableHead className="text-left">📂 Category</TableHead>
            <TableHead className="text-right">💲 Amount</TableHead>
            <TableHead className="text-left">🏦 Account</TableHead>
            <TableHead className="text-left">📅 Date</TableHead>
            <TableHead className="text-left">🕑 Time</TableHead>
            <TableHead className="text-left">📝 Note</TableHead>
            <TableHead className="text-left">✏️ Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <TableRow key={expense._id} className="border-b border-gray-700 hover:bg-gray-700">
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.account}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.time}</TableCell>
                <TableCell>{expense.note}</TableCell>
                <TableCell>
                  <button onClick={() => handleEdit(expense)} className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => handleDelete(expense.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="8" className="text-center py-4">No expenses found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
