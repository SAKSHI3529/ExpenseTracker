package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Expense operations with MongoDB.
 */

@Repository
public interface ExpenseRepo extends MongoRepository<Expense, String> {

    // Custom query to find expenses by category
    //The method findByCategory(String category) allows filtering expenses by category.
    List<Expense> findByCategory(String category);

    // Custom query to find expenses by account type
    List<Expense> findByAccount(String account);
}
