import React, { useState } from "react";
import Notification from "../Notification";
import apiClient from "../api/apiClient";

const Signup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await apiClient.post("/api/auth/exists", { email });
      if (response.status == 200 && response.data.exists) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setNotification({ type : "error" , message : "All fields are required" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const exists = await checkEmailExists(email);

    if(exists){
      setNotification({ type : "error" , message : "Email already exists. Login using your registered email id." });
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/register" , { username:name, email:email, password:password });
      
      if (response.status === 200) {
        setNotification({ message: "Sign up successfull! Please login to continue.", type: "success" });
        setEmail("")
        setName("")
        setPassword("")
        const setDelay = setTimeout(() => {
          onClose()
          clearTimeout(setDelay)
        }, 1000);
      }
    } catch (err) {
      setNotification({ message: "An error occurred while signing up. Please try again.", type: "error" });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div
      className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
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
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm text-left font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:border-yellow-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm text-left font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm text-left font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-PURPLESHADE5 text-white font-semibold rounded hover:bg-PURPLESHADE2 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {notification && (
          <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
        )}
      </div>
    </div>
  );
};

export default Signup;
