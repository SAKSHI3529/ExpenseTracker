import { FaEllipsisH } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useState , useEffect } from "react";
import AddCategory from "../Forms/AddCategory";
import axios from "axios";
// import EditCategory from "../EditForms/EditCategory";
import {  } from "module";

const CategorySection = ({ title, categories = [] , setCategories = [],iconMap  }) => {  // ✅ Default to empty array
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  // const [categories, setCategories] = useState([]); 
  // const [isEditing, setIsEditing] = useState(false);
  // const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
      // Function to close dropdown when clicking outside
      const handleClickOutside = (event) => {
        if (dropdownOpen !== null && !event.target.closest(".dropdown-container")) {
          setDropdownOpen(null);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [dropdownOpen]);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

    // Handle Delete account
    const handleDelete = async (id) => {
      try {
        console.log("🗑 Attempting to delete category with ID:", id); // ✅ Debugging log
    
        const response = await axios.delete(`http://localhost:8080/api/categories/${id}`);
        console.log("✅ Category deleted successfully:", response.data); // ✅ Log success response
    
        setCategories((prevCategories) => prevCategories.filter(category => category.id !== id)); // ✅ Update UI
      } catch (error) {
        console.error("❌ Error deleting category:", error);
      }
    };

    // const handleEdit = (account) => {
    //   setEditingCategory(account);
    //   setIsEditing(true);
    // };

    // const handleUpdateCategory = (updatedCategory) => {
    //   setCategories(
    //     categories.map((acc) => (acc.id === updatedCategory.id ? updatedCategory : acc))
    //   );
    //   setIsEditing(false);
    // };

  // console.log("✅ Received Categories in CategorySection:", categories); // ✅ Debugging log

  return (
    <>
    {/* {isEditing ? (
        <EditCategory
        account={editingCategory} 
        onClose={() => setIsEditing(null)}
          onUpdateAccount={handleUpdateCategory} 
        
        />
      ) : ( */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
      <div className="border-t border-gray-600"></div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                  {iconMap[category.icon] || "📁"} {/* ✅ Convert stored icon name into actual icon */}
                </div>
                <span className="text-base">{category.name}</span>
              </div>
             
              <div className="relative dropdown-container">
                    <FaEllipsisH
                      size={20}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => toggleDropdown(category.id)}
                    />
                    {dropdownOpen === category.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg z-50 p-2">
                        {/* <button
                          onClick={() => handleEdit(category)}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Edit
                        </button> */}
                        {/* ✅ Fix: Pass `id` correctly in delete function */}
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No categories added</p>
        )}
      </div>
    </div>
      {/* )} */}
    </>
  );
};

export default CategorySection;
