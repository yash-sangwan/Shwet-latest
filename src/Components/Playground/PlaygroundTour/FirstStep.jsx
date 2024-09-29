import React from 'react';
import { ArrowRight, Pencil, Shuffle, Atom } from 'lucide-react';

function FirstStep({ currentStep = 1, totalSteps = 4, onNext }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Playground</h1>
        <p className="text-center text-gray-600 mb-8">
Here you can create your provider and their oracles
          <br />
          Here is the step by step guide..
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100">
            <Pencil className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="border-t-2 border-cyan-200 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Shuffle className="w-6 h-6 text-gray-400" />
          </div>
          <div className="border-t-2 border-gray-200 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Atom className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
          <div className="h-8 bg-gray-300 rounded w-1/4" />
        </div>
        <div className="flex justify-center mb-6">
          <button
            className="bg-black text-white px-6 py-2 rounded-full flex items-center"
            onClick={onNext} // Call the onNext function to move to the next step
          >
            Next
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center space-x-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index + 1 === currentStep ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FirstStep;
