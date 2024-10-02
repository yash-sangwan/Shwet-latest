// components/BatchCard.jsx
import React, { useMemo } from 'react';

const gradients = [
  'linear-gradient(135deg, #7C69EE 0%, #4C3FE2 100%)',
  'linear-gradient(135deg, #9969EE 0%, #6C3FE2 100%)',
  'linear-gradient(135deg, #6C89EE 0%, #4C5FE2 100%)'
];

const BatchCard = ({ batch }) => {
  const gradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  }, []);

  const progress = (batch.currentSubmissions / batch.workerCount) * 100;

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      style={{ background: gradient }}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20" style={{
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      }}></div>
      <div className="p-6 text-left">
        <h3 className="text-2xl font-bold text-white mb-3">{batch.taskTitle}</h3>
        <p className="text-gray-200 mb-1">Tasks : {Object.keys(batch.task).length}</p>
        <p className="text-gray-200 mb-4">Contributors : {batch.currentSubmissions}/{batch.workerCount}</p>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
          <div 
            className="h-2 rounded-full bg-yellow-400"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-200 text-sm">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  );
};

export default BatchCard;