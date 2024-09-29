// components/BatchSheet.jsx
import React from 'react';
import { getMidToneColor } from '../ColorUtils';

const BatchSheet = ({ batch, onClose }) => {
  const accentColor = React.useMemo(() => getMidToneColor(), []);
  const progress = (batch.labellersCompleted / batch.labellersNeeded) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 transform transition-all duration-300 ease-in-out relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16" style={{
          background: accentColor,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}></div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{batch.name}</h2>
        <p className="text-gray-300 mb-2">{batch.description}</p>
        <p className="text-gray-300 mb-2">Tasks: {batch.taskCount}</p>
        <p className="text-gray-300 mb-4">Labellers: {batch.labellersCompleted}/{batch.labellersNeeded}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${progress}%`, backgroundColor: accentColor }}
          ></div>
        </div>
        <p className="text-gray-300 text-sm">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  );
};

export default BatchSheet;