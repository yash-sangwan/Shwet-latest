import React from 'react';
import { NavLink } from "react-router-dom";
import { FaHome, FaBell, FaUsers } from "react-icons/fa";

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-6">
      <NavLink to="/user/dashboard" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaHome className="text-xl" />
      </NavLink>
      <NavLink to="/user/dashboard/group" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaUsers className="text-xl" />
      </NavLink>
      <NavLink to="/user/dashboard/notifications" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaBell className="text-xl" />
      </NavLink>
    </div>
  );
};

export default NavLinks;