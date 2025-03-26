import axios from "axios";
import Form from "../ui/Form";
import { useState, useEffect } from "react";

const IncomeForm = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      fetchAccounts();
      fetchCategories(); 
    }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account"); // Adjust API URL if needed
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

      // ✅ Fetch Expense Categories from DB
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/categories");
          // ✅ Filter only expense categories
          const expenseCategories = response.data.filter(cat => cat.type === "income");
          setCategories(expenseCategories);
        } catch (error) {
          console.error("❌ Error fetching categories:", error);
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

  const incomeFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
    { name: "amount", label: "Amount", type: "number", placeholder: "Enter Amount" },
    { name: "date", label: "Date", type: "date" },
    { name: "time", label: "Time", type: "time" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories.length > 0
      ? categories.map((category) => ({
          value: category.id, // ✅ Use category ID as value
          label: category.name, // ✅ Display category name
        }))
      : [{ value: "", label: "No categories added" }], // ✅ Show message if no categories exist
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

  const handleIncomeSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        amount: parseFloat(formData.amount),
      };
  
      if (isNaN(dataToSubmit.amount) || dataToSubmit.amount <= 0) {
        console.log("Invalid amount. Must be greater than zero.");
        return;
      }
  
      const response = await axios.post("http://localhost:8080/api/income", dataToSubmit);
      
      console.log(response.data);
    } catch (error) {
      console.log("Failed to add income.");
    }
  };

  return (
    <Form
      title="Add Income"
      initialFormData={initialFormData}
      fields={incomeFields}
      onSubmit={handleIncomeSubmit}
    />
  );
};

export default IncomeForm;
