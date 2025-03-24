package com.example.TrackMyWallet.Repository;

import com.example.TrackMyWallet.Entity.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepo extends MongoRepository<Account, String> {
    
}
