import { useEffect, useState } from "react";
import axios from "axios";
import CategorySection from "./CategorySection";

const Category = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      console.log("Fetched Categories:", response.data); // ✅ Debugging line
      setCategories(response.data || []); 
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading categories...</p>; 
  }

  return (
    <div className="p-4">
      <CategorySection title="Income Categories" categories={categories.filter(cat => cat.type === "income")} />
      <CategorySection title="Expense Categories" categories={categories.filter(cat => cat.type === "expense")} />
    </div>
  );
};

export default Category;
