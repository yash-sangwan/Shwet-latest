import React, { useState } from 'react';

const EmailVerification = () => {
  const [email, setEmail] = useState('johndoe@abc.com');
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Please verify your email
          </h2>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            You're almost there! We sent an email to
          </p>
          <p className="mt-1 text-center text-sm font-medium text-gray-800">
            {email}
          </p>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Just click on the link in that email to complete your signup.
            If you don't see it, you may need to <span className="font-medium">check your spam</span> folder.
          </p>
          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Still can't find the email?
            </p>
           
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Need help? <a href="#" className="font-medium text-green-600 hover:text-green-500">HomePage</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;