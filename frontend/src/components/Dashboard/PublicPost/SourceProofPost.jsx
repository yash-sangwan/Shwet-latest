import React, { useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react"
import RequestProof from "./RequestProof"

export default function SourceProofPost({ proofSignatures, onProofGenerated, source, onSourceChange }) {
  const [isDropdownHidden, setIsDropdownHidden] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedProofId, setSelectedProofId] = useState(null)
  const { connected, publicKey, wallet } = useWallet()

  const handleProofSelect = (event) => {
    const selectedValue = event.target.value
    setSelectedProofId(selectedValue === "github" ? 0 : 1)
    setIsSheetOpen(true)
  }

  const handleProofGenerated = (signatures) => {
    onProofGenerated(signatures)
    setIsDropdownHidden(true)
    setIsSheetOpen(false)
  }

  const handleCloseSheet = () => {
    setIsSheetOpen(false)
  }

  return (
    <>
      <div className="bg-gray-100 p-6 shadow-lg rounded-lg mb-6">
        <h4 className="pb-4 text-black text-left text-2xl font-semibold">Source of Data</h4>
        <input
          type="text"
          placeholder="URL / Description"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
        <h4 className="pb-2 text-black text-xl">Proof of Authentication</h4>
        {!isDropdownHidden && (
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            defaultValue=""
            onChange={handleProofSelect}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="aadhar">Aadhar Authentication</option>
            <option value="github">GitHub Authentication</option>
          </select>
        )}

        {proofSignatures && (
          <input
            type="text"
            value={proofSignatures}
            readOnly
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mt-2"
          />
        )}
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <button onClick={handleCloseSheet} className="text-black mb-4">
              Close
            </button>
            <RequestProof id={selectedProofId} onProofGenerated={handleProofGenerated} />
          </div>
        </div>
      )}
    </>
  )
}