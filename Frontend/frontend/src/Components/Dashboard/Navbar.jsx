import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBell, FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);

  return (
    <nav className=" bg-[##FFFFFF] shadow-md md:max-lg:flex">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto md:ml-64 p-4">
        <Link to="/" className="text-2xl font-semibold text-[#17153B]">TrackMyWallet</Link>
        <div className="flex items-center gap-4">
          {/* <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-100 hover:bg-[#E8F9FF] dark:hover:bg-[#C4D9FF] transition">
            {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
          </button> */}
          <button className="p-2 rounded-lg bg-gray-100  hover:bg-[#C4D9FF] transition">
            <FaBell className="text-gray-300" />
          </button>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/men/50.jpg" alt="User" className="w-10 h-10 rounded-full border" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[200px] bg-white  rounded-lg shadow-lg p-3 z-50">
                <div className="px-4 py-2 border-b">
                  <h3 className="font-semibold text-gray-800">Musharof Chowdhury</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">randomuser@pimjo.com</p>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-[#C4D9FF] cursor-pointer">Edit Profile</li>
                  <li className="px-4 py-2 hover:bg-[#C4D9FF] cursor-pointer">Account Settings</li>
                  <li className="px-4 py-2 hover:bg-[#C4D9FF] cursor-pointer">Support</li>
                  <li className="px-4 py-2 border-t mt-2 hover:bg-[#C4D9FF] cursor-pointer text-red-500">Sign Out</li>
                </ul>
              </div>
            )}
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 text-white bg-gray-700 rounded-md">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;