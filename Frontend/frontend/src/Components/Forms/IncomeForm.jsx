import axios from "axios";
import Form from "../ui/Form";

const IncomeForm = () => {
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
      options: [
        { value: "awards", label: "Awards" },
        { value: "coupons", label: "Coupons" },
        { value: "lottery", label: "Lottery" },
        { value: "refunds", label: "Refunds" },
        { value: "rental", label: "Rental" },
        { value: "salary", label: "Salary" },
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

  const handleIncomeSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        amount: parseFloat(formData.amount), // ✅ Convert to number
      };

      if (isNaN(dataToSubmit.amount) || dataToSubmit.amount <= 0) {
        console.log("Invalid amount. Must be a number greater than zero.");
        return;
      }

      await axios.post("http://localhost:8080/api/income", dataToSubmit);
      console.log("Income added successfully!");
    } catch (error) {
      console.log("Failed to add income.", error);
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
