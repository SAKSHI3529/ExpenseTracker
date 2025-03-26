package com.example.TrackMyWallet.Entity;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public class Budget {
    @Id
    private String id;

    private Double limit;       // Name of the expense (e.g., "Groceries")
    private LocalDate date;     // Date of the expense
    private String category;   // ✅ Category Name (linked to a category)
//    private Double limit;      // ✅ Budget Limit
    private Double spent;      // ✅ Track spent amount
    private String month;      // ✅ Month-Year String (e.g., "March, 2025")

    public Budget(String id, Double limit, LocalDate date,String category,String month) {
//        this.id = id;
        this.limit = limit;
        this.date = date;
        this.category = category;
        this.month = month;
        this.spent = 0.0; // Default spent amount
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getLimit() {
        return limit;
    }

    public void setLimit(Double limit) {
        this.limit = limit;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getSpent() {
        return spent;
    }

    public void setSpent(Double spent) {
        this.spent = spent;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
