import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'
import ImageInput from './Management/ImageInput'
import TextInput from './Management/TextInput'
import AudioInput from './Management/AudioInput'

const CreateTask = ({ onClose, onCreateBatch, folderWorkType }) => {
  const [batchName, setBatchName] = useState('')
  const [budget, setBudget] = useState('')
  const [numLabelers, setNumLabelers] = useState(0)
  const [task, setTask] = useState({
    id: Date.now(),
    name: '',
    description: '',
    images: [],
    texts: [''],
    audios: [],
    completedLabels: 0
  })

  const handleTaskChange = (field, value) => {
    setTask({ ...task, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateBatch({
      name: batchName,
      tasks: [task], // Now we're only sending one task
      budget: parseFloat(budget),
      numLabelers
    })
    onClose()
  }

  const handleBudgetChange = (e) => {
    const value = e.target.value
    setBudget(value)
    const budgetNum = parseFloat(value)
    if (!isNaN(budgetNum)) {
      setNumLabelers(Math.max(1, Math.floor(budgetNum / 5)))
    } else {
      setNumLabelers(0)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Create New Batch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="batchName" className="block text-sm font-medium text-gray-300 mb-1">
                Batch Name
              </label>
              <input
                id="batchName"
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter batch name"
              />
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                Budget ($)
              </label>
              <input
                id="budget"
                type="number"
                value={budget}
                onChange={handleBudgetChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter budget"
              />
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-300">
              Number of Labelers: {numLabelers}
            </span>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleTaskChange('name', e.target.value)}
                placeholder="Task Name"
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleTaskChange('description', e.target.value)}
                placeholder="Task Description"
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {folderWorkType === 'image' && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Images</h3>
                <div className="flex flex-wrap gap-4">
                  {task.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Task Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleTaskChange('images', task.images.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 flex items-center justify-center bg-gray-600 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleTaskChange('images', [...task.images, e.target.files[0]])
                        }
                      }}
                      className="hidden"
                    />
                    <Plus className="w-8 h-8 text-gray-400" />
                  </label>
                </div>
              </div>
            )}
            {folderWorkType === 'text' && (
              <TextInput
                texts={task.texts}
                onAddText={() => handleTaskChange('texts', [...task.texts, ''])}
                onTextChange={(index, value) => {
                  const newTexts = [...task.texts]
                  newTexts[index] = value
                  handleTaskChange('texts', newTexts)
                }}
                onRemoveText={(index) => {
                  handleTaskChange('texts', task.texts.filter((_, i) => i !== index))
                }}
              />
            )}
            {folderWorkType === 'audio' && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Audios</h3>
                <div className="flex flex-wrap gap-4">
                  {task.audios.map((audio, index) => (
                    <div key={index} className="relative">
                      <audio controls className="w-full max-w-xs">
                        <source src={URL.createObjectURL(audio)} type={audio.type} />
                        Your browser does not support the audio element.
                      </audio>
                      <button
                        type="button"
                        onClick={() => handleTaskChange('audios', task.audios.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="flex items-center justify-center w-full max-w-xs h-12 bg-gray-600 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleTaskChange('audios', [...task.audios, e.target.files[0]])
                        }
                      }}
                      className="hidden"
                    />
                    <Plus className="w-6 h-6 text-gray-400 mr-2" />
                    <span className="text-gray-400">Add Audio</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Create Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask