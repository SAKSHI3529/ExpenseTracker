package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Income;
import com.example.TrackMyWallet.Service.ExpenseService;
import com.example.TrackMyWallet.Service.IncomeService;
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
@RequestMapping("/api/income")
@CrossOrigin(origins = "*")// Allows frontend access
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // Add a New Income
//    @PostMapping
//    public Income createIncome(@RequestBody Income income) {
//        System.out.println("Received API Request: " + income); // ✅ Debug log to verify incoming data
//        return incomeService.addIncome(income);
//    }

    @PostMapping
    public ResponseEntity<?> addIncome(@RequestBody Income income) {
        try {
            System.out.println("Received Income: " + income); // ✅ Debug Log
            Income savedIncome = incomeService.addIncome(income);
            return ResponseEntity.ok(savedIncome);
        } catch (Exception e) {
            System.err.println("❌ Error Adding Income: " + e.getMessage()); // ✅ Print error details
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add Income: " + e.getMessage());
        }
    }

    // Get All Income
    @GetMapping
    public List<Income> getAllIncome() {
        return incomeService.getAllIncome();
    }

    // Get Income by ID
    @GetMapping("/{id}")
    public Optional<Income> getIncomeById(@PathVariable String id) {
        return incomeService.getIncomeById(id);
    }

    // Get Income by Category
    @GetMapping("/category/{category}")
    public List<Income> getIncomeByCategory(@PathVariable String category) {
        return incomeService.getIncomeByCategory(category);
    }

    // Get Income by Account
    @GetMapping("/account/{account}")
    public List<Income> getIncomeByAccount(@PathVariable String account) {
        return incomeService.getIncomeByAccount(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable("id") String id, @RequestBody Income updatedIncome) {
        if (!incomeService.getIncomeById(id).isPresent()) {
            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
        }
        updatedIncome.setId(id); // ✅ Ensures ID is set correctly
        Income savedIncome = incomeService.updateIncome(updatedIncome);
        return ResponseEntity.ok(savedIncome);
    }




    // Delete an Expense
    @DeleteMapping("/{id}")
    public String deleteIncome(@PathVariable("id") String id) {
        incomeService.deleteIncome(id);
        return "Income deleted successfully!";
    }




}
