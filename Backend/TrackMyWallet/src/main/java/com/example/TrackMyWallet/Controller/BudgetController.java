package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Entity.Budget;
import com.example.TrackMyWallet.Service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "*")// Allows frontend access
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    // Add a
    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        System.out.println("Received API Request: " + budget); // ✅ Debug log to verify incoming data
        return budgetService.addBudget(budget);
    }

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

//    // Get Expense by ID
//    @GetMapping("/{id}")
//    public Optional<Budget> getBudgetById(@PathVariable String id) {
//
//        return budgetService.getBudgetById(id);
//    }

    // ✅ Get Budget by ID
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable String id) {
        Optional<Budget> budget = budgetService.getBudgetById(id);
        return budget.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable("id") String id, @RequestBody Budget updatedBudget) {
        if (!budgetService.getBudgetById(id).isPresent()) {
            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
        }
        updatedBudget.setId(id); // ✅ Ensures ID is set correctly
        Budget savedBudget = budgetService.updateBudget(updatedBudget);
        return ResponseEntity.ok(savedBudget);
    }





    // Delete an Expense
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable("id") String id) {
        budgetService.deleteBudget(id);
        return "Budget deleted successfully!";
    }

    // ✅ Get Budget by Category & Month
    @GetMapping("/category/{category}/{month}")
    public List<Budget> getBudgetByCategory(@PathVariable String category, @PathVariable String month) {
        return budgetService.getBudgetsByCategoryAndMonth(category, month);
    }


}
