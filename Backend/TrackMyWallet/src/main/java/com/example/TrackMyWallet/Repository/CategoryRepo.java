package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category, String> {
}
