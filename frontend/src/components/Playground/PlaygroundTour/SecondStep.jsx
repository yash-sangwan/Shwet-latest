import React from "react";
import { ArrowRight } from "lucide-react";

function SecondStep({ currentStep, totalSteps, onNext }) {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-[#131416] rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Rewards and Analytics
        </h1>
        <p className="text-left text-gray-200 mb-8">
          5. Withdraw rewards by clicking on the token icon above on navbar.
          <br />
          6. You can any time check your contribution and rewards analytics in
          the right bar.
        </p>

        <div className="mb-8">
          {/* <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-PURPLESHADE3 to-PURPLESHADE5 mr-3"></div>
            <p className="text-gray-200">
              a pricing section with a title and a description
            </p>
          </div> */}

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((box, index) => (
              <div
                key={box}
                className={`bg-[#2a2a2a] p-4 rounded-lg ${
                  index === 2 ? "border-2 border-PURPLESHADE3" : ""
                }`}
              >
                <div className="h-4 bg-[#3a3a3a] rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-[#3a3a3a] rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-[#3a3a3a] rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="bg-PURPLESHADE5 hover:bg-PURPLESHADE2  text-white px-6 py-2 rounded-full flex items-center"
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
              className={`w-2 h-2 rounded-full ${
                index + 1 === currentStep ? "bg-white" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondStep;
