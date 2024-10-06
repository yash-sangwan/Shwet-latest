import React from 'react'
import { Mail } from 'lucide-react'

export default function ApplicationReviewSheet({ reviewPeriod = 2 }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-6 flex justify-center">
          
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Mail className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>

          <h2 className="text-2xl font-bold text-center text-gray-800">Thank-You for your contribution </h2><h3 className="text-xl font-bold text-center text-gray-800">Your application is under review</h3>
          </div>
          <p className="text-center text-gray-600">
            We'll review your contribution and email you with a response within {reviewPeriod} days.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-500 h-2.5 rounded-full w-2/3"></div>
          </div>
          <p className="text-center text-sm text-gray-500">Estimated review progress</p>
        </div>
        <div className="bg-gray-50 px-6 py-4">
      
        </div>
      </div>
    </div>
  )
}