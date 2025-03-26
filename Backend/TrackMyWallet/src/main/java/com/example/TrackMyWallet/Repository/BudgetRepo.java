package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BudgetRepo extends MongoRepository<Budget, String> {
    List<Budget> findByCategoryAndMonth(String category, String month);
}
