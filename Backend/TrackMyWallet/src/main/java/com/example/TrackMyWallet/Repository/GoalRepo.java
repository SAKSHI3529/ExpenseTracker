package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Entity.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GoalRepo extends MongoRepository<Goal, String> {

    List<Goal> findByTitle(String title);

}
