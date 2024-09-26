import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../../api/apiClient"; // Adjust path accordingly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On component mount, check if the user is authenticated
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Make a request to the backend to check if the user is authenticated
      const response = await apiClient.get("/api/users/check", {
        withCredentials: true, // Include HttpOnly cookies in the request
      });

      if (response.status === 200) {
        // If the backend confirms authentication
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const loggedin = () => {
    // Mark user as authenticated after successful login
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = async () => {
    // Log the user out (this will clear the cookie on the backend)
    await apiClient.get("/api/auth/logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, loggedin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
