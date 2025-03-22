import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  FaBars,
  FaSun,
  FaMoon,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBill,
  FaBalanceScale,
  FaBullseye,
  FaDatabase,
  FaList,
  FaPiggyBank,
  FaCalendarAlt,
  FaChartPie,
} from "react-icons/fa";

import { assets } from "../../assets/assets";
import ExpenseForm from "../Forms/ExpenseForm";
import Main from "../Dashboard/Main";
import IncomeForm from "../Forms/IncomeForm";
import SetBudgetForm from "../Forms/SetBudgetForm";
import AddAccountForm from "../Forms/AddAccountForm";
import SetGoalForm from "../Forms/SetGoalForm";
import ExpenseTable from "../Tables/ExpenseTable";
import EditExpenseForm from "../Forms/EditExpenseForm";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null); // Track which expense is being edited

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [selectedComponent, setSelectedComponent] = useState("main");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const renderComponent = () => {
    if (editingExpense) {
      return (
        <EditExpenseForm
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      );
    }
    switch (selectedComponent) {
      case "expenses":
        return <ExpenseForm />;
      case "income":
        return <IncomeForm />;
      case "budget":
        return <SetBudgetForm />;
      case "account":
        return <AddAccountForm />;
      case "goals":
        return <SetGoalForm />;

        case "home":
          return <Main/>;

      case "expenseTable": // ✅ Added case for ExpenseTable
        return <ExpenseTable onEdit={setEditingExpense} />;
      default:
        return <Main />;
    }
  };

  const buttons = [
    { icon: FaArrowUp, text: "Add Expense", action: "expenses" },
    { icon: FaArrowDown, text: "Add Income", action: "income" },
    { icon: FaMoneyBill, text: "Add Budget", action: "budget" },
    { icon: FaBalanceScale, text: "Add New Account", action: "account" },
    { icon: FaBullseye, text: "Add New Goal", action: "goals" },
  ];

  const sidebarItems = [
    { icon: FaDatabase, text: "Dashboard", action: "home" },
    { icon: FaDatabase, text: "Accounts", action: "account" },
    { icon: FaArrowUp, text: "Expenses", action: "expenseTable" }, // ✅ Clicking this shows ExpenseTable
    { icon: FaArrowDown, text: "Incomes", action: "income" },
    { icon: FaList, text: "Categories", action: "categories" },
    { icon: FaPiggyBank, text: "Savings Goals", action: "goals" },
    { icon: FaChartPie, text: "Charts", action: "charts" },
    { icon: FaMoneyBill, text: "Budgets", action: "budget" },
    { icon: FaCalendarAlt, text: "Monthly Summary", action: "summary" },
  ];

  return (
    <>
      {/* NAVBAR */}
      {/* <nav className="bg-white dark:bg-[##FFFFFF]  shadow-md md:max-lg:flex  ">
        <div className="max-w-screen-xl flex justify-between items-center mx-auto md:ml-64 p-4">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl  font-semibold dark:text-[#17153B]">
              TrackMyWallet
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-100 hover:bg-[#E8F9FF] dark:hover:bg-[#C4D9FF] transition"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-600 text-xl" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-white bg-gray-700 rounded-md"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </nav> */}

  <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> 

      {/* HOME IMAGE */}

      {/* <div className="w-full h-[100px] sm:h-[300px] md:h-[400px] lg:h-[400px]">
        <img
          src={assets.home2_img}
          alt="Dashboard Banner"
          className="w-full h-full object-cover "
        />
      </div> */}

      {/* FORM BUTTONS */}

      <div className="bg-[#1E1E1E] dark:bg-[#f9fafb] dark:text-[#17153B] py-6 flex flex-wrap justify-center gap-4 px-4 md:ml-64">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => setSelectedComponent(btn.action)}
            className="flex items-center gap-2 px-4 py-2 border border-[#17153B] rounded-lg hover:bg-[#9CB9FF] hover:text-black transition"
          >
            {React.createElement(btn.icon)}
            {btn.text}
          </button>
        ))}
      </div>

      {/* SIDEBAR */}

      <div className="bg-[#FBFBFB] dark:bg-[#f9fafb] dark:text-[#17153B] min-h-screen flex ">
        <aside
          className={`fixed  top-0 left-0 h-full w-64  bg-[#FFFFFF] p-6 border-r border-gray-700 transition-transform duration-500 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-[#17153B]"></h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden dark:text-[#17153B] p-2"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-4">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 hover:bg-[#9CB9FF] p-2 rounded-md cursor-pointer"
              >
                <button
                  onClick={() =>{ setSelectedComponent(item.action);
                    setSidebarOpen(false);  }}
                  
                  className="flex items-center gap-3 w-full dark:text-[#17153B] hover:bg-[#9CB9FF]"
                >
                  {React.createElement(item.icon)}
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
          {renderComponent()}
        </div> */}

        {/* Main Content */}
        <div className="w-full md:ml-64 p-6   ">
          <div className="relative overflow-x-auto  sm:rounded-lg  ">
            {renderComponent()}
          </div>
        </div>
      </div>
    </> 
  );
};

export default Dashboard;
