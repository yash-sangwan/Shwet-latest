import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-6xl font-bold">404</h1>
        <div className="w-px h-16 bg-white opacity-50"></div>
        <p className="text-xl">This page could not be found.</p>
      </div>
    </div>
  )
}

export default PageNotFound