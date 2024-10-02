import React, { useState } from 'react'
import { Plus, X, FileAudio } from 'lucide-react'

const AudioInput = ({ audio, onAddAudio, onRemoveAudio }) => {
  const [fileName, setFileName] = useState('')

  const handleAddAudio = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'audio/mp3' || file.type === 'audio/wav')) {
      setFileName(file.name)
      onAddAudio(e)
    } else {
      alert('Please select an MP3 or WAV file.')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Audio</h3>
      <div className="flex items-center gap-4">
        {audio ? (
          <div className="relative w-full max-w-xs">
            <div className="bg-gray-700 rounded-md p-3 flex items-center">
              <FileAudio className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-white truncate">{fileName}</span>
            </div>
            <audio controls className="w-full mt-2">
              <source src={URL.createObjectURL(audio)} type={audio.type} />
              Your browser does not support the audio element.
            </audio>
            <button
              type="button"
              onClick={() => {
                onRemoveAudio()
                setFileName('')
              }}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
              aria-label="Remove audio"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-full max-w-xs h-12 bg-gray-700 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
            <input
              type="file"
              accept=".mp3,.wav"
              onChange={handleAddAudio}
              className="hidden"
            />
            <Plus className="w-6 h-6 text-gray-400 mr-2" />
            <span className="text-gray-400">Add MP3 or WAV</span>
          </label>
        )}
      </div>
    </div>
  )
}

export default AudioInput