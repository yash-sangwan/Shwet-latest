import React, { useState, useEffect, useRef } from 'react';
import { FaWallet, FaSync } from "react-icons/fa";

const WalletButton = ({ publicKey, fetchTokenBalance }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
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

  useEffect(() => {
    fetchTokenBalance().then(setTokenBalance);
  }, [fetchTokenBalance]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRefreshBalance = async () => {
    const newBalance = await fetchTokenBalance();
    setTokenBalance(newBalance);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap"
        onClick={toggleDropdown}
      >
        <FaWallet />
        <span>{tokenBalance} tokens</span>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Wallet Balance</span>
            <button onClick={handleRefreshBalance} className="text-blue-400 hover:text-blue-300">
              <FaSync />
            </button>
          </div>
          <div className="text-2xl font-bold">{tokenBalance} tokens</div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;