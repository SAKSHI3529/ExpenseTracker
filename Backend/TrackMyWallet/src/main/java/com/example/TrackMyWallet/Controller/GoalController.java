package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Goal;
import com.example.TrackMyWallet.Service.ExpenseService;
import com.example.TrackMyWallet.Service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")// Allows frontend access
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        return ResponseEntity.ok(goalService.createGoal(goal));
    }

    // Get All goals
    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<Goal> getGoalById(@PathVariable String goalId) {
        Goal goal = goalService.getGoalById(goalId); // ✅ Service method already extracts Goal
        return ResponseEntity.ok(goal);
    }



    @PutMapping("/{goalId}/save")
    public ResponseEntity<Goal> updateGoalSavings(@PathVariable String goalId, @RequestParam double amount) {
        return ResponseEntity.ok(goalService.updateGoalSavings(goalId, amount));
    }

    // Get Expense by ID
//    @GetMapping("/{id}")
//    public Optional<Goal> getGoalById(@PathVariable String id) {
//        return goalService.getGoalById(id);
//    }

    // Get Expenses by Category
    @GetMapping("/title/{title}")
    public List<Goal> getGoalByTitle(@PathVariable String title) {
        return goalService.getGoalByTitle(title);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Goal> updateGoal(@PathVariable("id") String id, @RequestBody Goal updatedGoal) {
//        if (!goalService.getGoalById(id).isPresent()) {
//            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
//        }
//        updatedGoal.setId(id); // ✅ Ensures ID is set correctly
//        Goal savedGoal = goalService.updateGoal(updatedGoal);
//        return ResponseEntity.ok(savedGoal
//        );
//    }

    // Delete an Expense
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable("id") String id) {
        goalService.deleteGoal(id);
        return "Expense deleted successfully!";
    }
}
