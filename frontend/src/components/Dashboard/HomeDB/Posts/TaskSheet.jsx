// components/TaskSheet.jsx
import React, { useState, useEffect } from 'react';
import Notification from '../../../Notification';

const TaskSheet = ({ batch, onClose, onComplete }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const taskType = getTaskType(batch.name);
      setTasks(Array(batch.taskCount).fill().map((_, index) => ({
        id: index + 1,
        name: `${taskType} Task ${index + 1}`,
        description: `Describe the ${taskType.toLowerCase()} in detail`,
        type: taskType.toLowerCase(),
        content: getTaskContent(taskType, index)
      })));
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const getTaskType = (batchName) => {
    if (batchName.includes("Image")) return "Image";
    if (batchName.includes("Text")) return "Text";
    if (batchName.includes("Audio")) return "Audio";
    return "Unknown";
  };

  const getTaskContent = (type, index) => {
    switch (type) {
      case "Image":
        return `/placeholder.svg?height=300&width=300&text=Image ${index + 1}`;
      case "Text":
        return `This is a sample text for annotation task ${index + 1}. Please analyze and annotate this text according to the given instructions.`;
      case "Audio":
        return `https://example.com/audio${index + 1}.mp3`;
      default:
        return "Content not available";
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Submitted answers:", userAnswers);
      setShowNotification(true);
      setTimeout(() => {
        onComplete();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to submit answers", err);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentTaskIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const currentTask = tasks[currentTaskIndex];

  if (!currentTask) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Task {currentTaskIndex + 1} of {tasks.length}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{currentTask.name}</h3>
              <p className="text-gray-600 mb-4">{currentTask.description}</p>
              <div className="mb-6">
                {currentTask.type === 'image' && (
                  <img src={currentTask.content} alt="Task" className="w-full h-auto rounded-lg shadow-md" />
                )}
                {currentTask.type === 'audio' && (
                  <audio controls src={currentTask.content} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                )}
                {currentTask.type === 'text' && (
                  <p className="p-4 bg-gray-100 rounded-lg text-gray-800">{currentTask.content}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">Your Answer:</label>
                <textarea
                  id="answer"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows="4"
                  placeholder="Enter your answer here"
                  value={userAnswers[currentTaskIndex] || ''}
                  onChange={handleAnswerChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Progress: {currentTaskIndex + 1} / {tasks.length}
            </div>
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {currentTaskIndex < tasks.length - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
      {showNotification && (
        <Notification
          message="Task completed successfully!"
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default TaskSheet;