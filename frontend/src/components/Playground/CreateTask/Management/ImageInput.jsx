import React from 'react'
import { Plus, X } from 'lucide-react'

const ImageInput= ({ image, onAddImage, onRemoveImage }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Image</h3>
      <div className="flex items-center gap-4">
        {image ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="w-24 h-24 flex items-center justify-center bg-gray-700 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
            <input
              type="file"
              accept="image/*"
              onChange={onAddImage}
              className="hidden"
            />
            <Plus className="w-8 h-8 text-gray-400" />
          </label>
        )}
      </div>
    </div>
  )
}

export default ImageInput