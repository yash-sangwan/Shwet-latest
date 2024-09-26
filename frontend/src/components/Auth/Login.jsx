import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Google from "./Google";
import GitHub from "./GitHub";
import apiClient from "../../api/apiClient";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { useAuth } from "../Private/AuthContext";
import Notification from "../Notification/Notification";

const Login = ({ onClose }) => {

  const [click, setClick] = useState(null); // State for notification type
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [id, setId] = useState(""); // Prefilled email
  const [password, setPassword] = useState(""); // Prefilled password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // State for showing loading effect during login
  const {loggedin} = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading effect
  
    const payload = {
      id: id,
      password: password,
    };
  
    try {
      const response = await apiClient.post("/api/auth/login", payload);
  
      if (response.status === 200) {
        loggedin();
        navigate("/playground");
      }
    } catch (error) {
      // Access error.response to handle different response statuses
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid user credentials.");
          setClick("error");
        } else {
          setErrorMessage("Server error");
          setClick("error");
        }
      } else {
        // Handle network errors or other unexpected errors
        setErrorMessage("An unexpected error occurred.");
        setClick("error");
        console.error("Error:", error);
      }
    } finally {
      setIsLoading(false); // Stop loading effect
    }
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openSignup = () => {
    setIsSignupOpen(true);
  };

  const closeSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >

      <div className="relative flex justify-center items-center max-h-screen overflow-y-auto">
        {click === "success" && (
          <Notification
            message={"Logined successfully."}
            type={"success"}
            onClose={() => setClick(null)}
          />
        )}
        {click === "error" && (
          <Notification
            message={errorMessage}
            type={"error"}
            onClose={() => setClick(null)}
          />
        )}
        <button
          className="absolute top-4 right-4 text-primaryText"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="w-full max-w-2xl p-8 pt-12 bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2 md:pr-4 md:border-r border-gray-700 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-5xl font-bold text-PURPLESHADE3 mb-2">
                Shwet
              </h1>
              <p className="text-white mb-4 ">
                A place to share knowledge and better understand the world
              </p>
            </div>

            <p className="text-gray-400 text-sm text-center md:text-left mb-6">
              By continuing, you indicate that you agree to Shwet's{" "}
              <a
                href="#"
                className="text-PURPLESHADE3 hover:cursor-not-allowed"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-PURPLESHADE3 hover:cursor-not-allowed"
              >
                Privacy Policy
              </a>
              .
            </p>

            <div className="mb-6">
              <Google />
              <GitHub />
            </div>

            <hr className="border-gray-700 mb-6" />

            <p className="text-gray-400 text-sm text-center md:text-left mb-6">
              <button
                onClick={openSignup}
                className="text-PURPLESHADE3 hover:underline"
              >
                Sign up with email
              </button>
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 md:pl-4 flex flex-col justify-center">
            <h2 className="text-white text-2xl font-semibold mb-6 text-center md:text-left">
              Login
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email / Username
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
                  placeholder="Enter your email"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 text-gray-400"
                  >
                    {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <a
                  href="#"
                  className="text-sm text-PURPLESHADE3 font-semibold hover:cursor-not-allowed"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full bg-PURPLESHADE5 hover:bg-PURPLESHADE2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? "Logging in..." : "Login"}{" "}
                  {/* Change text based on isLoading */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSignupOpen && <Signup onClose={closeSignup} />}
    </div>
  );
};

export default Login;
