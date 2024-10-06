import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaBell, FaUsers } from "react-icons/fa";

const NavLinks = () => {
  const location = useLocation();

  const isExactPath = (path) => location.pathname === path;

  return (
    <div className="hidden items-center space-x-6 lg:flex">
      <NavLink 
        to="/user/dashboard" 
        end
        className={({ isActive }) => 
          `nav-link flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
            isActive || isExactPath('/user/dashboard')
              ? 'bg-gray-800 text-white' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300 focus:bg-gray-800 focus:text-gray-300'
          }`
        }
      >
        <FaHome className="text-xl" />
      </NavLink>
      <NavLink 
        to="/user/dashboard/group" 
        className={({ isActive }) => 
          `nav-link flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
            isActive 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300 focus:bg-gray-800 focus:text-gray-300'
          }`
        }
      >
        <FaUsers className="text-xl" />
      </NavLink>
      <NavLink 
        to="/user/dashboard/notifications" 
        className={({ isActive }) => 
          `nav-link flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
            isActive 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300 focus:bg-gray-800 focus:text-gray-300'
          }`
        }
      >
        <FaBell className="text-xl" />
      </NavLink>
    </div>
  );
};

export default NavLinks;