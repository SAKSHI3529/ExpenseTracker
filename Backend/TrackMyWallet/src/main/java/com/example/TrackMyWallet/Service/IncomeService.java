package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Income;
import com.example.TrackMyWallet.Repository.AccountRepo;
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

    @Autowired
    private AccountRepo accountRepo;

    // Create an Income
//    public Income addIncome(Income income) {
//        System.out.println("Saving Expense: " + income); // ✅ Debug log to verify data before saving
//        return incomeRepo.save(income);
//    }

    public Income addIncome(Income income) {
        try {
            Optional<Account> accountOpt = accountRepo.findById(income.getAccount());

            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();

                // ✅ Check balance before adding expense
//                if (account.getAmount() < income.getAmount()) {
//                    throw new RuntimeException("Insufficient balance! Available: ₹" + account.getAmount() + ", Required: ₹" + expense.getAmount());
//                }

                // ✅ Deduct from account balance
                account.setAmount(account.getAmount() + income.getAmount());
                accountRepo.save(account);

                // ✅ Save expense
                return incomeRepo.save(income);
            } else {
                throw new RuntimeException("❌ Account not found: " + income.getAccount());
            }
        } catch (Exception e) {
            System.err.println("❌ Error Adding Income: " + e.getMessage());  // ✅ Print error in logs
            throw new RuntimeException("Failed to add Income: " + e.getMessage());
        }
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
