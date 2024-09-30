import React from 'react';
import { ArrowRight } from 'lucide-react';

function SecondStep({ currentStep, totalSteps, onNext }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Start with a prompt or an image</h1>
        <p className="text-center text-gray-600 mb-8">
          When you submit a prompt or upload an image, v0 will use AI to
          <br />
          generate three different UIs.
        </p>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 mr-3"></div>
            <p className="text-gray-700">a pricing section with a title and a description</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((box, index) => (
              <div 
                key={box} 
                className={`bg-gray-100 p-4 rounded-lg ${index === 2 ? 'border-2 border-cyan-400' : ''}`}
              >
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            className="bg-black text-white px-6 py-2 rounded-full flex items-center"
            onClick={onNext} 
          >
            Next
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index + 1 === currentStep ? 'bg-gray-800' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondStep;
