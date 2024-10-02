import React from "react";
import { ArrowRight, MousePointer } from "lucide-react";

function ThirdStep({ currentStep, totalSteps, onNext }) {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-[#131416] rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Complete Tasks
        </h1>
        <p className="text-left text-gray-200 mb-8">
          2. Go through the available batches.
          <br />
          3. Click on any batch and start contribution.
          <br />
          4. Complete all the tasks of the batch, submit and earn $Shwet
        </p>

        <div className="relative mb-8">
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <div className="h-16 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-4 bg-PURPLESHADE3/70 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-PURPLESHADE3/50 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>

          {/* <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs">
            <p className="text-sm text-gray-700">
              Make this text longer and add a secondary button
            </p>
          </div> */}

          <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <MousePointer className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="bg-PURPLESHADE5 hover:bg-PURPLESHADE2  text-white px-6 py-2 rounded-full flex items-center"
            onClick={onNext} // Make sure this calls the onNext function passed from the parent
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
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThirdStep;
