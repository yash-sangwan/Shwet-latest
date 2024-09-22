import React, { useState } from "react";
import Notification from "../Notification/Notification";

const SubscribeSection = () => {
  const [click, setClick] = useState(null); // State for notification type
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const validateEmail = (email) => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (email === "") {
      setErrorMessage("Email field cannot be empty.");
      setClick("error");
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setClick("error");
      return;
    }

    // Success scenario
    setEmail(""); // Clear email input
    setClick("success"); // Set click to success for success notification
  };

  return (
    <>
      {/* Notification Component for success or error messages */}
      {click === "success" && (
        <Notification
          message={"Subscribed successfully"}
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
      </div>
    </>
  );
};

export default SubscribeSection;
