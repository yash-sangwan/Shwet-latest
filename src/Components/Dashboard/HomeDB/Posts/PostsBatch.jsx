// components/PostsBatch.jsx
import React, { useState, useEffect } from 'react';
import BatchCard from './BatchCard';
import TaskSheet from './TaskSheet';
import Notification from '../../../Notification';

const PostsBatch = ({ isGridView }) => {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isTaskSheetLoading, setIsTaskSheetLoading] = useState(false);
  const [completedBatches, setCompletedBatches] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Demo data
      setBatches([
        { id: 1, name: "Image Classification", taskCount: 5, labellersCompleted: 3, labellersNeeded: 5 },
        { id: 2, name: "Text Annotation", taskCount: 5, labellersCompleted: 1, labellersNeeded: 3 },
        { id: 3, name: "Audio Transcription", taskCount: 5, labellersCompleted: 4, labellersNeeded: 7 },
      ]);
    } catch (err) {
      setError("Failed to fetch batches. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchClick = (batch) => {
    if (completedBatches.includes(batch.id)) {
      setNotificationMessage("You've already completed this task. Please wait for new tasks or try other ones.");
      setShowNotification(true);
    } else {
      setSelectedBatch(batch);
      setIsTaskSheetLoading(true);
      // Simulating API call to fetch tasks
      setTimeout(() => {
        setIsTaskSheetLoading(false);
      }, 1000);
    }
  };

  const handleTaskCompletion = (batchId) => {
    setBatches(prevBatches => 
      prevBatches.map(batch => 
        batch.id === batchId 
          ? {...batch, 
             labellersCompleted: batch.labellersCompleted + 1,
             progress: ((batch.labellersCompleted + 1) / batch.labellersNeeded) * 100
            } 
          : batch
      )
    );
    setCompletedBatches(prev => [...prev, batchId]);
    setSelectedBatch(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
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
      <div className={`grid ${isGridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
        {batches.map((batch) => (
          <div key={batch.id} onClick={() => handleBatchClick(batch)}>
            <BatchCard batch={batch} />
          </div>
        ))}
      </div>
      {isTaskSheetLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {selectedBatch && !isTaskSheetLoading && (
        <TaskSheet
          batch={selectedBatch}
          onClose={() => setSelectedBatch(null)}
          onComplete={() => handleTaskCompletion(selectedBatch.id)}
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
};

export default PostsBatch;