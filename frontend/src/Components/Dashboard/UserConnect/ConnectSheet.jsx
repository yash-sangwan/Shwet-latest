import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import WalletInfo from './WalletInfo';
import assets from '../../../assets/assets';

// Updated wallet options for Solana wallets
const walletOptions = [
  {
    name: 'Phantom',
    icon: `${assets.phantomLogo}`,  
    detect: () => !!window.solana?.isPhantom,
    url: 'https://phantom.app/download',
  },
  {
    name: 'Solflare',
    icon: `${assets.solfareLogo}`,  
    detect: () => !!window.solflare,
    url: 'https://chromewebstore.google.com/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic',
  },
  {
    name: 'Backpack',
    icon: `${assets.backpackLogo}`,  
    detect: () => !!window.backpack,
    url: 'https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof',
  },
  {
    name: 'Trust Wallet',
    icon: `${assets.trustwalletLogo}`,  
    detect: () => !!window.solana?.isTrust,
    url: 'https://trustwallet.com/download',
  },
];

const ConnectSheet = ({ isOpen, onClose, onConnect }) => {
  const [availableWallets, setAvailableWallets] = useState([]);
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  useEffect(() => {
    // Detect installed wallets
    const detectedWallets = walletOptions.filter((wallet) => wallet.detect());
    setAvailableWallets(detectedWallets);
  }, []);


  const handleConnect = (wallet) => {
    if (!wallet.detect()) {
      window.open(wallet.url, '_blank');
    } else {
      // Handle different wallet connection APIs
      let provider = window[wallet.name.toLowerCase()]; 
      
      // Special case for Phantom Wallet
      if (wallet.name === 'Phantom') {
        provider = window.solana;
      }
      
      if (provider && typeof provider.connect === 'function') {
        provider.connect()
          .then(() => {
            onConnect(wallet.name);
            onClose();  // Close the modal after successful connection
          })
          .catch((error) => console.error(`Failed to connect ${wallet.name}`, error));
      } else {
        console.error(`No valid connection method for ${wallet.name}`);
      }
    }
  };
  

  

  // Filter out detected wallets from the "Recommended" list
  const recommendedWallets = walletOptions.filter(
    (wallet) => !availableWallets.some((availableWallet) => availableWallet.name === wallet.name)
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Connect a Wallet</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Installed Wallets Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Installed Wallets</h3>
            {availableWallets.length > 0 ? (
              availableWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  className="flex items-center w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 mb-2"
                  onClick={() => handleConnect(wallet)}
                >
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-3" />
                  <span className="text-white">{wallet.name}</span>
                </button>
              ))
            ) : (
              <p className="text-gray-400">No wallet extensions found. Please install one to continue.</p>
            )}
          </div>

          {/* Recommended Wallets Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">More Wallets</h3>
            {recommendedWallets.length > 0 ? (
              recommendedWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  className="flex items-center w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 mb-2"
                  onClick={() => handleConnect(wallet)}
                >
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-3" />
                  <span className="text-white">{wallet.name}</span>
                </button>
              ))
            ) : (
              <p className="text-gray-400">No additional wallets to recommend.</p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">New to Solana wallets?</span>
            <button onClick={() => setShowWalletInfo(true)} className="text-blue-400 hover:text-blue-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <WalletInfo isOpen={showWalletInfo} onClose={onClose} onBack={() => setShowWalletInfo(false)} />
    </>
  );
};

export default ConnectSheet;
