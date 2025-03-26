package com.example.TrackMyWallet.Entity;

import java.util.Date;

public class Transaction {
    private String type;  // "income" or "expense"
    private double amount;
    private String category;
    private Date date;

    public Transaction(String type, double amount, String category, Date date) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
}
