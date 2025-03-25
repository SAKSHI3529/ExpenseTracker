package com.example.TrackMyWallet.Controller;

import com.example.TrackMyWallet.Entity.Account;
import com.example.TrackMyWallet.Entity.Category;
import com.example.TrackMyWallet.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // ✅ Fetch all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // ✅ Add a new category
    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);

    }

    // ✅ Get category by ID (optional feature)
    @GetMapping("/{id}")
    public Optional<Category> getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") String id, @RequestBody Category updatedCategory) {
        if (!categoryService.getCategoryById(id).isPresent()) {
            return ResponseEntity.notFound().build(); // ✅ Returns 404 if not found
        }
        updatedCategory.setId(id); // ✅ Ensures ID is set correctly
        Category savedAccount = categoryService.updateCategory(updatedCategory);
        return ResponseEntity.ok(savedAccount);
    }

    // ✅ Delete a category
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable("id") String id) {
        categoryService.deleteCategory(id);
        return "category deleted";
    }


}
