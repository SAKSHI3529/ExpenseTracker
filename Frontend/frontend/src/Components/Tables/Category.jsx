import { useEffect, useState } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import CategorySection from "./CategorySection";
import AddCategory from "../Forms/AddCategory";
import { FaMoneyBill, FaHome, FaUtensils, FaShoppingCart, FaFilm, FaHeartbeat, FaCheckCircle } from "react-icons/fa";


const iconMap = {
  FaMoneyBill: <FaMoneyBill size={24} />,
  FaHome: <FaHome size={24} />,
  FaUtensils: <FaUtensils size={24} />,
  FaShoppingCart: <FaShoppingCart size={24} />,
  FaFilm: <FaFilm size={24} />,
  FaHeartbeat: <FaHeartbeat size={24} />,
  FaCheckCircle: <FaCheckCircle size={24} />,
};

const Category = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    console.log("✅ New Category Added to UI:", newCategory); // ✅ Debugging log
    setCategories((prevCategories) => [...prevCategories, newCategory]); // ✅ Update UI instantly
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      // console.log("✅ API Response:", response); // ✅ Log the full response
      // console.log("✅ Fetched Categories Data:", response.data); // ✅ Log response data

      if (Array.isArray(response.data) && response.data.length > 0) {
        setCategories(response.data); // ✅ Set categories correctly
      } else {
        console.error("❌ API returned empty or invalid data:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      setCategories([]); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading categories...</p>; 
  }

  console.log("✅ Categories in State:", categories); // ✅ Log state

  return (
    <>
    <div className="p-4">
      <CategorySection 
      title="Income Categories" 
      categories={categories.filter(cat => cat.type === "income")} 
      iconMap={iconMap} 
      setCategories={setCategories}  />


      <CategorySection 
      title="Expense Categories" 
      categories={categories.filter(cat => cat.type === "expense")} 
      iconMap={iconMap} 
      setCategories={setCategories}  />
    </div>

     {/* ✅ Add Category Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-6 py-3 w-48 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-600"
              >
                <CiCirclePlus className="size-5" />
                Add Category
              </button>
            </div>

            {/* ✅ Add Category Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
            <AddCategory onClose={() => setIsFormOpen(false)} onCategoryAdded={handleCategoryAdded} />
          </div>
        )}

</>
  );
};

export default Category;
