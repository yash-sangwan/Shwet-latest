'use client'

import React, { useState, useEffect } from "react"
import NavbarDB from "../../Components/Dashboard/Navbar/NavbarDB"
import Sidebar from "../../Components/Dashboard/Sidebar"
import RightSidebar from "../../Components/Dashboard/RightSidebar"
import PostsBatch from "../../Components/Dashboard/HomeDB/Posts/PostsBatch"
import TourFlow from "../../Components/Dashboard/DashboardTour/TourFlow"

export default function HomeDB() {
  const [isGridView, setIsGridView] = useState(false)
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const checkTourStatus = () => {
      const hasSeenTour = localStorage.getItem('hasSeenTour')
      if (!hasSeenTour) {
        setShowTour(true)
        localStorage.setItem('hasSeenTour', 'true')
      }
    }

    checkTourStatus()
  }, [])

  const toggleView = () => {
    setIsGridView(!isGridView)
  }

  const onTourComplete = () => {
    setShowTour(false)
  }

  return (
    <div className="bg-[#131416] relative">
      <NavbarDB />
      <div className="grid grid-cols-12 gap-4 h-screen overflow-hidden">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-8 pt-16 bg-[#131416] h-full overflow-y-auto p-6 relative">
          <div className="z-20 bg-[#131416]">
            <button
              className={`p-2 ${isGridView ? "bg-gray-700" : "bg-gray-700"} text-white rounded-md flex sticky top-0`}
              onClick={toggleView}
            >
              {isGridView ? <i className="fa-regular fa-square"></i> : <i className="fa-solid fa-border-all"></i>}
            </button>
          </div>
          <div className={`grid bg-[#131416] ${isGridView ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6 mt-3`}>
            <PostsBatch isGridView={isGridView}  />
          </div>
        </div>
        <div className="col-span-2 bg-[#131416] h-full overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <TourFlow onComplete={onTourComplete} />
        </div>
      )}
    </div>
  )
}