import React from 'react';

const Content = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg h-full text-white pt-10">
      <h2 className="text-lg font-semibold">Playground</h2>
      <textarea 
        className="w-full bg-gray-700 p-3 text-sm text-white mt-4 rounded-lg h-32 resize-none"
        placeholder="Enter user message..."
      ></textarea>
      <button className="bg-blue-500 mt-4 px-4 py-2 rounded text-sm">
        Run
      </button>
    </div>
  );
};

export default Content;
