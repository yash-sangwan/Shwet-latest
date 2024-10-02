import React, { useState, useEffect } from 'react'

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500) // Delay the animation start by 500ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-6xl font-bold">404</h1>
        <div className="w-px h-16 bg-white opacity-50"></div>
        <div className="overflow-hidden">
          <p 
            className={`text-xl transform transition-all duration-1000 ease-out ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            This page could not be found.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound;