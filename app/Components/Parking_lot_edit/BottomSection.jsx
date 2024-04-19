import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import { FaFile, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FilesSection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock data for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Business License",
      size: "1 MB",
      uploadedDate: "2024-03-27",
    },
    { id: 2, name: "Insurance", size: "2.5 MB", uploadedDate: "2024-03-26" },
    {
      id: 3,
      name: "Parking Lot Layout",
      size: "3 MB",
      uploadedDate: "2024-03-25",
    },
  ]);

  // Function to handle file selection
  const handleFileSelection = (fileName) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== fileName));
    } else {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };

  // Function to handle file deletion
  const handleDeleteFiles = () => {
    setUploadedFiles(
      uploadedFiles.filter((file) => !selectedFiles.includes(file.name))
    );
    setSelectedFiles([]);
    toast.success("Files deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Close after 2 seconds
      className: cssClasses.successToast, // Apply your custom CSS class for success toast
    });
  };

  // Function to handle file upload
  const handleUploadFiles = () => {
    // Implement file upload logic here
    console.log("Upload files logic");
    // Show success message
    toast.success("Files uploaded successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Close after 2 seconds
      className: cssClasses.successToast, // Apply your custom CSS class for success toast
    });
  };

  return (
    <>
      <div className="bg-[#cddff2] my-6 rounded-lg p-6">
        <h3 className={`${cssClasses.header1} mb-4}`}>Files</h3>
        <div className="flex items-center justify-between font-bold mb-2">
          <div className="w-1/3 mt-5">File Name</div>
          <div className="w-1/3">Size</div>
          <div className="w-1/3">Uploaded On</div>
        </div>
        <hr className="m-1"></hr>
        {uploadedFiles.map((file) => (
          <div key={file.id} className="flex items-center justify-between mb-2">
            <div className="flex">
              <FaFile className="mr-2" />
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.name)}
                onChange={() => handleFileSelection(file.name)}
                className="mr-2"
              />
            </div>
            <div className="w-1/3 m-1">{file.name}</div>
            <div className="w-1/3 m-1">{file.size}</div>
            <div className="w-1/3 m-1">{file.uploadedDate}</div>
          </div>
        ))}
        <div className="mt-5 flex justify-start gap-6 items-center">
          <button
            onClick={handleUploadFiles}
            className={`${cssClasses.tertiaryButton} w-48 flex bg-blue-600`}
          >
            <FaUpload className="mr-2" />
            Upload File
          </button>
          <button
            onClick={handleDeleteFiles}
            disabled={selectedFiles.length === 0}
            className={` ${
              selectedFiles.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-700"
            } , ${cssClasses.secondaryButton} w-48 flex`}
          >
            <FaTrash className="mr-2" />
            Delete File{selectedFiles.length > 1 && "s"}
          </button>
        </div>
      </div>

      <div className="my-10 text-center">
        <button className={`${cssClasses.secondaryButton} w-48 m-3`}>
          Edit
        </button>
        <button className={`${cssClasses.tertiaryButton} w-48 m-3`}>
          Deleted parking lot
        </button>
      </div>
    </>
  );
};

export default FilesSection;
