import React from 'react'
import { X } from 'lucide-react'

const BatchDetailsSheet = ({ batch, onClose }) => {
  const totalCompletedLabels = batch.tasks.reduce((sum, task) => sum + task.completedLabels, 0)
  const totalLabelers = batch.numLabelers * batch.tasks.length

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{batch.name}</h2>
        <div className="mb-4">
          <span className="text-gray-300">Budget: ${batch.budget}</span>
          <span className="text-gray-300 ml-4">Status: {batch.status}</span>
          <span className="text-gray-300 ml-4">
            Total Labelers: {totalCompletedLabels}/{totalLabelers}
          </span>
        </div>
        <div className="space-y-4">
          {batch.tasks.map((task) => (
            <div key={task.id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{task.name}</h3>
              <p className="text-gray-300 mb-2">{task.description}</p>
              <p className="text-gray-400 mb-2">
                Labelers: {task.completedLabels}/{batch.numLabelers}
              </p>
              {task.images && task.images.length > 0 && (
                <div className="mb-2">
                  <h4 className="text-white font-medium mb-1">Images:</h4>
                  <div className="flex flex-wrap gap-2">
                    {task.images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Task Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
              {task.texts && task.texts.length > 0 && (
                <div className="mb-2">
                  <h4 className="text-white font-medium mb-1">Texts:</h4>
                  {task.texts.map((text, index) => (
                    <p key={index} className="text-gray-300 text-sm">{text}</p>
                  ))}
                </div>
              )}
              {task.audios && task.audios.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-1">Audios:</h4>
                  <div className="flex flex-wrap gap-2">
                    {task.audios.map((audio, index) => (
                      <audio key={index} controls className="w-full max-w-xs">
                        <source src={URL.createObjectURL(audio)} type={audio.type} />
                        Your browser does not support the audio element.
                      </audio>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BatchDetailsSheet