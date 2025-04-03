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
//    public Goal addGoals(Goal goal) {
//        System.out.println("Saving goal: " + goal); // ✅ Debug log to verify data before saving
//        return goalRepo.save(goal);
//    }

    // ✅ Create a new goal
    public Goal createGoal(Goal goal) {
        goal.setSavedAmount(0); // Default saved amount is 0
        return goalRepo.save(goal);
    }

    // Get All goal
    public List<Goal> getAllGoals() {

        return goalRepo.findAll();

    }

    // Get goal by ID
    public Goal getGoalById(String id) {
        Optional<Goal> goalOptional = goalRepo.findById(id); // ✅ First, get Optional<Goal>
        return goalOptional.orElseThrow(() -> new RuntimeException("Goal not found")); // ✅ Now call orElseThrow()
    }



    // Get goals by title
    public List<Goal> getGoalByTitle(String title) {
        return goalRepo.findByTitle(title);
    }

    //update
    // ✅ Update goal savings
    public Goal updateGoalSavings(String goalId, double amount) {
        Goal goal = goalRepo.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setSavedAmount(goal.getSavedAmount() + amount);
        return goalRepo.save(goal);
    }


    // Delete
    public void deleteGoal(String id) {
        goalRepo.deleteById(id);
    }

}
