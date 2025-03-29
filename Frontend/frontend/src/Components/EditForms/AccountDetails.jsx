import {useEffect} from 'react'

const AccountDetails = ({ account, transactions, onClose }) => {
  
    // useEffect(() => {
    //     if (isTransactionOpen) {
    //       fetchTransactions();
    //     }
    //   }, [isTransactionOpen]);
      
  
  
    return (
    <>
    
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-xl w-96 max-h-[80vh] overflow-y-auto">
        {/* Account Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-yellow-300">Account details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">
            ✕
          </button>
        </div>

        {/* Account Balance */}
        <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
        <img src={account?.icon || "/default-icon.png"} alt={account?.name || "Account"} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">{account.name }</h3>
            <p className="text-green-400 font-semibold">₹{account.amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-gray-800 text-gray-300 p-3 my-4 rounded-lg text-sm">
          You can see Monthly, weekly, or daily statistics of this account in the Analysis section.
        </div>

        {/* Transactions */}
        <h3 className="text-lg font-bold text-yellow-300">Total {Object.keys(transactions).length} records in this account</h3>
        <div className="mt-2 border-b border-gray-700 pb-2 flex justify-end">
          <span className="text-gray-400 text-xs">NEW TO OLD</span>
        </div>

        {/* <div className="mt-4 space-y-4">
          {Object.entries(transactions).map(([month, trans]) => (
            <div key={month}>
              <h4 className="text-md font-semibold text-gray-400">{month}</h4>
              {trans.map((t) => (
                <div key={t.id} className="flex justify-between bg-gray-800 p-3 rounded-lg mt-2">
                  <div className="flex items-center gap-3">
                    <img src={t.icon} alt={t.category} className="w-8 h-8 rounded-full" />
                    <span className="text-yellow-200">{t.category}</span>
                  </div>
                  <div className="text-right">
                    <p className={t.amount >= 0 ? "text-green-400" : "text-red-400"}>
                      ₹{t.amount.toFixed(2)}
                    </p>
                    <span className="text-gray-400 text-xs">{new Date(t.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div> */}

{/* {transactions.map((t) => (
  <div key={t.id} className="flex justify-between bg-gray-800 p-3 rounded-lg">
    <div className="flex items-center gap-3">
      <img src={t.icon || "/default-icon.png"} alt={t.category} className="w-8 h-8 rounded-full" />
      <span className="text-yellow-200">{t.category}</span> 
      <span className="text-gray-400">({t.account})</span> 
    </div>
    <div className="text-right">
      <p className={t.type === "expense" ? "text-red-400" : "text-green-400"}>
        ₹{t.amount.toFixed(2)}
      </p>
      <span className="text-gray-400 text-xs">{new Date(`${t.date}T${t.time}`).toLocaleString()}</span>
    </div>
  </div>
))} */}
 <div className="mt-4 space-y-4">
 {transactions.length > 0 ? (
  transactions.map((t) => {
    // Default Icon (if missing)
    const iconSrc = t.icon || "/default-icon.png"; // 🔍 Ensure icon is always available
    const categoryName = t.category?.name || "Unknown"; // 🔍 Ensure category name is shown

    return (
      <div key={t.id} className="flex justify-between bg-gray-800 p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <img src={iconSrc} alt={categoryName} className="w-8 h-8 rounded-full" />
          <span className="text-yellow-200">{categoryName}</span>
        </div>
        <div className="text-right">
          <p className={t.type === "expense" ? "text-red-400" : "text-green-400"}>
            ₹{t.amount.toFixed(2)}
          </p>
          <span className="text-gray-400 text-xs">
            {new Date(`${t.date}T${t.time}`).toLocaleString()}
          </span>
        </div>
      </div>
    );
  })
) : (
  <p className="text-gray-400 text-center">No transactions found.</p>
)}


</div>



        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-red-500 w-full mt-4 py-2 rounded-lg text-white font-bold hover:bg-red-400"
        >
          Close
        </button>
      </div>
    </div>
    
    </>
  )
}

export default AccountDetails
