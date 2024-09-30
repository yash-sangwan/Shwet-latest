import React, { useState } from "react";
import { ArrowRight, Shuffle, CheckCircle } from "lucide-react";
import apiClient from "../api/apiClient";

function UserTypeSelector({ selectedType, onTypeChange }) {
  const userTypes = [
    {
      id: "1",
      name: "Task Provider",
      description: "Create tasks and get labelled, cleaned data.",
    },
    {
      id: "2",
      name: "Task Performer",
      description: "Complete tasks, earn tokens, and contribute data",
    },
  ];

  return (
    <div className="space-y-4">
      {userTypes.map((type) => (
        <label
          key={type.id}
          className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
            selectedType === type.id
              ? "bg-purple-100 border-2 border-purple-500"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <input
            type="radio"
            name="userType"
            value={type.id}
            checked={selectedType === type.id}
            onChange={() => onTypeChange(type.id)}
            className="sr-only"
          />
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedType === type.id
                  ? "border-purple-500"
                  : "border-gray-400"
              }`}
            >
              {selectedType === type.id && (
                <CheckCircle className="w-4 h-4 text-purple-500" />
              )}
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold">{type.name}</h3>
            <p className="text-gray-600">{type.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function LoginRoles() {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeChange = (id) => {
    setSelectedType(id);
  };

  const handleRole = async () => {
    if (!selectedType) {
      console.error("No user type selected");
      return;
    }

    try {
      setLoading(true);
      console.log(selectedType);
      const response = await apiClient.post("/api/init/addrole", { role: selectedType });
      if (response.status === 200) {
        if (!response.data.status) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error adding role:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Shwet
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Here you can create your provider and their oracles
          <br />
          Here is the step by step guide..
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="border-t-2 border-purple-200 flex-grow mt-6" />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Shuffle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="border-t-2 border-purple-200 flex-grow mt-6" />
        </div>

        <UserTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />

        <div className="flex justify-center mt-8">
          <button
            className={`bg-black text-white px-6 py-2 rounded-full flex items-center transition-all hover:bg-gray-800 ${
              loading || !selectedType ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleRole}
            disabled={loading || !selectedType}
          >
            {loading ? "Loading..." : "Continue"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRoles;