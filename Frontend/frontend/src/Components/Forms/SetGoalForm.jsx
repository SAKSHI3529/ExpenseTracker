import axios from "axios";
import Form from "../ui/Form";

const SetGoalForm = () => {
  const initialFormData = {
    title: "",
    goalAmount: "",
    startDate: new Date().toISOString().split("T")[0], // Auto-fill today's date
    targetDate: "",
    note: "",
  };

  const goalFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
    { name: "goalAmount", label: "Goal Amount", type: "number", placeholder: "Enter Amount" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "targetDate", label: "Target Date", type: "date" },
    { name: "note", label: "Add Note", type: "text", placeholder: "Enter Note (optional)" },
  ];

  const handleGoalSubmit = async (formData) => {
    try {
      const dataToSubmit = {
        ...formData,
        goalAmount: parseFloat(formData.goalAmount), // ✅ Convert to number
      };

      if (isNaN(dataToSubmit.goalAmount) || dataToSubmit.goalAmount <= 0) {
        console.log("Invalid amount. Must be a number greater than zero.");
        return;
      }

      await axios.post("http://localhost:8080/api/goals", dataToSubmit);
      console.log("Goal set successfully!");
    } catch (error) {
      console.log("Failed to set goal.");
    }
  };

  return (
    <Form
      title="Set Goal"
      initialFormData={initialFormData}
      fields={goalFields}
      onSubmit={handleGoalSubmit}
    />
  );
};

export default SetGoalForm;