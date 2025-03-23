package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Income;
import com.example.TrackMyWallet.Repository.ExpenseRepo;
import com.example.TrackMyWallet.Repository.IncomeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {
    @Autowired
    private IncomeRepo incomeRepo;

    // Create an Income
    public Income addIncome(Income income) {
        System.out.println("Saving Expense: " + income); // ✅ Debug log to verify data before saving
        return incomeRepo.save(income);
    }

    // Get All Income
    public List<Income> getAllIncome() {
        List<Income> income = incomeRepo.findAll();
        System.out.println("🔍 Retrieved Expenses: " + income);

        // Print each object separately
        for (Income e : income) {
            System.out.println("Income: " + e.getId() + ", Title: " + e.getTitle() + ", Amount: " + e.getAmount());
        }

        return income;
    }

    // Get Income by ID
    public Optional<Income> getIncomeById(String id) {
        return incomeRepo.findById(id);
    }

    // Get Income by Category
    public List<Income> getIncomeByCategory(String category) {
        return incomeRepo.findByCategory(category);
    }

    // Get Expenses by Account
    public List<Income> getIncomeByAccount(String account) {
        return incomeRepo.findByAccount(account);
    }

    //update
    public Income updateIncome(Income income) {
        return incomeRepo.save(income); //  MongoDB will update if _id exists
    }

    // Delete an Expense
    public void deleteIncome(String id) {
        incomeRepo.deleteById(id);
    }

}
