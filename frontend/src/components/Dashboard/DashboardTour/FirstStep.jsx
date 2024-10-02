import React from 'react';
import { ArrowRight, Atom, Zap , AlignJustify , ListCheck, Wallet} from 'lucide-react';

function FirstStep({ currentStep = 1, totalSteps = 4, onNext }) {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-[#131416] rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Playground</h1>
        <p className="text-center text-gray-200 mb-8">
        This 4-step quick tour will help you navigate seamlessly through the Playground
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-PURPLESHADE3">
            <Zap className="w-6 h-6 text-PURPLESHADE4" />
          </div>
          <div className="border-t-2 border-PURPLESHADE3 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <AlignJustify className="w-6 h-6 text-gray-400" />
          </div>
          <div className="border-t-2 border-PURPLESHADE3 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <ListCheck className="w-6 h-6 text-gray-400" />
          </div>
          <div className="border-t-2 border-PURPLESHADE3 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Wallet className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
          <p className='py-2 text-left'>1. Start with connecting your wallet.</p>
          <div className="h-4 bg-[#3a3a3a] rounded w-3/4 mb-4" />
          <div className="h-4 bg-[#3a3a3a] rounded w-1/2 mb-4" />
          <div className="h-8 bg-[#3a3a3a] rounded w-1/4" />
        </div>
        <div className="flex justify-center mb-6">
          <button
            className="bg-PURPLESHADE5 hover:bg-PURPLESHADE2 text-white px-6 py-2 rounded-full flex items-center"
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
                index + 1 === currentStep ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FirstStep;
