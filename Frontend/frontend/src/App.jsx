import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./Components/Dashboard/Home";
import ExpenseTable from "./Components/Tables/ExpenseTable";
import Loader from "./Components/Dashboard/Loader";
import { useEffect, useState } from "react";
import publicAxios from "./utils/axiosinstance"; // ✅ Import the correct Axios instance
import TableDemo from "./Components/Tables/TableDemo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/expenses",
    element: <ExpenseTable />,
  },
]);

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Request Interceptor
    const requestInterceptor = publicAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    // ✅ Response Interceptor
    const responseInterceptor = publicAxios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    // ✅ Cleanup Interceptors on Component Unmount
    return () => {
      publicAxios.interceptors.request.eject(requestInterceptor);
      publicAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      {loading && <Loader />} {/* ✅ Show loader when loading is true */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
