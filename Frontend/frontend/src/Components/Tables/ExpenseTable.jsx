import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../Components/ui/table";

const ExpenseTable = ({onEdit}) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate(); // React Router navigation

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
                <TableCell>{expense.note || "-- Not Added --"}</TableCell>
                <TableCell>
                  <button
                    onClick={() => onEdit(expense)}
                    className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
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
