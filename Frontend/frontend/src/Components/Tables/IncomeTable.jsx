import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../Components/ui/table";
// import EditincomeForm from "./EditincomeForm"; // Import the form
import EditincomeForm from "../EditForms/EditincomeForm";
import EditIncomeForm from "../EditForms/EditIncomeForm";

const IncomeTable = () => {
  const [income, setIncome] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const navigate = useNavigate(); // React Router navigation

  // Fetch incomes from API
  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/income");
      setIncome(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  // Handle Delete income
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/income/${id}`);
      fetchIncome(); // Refresh data
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  // Handle Edit income
  const handleEdit = (income) => {
    setEditingIncome(income);
    setIsEditing(true);
  };

  // Close Edit Form after Updating
  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingIncome(null);
    fetchIncome(); // Refresh data after update
  };

  return (
    <>
      {isEditing ? (
        <EditincomeForm income={editingIncome} onClose={handleCloseEdit} />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:text-gray-800 rounded-lg w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
          <h2 className="text-2xl font-bold mb-4 pb-4 text-gray-800 dark:text-gray-800">
            Overall Income
          </h2>
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
              {income.length > 0 ? (
                income.map((income) => (
                  <TableRow
                    key={income._id}
                    className="border-b hover:bg-gray-200 dark:hover:bg-blue-700"
                  >
                    <TableCell>{income.title}</TableCell>
                    <TableCell>{income.category}</TableCell>
                    <TableCell className="text-right">
                      ₹{income.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{income.account}</TableCell>
                    <TableCell>
                      {new Date(income.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{income.time}</TableCell>
                    <TableCell>{income.note || "-- Not Added --"}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleEdit(income)}
                        className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(income.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center py-4">
                    No incomes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default IncomeTable;
