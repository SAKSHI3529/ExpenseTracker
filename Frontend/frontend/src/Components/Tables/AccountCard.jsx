import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMoneyBillWave, FaCreditCard, FaPiggyBank, FaCcMastercard, FaCcVisa, FaEllipsisH } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const AccountCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Function to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownOpen !== null && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const iconMap = {
    money: <FaMoneyBillWave size={24} className="text-gray-700" />, 
    card: <FaCreditCard size={24} className="text-gray-700" />, 
    piggy: <FaPiggyBank size={24} className="text-gray-700" />, 
    mastercard: <FaCcMastercard size={24} className="text-gray-700" />, 
    visa: <FaCcVisa size={24} className="text-gray-700" /> 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="relative flex items-center justify-between bg-gray-800 text-yellow-200 p-4 rounded-lg shadow-lg border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-700 p-2 rounded-lg">
                {account.icon}
                {/* {iconMap[account.icon] || <FaMoneyBillWave size={24} className="text-gray-700" />} */}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{account.name}</h3>
                <p className="text-green-400">Balance: ₹{account.amount ? account.amount.toFixed(2) : "0.00"}</p>
              </div>
            </div>
            <div className="relative dropdown-container">
              <FaEllipsisH 
                size={20} 
                className="text-gray-400 cursor-pointer" 
                onClick={() => toggleDropdown(account.id)}
              />
              {dropdownOpen === account.id && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg z-50 p-2"
                >
                  <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600">Edit</button>
                  <button className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600">Delete</button>
                  {/* <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600">Ignore</button> */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
  <button className="flex items-center gap-2 px-6 py-3 w-48 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-600">
    <CiCirclePlus className="size-5" />
    Add Account
  </button>
</div>

    </div>
  );
};

export default AccountCard;
