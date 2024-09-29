import React, { useState, useEffect } from 'react'
import { Plus, Folder } from 'lucide-react'
import CreateTask from '../CreateTask/CreateTask'
import TaskBoard from './Tasks/TaskBoard'
import BatchDetailsSheet from '../Batches/BatchDetailsSheet'
import { createBatch, getBatches, updateBatch } from './Tasks/TaskApi'



export default function FolderContent({ folder }) {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
  const [batches, setBatches] = useState([])
  const [selectedBatch, setSelectedBatch] = useState(null)

  useEffect(() => {
    fetchBatches()
  }, [folder.id])

  const fetchBatches = async () => {
    try {
      const fetchedBatches = await getBatches(folder.id)
      setBatches(fetchedBatches)
    } catch (error) {
      console.error('Failed to fetch batches:', error)
    }
  }

  const handleCreateBatch = async (batchData) => {
    try {
      const newBatch = await createBatch(folder.id, { ...batchData, status: 'pending' })
      setBatches(prevBatches => [...prevBatches, newBatch])
    } catch (error) {
      console.error('Failed to create batch:', error)
    }
    setIsCreateSheetOpen(false)
  }

  const handleUpdateBatch = async (updatedBatch) => {
    try {
      const result = await updateBatch(folder.id, updatedBatch.id, updatedBatch)
      setBatches(prevBatches => prevBatches.map(batch => 
        batch.id === result.id ? result : batch
      ))
    } catch (error) {
      console.error('Failed to update batch:', error)
    }
  }

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch)
  }

  return (
    <div className="mt-6 min-h-screen bg-gray-900 p-8">
      <div className="bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src={folder.icon} 
                alt={folder.name} 
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                <Folder className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{folder.name}</h2>
              <p className="text-gray-400 mt-1">Created on {new Date(folder.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateSheetOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="h-5 w-5" />
            <span>Add Batch</span>
          </button>
        </div>
        
        <TaskBoard batches={batches} onBatchClick={handleBatchClick} />
        
        {isCreateSheetOpen && (
          <CreateTask 
            onClose={() => setIsCreateSheetOpen(false)} 
            onCreateBatch={handleCreateBatch} 
            folderWorkType={folder.workType} 
          />
        )}

        {selectedBatch && (
          <BatchDetailsSheet
            batch={selectedBatch}
            onClose={() => setSelectedBatch(null)}
          />
        )}
      </div>
    </div>
  )
}