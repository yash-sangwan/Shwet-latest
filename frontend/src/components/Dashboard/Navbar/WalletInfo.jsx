import React, { useState, useEffect } from 'react';
import { FaWallet, FaSync, FaCopy } from "react-icons/fa";

const WalletInfo = ({ publicKey, fetchTokenBalance }) => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  useEffect(() => {
    fetchTokenBalance().then(setTokenBalance);
  }, [fetchTokenBalance]);

  const toggleWallet = () => setIsWalletOpen(!isWalletOpen);

  const handleCopyPublicKey = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      // You might want to show a notification here
    }
  };

  const shortenPublicKey = (key) => {
    if (!key) return "";
    const keyStr = key.toBase58();
    return `${keyStr.slice(0, 3)}...${keyStr.slice(-3)}`;
  };

  return (
    <div className="relative">
      <div className="cursor-pointer flex items-center space-x-2" onClick={toggleWallet}>
        <FaWallet className="text-xl" />
        <span>{tokenBalance} tokens</span>
      </div>
      {isWalletOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Wallet</span>
            <button onClick={() => fetchTokenBalance().then(setTokenBalance)} className="text-blue-400 hover:text-blue-300">
              <FaSync />
            </button>
          </div>
          <div className="mb-4">
            <span className="text-gray-400">Balance:</span>
            <span className="text-2xl font-bold ml-2">{tokenBalance} tokens</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{shortenPublicKey(publicKey)}</span>
            <button onClick={handleCopyPublicKey} className="text-blue-400 hover:text-blue-300">
              <FaCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;