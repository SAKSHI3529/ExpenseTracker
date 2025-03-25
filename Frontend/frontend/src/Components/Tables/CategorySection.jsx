import { FaEllipsisH } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddCategory from "../Forms/AddCategory";

const CategorySection = ({ title, categories = [] }) => {  // ✅ Default empty array
  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log("Received Categories:", categories); // ✅ Debugging line

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
      <div className="border-t border-gray-600"></div>

      <div className="mt-3">
        {Array.isArray(categories) && categories.length > 0 ? ( 
          categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center bg-gray-800 text-yellow-200 p-3 rounded-lg mb-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 p-2 rounded-lg">
                  <span className="text-2xl">{category.icon || "📁"}</span> {/* ✅ Fallback icon */}
                </div>
                <span className="text-base">{category.name}</span>
              </div>
              <FaEllipsisH size={20} className="text-gray-400 cursor-pointer" />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No categories added</p>
        )}

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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <AddCategory onClose={() => setIsFormOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
