// components/BatchSheet.jsx
import React from 'react';
import { getMidToneColor } from '../ColorUtils';

const BatchSheet = ({ batch, onClose }) => {
  const accentColor = React.useMemo(() => getMidToneColor(), []);
  const progress = (batch.labellersCompleted / batch.labellersNeeded) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 transform transition-all duration-300 ease-in-out relative overflow-hidden shadow-2xl">
      <div
        className="absolute top-0 left-0 w-2 h-full"
        style={{
          background: accentColor,
        }}
      ></div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-2 text-left">{batch.name}</h2>
        <p className="text-gray-300 text-lg text-left">{batch.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Tasks</span>
            <span className="text-white font-semibold">{batch.taskCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Labellers</span>
            <span className="text-white font-semibold">
              {batch.labellersCompleted}/{batch.labellersNeeded}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-semibold">{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BatchSheet;