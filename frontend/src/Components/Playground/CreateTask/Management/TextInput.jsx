import React from 'react'
import { Plus, X } from 'lucide-react'


const TextInput = ({ texts, onAddText, onTextChange, onRemoveText }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Texts</h3>
      {texts.map((text, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(index, e.target.value)}
            placeholder={`Text ${index + 1}`}
            className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => onRemoveText(index)}
            className="ml-2 text-red-400 hover:text-red-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddText}
        className="flex items-center text-blue-400 hover:text-blue-300"
      >
        <Plus className="w-4 h-4 mr-1" /> Add Text
      </button>
    </div>
  )
}

export default TextInput