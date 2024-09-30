"use client"

import React, { useState } from 'react'
import { X } from 'lucide-react'
import apiClient from '../api/apiClient'


export default function CreateFolder({ onFolderCreated, onClose }) {
  const [folderName, setFolderName] = useState('')
  const [folderIcon, setFolderIcon] = useState('')
  const [workType, setWorkType] = useState('image')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (folderName && folderIcon) {
      setIsLoading(true)
      setError(null)   
      try {
        // Simulating API call
        const response = await apiClient.post("/api/task/creategroup" , {groupTitle : folderName , icon : folderIcon , workType: workType.toUpperCase()});

        if(response.status === 200){
          if(response.data.status){
            const newFolder = response.data.data;
            onFolderCreated(newFolder)
          }
        }
        setFolderName('')
        setFolderIcon('')
        setWorkType('image')
      } catch (err) {
        setError('Failed to create folder. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="px-6 py-4 bg-gray-700 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-white">Create New Folder</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="folderName" className="block text-sm font-medium text-gray-300">
                Folder Name
              </label>
              <input
                id="folderName"
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="folderIcon" className="block text-sm font-medium text-gray-300">
                Folder Icon URL
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  <img
                    src={folderIcon || '/placeholder.svg?height=150&width=150'}
                    alt="Folder Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  id="folderIcon"
                  type="text"
                  value={folderIcon}
                  onChange={(e) => setFolderIcon(e.target.value)}
                  placeholder="Enter icon URL"
                  required
                  className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Work Type
              </label>
              <div className="flex space-x-4">
                {['image', 'text', 'audio'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      value={type}
                      checked={workType === type}
                      onChange={(e) => setWorkType(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                    />
                    <span className="ml-2 text-gray-300 capitalize">{type} Labelling</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Folder'}
            </button>
          </form>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  )
}