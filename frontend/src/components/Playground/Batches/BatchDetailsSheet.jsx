import React from 'react'
import { X } from 'lucide-react'

const BatchDetailsSheet = ({ batch, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{batch.taskTitle}</h2>
        <div className="mb-4">
          <span className="text-gray-300">Budget: {batch.amount.$numberDecimal} SOL</span>
          <span className="text-gray-300 ml-4">Status: {batch.active ? 'Active' : 'Inactive'}</span>
          <span className="text-gray-300 ml-4">
            Submissions: {batch.currentSubmissions}/{batch.workerCount}
          </span>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 mb-2">{batch.description}</p>
            
            {batch.images && Object.keys(batch.images).length > 0 && (
              <div className="mb-2">
                <h4 className="text-white font-medium mb-1">Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(batch.images).map(([key, image]) => (
                    <div key={key} className="relative p-2">
                      <img
                        src={image}
                        alt={`Task Image ${key}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      {!batch.active && batch.answers && batch.answers[key] && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-bl-md">
                          {batch.answers[key]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {batch.audios && Object.keys(batch.audios).length > 0 && (
              <div className="mb-2">
                <h4 className="text-white font-medium mb-1">Audios:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(batch.audios).map(([key, audio]) => (
                    <div key={key} className="relative w-full max-w-xs p-2">
                      <audio controls className="w-full">
                        <source src={audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      {!batch.active && batch.answers && batch.answers[key] && (
                        <div className="mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded-md">
                          Answer: {batch.answers[key]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {batch.text && Object.keys(batch.text).length > 0 && (
              <div className="mb-2 p-2">
                <h4 className="text-white font-medium mb-1">Texts:</h4>
                {Object.entries(batch.text).map(([key, text]) => (
                  <div key={key} className="mb-2">
                    <p className="text-gray-300 text-sm">{text}</p>
                    {!batch.active && batch.answers && batch.answers[key] && (
                      <div className="mt-1 bg-blue-500 text-white px-2 py-1 text-sm rounded-md">
                        Answer: {batch.answers[key]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          Created at: {new Date(batch.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default BatchDetailsSheet;