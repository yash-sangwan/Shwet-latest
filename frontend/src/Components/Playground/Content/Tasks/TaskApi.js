import apiClient from "../../../api/apiClient";

const API_BASE_URL = 'https://your-api-url.com/api'


const simulateApiCall = (data, successRate = 0.8) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve(data)
      } else {
        reject(new Error('API call failed'))
      }
    }, 1000)
  })
}

export const createBatch = async (folderId, batchData) => {
  const newBatch = {
    id: Date.now(),
    ...batchData,
    createdAt: new Date().toISOString()
  }
  
  try {
    const response = await simulateApiCall(newBatch)
    return response
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    batches.push(newBatch)
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(batches))
    return newBatch
  }
}

export const getBatches = async (folderId) => {
  try {
    // const response = await simulateApiCall([])
    const response = await apiClient.post('/api/task/groups/task' , {groupId: folderId} );
    if(response.status === 200 && response.data.status){
      return response.data.data;
    }
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    return JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
  }
}

export const updateBatch = async (folderId, batchId, updates) => {
  try {
    const response = await simulateApiCall({ ...updates, id: batchId })
    return response
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const updatedBatches = batches.map(batch => 
      batch.id === batchId ? { ...batch, ...updates } : batch
    )
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(updatedBatches))
    return updatedBatches.find(batch => batch.id === batchId)
  }
}

export const createTask = async (folderId, batchId, taskData) => {
  const newTask = {
    id: Date.now(),
    ...taskData,
    completedLabels: 0,
    createdAt: new Date().toISOString()
  }
  
  try {
    const response = await simulateApiCall(newTask)
    return response
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const updatedBatches = batches.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          tasks: [...(batch.tasks || []), newTask]
        }
      }
      return batch
    })
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(updatedBatches))
    return newTask
  }
}

export const getTasks = async (folderId, batchId) => {
  try {
    const response = await simulateApiCall([])
    return response
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const batch = batches.find(b => b.id === batchId)
    return batch ? batch.tasks || [] : []
  }
}

export const updateTask = async (folderId, batchId, taskId, updates) => {
  try {
    const response = await simulateApiCall({ ...updates, id: taskId })
    return response
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const updatedBatches = batches.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          tasks: (batch.tasks || []).map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        }
      }
      return batch
    })
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(updatedBatches))
    const updatedBatch = updatedBatches.find(b => b.id === batchId)
    return updatedBatch ? updatedBatch.tasks.find(t => t.id === taskId) : null
  }
}

export const deleteTask = async (folderId, batchId, taskId) => {
  try {
    await simulateApiCall({ success: true })
    return { success: true }
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const updatedBatches = batches.map(batch => {
      if (batch.id === batchId) {
        return {
          ...batch,
          tasks: (batch.tasks || []).filter(task => task.id !== taskId)
        }
      }
      return batch
    })
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(updatedBatches))
    return { success: true }
  }
}

export const deleteBatch = async (folderId, batchId) => {
  try {
    await simulateApiCall({ success: true })
    return { success: true }
  } catch (error) {
    console.error('API request failed:', error)
    // Fallback to local storage
    const batches = JSON.parse(localStorage.getItem(`batches_${folderId}`) || '[]')
    const updatedBatches = batches.filter(batch => batch.id !== batchId)
    localStorage.setItem(`batches_${folderId}`, JSON.stringify(updatedBatches))
    return { success: true }
  }
}
