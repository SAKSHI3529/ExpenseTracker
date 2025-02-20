import { useState, useEffect } from 'react'

const AddAccountForm = () => {
   const [date, setDate] = useState("");
      const [time, setTime] = useState("");
    
    useEffect(() => {
            const now = new Date();
            
            // Format Date: YYYY-MM-DD
            const formattedDate = now.toISOString().split("T")[0];
            
            // Format Time: HH:MM (24-hour format)
            const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);
        
            setDate(formattedDate);
            setTime(formattedTime);
          }, []);
      return (
        <div className="p-10 bg-white dark:bg-[#1e1e1e8a] shadow-md rounded-lg lg:w-[700px]">

            <h1> showing the account 1st have to edit the form</h1>
          <h2 className="text-2xl font-bold mb-4 pb-4 text-gray-800 dark:text-white">Add Account</h2>
          <form>
            {/* Amount */}
            <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Amount</label>
              <input 
                type="number" 
                placeholder="Enter Amount" 
                className="w-full p-2 border rounded"
              />
            </div>
    
             {/* Date - Auto-filled */}
             <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
              />
            </div>
    
            {/* Time - Auto-filled */}
            <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white"
              />
            </div>
    
            {/* Category Dropdown */}
            <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Category</label>
              <select className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white">
                <option value="">Select Category</option>
                <option value="awards">Awards</option>
                <option value="coupons">Coupons</option>
                <option value="lottery">Lottery</option>
                <option value="refunds">Refunds</option>
                <option value="rental">Rental</option>
                <option value="salary">Salary</option>
    
              </select>
            </div>
    
            {/* Account Dropdown */}
            <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Account</label>
              <select className="w-full p-2 border rounded bg-white dark:bg-[#1e1e1e8a] dark:text-white">
                <option value="">Select Account</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="saving">Saving</option>
                <option value="untitled">Untitled</option>
              </select>
            </div>
    
            {/* Add Note */}
            <div className="flex flex-col mb-4">
              <label className="text-base mb-1">Add Note</label>
              <textarea 
                placeholder="Enter Note (optional)" 
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
    
            {/* Submit Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
              Submit
            </button>
          </form>
        </div>
      )
    }
  

export default AddAccountForm
