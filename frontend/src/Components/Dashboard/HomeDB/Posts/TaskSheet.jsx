import React, { useState } from "react";
import apiClient from "../../../api/apiClient";

// Custom Button component
const Button = ({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg transition-colors ${
      disabled
        ? "bg-PURPLESHADE3 text-black cursor-not-allowed"
        : "bg-PURPLESHADE5 text-white hover:bg-PURPLESHADE2"
    } ${className}`}
  >
    {children}
  </button>
);

// Custom TextArea component
const TextArea = ({ id, value, onChange, placeholder, rows }) => (
  <textarea
    id={id}
    className="w-full p-3 text-white bg-[#3a3a3a] rounded-lg outline-none transition-all"
    rows={rows}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// Custom Alert component
const Alert = ({ type, message, onClose }) => (
  <div
    className={`fixed bottom-4 right-4 max-w-md p-4 rounded-lg ${
      type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
    }`}
  >
    <p>{message}</p>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-white hover:text-gray-200"
      aria-label="Close"
    >
      ×
    </button>
  </div>
);

export default function TaskSheet({ batch, onClose, onComplete }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (userAnswers[currentTaskIndex]?.trim()) {
      if (currentTaskIndex < Object.keys(batch.task).length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        handleSubmit();
      }
    } else {
      setNotification({ message: "Please enter an answer before proceeding.", type: "error" });
      setShowNotification(true);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const api = {
        image: "/api/worker/image",
        audio: "/api/worker/audio",
        text: "/api/worker/text",
      };

      const response = await apiClient.post(api[batch.type], {
        taskId: batch._id,
        labels: userAnswers,
      });

      if (response.status === 200) {
        if (response.data.status) {
          setNotification({ message: "Task submitted successfully.", type: "success" });
        } else {
          setNotification({ message: "Task submission failed.", type: "error" });
        }
        setShowNotification(true);
        setTimeout(() => {
          onComplete();
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to submit answers", err);
      setNotification({ message: "Some error occurred.", type: "error" });
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentTaskIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const isAnswerEmpty = !userAnswers[currentTaskIndex]?.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-[#131416] rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="bg-[#131416] px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Task {currentTaskIndex + 1} of {Object.keys(batch.task).length}
            </h2>
            <button
              onClick={onClose}
              className="hover:text-white text-gray-500 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto text-left">
            <div className="bg-[#2a2a2a] rounded-lg shadow-md p-6 mb-6">
              <p className="text-white mb-4">Task description:</p>
              <p className="text-white mb-4">{batch.description}</p>
              <div className="mb-6 w-full">
                {batch.type === "image" && (
                  <img
                    src={batch.task[currentTaskIndex + 1]}
                    alt="Task"
                    className="max-w-[250px] h-auto rounded-lg shadow-md"
                  />
                )}
                {batch.type === "audio" && (
                  <audio
                    controls
                    src={batch.task[currentTaskIndex + 1]}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
                {batch.type === "text" && (
                  <p className="p-4 bg-gray-100 rounded-lg text-gray-800 overflow-y-scroll w-full">
                    {batch.task[currentTaskIndex + 1]}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Your Answer:
                </label>
                <TextArea
                  id="answer"
                  value={userAnswers[currentTaskIndex] || ""}
                  onChange={handleAnswerChange}
                  placeholder="Enter your answer here"
                  rows={4}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#131416] px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-white">
              Progress: {currentTaskIndex + 1} / {Object.keys(batch.task).length}
            </div>
            <Button
              onClick={handleNext}
              disabled={isAnswerEmpty || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : currentTaskIndex < Object.keys(batch.task).length - 1
                ? "Next"
                : "Submit"}
            </Button>
          </div>
        </div>
      </div>
      {showNotification && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}