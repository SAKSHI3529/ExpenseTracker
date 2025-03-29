import axios from "axios";
import Form from "../ui/Form";
import { useState } from "react";

const SetGoalForm = ({ fetchGoals }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const initialFormData = {
    title: "",
    targetAmount: "",
    startDate: new Date().toISOString().split("T")[0], // Auto-fill today's date
    targetDate: "",
    note: "",
  };

  const goalFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
    { name: "targetAmount", label: "Goal Amount", type: "number", placeholder: "Enter Amount" }, // ✅ Fixed name
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "targetDate", label: "Target Date", type: "date" },
    { name: "note", label: "Add Note", type: "text", placeholder: "Enter Note (optional)" },
  ];

  const handleGoalSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount), // ✅ Fixed field name
      };

      if (isNaN(dataToSubmit.targetAmount) || dataToSubmit.targetAmount <= 0) {
        setErrorMessage("Invalid amount. Must be greater than zero.");
        return;
      }

      await axios.post("http://localhost:8080/api/goals", dataToSubmit);
      console.log("✅ Goal set successfully!");

      if (fetchGoals) {
        fetchGoals(); // ✅ Refresh the goal list after submission
      }
      
      setErrorMessage(""); // ✅ Clear error message after success
    } catch (error) {
      setErrorMessage("❌ Failed to set goal. Please try again.");
      console.error("❌ Error:", error);
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Form
        title="Set Goal"
        initialFormData={initialFormData}
        fields={goalFields}
        onSubmit={handleGoalSubmit}
      />
    </div>
  );
};

export default SetGoalForm;
