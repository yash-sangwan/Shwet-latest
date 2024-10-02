import React, { useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react"
import ApplicationReviewSheet from "./Publish"
import { Loader2 } from 'lucide-react'

export default function PreviewPost({ proofSignatures, source }) {
  const [transactionPending, setTransactionPending] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { connected, publicKey } = useWallet()

  const handlePublish = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.")
      return
    }

    if (!source || !proofSignatures) {
      alert("All fields are required.")
      return
    }

    setIsLoading(true)

    // Fake loader for 3 seconds
    setTimeout(async () => {
      setIsLoading(false)
      try {
        setTransactionPending(true)
        // Implement your publishing logic here
        setOpenSheet(true)
        setTimeout(() => {
          setOpenSheet(false)
        }, 5000)
      } catch (error) {
        console.error("Error publishing post:", error)
        alert("Failed to publish post.")
      } finally {
        setTransactionPending(false)
      }
    }, 3000)
  }

  return (
    <>
      {openSheet ? (
        <ApplicationReviewSheet />
      ) : (
        <div className="w-1/4 mt-32 mr-3 fixed right-0">
          <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
            <h3 className="font-semibold text-black mb-2">Publish</h3>
            <div className="text-gray-500 text-sm mb-2 text-left">
              Status: <span className="text-green-600 font-semibold">Draft</span>
            </div>
            <div className="text-gray-500 text-sm mb-2 text-left">
              Visibility: <span className="text-blue-600 font-semibold">Public</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePublish}
                className={`bg-primary text-white w-full p-2 rounded hover:bg-secondary flex items-center justify-center ${
                  isLoading || transactionPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || transactionPending}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : transactionPending ? (
                  "Publishing..."
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}