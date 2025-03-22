import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../Components/ui/table";
// import EditExpenseForm from "./EditExpenseForm"; // Import the form
import EditExpenseForm from "../Forms/EditExpenseForm";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
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

  // Handle Edit Expense
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsEditing(true);
  };

  // Close Edit Form after Updating
  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingExpense(null);
    fetchExpenses(); // Refresh data after update
  };

  return (
    <>
      {isEditing ? (
        <EditExpenseForm expense={editingExpense} onClose={handleCloseEdit} />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:text-gray-800 rounded-lg w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
          <h2 className="text-2xl font-bold mb-4 pb-4 text-gray-800 dark:text-gray-800">Expense</h2>
          <Table className="w-full text-sm text-left rtl:text-right">
            <TableHeader className="dark:bg-[#ffff] text-xs text-gray-700 uppercase bg-gray-50 dark:text-[#ffff]">
              <TableRow className="hover:bg-gray-200 dark:hover:bg-blue-700">
                <TableHead className="text-left">Title</TableHead>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-left">Account</TableHead>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-left">Time</TableHead>
                <TableHead className="text-left">Note</TableHead>
                <TableHead className="text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <TableRow key={expense._id} className="border-b hover:bg-gray-200 dark:hover:bg-blue-700">
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{expense.account}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.time}</TableCell>
                    <TableCell>{expense.note || "-- Not Added --"}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleEdit(expense)}
                        className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
      )}
    </>
  );
};

export default ExpenseTable;
