import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../Components/ui/table";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from API
    axios.get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div className="p-6 dark:bg-[#1E1E1E] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📊 Expenses</h2>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <TableRow key={index} className="border-b border-gray-700 hover:bg-gray-700">
                <TableCell className="flex items-center gap-2">
                  🔺 {expense.title}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.account}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.time}</TableCell>
                <TableCell>{expense.note}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center py-4">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
