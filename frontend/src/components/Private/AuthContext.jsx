import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient"; // Adjust path accordingly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const response = await apiClient.get("/api/init/checkuser");
      if (response.status === 200 && response.data.status) {
        console.log("CHECK AUTH IS BEING RUN")
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loggedin = async () => {
    return await checkAuth();
  };

  const logout = async () => {
    try {
      await apiClient.get("/api/auth/logout");
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, logout, loggedin, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);