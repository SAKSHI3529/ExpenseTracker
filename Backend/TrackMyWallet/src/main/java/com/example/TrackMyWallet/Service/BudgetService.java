package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Budget;
import com.example.TrackMyWallet.Repository.BudgetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class BudgetService {

   @Autowired
    private BudgetRepo budgetRepo;

//     Create
    public Budget addBudget(Budget budget) {
        System.out.println("Saving Budget: " + budget); // ✅ Debug log to verify data before saving
        return budgetRepo.save(budget);
    }

    // Get All Expenses
    public List<Budget> getAllBudgets() {
        List<Budget> budgets = budgetRepo.findAll();
        System.out.println("🔍 Retrieved Expenses: " + budgets);

        // Print each object separately
        for (Budget e : budgets) {
            System.out.println("Budget: " + e.getId() + ", limit: " + e.getLimit() + ", Date: " + e.getDate());
        }

        return budgets;
    }

    // Get Expense by ID
    public Optional<Budget> getBudgetById(String id) {
        return budgetRepo.findById(id);
    }

    //update
    public Budget updateBudget(Budget budget) {
        return budgetRepo.save(budget); //  MongoDB will update if _id exists
    }

    // Delete an Expense
    public void deleteBudget(String id) {
        budgetRepo.deleteById(id);
    }

    // ✅ Get Budgets by Category & Month
    public List<Budget> getBudgetsByCategoryAndMonth(String category, String month) {
        return budgetRepo.findByCategoryAndMonth(category, month);
    }

    public void updateBudgetSpent(String category, String month, Double amount) {
        System.out.println("🔍 Searching for budget: Category = " + category + ", Month = " + month);
        List<Budget> budgets = budgetRepo.findByCategoryAndMonth(category, month);

        if (!budgets.isEmpty()) {
            Budget budget = budgets.get(0);
            System.out.println("✅ Budget found: " + budget);

            double newSpent = budget.getSpent() + amount;
            budget.setSpent(newSpent);

            System.out.println("💰 New spent amount: " + newSpent);
            budgetRepo.save(budget);

            System.out.println("✅ Budget updated successfully in database.");
        } else {
            System.out.println("❌ No matching budget found.");
        }
    }



}
