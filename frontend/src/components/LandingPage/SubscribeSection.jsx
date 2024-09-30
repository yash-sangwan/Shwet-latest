import React, { useState } from "react";
import Notification from "../Notification";
import apiClient from "../api/apiClient";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);

  const validateEmail = (email) => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async() => {
    if (email === "") {
      setNotification({type:"error" , message:"Email field cannot be empty."})
      return;
    } else if (!validateEmail(email)) {
      setNotification({type:"error" , message:"Please enter a valid email address."})
      return;
    }

    // Success scenario
    try {
      const response = await apiClient.post("/api/auth/subscribe" , {email});
      if(response.status === 200){
        setNotification({type:"success", message:response.data.message})
        setEmail(""); // Clear email input
      }
    } catch (error) {
      if(error.response.status === 400){
        setNotification({type:"error", message:error.response.data.message})
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <div className="bg-PURPLESHADE1 w-full h-max py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 font-museo">
              Stay in the loop.
            </h2>
            <p className="text-gray-400">
              Subscribe to stay in touch with us and get the latest updates,
              product announcements, etc., right to your inbox.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your e-mail address"
              className="w-full md:w-auto flex-grow p-4 rounded-lg bg-gray-800 text-gray-300 focus:outline-none"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-PURPLESHADE5 hover:bg-PURPLESHADE2 text-white font-semibold py-4 px-8 rounded-lg"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
          </div>
        </div>

        {notification && (
          <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
        )}
      </div>
    </>
  );
};

export default SubscribeSection;
