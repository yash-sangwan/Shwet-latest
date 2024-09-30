import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Notification from "../Notification";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [sendVerification, setSendVerification] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await apiClient.get("/api/init/getmail");
        if (response.status === 200 && response.data.status) {
          setEmail(response.data.userMail);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmail();
  }, []);

  const handleVerifyEmail = async () => {
    try {
      const response = await apiClient.get("/api/init/send/verification-mail");
      if (response.status === 200) {
        if (response.data.status) {
          setSendVerification(true);
        } else {
          setIsResending(true);
          setNotification({ type: "success", message: response.data.message });
          const resend = setTimeout(() => {
            setIsResending(false);
          }, 10000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Please verify your email
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            You're almost there! We sent an email to
          </p>
          <p className="mt-1 text-center text-sm font-medium text-gray-800">
            {email}
          </p>

          {sendVerification ? (
            <p className="mt-4 text-center text-sm text-gray-600">
              Just click on the link in that email to complete your signup. If
              you don't see it, you may need to{" "}
              <span className="font-medium">check your spam</span> folder.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <p>Click below to get a verification link on your mail : </p>
              {isResending ? (
                <p className="py-2 text-lg">"Wait for 10s to retry !"</p>
              ) : (
                <button
                  onClick={() => {
                    handleVerifyEmail();
                  }}
                  className="bg-PURPLESHADE3 w-full py-2 rounded-lg"
                >
                  Verify Email
                </button>
              )}
            </div>
          )}

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Still can't find the email?
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Need help?{" "}
            <a
              href="/"
              className="font-medium text-green-600 hover:text-green-500"
            >
              HomePage
            </a>
          </p>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default EmailVerification;
