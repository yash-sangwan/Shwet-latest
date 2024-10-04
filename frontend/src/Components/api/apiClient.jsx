require('dotenv').config();
import axios from 'axios';
import Cookies from "js-cookie";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Backend API
  withCredentials: true, // This allows cookies (including CSRF token) to be sent with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to add the CSRF token to the headers
apiClient.interceptors.request.use(
  (config) => {
    // Log the headers of the request
    
    const userToken = Cookies.get("CSRF-TOKEN");
    
    console.log(userToken);

    if (csrfToken) {
      config.headers['X-CSRF-Token'] = userToken;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); // Log any request errors
    return Promise.reject(error);
  }
);

export default apiClient;
