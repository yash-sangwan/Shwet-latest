import React, { useState, useCallback } from "react";
import * as XLSX from "xlsx"; // Import XLSX for reading Excel files
import Notification from "../../Notification"; // Import the custom Notification component
import SourceProofPost from "./SourceProofPost";
import PreviewPost from "./PreviewPost";
import SampleExcel from "./SampleExcel";
import assets from "../../../assets/assets";
import DataGroup from "./DataGroup";
import { ChevronLeft } from "lucide-react";

function PublicPost() {
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [excelData, setExcelData] = useState([]); // Store parsed Excel data


  const handleFileChange = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    validateFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    validateFile(droppedFile);
    setIsDragging(false);
    setDragCounter(0);
  };

  const validateFile = (file) => {
    if (
      file &&
      (file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setFile(file);
      readExcelFile(file); // Parse the Excel file upon valid selection
    } else {
      setNotification({
        message: "Please upload a valid format file!",
        type: "error",
      });
      setFile(null);
      setExcelData([]); // Reset the Excel data
    }
  };

  // Function to read the Excel file using XLSX library
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Select the first sheet
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to array of arrays
      setExcelData(jsonData); // Set the parsed data
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle drag events without flickering
  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragCounter((prevCounter) => prevCounter + 1);
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragCounter((prevCounter) => prevCounter - 1);
    if (dragCounter === 1) {
      setIsDragging(false);
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex min-h-screen p-8 bg-gray-900">
        <div className="w-3/4 pr-6">
          <div className="flex items-center gap-8 mb-16">
            <button  onClick={() => window.history.back()} className="text-blue-400 hover:text-blue-300">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-white text-4xl font-semibold">
              Add New Post
            </h1>
          </div>

          <div
            className={`relative bg-white border-4 p-8 rounded-lg mb-6 transition-all duration-300 ease-in-out ${
              isDragging
                ? "border-blue-700 bg-blue-100"
                : "border-dashed border-blue-500"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {isDragging && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-100 bg-opacity-95 z-10 transition-opacity duration-300 ease-in-out">
                <img src={assets.dragndrop} className="h-48 w-48 mb-4" />
                <p className="text-blue-700 font-semibold">
                  Drop your file here!
                </p>
              </div>
            )}

            <div className="mb-10 flex justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4">Upload Excel Data</h1>
                <p className="text-lg text-gray-600">
                  Easily upload and process your Excel spreadsheets.
                </p>
              </div>

              {!file && (
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="mb-4 mt-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                />
              )}
            </div>

            {file && (
              <div className="mt-4 mb-4 p-4 bg-green-100 border border-green-500 rounded-lg">
                <p className="text-green-800 font-semibold">
                  File selected: {file.name}
                </p>
              </div>
            )}

            {file && (
              <div className="overflow-auto h-96 border border-gray-300 rounded-lg">
                <table className="min-w-full text-left text-sm">
                  <tbody>
                    {excelData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border px-2 py-1">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!file && <SampleExcel />}
          </div>
          <DataGroup />
          <SourceProofPost />
        </div>

        <PreviewPost />
      </div>
    </>
  );
}

export default PublicPost;
