import axios from "axios";
// import ReusableForm from "../components/ReusableForm";
import Form from "../ui/Form";
import { useState, useEffect } from "react";
import Alert from "../ui/Alert";

const ExpenseForm = ({ handleExpense }) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [alertMessage, setAlertMessage] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [transcations, setTransactions] = useState([]);
  

  useEffect(() => {
      fetchAccounts();
      fetchCategories(); 
      fetchTransactions();
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
        const expenseCategories = response.data.filter(cat => cat.type === "expense");
        setCategories(expenseCategories);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        // ✅ Fetch Expenses
        const expenseResponse = await axios.get("http://localhost:8080/api/expenses");
    
        // ✅ Fetch Incomes
        const incomeResponse = await axios.get("http://localhost:8080/api/incomes");
    
        
    // ✅ Fetch Categories & Accounts to replace IDs
    const categoryResponse = await axios.get("http://localhost:8080/api/categories");
    const accountResponse = await axios.get("http://localhost:8080/api/account");


    const categoryMap = categoryResponse.data.reduce((map, cat) => {
      map[cat.id] = cat.name;
      return map;
    }, {});

    const accountMap = accountResponse.data.reduce((map, acc) => {
      map[acc.id] = acc.name;
      return map;
    }, {});
        // ✅ Merge Expenses & Incomes as Transactions
        const transactions = [
          ...expenseResponse.data.map((expense) => ({
            ...expense,
            type: "expense",
          })),
          ...incomeResponse.data.map((income) => ({
            ...income,
            type: "income",
          })),
        ];
    
        // ✅ Sort transactions by date & time (NEW to OLD)
        transactions.sort(
          (a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
        );
    
        console.log("✅ Transactions:", transactions);
        setTransactions(transactions);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
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
          label: account.name  ,
          amt:(account.amount)
          // label: account.amount , // ✅ Display account name
        }))
      : [{ value: "", label: "No accounts added" }], // ✅ Show message if no accounts exist
  },
    { name: "note", label: "Note (Optional)", type: "text", placeholder: "Enter Note (optional)" },
  ];

  // const handleExpenseSubmit = async (formData) => {
  //   try {
  //     const dataToSubmit = {
  //       ...formData,
  //       amount: parseFloat(formData.amount), // ✅ Convert to number
  //     };

  //     if (isNaN(dataToSubmit.amount) || dataToSubmit.amount <= 0) {
  //       console.log("Invalid amount. Must be a number greater than zero.");
  //       return;
  //     }

  //     await axios.post("http://localhost:8080/api/expenses", dataToSubmit);
  //     console.log("Expense added successfully!");
  //   } catch (error) {
  //     console.log("Failed to add expense.");
  //   }
  // };

  const handleExpenseSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        amount: parseFloat(formData.amount),
        account: formData.account,
        title: formData.title.trim(),
        category: formData.category, 
        // amount: parseFloat(formData.amount),
        date: formData.date,
        time: formData.time,
        categoryId: formData.category,  // ✅ Ensure correct field name
        accountId: formData.account,   // ✅ Ensure correct field name
        note: formData.note?.trim() || "", // ✅ Optional but handled
        type: "expense", // ✅ Ensure the type is correctly set

      };
  
      // await axios.post("http://localhost:8080/api/expenses", dataToSubmit);
      // console.log("✅ Expense added successfully!");
  
      // ✅ Show Success Alert
      // setAlert({ show: true, type: "success", message: "✅ Expense added successfully!" });
  
      // ✅ Hide Alert After 3s
      // setTimeout(() => setAlert({ show: false }), 3000);

      if (!dataToSubmit.title || isNaN(dataToSubmit.amount) || dataToSubmit.amount <= 0 || 
      !dataToSubmit.date || !dataToSubmit.time || !dataToSubmit.categoryId || !dataToSubmit.accountId) {
    console.error("❌ Missing required fields!", dataToSubmit);
    setAlert({ show: true, type: "error", message: "Please fill in all required fields." });
    return;
  }
  
  console.log("📤 Sending Expense Data:", dataToSubmit);
      const response = await axios.post("http://localhost:8080/api/expenses", dataToSubmit);
      console.log("✅ Expense added successfully!");
       // ✅ Refresh Transactions Immediately
       await fetchTransactions();
       if (handleExpense) {
        handleExpense(formData.category, dataToSubmit.amount);
      } else {
        console.error("❌ handleExpense is not defined!");
      }
      console.log(response.data);
      
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data;
  
        // ✅ Extract Available & Required Balance from error message
        let availableBalance = "";
        let requiredBalance = "";
        const matches = errorMessage.match(/Available: ₹([\d.]+), Required: ₹([\d.]+)/);
        if (matches) {
          availableBalance = matches[1];
          requiredBalance = matches[2];
        }
  
        // ✅ Show Alert
        setAlert({
          show: true,
          type: "error",
          message: matches
            ? `❌ Insufficient Balance! Available: ₹${availableBalance}, Required: ₹${requiredBalance}`
            : errorMessage, // If no match, show the original error message
        });
      } else {
        console.error("❌ Failed to add expense:", error.message);
        setAlert({ show: true, type: "error", message: "❌ Server error. Try again later." });
      }
    }
  };
  
  
  
  

  return (
    <>
    {alert.show && <Alert type={alert.type} message={alert.message} />}
    <Form
      title="Add Expense"
      initialFormData={initialFormData}
      fields={expenseFields}
      onSubmit={handleExpenseSubmit}
    />
    </>
  );
};

export default ExpenseForm;