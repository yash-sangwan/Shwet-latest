'use client'

import React, { useState, useEffect } from "react"
import { Folder, ChevronLeft, ChevronRight, Plus, Loader } from "lucide-react"

export default function SidebarPG({ onToggle, onTabChange, folders, activeTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleTabChange = (tab) => {
    console.log("SidebarPG: Tab clicked:", tab)
    onTabChange(tab)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onToggle(!isCollapsed)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={`flex flex-col pt-12 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-end p-2">
        <button onClick={toggleCollapse} className="p-2 rounded-full hover:bg-gray-700">
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto pr-2 pl-2">
        <ul className="py-4 space-y-2">
          <li>
            <button
              onClick={() => handleTabChange("CreateFolder")}
              className={`pr-2 space-x-4 text-white hover:bg-gray-800 rounded border-dashed border-gray-300 border flex items-center w-full p-3 transition-colors duration-200 ${
                activeTab === "CreateFolder"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            > 
              <Plus className="size-4" />
              {!isCollapsed && <span className="ml-3">Create Folder</span>}
            </button>
          </li>
          {folders.length === 0 ? (
            <li className="text-center text-gray-500">
              {isCollapsed ? <Loader className="mx-auto" size={24} /> : 'No folders yet'}
            </li>
          ) : (
            folders.map((folder) => (
              <li key={folder.id}>
                <button
                  onClick={() => handleTabChange(`Folder-${folder.id}`)}
                  className={`flex items-center w-full p-3 transition-colors duration-200 ${
                    activeTab === `Folder-${folder.id}`
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Folder className="size-4" />
                  {!isCollapsed && <span className="ml-3">{folder.name}</span>}
                </button>
              </li>
            ))
          )}
        </ul>
      </nav>
    </div>
  )
}