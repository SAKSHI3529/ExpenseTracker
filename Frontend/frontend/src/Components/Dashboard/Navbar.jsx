
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-[#1E1E1E] shadow-md">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold dark:text-white">
          TrackMyWallet
        </Link>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
          </button>

          {/* Sidebar Toggle (Mobile) */}
          <button onClick={toggleSidebar} className="md:hidden p-2 text-white bg-gray-700 rounded-md">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
