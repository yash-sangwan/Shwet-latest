import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EnhancedSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(' ');
  const [activeLabellingCategory, setActiveLabellingCategory] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const isNotificationsTab = location.pathname === "/user/dashboard/notifications";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const labellingCategories = [
    { name: 'Image Labelling', icon: 'fa-solid fa-image' },
    { name: 'Text Labelling', icon: 'fa-solid fa-font' },
    { name: 'Audio Labelling', icon: 'fa-solid fa-music' },
    { name: '3D Image Labelling', icon: 'fa-solid fa-cube' },
    { name: 'Mapping Data', icon: 'fa-solid fa-map-location-dot' }
  ];

  const dataRelatedToCategories = [
    { name: 'Computer Science', icon: 'fa-solid fa-laptop-code' },
    { name: 'Education', icon: 'fa-solid fa-graduation-cap' },
    { name: 'Classification', icon: 'fa-solid fa-tags' },
    { name: 'Computer Vision', icon: 'fa-solid fa-eye' },
    { name: 'NLP', icon: 'fa-solid fa-language' },
  ];

  const notificationTabs = [
    { name: 'All Notifications', icon: 'fa-solid fa-bell' },
    { name: 'Your Contribution', icon: 'fa-solid fa-file-lines' },
    { name: 'Your profile', icon: 'fa-solid fa-user' },
    { name: 'Announcements', icon: 'fa-solid fa-bullhorn' },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/read/${category.toLowerCase()}`);
    showToast();
  };

  const handleLabellingCategoryClick = (category) => {
    setActiveLabellingCategory(category);
    showToast();
  };

  const showToast = () => {
    toast.info("This feature is not functional in the MVP", { 
      autoClose: 2000,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const renderSidebarContent = () => (
    <>
      <div className='overflow-hidden'>
        {!isNotificationsTab && (
          <div className="mb-6">
            <button 
              className="w-full flex items-center justify-between text-left text-sm p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors duration-200 cursor-not-allowed"
              // onClick={showToast}
            >
              <span className="flex items-center">
                <i className="fa-solid fa-plus mr-2"></i>
                {!isMobile && "Create Data Group"}
              </span>
              {!isMobile && <span className="bg-PURPLESHADE3 text-black text-xs px-2 py-1 rounded-full">Soon</span>}
            </button>
          </div>
        )}

        {!isNotificationsTab && (
          <>
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">{!isMobile && "Labelling Categories"}</h3>
              {labellingCategories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full text-left text-sm p-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                    activeLabellingCategory === category.name ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  // onClick={() => handleLabellingCategoryClick(category.name)}
                >
                  <i className={`${category.icon} w-5`}></i>
                  {!isMobile && <span>{category.name}</span>}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">{!isMobile && "Data Related To"}</h3>
              {dataRelatedToCategories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full text-left text-sm p-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                    activeCategory === category.name ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  // onClick={() => handleCategoryClick(category.name)}
                >
                  <i className={`${category.icon} w-5`}></i>
                  {!isMobile && <span>{category.name}</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {isNotificationsTab && (
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">{!isMobile && "Notification Filters"}</h3>
            {notificationTabs.map((tab) => (
              <button
                key={tab.name}
                className="w-full text-left text-sm p-3 rounded-lg flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                // onClick={showToast}
              >
                <i className={`${tab.icon} w-5`}></i>
                {!isMobile && <span>{tab.name}</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="text-xs text-gray-500">
          <a href="#" className="hover:text-white">About</a> · 
          <a href="#" className="hover:text-white">Careers</a> · 
          <a href="#" className="hover:text-white">Terms</a> · 
          <a href="#" className="hover:text-white">Privacy</a> · 
          <a href="#" className="hover:text-white">Acceptable Use</a> · 
          <a href="#" className="hover:text-white">Advertise</a> · 
          <a href="#" className="hover:text-white">Press</a> · 
          <a href="#" className="hover:text-white">Your Ad Choices</a>
          <p className="mt-2">© 2024 Shwet. All rights reserved.</p>
        </div>
      )}
    </>
  );

  return (
    <div className={`fixed h-screen ${isMobile ? 'w-16' : 'w-64'} bg-[#131416] text-white flex flex-col justify-between p-4 pt-24 z-40 overflow-y-auto transition-all duration-300`}>
      {renderSidebarContent()}
    </div>
  );
};

export default EnhancedSidebar;