import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'https://shwet-latest-backend.vercel.app', // Backend API
  withCredentials: true, // This allows cookies (including CSRF token) to be sent with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to add the CSRF token to the headers
apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken.split('=')[1];
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); // Log any request errors
    return Promise.reject(error);
  }
);

export default apiClient;
