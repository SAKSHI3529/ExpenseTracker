import { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import AddAccountForm from "../Forms/AddAccountForm";
import EditAccount from "../EditForms/EditAccount";
import Alert from "../ui/Alert";
import AccountDetails from "../EditForms/AccountDetails";

const AccountCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Function to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownOpen !== null &&
        !event.target.closest(".dropdown-container")
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  // Fetch accounts from the backend
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Toggle dropdown for each account
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Add a new account to the database
  const addAccountToDB = async (newAccount) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/account",
        newAccount
      );
      setAccounts([...accounts, response.data]); // Update UI with new account
      setIsFormOpen(false); // Close modal after adding
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  // Handle Delete account
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/account/${id}`);
      setAlert({
        show: true,
        type: "success",
        message: `Account deleted successfully!`,
      });
      setAccounts(accounts.filter((account) => account.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting account:", error);
      setAlert({
        show: true,
        type: "error",
        message: `Fail to delete Account!`,
      });
    }
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setIsEditing(true);
  };

  const handleUpdateAccount = (updatedAccount) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === updatedAccount.id ? updatedAccount : acc
      )
    );
    setIsEditing(false);
  };

  const handleDetails = async (account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/expenses?accountId=${account.id}`
        
      );
      const transactions = response.data;

    console.log(`✅ Transactions for account ${account.name}:`, transactions);


      if (response.data.length === 0) {
        console.warn("⚠ No transactions found for this account.");
      }
  
      // ✅ Group transactions by month & year
      const groupedTransactions = response.data.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
  
        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(transaction);
  
        return acc;
      }, {});
  
      console.log("✅ Transactions grouped:", groupedTransactions);
      setTransactions(transactions);
      setSelectedAccount(account);
      setIsTransactionOpen(true);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };
  
  return (
    <>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false })}
        />
      )}
      {isEditing ? (
        <EditAccount
          account={editingAccount}
          onClose={() => setIsEditing(false)}
          onUpdateAccount={handleUpdateAccount}
        />
      ) : (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Accounts</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* ✅ Fix: `.map()` should not be wrapped inside `{}` */}
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="relative flex items-center justify-between bg-gray-800 text-yellow-200 p-4 rounded-lg shadow-lg border border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    {/* ✅ Fix: Ensure correct image display */}
                    <img
                      src={account.icon}
                      alt="Account Icon"
                      className="w-14 h-14 object-contain bg-gray-700 p-2 rounded-lg"
                    />

                    <div>
                      <h3 className="text-lg font-semibold">{account.name}</h3>
                      <p className="text-green-400">
                        Balance: ₹
                        {account.amount ? account.amount.toFixed(2) : "0.00"}
                      </p>
                    </div>
                  </div>

                  <div className="relative dropdown-container">
                    <FaEllipsisH
                      size={20}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => toggleDropdown(account.id)}
                    />
                    {dropdownOpen === account.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg z-50 p-2">
                        <button
                          onClick={() => handleDetails(account)}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleEdit(account)}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        {/* ✅ Fix: Pass `id` correctly in delete function */}
                        <button
                          onClick={() => handleDelete(account.id)}
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
              <h2 className="text-gray-400">No account found</h2>
            )}
          </div>

          {/* {isTransactionOpen && selectedAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-bold text-center text-yellow-300 mb-4">
              Transactions for {selectedAccount.name}
            </h2>
            {transactions.length > 0 ? (
              <ul className="space-y-2">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="bg-gray-700 p-3 rounded-lg flex justify-between"
                  >
                    <span>{transaction.category}</span>
                    <span>₹{transaction.amount.toFixed(2)}</span>
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No transactions found.</p>
            )}
            <button
              onClick={closeTransactionModal}
              className="bg-red-500 px-4 py-2 mt-4 w-full text-white rounded-lg hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
        )} */}

          {/* Add Account Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 w-48 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-600"
            >
              <CiCirclePlus className="size-5" />
              Add Account
            </button>
          </div>

          {/* ✅ Fix: Add Account Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 flex items-center bg-opacity-30 backdrop-blur-md z-50">
              <AddAccountForm
                onClose={() => setIsFormOpen(false)}
                onAddAccount={addAccountToDB}
              />
            </div>
          )}

          {isTransactionOpen && selectedAccount && (
            <AccountDetails
              account={selectedAccount}
              transactions={transactions}
              onClose={() => setIsTransactionOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AccountCard;
