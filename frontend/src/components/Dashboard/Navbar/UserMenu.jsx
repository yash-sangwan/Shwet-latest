import React, { useState, useRef, useEffect } from 'react';
import { FaCopy } from "react-icons/fa";

const UserMenu = ({ connected, isConnecting, publicKey, handleDisconnect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCopyPublicKey = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      // You might want to show a notification here
    }
  };

  const shortenPublicKey = (key) => {
    if (!key) return "";
    const keyStr = key.toBase58();
    return `${keyStr.slice(0, 6)}...${keyStr.slice(-4)}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <img
          src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
          className="w-9 rounded-full"
          alt="User"
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          {connected && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{shortenPublicKey(publicKey)}</span>
              <button onClick={handleCopyPublicKey} className="text-blue-400 hover:text-blue-300">
                <FaCopy />
              </button>
            </div>
          )}
          <button 
            className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded transition-colors duration-300 mb-2"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;