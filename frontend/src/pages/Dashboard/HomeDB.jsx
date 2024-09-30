import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import NavbarDB from "../../Components/Dashboard/Navbar/NavbarDB";
import Sidebar from "../../Components/Dashboard/Sidebar";
import RightSidebar from "../../Components/Dashboard/RightSidebar";
import PostsBatch from "../../Components/Dashboard/HomeDB/Posts/PostsBatch";

const HomeDB = () => {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="bg-gray-900 relative">
     
      <NavbarDB />
      <div className="grid grid-cols-12 gap-4 h-screen overflow-hidden">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-8 pt-16 bg-gray-900 h-full overflow-y-auto p-6 relative">
          <div className="z-20 bg-gray-900">
            <button
              className={`p-2 ${isGridView ? "bg-gray-700" : "bg-gray-700"} text-white rounded-md flex sticky top-0`}
              onClick={toggleView}
            >
              {isGridView ? <i className="fa-regular fa-square"></i> : <i className="fa-solid fa-border-all"></i>}
            </button>
          </div>
          <div className={`grid ${isGridView ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6 mt-3`}>
            <PostsBatch isGridView={isGridView} />
          </div>
        </div>
        <div className="col-span-2 bg-gray-900 h-full overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomeDB;