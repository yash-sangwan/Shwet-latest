import React from "react";
import { X, ChevronLeft } from "lucide-react";
import assets from "../../../assets/assets";

// Updated wallet options for Solana wallets
const walletOptions = [
  {
    name: "Phantom",
    icon: `${assets.phantomLogo}`,
    description: "Mobile Wallet and Extension",
    url: "https://phantom.app/download", 
  },
  {
    name: "Solflare",
    icon: `${assets.solfareLogo}`,
    description: "Mobile Wallet and Extension",
    url: "https://chromewebstore.google.com/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic", 
  },
  {
    name: "Backpack",
    icon: `${assets.backpackLogo}`,
    description: "Mobile Wallet and Extension",
    url: "https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof", 
  },
  {
    name: "Trust Wallet",
    icon: `${assets.trustwalletLogo}`,
    description: "Mobile Wallet and Extension",
    url: "https://trustwallet.com/download", 
  },
];

export default function GetWallet({ isOpen, onClose, onBack }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={onBack}
            className="text-blue-400 hover:text-blue-300"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-white">Get a Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Wallet options list */}
        <div className="space-y-4 mb-12">
          {walletOptions.map((wallet) => (
            <div
              key={wallet.name}
              className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center">
                <img
                  src={wallet.icon}
                  alt={wallet.name}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-gray-400">{wallet.description}</p>
                </div>
              </div>
              <button
                onClick={() => window.open(wallet.url, "_blank")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                GET
              </button>
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-white mb-2">
            Not what you're looking for?
          </h4>
          <p className="text-gray-400">
            Select a wallet on the main screen to get started with a different
            wallet provider.
          </p>
        </div>
      </div>
    </div>
  );
}
