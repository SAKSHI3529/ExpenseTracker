package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Repository.AccountRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AccountService {
    private final AccountRepo accountRepo;

    //create an account
    public Account createAccount(Account account) {
        return accountRepo.save(account);
    }

    public AccountService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    // Get account by ID
    public Optional<Account> getAccountById(String id) {
        return accountRepo.findById(id);
    }



    //update
    public Account updateAccount(Account account) {
        return accountRepo.save(account); //  MongoDB will update if _id exists
    }

    public void deleteAccount(String id) {
        accountRepo.deleteById(id);
    }
}
