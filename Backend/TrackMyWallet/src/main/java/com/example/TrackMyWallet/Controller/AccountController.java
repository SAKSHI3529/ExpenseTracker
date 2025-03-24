package com.example.TrackMyWallet.Controller;

import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping("/{id}")
    public Optional<Account> getExpenseById(@PathVariable String id) {
        return accountService.getAccountById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable("id") String id, @RequestBody Account updatedAccount) {
        if (!accountService.getAccountById(id).isPresent()) {
            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
        }
        updatedAccount.setId(id); // ✅ Ensures ID is set correctly
        Account savedAccount = accountService.updateAccount(updatedAccount);
        return ResponseEntity.ok(savedAccount);
    }



    @DeleteMapping("/{id}")
    public String deleteAccount(@PathVariable("id") String id) {
        accountService.deleteAccount(id);
        return "Account deleted successfully!";
    }
}
