import React from 'react'
import {  FaCalendarAlt } from "react-icons/fa";
// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   BoxIconLine,
//   GroupIcon,
// } from "../../icons";
// import Badge from "../ui/badge/Badge";
// import Badge from "../../ui/badge/Badge"

const Main = () => {
  return (
    <>
    <div className=''>
         <main className="flex-1 w-full ">
          <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 ">
            {[
              { month: "January", income: 0, expenses: 100 },
              { month: "February", income: 0, expenses: 0 },
              { month: "March", income: 0, expenses: 0 }
            ].map((data, index) => (
              <div key={index} className="bg-[#2A2A2A] dark:bg-[#FFFFFF] p-4 rounded-lg shadow-lg rounded-2xl border border-gray-200  p-5 dark:border-gray-800 md:p-6 ">
                <h3 className="text-lg font-semibold flex items-center gap-2">{data.month}</h3>
                <p>Income: ${data.income}</p>
                <p>Expenses: ${data.expenses}</p>
                <p>Net: ${data.income - data.expenses}</p>
              </div>
            ))}
          </div>
        </main>
    </div>

   
    </>
  )
}

export default Main
