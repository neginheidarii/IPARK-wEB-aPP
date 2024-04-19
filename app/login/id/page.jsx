"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import { FiUpload } from "react-icons/fi";

const IdentificationDocument = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-10">
            Upload Identification Document
          </h2>
          <div className="mb-4 flex items-center ">
            <label
              htmlFor="identificationDocument"
              className={`${cssClasses.primaryButton}  hover:text-[#282828] w-80 hover:bg-gray-200 cursor-pointer px-4 py-2 rounded-2xl  mb-4 flex items-center space-x-2`}
            >
              <FiUpload className="w-5 h-5" />
              <span>Choose File</span>
            </label>
            <input
              type="file"
              id="identificationDocument"
              name="identificationDocument"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
            />
          </div>
          <button
            className={`${cssClasses.secondaryButton} w-full`}
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentificationDocument;
