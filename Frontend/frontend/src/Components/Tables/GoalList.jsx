import React, { useState, useEffect } from "react";
import axios from "axios";
import GoalCard from "./GoalCard";

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/goals");
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 ">
      {goals.length === 0 ? (
        <p className="text-white">No goals set yet.</p>
      ) : (
        goals.map((goal) => <GoalCard key={goal.id} goal={goal} fetchGoals={fetchGoals} />)
      )}
    </div>
  );
};

export default GoalList;
