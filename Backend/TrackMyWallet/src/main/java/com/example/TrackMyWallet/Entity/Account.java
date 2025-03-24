package com.example.TrackMyWallet.Entity;

import org.springframework.data.annotation.Id;

public class Account {

    @Id
    private String id;
    private double amount;
    private String name;
    private String icon;

    public Account() {}

    public Account(double amount, String name, String icon) {
        this.amount = amount;
        this.name = name;
        this.icon = icon;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", amount='" + amount + '\'' +
                ", icon='" + icon + '\'' +

                '}';
    }
}
