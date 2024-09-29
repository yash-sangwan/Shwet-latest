import React from 'react';
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center bg-gray-800 rounded-full px-3 py-2 w-full">
      <div className="flex items-center justify-center w-full max-w-md">
        <div className="flex items-center bg-transparent">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Shwet"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;