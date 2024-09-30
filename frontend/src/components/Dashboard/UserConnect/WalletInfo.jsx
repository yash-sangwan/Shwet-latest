import React, { useState } from 'react'
import { X, ChevronLeft } from 'lucide-react'
import GetWallet from './GetWallet'
import assets from '../../../assets/assets'



export default function WalletInfo({ isOpen, onClose, onBack }) {
  const [showGetWallet, setShowGetWallet] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-16">
            <button onClick={onBack} className="text-blue-400 hover:text-blue-300">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold text-white">What is a Wallet?</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-10 space-y-6">
            <div className="flex items-start">
              <div className="bg-gray-700 p-1 rounded-lg mr-4">
                <img src={assets.walletInfo} className="w-20" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">A Home for your Digital Assets</h3>
                <p className="text-gray-400">Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-700 p-1 rounded-lg mr-4">
                <img src={assets.walletNewWay} alt="Log In" className="w-20" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">A New Way to Log In</h3>
                <p className="text-gray-400">Instead of creating new accounts and passwords on every website, just connect your wallet.</p>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowGetWallet(true)}
          >
            Get a Wallet
          </button>
          
          <div className="mt-4 text-center">
            <a href="https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore" className="text-blue-400 hover:text-blue-300">Learn More</a>
          </div>
        </div>
      </div>
      <GetWallet 
        isOpen={showGetWallet} 
        onClose={onClose}
        onBack={() => setShowGetWallet(false)}
      />
    </>
  )
}