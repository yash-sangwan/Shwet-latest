import React from 'react'
import { Plus, X } from 'lucide-react'

const AudioInput = ({ audio, onAddAudio, onRemoveAudio }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Audio</h3>
      <div className="flex items-center gap-4">
        {audio ? (
          <div className="relative">
            <audio controls className="w-full max-w-xs">
              <source src={URL.createObjectURL(audio)} type={audio.type} />
              Your browser does not support the audio element.
            </audio>
            <button
              type="button"
              onClick={onRemoveAudio}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-full max-w-xs h-12 bg-gray-700 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
            <input
              type="file"
              accept="audio/*"
              onChange={onAddAudio}
              className="hidden"
            />
            <Plus className="w-6 h-6 text-gray-400 mr-2" />
            <span className="text-gray-400">Add Audio</span>
          </label>
        )}
      </div>
    </div>
  )
}

export default AudioInput