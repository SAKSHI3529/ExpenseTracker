package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Income;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IncomeRepo extends MongoRepository<Income, String> {

    // Custom query to find expenses by category
    //The method findByCategory(String category) allows filtering expenses by category.
    List<Income> findByCategory(String category);

    // Custom query to find expenses by account type
    List<Income> findByAccount(String account);
}
