import React, { useState } from "react";
import { FaHome, FaCar, FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import additional icons
import { format, differenceInDays } from "date-fns";
import axios from "axios";
import { GoGoal } from "react-icons/go";

const GoalCard = ({ goal, fetchGoals }) => {
  const { id, title, savedAmount, targetAmount, startDate, targetDate } = goal;
  const [newSavings, setNewSavings] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedTarget, setUpdatedTarget] = useState(targetAmount);

  // Choose an icon based on title
  const getIcon = () => {
    if (title.toLowerCase().includes("real estate")) return <FaHome className="text-2xl" />;
    if (title.toLowerCase().includes("car")) return <FaCar className="text-2xl" />;
    return <GoGoal className="text-2xl" />; // Default icon
  };

  // Calculate days left
  const daysLeft = differenceInDays(new Date(targetDate), new Date());

  // Progress percentage
  const progress = (savedAmount / targetAmount) * 100;

  // Dynamic color change based on progress
  const getProgressColor = () => {
    if (progress < 50) return "bg-red-500";
    if (progress < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Update savings
  const addSavings = async () => {
    try {
      await axios.put(`http://localhost:8080/api/goals/${id}/save?amount=${newSavings}`);
      setNewSavings("");
      fetchGoals();
    } catch (error) {
      console.error("Error updating savings:", error);
    }
  };

  // Delete goal
  const deleteGoal = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  // Edit goal
  const editGoal = async () => {
    try {
      await axios.put(`http://localhost:8080/api/goals/${id}`, {
        title: updatedTitle,
        targetAmount: parseFloat(updatedTarget),
      });
      setEditing(false);
      fetchGoals();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-72">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          {getIcon()}
          {editing ? (
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="bg-gray-800 text-white px-2 py-1 rounded"
            />
          ) : (
            <span>{title}</span>
          )}
        </div>
        <div className="flex gap-2">
          <FaEdit className="cursor-pointer text-blue-400" onClick={() => setEditing(!editing)} />
          <FaTrash className="cursor-pointer text-red-400" onClick={deleteGoal} />
        </div>
      </div>

      {/* Saved & Target Amount */}
      <p className="text-xl font-bold mt-2">₹{savedAmount.toFixed(2)}</p>

      {/* Days Left */}
      <p className={`text-md font-semibold ${daysLeft < 0 ? "text-red-500" : "text-yellow-400"}`}>
        {daysLeft < 0 ? `${Math.abs(daysLeft)} Days Overdue` : `${daysLeft} Days Left`}
      </p>

      <p className="text-lg text-gray-400">₹{targetAmount.toFixed(2)}</p>

      {/* Progress Bar */}
      <div className="mt-2 relative">
        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className={`h-2 ${getProgressColor()} rounded`}
            style={{ width: `${Math.min(progress, 100)}%`}}
          ></div>
        </div>
        <p className="text-sm text-gray-300 mt-1">{progress.toFixed(1)}% Completed</p>
      </div>

      {/* Savings Input */}
      <div className="mt-2 flex gap-2">
        <input
          type="number"
          value={newSavings}
          onChange={(e) => setNewSavings(e.target.value)}
          placeholder="Enter amount"
          className="p-2 w-2/3 bg-gray-800 text-white rounded"
        />
        <FaPlus
          className="text-green-400 text-xl cursor-pointer"
          onClick={addSavings}
        />
      </div>

      {/* Edit Goal Amount */}
      {editing && (
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            value={updatedTarget}
            onChange={(e) => setUpdatedTarget(e.target.value)}
            className="p-2 bg-gray-800 text-white rounded w-full"
          />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={editGoal}>
            Save
          </button>
        </div>
      )}

      {/* Dates */}
      <p className="text-sm text-gray-400 mt-2">{format(new Date(startDate), "MMMM dd, yyyy")}</p>
      <p className="text-sm text-gray-400">{format(new Date(targetDate), "MMMM dd, yyyy")}</p>

      {/* Goal Completed Message */}
      {progress >= 100 && <p className="text-green-500 font-bold mt-2">🎉 Goal Achieved!</p>}
    </div>
  );
};

export default GoalCard;
