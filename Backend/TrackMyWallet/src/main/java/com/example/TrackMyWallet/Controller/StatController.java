package com.example.TrackMyWallet.Controller;


import com.example.TrackMyWallet.Service.ExpenseService;
import com.example.TrackMyWallet.Service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")// Allows frontend access
public class StatController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private IncomeService incomeService;

    @GetMapping("/monthly-summary")
    public ResponseEntity<List<Map<String, Object>>> getMonthlySummary() {
        List<Map<String, Object>> expenseData = expenseService.getMonthlyExpenseTotals();
        List<Map<String, Object>> incomeData = incomeService.getMonthlyIncomeTotals();

        Map<String, Map<String, Object>> combinedData = new HashMap<>();

        for (Map<String, Object> exp : expenseData) {
            String month = (String) exp.get("month");
            combinedData.putIfAbsent(month, new HashMap<>());
            combinedData.get(month).put("month", month);
            combinedData.get(month).put("expense", exp.get("expense"));
        }

        for (Map<String, Object> inc : incomeData) {
            String month = (String) inc.get("month");
            combinedData.putIfAbsent(month, new HashMap<>());
            combinedData.get(month).put("month", month);
            combinedData.get(month).put("income", inc.get("income"));
        }

        return ResponseEntity.ok(new ArrayList<>(combinedData.values()));
    }

    @GetMapping("/total")
    public ResponseEntity<Map<String, Double>> getTotalIncomeExpense() {
        double totalIncome = incomeService.getTotalIncome();
        double totalExpense = expenseService.getTotalExpense();

        Map<String, Double> totals = new HashMap<>();
        totals.put("income", totalIncome);
        totals.put("expense", totalExpense);

        return ResponseEntity.ok(totals);
    }
}
