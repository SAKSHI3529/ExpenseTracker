package com.example.TrackMyWallet.Service;

import com.example.TrackMyWallet.Entity.Category;
import com.example.TrackMyWallet.Entity.Expense;
import com.example.TrackMyWallet.Repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    // ✅ Fetch all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // ✅ Find category by ID (optional feature)
    public Optional<Category> getCategoryById(String id) {
        return categoryRepo.findById(id);
    }

    // ✅ Add a new category
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    //update
    public Category updateCategory(Category category) {
        return categoryRepo.save(category); //  MongoDB will update if _id exists
    }

    // ✅ Delete a category
    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }
}
