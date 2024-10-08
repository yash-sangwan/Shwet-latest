"use client";

import React, { useState, useEffect } from "react";
import NavbarDB from "../../Components/Playground/NavbarPG";
import SidebarPG from "../../Components/Playground/SidebarPG";
import CreateFolder from "../../Components/Playground/CreateFolder";
import FolderContent from "../../Components/Playground/Content/FolderContent";
import Default from "../../Components/Playground/Default";
import TourFlow from "../../Components/Playground/PlaygroundTour/TourFlow"
import apiClient from "../../Components/api/apiClient";

export default function Playground() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
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

  
  const onTourComplete = () => {
    setShowTour(false)
  }

  
  const fetchFolders = async () => {
    try {
      const response = await apiClient.get("/api/task/groups");
      if (response.status === 200 && response.data.status) {
        const storedFolders = response.data.data;
        const transformedGroups = storedFolders.map(group => ({
          id: group._id,
          taskerId: group.taskerId,
          groupTitle: group.groupTitle,
          taskType: group.taskType,
          folder: group.folder,
          createdAt: new Date(group.createdAt).toLocaleDateString(),
          icon: group.icon || null,
        }));
        
        setFolders(transformedGroups);
      }
    } catch (err) {
      setError("Failed to fetch folders.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("Fetching folders..."); // Log before fetching

    fetchFolders();

  }, []);

  const handleFolderCreated = async (newFolder) => {
    await fetchFolders();
    setActiveTab(`Folder-${newFolder.id}`);
    setIsCreateFolderOpen(false);
  };

  const handleTabChange = (tab) => {
    // console.log("Tab changed to:", tab);
    if (tab === "CreateFolder") {
      setIsCreateFolderOpen(true);
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
      setIsCreateFolderOpen(false);
    }
  };

  const renderContent = () => {
    // console.log("Rendering content for activeTab:", activeTab);

    if (isLoading) {
      return <div className="text-white">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (isCreateFolderOpen || activeTab === "CreateFolder") {
      return (
        <CreateFolder
          onFolderCreated={handleFolderCreated}
          onClose={() => {
            setIsCreateFolderOpen(false);
            setActiveTab("");
          }}
        />
      );
    }

    if (activeTab.startsWith("Folder-")) {
      const folderId = activeTab.split("-")[1];
      const folder = folders.find((f) => f.id.toString() === folderId);
      return folder ? <FolderContent folder={folder} /> : <Default />;
    }

    return <Default />;
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <SidebarPG
        onToggle={setIsCollapsed}
        onTabChange={handleTabChange}
        folders={folders}
        activeTab={activeTab}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarDB />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <div className="max-w-8xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <TourFlow onComplete={onTourComplete} />
        </div>
      )}
    </div>
  );
}
