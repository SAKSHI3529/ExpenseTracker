package com.example.TrackMyWallet.Service;


import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Repository.AccountRepo;
import com.example.TrackMyWallet.Repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


/**
 * Service layer for business logic related to Expense management.
 */
@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private BudgetService budgetService;


    // Create an Expense
//    public Expense addExpense(Expense expense) {
//        System.out.println("Saving Expense: " + expense); // ✅ Debug log to verify data before saving
//        return expenseRepo.save(expense);
//    }


    public Expense addExpense(Expense expense) {
        try {
            Optional<Account> accountOpt = accountRepo.findById(expense.getAccount());

            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();

                // ✅ Check balance before adding expense
                if (account.getAmount() < expense.getAmount()) {
                    throw new RuntimeException("Insufficient balance! Available: ₹" + account.getAmount() + ", Required: ₹" + expense.getAmount());
                }

                // ✅ Deduct from account balance
                account.setAmount(account.getAmount() - expense.getAmount());
                accountRepo.save(account);

                // ✅ Save expense
                return expenseRepo.save(expense);
            } else {
                throw new RuntimeException("❌ Account not found: " + expense.getAccount());
            }
        } catch (Exception e) {
            System.err.println("❌ Error Adding Expense: " + e.getMessage());  // ✅ Print error in logs
            throw new RuntimeException("Failed to add expense: " + e.getMessage());
        }
    }




    // ✅ Get All Expenses
    public List<Expense> getAllExpenses() {
        List<Expense> expenses = expenseRepo.findAll();
        System.out.println("🔍 Retrieved Expenses: " + expenses);

        // Print each object separately
        for (Expense e : expenses) {
            System.out.println("Expense: " + e.getId() + ", Title: " + e.getTitle() + ", Amount: " + e.getAmount());
        }

        return expenses;
    }

    // Get Expense by ID
    public Optional<Expense> getExpenseById(String id) {
        return expenseRepo.findById(id);
    }

//    public Expense getExpenseById(int expenseId) {
//        return expenseRepo.findById(expenseId).get();
//    }

    // Get Expenses by Category
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepo.findByCategory(category);
    }

    // Get Expenses by Account
    public List<Expense> getExpensesByAccount(String account) {
        return expenseRepo.findByAccount(account);
    }

    //update
    public Expense updateExpense(Expense expense) {
        return expenseRepo.save(expense); //  MongoDB will update if _id exists
    }

    // Delete an Expense
    public void deleteExpense(String id) {
        expenseRepo.deleteById(id);
    }


}
