"use client";

import React, { useState } from "react";
import { X, Plus, FileAudio, Loader } from "lucide-react";
import ImageInput from "./Management/ImageInput";
import TextInput from "./Management/TextInput";
import AudioInput from "./Management/AudioInput";
import apiClient from "../../api/apiClient";
import { useWallet } from "@solana/wallet-adapter-react";
import Notification from "../../Notification";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { createRpc } from "@lightprotocol/stateless.js";

const CreateTask = ({ onClose, onCreateBatch, folderWorkType, folder }) => {
  const [batchName, setBatchName] = useState("");
  const [budget, setBudget] = useState("");
  const [numLabelers, setNumLabelers] = useState(0);
  const { connected, publicKey, signTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [task, setTask] = useState({
    id: Date.now(),
    name: "",
    description: "",
    images: [],
    texts: [""],
    audios: [],
    completedLabels: 0,
    budget: 0,
  });

  const handleTaskChange = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  const handlePayment = async (amount) => {
    if (!connected || !publicKey) {
      return null;
    }

    try {
      const RPC_ENDPOINT =
        "https://devnet.helius-rpc.com?api-key=a3f8ff9d-884e-4a85-88d0-9742c2eb9bb9";

      const connection = createRpc(RPC_ENDPOINT);
      const recipient = new PublicKey(
        "ARWRANUGJ7eAKvfXzpMtWRQFPFUYPUxMYvGXHFf5F7mH"
      );

      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: 1e9 * amount,
        })
      );

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      const signedTransaction = await signTransaction(transaction);

      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      await connection.confirmTransaction(signature, "processed");

      console.log("Transaction successful! Signature:", signature);

      return {
        address: publicKey.toBase58(),
        signature: signature,
        amount: 1e9 * amount,
      };
    } catch (error) {
      console.error("Transaction failed", error);
      return null;
    }
  };

  const handleUpload = async (fileList, uploadDetails) => {
    const uploadType = folderWorkType === "image" ? "image" : "video";

    const responses = await Promise.all(
      fileList.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", uploadDetails.signature);
        formData.append("folder", uploadDetails.folder);
        formData.append("cloud_name", uploadDetails.cloudName);
        formData.append("api_key", uploadDetails.key);
        formData.append("timestamp", uploadDetails.timestamp);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${uploadDetails.cloudName}/${uploadType}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();

          return {
            url: data.secure_url,
          };
        } catch (error) {
          console.error("Error uploading file:", error);
          return null;
        }
      })
    );

    return responses.filter((response) => response !== null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      setNotification({
        type: "error",
        message: "Please connect your wallet first.",
      });
      return;
    }
    setIsLoading(true);

    try {
      // Call Payment function
      const paymentResult = await handlePayment(parseFloat(budget));
      if (!paymentResult || !paymentResult.signature) {
        throw new Error("Payment failed");
      }

      setNotification({
        type: "success",
        message: "Payment successful. Submitting batch...",
      });

      console.log(paymentResult);

      // Verify payment with backend
      const verificationResponse = await apiClient.post(
        "/api/task/verify-transaction",
        {
          TransactionSignature: paymentResult.signature,
          PublicKey: paymentResult.address,
          Amount: paymentResult.amount,
        }
      );

      if (!verificationResponse.data.status) {
        throw new Error("Payment verification failed");
      }

      setNotification({
        type: "success",
        message: "Payment verified. Uploading data...",
      });

      let newTask;
      let apiEndpoint;

      if (folderWorkType === "image") {
        const response = await apiClient.post("/api/task/presignedurl", {
          folderWorkType,
        });
        if (response.status === 200 && response.data.status) {
          const urls = await handleUpload(
            task.images,
            response.data.uploadData
          );
          const urlsList = urls.map((obj) => obj.url);
          newTask = {
            txid: paymentResult.signature,
            groupId: folder.id,
            taserId: folder.taskerId,
            title: task.name,
            description: task.description,
            workerCount: task.completedLabels,
            budget: task.budget * 1e9,
            images: urlsList,
          };
          apiEndpoint = "/api/task/image";
        }
      } else if (folderWorkType === "audio") {
        const response = await apiClient.post("/api/task/presignedurl", {
          folderWorkType,
        });
        if (response.status === 200 && response.data.status) {
          const urls = await handleUpload(
            task.audios,
            response.data.uploadData
          );
          const urlsList = urls.map((obj) => obj.url);
          newTask = {
            txid: paymentResult.signature,
            groupId: folder.id,
            taserId: folder.taskerId,
            title: task.name,
            description: task.description,
            workerCount: task.completedLabels,
            budget: task.budget,
            audios: urlsList,
          };
          apiEndpoint = "/api/task/audio";
        }
      } else {
        newTask = {
          txid: paymentResult.signature,
          groupId: folder.id,
          taserId: folder.taskerId,
          title: task.name,
          description: task.description,
          workerCount: task.completedLabels,
          budget: task.budget,
          text: task.texts,
        };
        apiEndpoint = "/api/task/text";
      }

      if (newTask && apiEndpoint) {
        const response = await apiClient.post(apiEndpoint, {
          taskDetails: newTask,
        });
        if (response.status === 200 && response.data.status) {
          onCreateBatch({
            name: batchName,
            tasks: [task],
            budget: parseFloat(budget),
            numLabelers,
          });
          setNotification({
            type: "success",
            message: "Batch created successfully!",
          });
          onClose();
        } else {
          throw new Error("Failed to create task");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        type: "error",
        message: error.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    const budgetNum = parseFloat(value);
    if (!isNaN(budgetNum)) {
      const validatedBudget = Math.max(0.25, budgetNum);
      setBudget(validatedBudget.toString());
      handleTaskChange("budget", validatedBudget);
      setNumLabelers(Math.max(1, Math.floor(validatedBudget / 0.25)));
      handleTaskChange(
        "completedLabels",
        Math.max(1, Math.floor(validatedBudget / 0.25))
      );
    } else {
      setBudget("");
      setNumLabelers(0);
      handleTaskChange("budget", 0);
      handleTaskChange("completedLabels", 0);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-4">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-4">
            Create New Batch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="batchName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Batch Name
                </label>
                <input
                  id="batchName"
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter batch name"
                />
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-300 mb-1 "
                >
                  Budget (in SOL)
                </label>
                <input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={handleBudgetChange}
                  required
                  min="0.25"
                  step="0.01"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter budget (min 0.25 SOL)"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-300">
                Number of Labelers: {numLabelers}
              </span>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskChange("name", e.target.value)}
                  placeholder="Task Name"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) =>
                    handleTaskChange("description", e.target.value)
                  }
                  placeholder="Task Description"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {folderWorkType === "image" && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Images
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {task.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Task Image ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleTaskChange(
                              "images",
                              task.images.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="w-24 h-24 flex items-center justify-center bg-gray-600 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleTaskChange("images", [
                              ...task.images,
                              e.target.files[0],
                            ]);
                          }
                        }}
                        className="hidden"
                      />
                      <Plus className="w-8 h-8 text-gray-400" />
                    </label>
                  </div>
                </div>
              )}
              {folderWorkType === "text" && (
                <TextInput
                  texts={task.texts}
                  onAddText={() =>
                    handleTaskChange("texts", [...task.texts, ""])
                  }
                  onTextChange={(index, value) => {
                    const newTexts = [...task.texts];
                    newTexts[index] = value;
                    handleTaskChange("texts", newTexts);
                  }}
                  onRemoveText={(index) => {
                    handleTaskChange(
                      "texts",
                      task.texts.filter((_, i) => i !== index)
                    );
                  }}
                />
              )}
              {folderWorkType === "audio" && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Audios
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {task.audios.map((audio, index) => (
                      <div key={index} className="relative w-full max-w-xs">
                        <div className="bg-gray-600 rounded-md p-3 flex items-center mb-2">
                          <FileAudio className="w-6 h-6 text-blue-500 mr-2" />
                          <span className="text-white truncate">
                            {audio.name}
                          </span>
                        </div>
                        <audio controls className="w-full">
                          <source
                            src={URL.createObjectURL(audio)}
                            type={audio.type}
                          />
                          Your browser does not support the audio element.
                        </audio>
                        <button
                          type="button"
                          onClick={() =>
                            handleTaskChange(
                              "audios",
                              task.audios.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="flex items-center justify-center w-full max-w-xs h-12 bg-gray-600 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200">
                      <input
                        type="file"
                        accept=".mp3,.wav"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            if (
                              file.type === "audio/mp3" ||
                              file.type === "audio/wav"
                            ) {
                              handleTaskChange("audios", [
                                ...task.audios,
                                file,
                              ]);
                            } else {
                              alert("Please select an MP3 or WAV file.");
                            }
                          }
                        }}
                        className="hidden"
                      />
                      <Plus className="w-6 h-6 text-gray-400 mr-2" />
                      <span className="text-gray-400">Add MP3 or WAV</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Processing...
                  </>
                ) : (
                  "Create Batch"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
