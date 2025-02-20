import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./Components/Dashboard/Home";
import ExpenseTable from "./Components/Tables/ExpenseTable";
// import Expence from "./Components/AddForms/Expence";

const router = createBrowserRouter([
  {
    path:"/",
    element:<div>
       <Home/>,
    </div>
    
  },

  {
    path:"/expenses",
    element:<div>
       
       <ExpenseTable/>
    </div>
    
  },

])

function App() {

 

  return (
    <>
      <RouterProvider router={router} />

     

    {/* <Header/> */}
    {/* <Home/> */}
    {/* <FinanceDashboard/> */}

    </>
  )
}

export default App



// <Router>
//       <div className="flex min-h-screen">
//        <Home/>
//         <div className="flex-1 flex flex-col">
//           {/* <Header/> */}

//           <main className="p-6 bg-gray-100 dark:bg-gray-900 flex-1">
//             <Routes>
//               <Route path="/" element={<Home />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>