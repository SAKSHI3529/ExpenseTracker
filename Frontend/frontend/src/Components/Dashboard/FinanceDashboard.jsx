import { useState } from "react";
import { FaBars, FaDatabase, FaArrowUp, FaArrowDown, FaList, FaPiggyBank, FaBalanceScale, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";

export default function FinanceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#1E1E1E] text-white min-h-screen flex">
      {/* Sidebar (Hidden on Mobile) */}
      <aside className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#2A2A2A] p-6 border-r border-gray-700 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h2 className="text-xl font-bold mb-4">Databases</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaDatabase className="text-red-500" /> Accounts</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaArrowUp className="text-red-500" /> Expenses</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaArrowDown className="text-green-500" /> Incomes</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaList className="text-blue-500" /> Categories</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaPiggyBank className="text-blue-500" /> Savings Goals</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaBalanceScale className="text-red-500" /> Debt Tracker</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaMoneyBill className="text-yellow-500" /> Budgets</li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"><FaCalendarAlt className="text-gray-300" /> Monthly Summary</li>
        </ul>
      </aside>

      {/* Hamburger Menu (Mobile) */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 left-4 bg-gray-700 p-2 rounded-md">
        <FaBars className="text-white text-2xl" />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>

        {/* Tabs Section */}
        <div className="flex space-x-4 border-b border-gray-600 pb-2">
          <button className="text-white px-4 py-2 border-b-2 border-white">Q1</button>
          <button className="text-gray-400 px-4 py-2">Q2</button>
          <button className="text-gray-400 px-4 py-2">Q3</button>
          <button className="text-gray-400 px-4 py-2">Q4</button>
          <button className="text-gray-400 px-4 py-2">All Months</button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* January Card */}
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-gray-300" /> January
            </h3>
            <p>Income: $0</p>
            <p>Expenses: $100</p>
            <p>Net: $-100</p>
          </div>

          {/* February Card */}
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-gray-300" /> February
            </h3>
            <p>Income: $0</p>
            <p>Expenses: $0</p>
            <p>Net: $0</p>
          </div>

          {/* March Card */}
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-gray-300" /> March
            </h3>
            <p>Income: $0</p>
            <p>Expenses: $0</p>
            <p>Net: $0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
