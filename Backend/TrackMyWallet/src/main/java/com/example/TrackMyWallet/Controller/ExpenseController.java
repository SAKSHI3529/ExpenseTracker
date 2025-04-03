package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Entity.Budget;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Repository.BudgetRepo;
import com.example.TrackMyWallet.Repository.ExpenseRepo;
import com.example.TrackMyWallet.Service.BudgetService;
import com.example.TrackMyWallet.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for managing Expense-related API endpoints.
 */

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")// Allows frontend access
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private BudgetRepo budgetRepo;

    // Add a New Expense
//    @PostMapping
//    public Expense createExpense(@RequestBody Expense expense) {
//        System.out.println("Received API Request: " + expense); // ✅ Debug log to verify incoming data
//        return expenseService.addExpense(expense);
//    }

    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {
        try {
            System.out.println("Received Expense: " + expense); // ✅ Debug Log
            Expense savedExpense = expenseService.addExpense(expense);
            return ResponseEntity.ok(savedExpense);
        } catch (Exception e) {
            System.err.println("❌ Error Adding Expense: " + e.getMessage()); // ✅ Print error details
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add expense: " + e.getMessage());
        }
    }

    // Get All Expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // Get Expense by ID
    @GetMapping("/{id}")
    public Optional<Expense> getExpenseById(@PathVariable String id) {
        return expenseService.getExpenseById(id);
    }

    // Get Expenses by Category
    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByCategory(@PathVariable String category) {
        return expenseService.getExpensesByCategory(category);
    }

    // Get Expenses by Account
    @GetMapping("/account/{account}")
    public List<Expense> getExpensesByAccount(@PathVariable String account) {
        return expenseService.getExpensesByAccount(account);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Expense> updateExpense(@PathVariable String id, @RequestBody Expense updatedExpense) {
//        Optional<Expense> existingExpense = expenseService.getExpenseById(id);
//        if (existingExpense.isPresent()) {
//            updatedExpense.setId(id); // Keep the same ID
//            return ResponseEntity.ok(expenseService.addExpense(updatedExpense));
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("id") String id, @RequestBody Expense updatedExpense) {
        if (!expenseService.getExpenseById(id).isPresent()) {
            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
        }
        updatedExpense.setId(id); // ✅ Ensures ID is set correctly
        Expense savedExpense = expenseService.updateExpense(updatedExpense);
        return ResponseEntity.ok(savedExpense);
    }



    @GetMapping("/api/expenses")
    public List<Expense> getExpenses() {
        return expenseRepo.findAll();
    }

    @GetMapping("/api/budget")
    public List<Budget> getAllBudgets() {
        return budgetRepo.findAll();
    }

    @GetMapping("/api/budget/category/{category}/{month}")
    public List<Budget> getBudgetByCategory(
            @PathVariable String category,
            @PathVariable String month
    ) {
        return budgetService.getBudgetsByCategoryAndMonth(category, month);
    }

    // Delete an Expense
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable("id") String id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully!";
    }




}
