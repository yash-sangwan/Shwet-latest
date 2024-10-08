"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaWallet, FaSync } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import apiClient from "../../api/apiClient";
import Loader from "../../Loader/Loader";

export default function WalletButton({ publicKey, fetchTokenBalance }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(1);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dropdownRef = useRef(null);

  const MIN_WITHDRAW = 0.25;
  const MAX_WITHDRAW = 3;

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
    setIsRefreshing(true);
    const newBalance = await fetchTokenBalance();
    setTokenBalance(newBalance);
    setTimeout(() => setIsRefreshing(false), 1000); // Keep spinning for 1 second
  };

  const handleWithdrawOpen = () => {
    setIsWithdrawDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const handleWithdrawClose = () => {
    setIsWithdrawDialogOpen(false);
    setWithdrawAmount("");
    setWithdrawError("");
  };

  const handleWithdrawAmountChange = (event) => {
    const value = event.target.value;
    if (
      value === "" ||
      (/^\d*\.?\d*$/.test(value) && !isNaN(parseFloat(value)))
    ) {
      setWithdrawAmount(value);
      setWithdrawError("");
    }
  };

  const handleWithdrawProceed = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < MIN_WITHDRAW || amount > MAX_WITHDRAW) {
      setWithdrawError(
        `Please enter a valid amount between ${MIN_WITHDRAW} and ${MAX_WITHDRAW}`
      );
      return;
    }
    if (amount > tokenBalance) {
      setWithdrawError("Insufficient balance");
      return;
    }

    setIsProcessing(true);
    handleWithdrawClose();

    try {
      const response = await apiClient.post("/api/worker/withdraw", {
        Address: publicKey,
        Tokens: amount,
      });

      if (response.status === 200 && response.data.status) {
        setTransactionResult({
          success: true,
          message: `Transaction successful. Transaction ID: ${response.data.txid}`,
        });
      } else {
        throw new Error("Transfer failed");
      }

      // Update balance after successful withdrawal
      handleRefreshBalance();
    } catch (error) {
      console.error("Error in withdrawing:", error);
      setTransactionResult({
        success: false,
        message: `Failed to process withdrawal. Please try again. ${
          error.response?.data?.message || error.message
        }`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center px-4 py-2 bg-[#2a2a2a] text-[#A28FF8] rounded-full hover:bg-[#3a3a3a] transition-colors duration-200"
        onClick={toggleDropdown}
      >
        <FaWallet className="mr-2" />
        <span>{tokenBalance} $SHWET</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-lg font-semibold text-white">Wallet Balance</h6>
            <button
              onClick={handleRefreshBalance}
              className="text-PURPLESHADE3 transition-colors duration-200"
              disabled={isRefreshing}
            >
              <FaSync className={`${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className="text-xl font-bold text-white mb-4">
            {tokenBalance} $SHWET
          </p>
          <button
            className="w-full py-2 px-4 bg-PURPLESHADE5 text-white rounded hover:bg-PURPLESHADE2 transition-colors duration-200"
            onClick={handleWithdrawOpen}
          >
            Withdraw
          </button>
        </div>
      )}

      {isWithdrawDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl  font-semibold mb-4">Withdraw Tokens</h2>
            <p className="text-sm text-gray-300 mb-4">
              Min: {MIN_WITHDRAW} $SHWET | Max: {MAX_WITHDRAW} $SHWET
            </p>
            <div className="mb-4">
              <label
                htmlFor="withdrawAmount"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Amount to withdraw
              </label>
              <input
                id="withdrawAmount"
                type="text"
                className={`w-full px-3 py-2 text-black border rounded-md ${
                  withdrawError ? "border-red-500" : "border-gray-300"
                } outline-none `}
                value={withdrawAmount}
                onChange={handleWithdrawAmountChange}
              />
              {withdrawError && (
                <p className="mt-1 text-sm text-red-600">{withdrawError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleWithdrawClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawProceed}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-transparent rounded-md text-sm font-medium text-white outline-none"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      {transactionResult && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all duration-300 ease-in-out">
            <div
              className={`mb-6 text-center ${
                transactionResult.success ? "text-PURPLESHADE2" : "text-red-600"
              }`}
            >
              {transactionResult.success ? (
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <h2
              className={`text-2xl font-bold mb-4 text-center ${
                transactionResult.success ? "text-PURPLESHADE2" : "text-red-600"
              }`}
            >
              {transactionResult.success
                ? "Transaction Successful"
                : "Transaction Failed"}
            </h2>
            <p className="text-white mb-6 text-center break-words overflow-hidden">
              {transactionResult.message}
            </p>
            <button
              onClick={() => setTransactionResult(null)}
              className="w-full py-2 px-4 bg-PURPLESHADE5 hover:bg-PURPLESHADE2 text-white font-bold rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
