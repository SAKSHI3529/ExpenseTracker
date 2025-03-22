import axios from "axios";
// import ReusableForm from "../components/ReusableForm";
import Form from "../ui/Form";

const ExpenseForm = () => {
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
      options: [
        { value: "cash", label: "Cash" },
        { value: "card", label: "Card" },
        { value: "saving", label: "Saving" },
        { value: "untitled", label: "Untitled" },
      ],
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