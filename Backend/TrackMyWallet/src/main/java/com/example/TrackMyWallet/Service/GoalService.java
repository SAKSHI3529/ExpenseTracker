package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Goal;
import com.example.TrackMyWallet.Repository.ExpenseRepo;
import com.example.TrackMyWallet.Repository.GoalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    @Autowired
    private GoalRepo goalRepo;

    // Create  Goal
    public Goal addGoals(Goal goal) {
        System.out.println("Saving goal: " + goal); // ✅ Debug log to verify data before saving
        return goalRepo.save(goal);
    }

    // Get All goal
    public List<Goal> getAllGoals() {
        List<Goal> goals = goalRepo.findAll();
        System.out.println("🔍 Retrieved Expenses: " + goals);

        // Print each object separately
        for (Goal e : goals) {
            System.out.println("Goal: " + e.getId() + ", Title: " + e.getTitle() + ", Amount: " + e.getAmount() + ", StartDate: " + e.getStartDate() + ", TargetDate: " + e.getTargetDate());
        }

        return goals;
    }

    // Get goal by ID
    public Optional<Goal> getGoalById(String id) {
        return goalRepo.findById(id);
    }

    // Get goals by title
    public List<Goal> getGoalByTitle(String title) {
        return goalRepo.findByTitle(title);
    }

    //update
    public Goal updateGoal(Goal goal) {
        return goalRepo.save(goal); //  MongoDB will update if _id exists
    }

    // Delete
    public void deleteGoal(String id) {
        goalRepo.deleteById(id);
    }

}
