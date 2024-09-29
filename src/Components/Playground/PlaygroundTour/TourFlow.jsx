import React, { useState } from 'react';
import SecondStep from './SecondStep'; 
import FirstStep from './FirstStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

function TourFlow({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
  
    const nextStep = () => {
      setCurrentStep((prevStep) => prevStep + 1);
    };
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return <FirstStep currentStep={currentStep} totalSteps={4} onNext={nextStep} />;
        case 2:
          return <SecondStep currentStep={currentStep} totalSteps={4} onNext={nextStep} />;
        case 3:
          return <ThirdStep currentStep={currentStep} totalSteps={4} onNext={nextStep} />;
        case 4:
          return <FourthStep currentStep={currentStep} totalSteps={4} onComplete={onComplete} />;
        default:
          return <div>Tour Finished</div>;
      }
    };
  
    return <div>{renderStep()}</div>;
  }
  
  
  

export default TourFlow;
