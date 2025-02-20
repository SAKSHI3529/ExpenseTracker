package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Add a New Expense
    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        System.out.println("Received API Request: " + expense); // ✅ Debug log to verify incoming data
        return expenseService.addExpense(expense);
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

    // Delete an Expense
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully!";
    }
}
