package com.example.TrackMyWallet.Entity;


import lombok.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Expense {
    // Specifies this field as a unique identifier
    @Id
    private String id;

    private String title;       // Name of the expense (e.g., "Groceries")
    private Double amount;      // Amount spent
    private LocalDate date;     // Date of the expense
    private LocalTime time;     // Time of the expense
    private String category;    // Category of the expense (e.g., "Food", "Rent")
    private String account;
    private String accountId;// Account used (e.g., "Bank", "Cash", "Credit Card")
    private String note;        // Additional details about the expense


    // ✅ Constructor to Ensure Proper Initialization
    public Expense(String title, Double amount, LocalDate date, LocalTime time, String category, String account, String note , String accountId) {
        this.title = title;
        this.amount = amount;
        this.date = date;
        this.time = time;
        this.category = category;
        this.account = account;
        this.accountId =accountId;
        this.note = note;
    }

    public Expense(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "Expenses{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", amount='" + amount + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", category='" + category + '\'' +
                ", account='" + account + '\'' +
                ", note='" + note + '\'' +

                '}';
    }

}
