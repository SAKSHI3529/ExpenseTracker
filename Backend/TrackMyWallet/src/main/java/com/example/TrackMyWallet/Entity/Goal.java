package com.example.TrackMyWallet.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Goal {

    @Id
    private String id;

    private String title;       // Name of the goal (e.g., "Groceries")
    private Double amount;      // Amount spent
    private double targetAmount; // The total amount needed
    private double savedAmount;  // The amount saved so far
    private LocalDate startDate;     // Date of the goal
    private LocalDate targetDate;     // Date of the goal
    private String note;        // Additional details about the goal




    public Goal(String title, Double amount, LocalDate startDate, LocalDate targetDate, String note ,double targetAmount, double savedAmount) {
        this.title = title;
        this.amount = amount;
        this.startDate = startDate;
        this.targetDate = targetDate;
        this.note = note;
        this.targetAmount = targetAmount;
        this.savedAmount = savedAmount;
    }

    public Goal(){

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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public double getSavedAmount() {
        return savedAmount;
    }

    public void setSavedAmount(double savedAmount) {
        this.savedAmount = savedAmount;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", amount='" + amount + '\'' +
                ", startDate='" + startDate + '\'' +
                ", targetDate='" + targetDate + '\'' +
                ", note='" + note + '\'' +
                ", targetAmount=" + targetAmount +
                ", savedAmount=" + savedAmount +


                '}';
    }
}
