import React, { useState, useEffect, useRef } from "react";
// import { Groups } from "../../../assets/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Groups = [
  { name: "Computer Science", icon: "fa-solid fa-laptop-code" },
  { name: "Education", icon: "fa-solid fa-graduation-cap" },
  { name: "Classification", icon: "fa-solid fa-tags" },
  { name: "Computer Vision", icon: "fa-solid fa-eye" },
  { name: "NLP", icon: "fa-solid fa-language" },
];

const DataGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip state
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedGroup(null);
  };

  return (
    <>
      <div className="bg-gray-100 p-6 shadow-lg rounded-lg mb-6">
        <h4 className="pb-4 text-black text-left text-2xl font-semibold">Data Group</h4>
        <div className="flex items-center justify-between">
          <div className="relative w-4/5" ref={dropdownRef}>
            <div
              className="relative w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer bg-white flex items-center justify-between"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedGroup ? (
                <div className="flex items-center">
                  {/* <img
                    src={selectedGroup.icon}
                    alt={selectedGroup.name}
                    className="inline-block w-6 h-6 mr-2"
                  /> */}
                  <i className={`${selectedGroup.icon} mx-2 w-5`}></i>

                  <span>{selectedGroup.name}</span>
                </div>
              ) : (
                <span className="text-gray-400">Select a Group</span>
              )}
              {selectedGroup && (
                <div className="ml-2 cursor-pointer" onClick={clearSelection}>
                  <FontAwesomeIcon
                    className="w-4 h-4 text-gray-500 hover:text-red-500"
                    icon={faXmark}
                  />
                </div>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                {Groups.map((group) => (
                  <div
                    key={group.name}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleGroupSelect(group)}
                  >
                    {/* <img
                      src={group.icon}
                      alt={group.name}
                      className="inline-block w-6 h-6 mr-2"
                    /> */}
                    <i className={`${group.icon} mx-2 w-5`}></i>
                    <span>{group.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Button to open Add Group sheet */}
          {!selectedGroup && (
            <div className="flex items-center">
              <button
                onClick={() => console.log("Open add group sheet")}
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 cursor-not-allowed"
              >
                Add Group
              </button>

              {/* Info Icon with hover/click tooltip */}
              <div className="relative ml-2">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-gray-500 hover:text-blue-500 cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)} // Toggle on click
                />

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white text-black text-xs p-2 rounded shadow-lg">
                    Add Group is coming soon
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DataGroup;
