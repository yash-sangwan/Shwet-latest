import React from 'react';
import { ArrowRight } from 'lucide-react';

function FourthStep({ onComplete }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to v0</h1>
        <p className="text-center text-gray-600 mb-8">
          By clicking "Start Generating" or using this
          <br />
          product, you accept the <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>. This
          <br />
          Agreement will renew automatically, unless you
          <br />
          cancel, as set forth in the Agreement.
        </p>
        
        <div className="flex justify-center mb-6">
          <button
            className="bg-black text-white px-6 py-2 rounded-full flex items-center"
            onClick={onComplete} // Call onComplete when user clicks the final button
          >
            Start Generating
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step === 4 ? 'bg-gray-800' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FourthStep;
