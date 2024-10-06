import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Inbox, CheckCircle, AlertCircle, Plus } from 'lucide-react'

const TaskBoard = ({ batches, onBatchClick }) => {
  const [expandedBatchId, setExpandedBatchId] = useState(null)

  const toggleBatch = (batchId) => {
    setExpandedBatchId(expandedBatchId === batchId ? null : batchId)
  }

  const pendingBatches = batches.filter(batch => batch.active === true)
  const doneBatches = batches.filter(batch => batch.active === false)

  const renderBatchList = (batchList, title, icon, emptyStateMessage) => (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold text-white ml-2">{title}</h2>
      </div>
      {batchList.length > 0 ? (
        <div className="space-y-4">
          {batchList.map((batch) => (
            <div key={batch._id} className="bg-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleBatch(batch._id)}
              >
                <h3 className="text-lg font-semibold text-white">{batch.taskTitle}</h3>
                <div className="flex items-center">
                  <span className="text-gray-300 mr-4">
                    Budget: {batch.amount.$numberDecimal} SOL  | Labelers: {batch.currentSubmissions}/{batch.workerCount}
                  </span>
                  <span className="text-gray-300 mr-2">
                    {/* {Object.keys(batch.images).length} task{Object.keys(batch.images).length !== 1 ? 's' : ''} */}
                  </span>
                  {expandedBatchId === batch._id ? (
                    <ChevronUp className="h-5 w-5 text-gray-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              </div>
              {expandedBatchId === batch._id && (
                <div className="p-4 border-t border-gray-600">
                  {/* {batch.tasks.map((task) => ( */}
                    {/* <div key={batch._id} className="bg-gray-800 p-3 rounded-md mb-2 last:mb-0">
                      <h4 className="text-white font-medium mb-1">{batch.taskTitle}</h4>
                      <p className="text-gray-300 text-sm">{batch.description}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Labelers: {batch.currentSubmissions}/{batch.workerCount}
                      </p>
                    </div> */}
                  {/* ))} */}
                  <button
                    onClick={() => onBatchClick(batch)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-8 text-center">
          <Plus className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg mb-4">{emptyStateMessage}</p>
          {title === "Pending Batches" && (
            <p className="text-gray-400">Click the "Add Batch" button to create your first batch!</p>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {renderBatchList(
        pendingBatches,
        "Pending Batches",
        <Inbox className="h-6 w-6 text-blue-500" />,
        "No pending batches yet"
      )}
      {renderBatchList(
        doneBatches,
        "Done Batches",
        <CheckCircle className="h-6 w-6 text-green-500" />,
        "No completed batches yet"
      )}
    </div>
  )
}

export default TaskBoard