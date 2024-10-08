import React, { useState, useEffect } from "react";
import BatchCard from "./BatchCard";
import TaskSheet from "./TaskSheet";
import Notification from "../../../Notification";
import apiClient from "../../../api/apiClient";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "../../../Loader/Loader";


export default function PostsBatch({ isGridView }) {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isTaskSheetLoading, setIsTaskSheetLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { connected, publicKey, connect } = useWallet();

  const fetchBatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/api/worker/fetchtask");

      if (response.status === 200 && response.data.status) {
        setBatches(response.data.tasks);
      } else {
        throw new Error("Failed to fetch batches");
      }
    } catch (err) {
      setError("Failed to fetch batches. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleBatchClick = async (batch) => {
      
      try {
        
       
      setIsTaskSheetLoading(true);
      
      const response = await apiClient.post("/api/worker/completed", {
        taskId: batch._id,
        type: batch.type,
      });
      
      
      if (response.status === 200) {
        if (response.data.status) {
          setNotificationMessage(
            response.data.message
          );
          setShowNotification(true);
        } else {
          setSelectedBatch(batch);
          setNotificationMessage("New task available");
          setShowNotification(true);
        }
      } else {
        throw new Error("API request failed");
      }
    }
    catch (error) {
      console.error("Error in handleBatchClick:", error);
      setNotificationMessage("An error occurred. Please try again.");
      setShowNotification(true);
    } finally {
      setIsTaskSheetLoading(false);
    }
  };

  const handleTaskCompletion = (batchId) => {
    setSelectedBatch(null);
    fetchBatches(); // Refresh batches after task completion
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}
      <div
        className={`grid ${
          isGridView
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {batches.map((batch) => (
          <div
            key={batch._id}
            className="cursor-pointer"
            onClick={() => handleBatchClick(batch)}
          >
            <BatchCard batch={batch} />
          </div>
        ))}
      </div>
      {isTaskSheetLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <Loader/>
        </div>
      )}
      {selectedBatch && (
        <TaskSheet
          batch={selectedBatch}
          onClose={() => setSelectedBatch(null)}
          onComplete={() => handleTaskCompletion(selectedBatch._id)}
        />
      )}
      {showNotification && (
        <Notification
          message={notificationMessage}
          type="info"
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}
