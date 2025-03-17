import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:8080/api/expenses", // Change this to your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the Axios instance
export default publicAxios;
