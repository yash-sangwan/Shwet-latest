import React from 'react';
import { NavLink } from "react-router-dom";
import { FaHome, FaBell, FaUsers } from "react-icons/fa";

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-6">
      <NavLink to="/read/home" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaHome className="text-xl" />
      </NavLink>
      <NavLink to="/read/groups" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaUsers className="text-xl" />
      </NavLink>
      <NavLink to="/read/notifications" className={({ isActive }) => `nav-link flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-800 hover:text-gray-300'}`}>
        <FaBell className="text-xl" />
      </NavLink>
    </div>
  );
};

export default NavLinks;