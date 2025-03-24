import axios from "axios";
// import ReusableForm from "../components/ReusableForm";
import Form from "../ui/Form";
import { useState, useEffect } from "react";

const ExpenseForm = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
      fetchAccounts();
    }, []);
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account"); // Adjust API URL if needed
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const initialFormData = {
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Auto-fill today's date
    time: new Date().toTimeString().split(" ")[0].slice(0, 5), // Auto-fill current time
    category: "",
    account: "",
    note: "",
  };

  const expenseFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
    { name: "amount", label: "Amount", type: "number", placeholder: "Enter Amount" },
    { name: "date", label: "Date", type: "date" },
    { name: "time", label: "Time", type: "time" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "food", label: "Food" },
        { value: "transport", label: "Transport" },
        { value: "shopping", label: "Shopping" },
        { value: "bills", label: "Bills" },
        { value: "entertainment", label: "Entertainment" },
      ],
    },
    {
      name: "account",
      label: "Account",
      type: "select",
      options: accounts.length > 0
      ? accounts.map((account) => ({
          value: account.id, // ✅ Use account ID as value
          label: account.name, // ✅ Display account name
        }))
      : [{ value: "", label: "No accounts added" }], // ✅ Show message if no accounts exist
  },
    { name: "note", label: "Note (Optional)", type: "text", placeholder: "Enter Note (optional)" },
  ];

  const handleExpenseSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        amount: parseFloat(formData.amount), // ✅ Convert to number
      };

      if (isNaN(dataToSubmit.amount) || dataToSubmit.amount <= 0) {
        console.log("Invalid amount. Must be a number greater than zero.");
        return;
      }

      await axios.post("http://localhost:8080/api/expenses", dataToSubmit);
      console.log("Expense added successfully!");
    } catch (error) {
      console.log("Failed to add expense.");
    }
  };

  return (
    <Form
      title="Add Expense"
      initialFormData={initialFormData}
      fields={expenseFields}
      onSubmit={handleExpenseSubmit}
    />
  );
};

export default ExpenseForm;