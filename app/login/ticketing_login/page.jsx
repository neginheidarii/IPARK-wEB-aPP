"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";

const AccessSupport = () => {
  // Define state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Event handler to update the email state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler to update the password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you can perform any action like validation or sending data to the server
    console.log("Form submitted!");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs w-80 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Access Support</h2>
          <p className="text-sm text-gray-600 mb-6">
            Access our ticketing system by logging into your account.
          </p>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-80`}
                type="email"
                id="email"
                name="email"
                value={email} // Bind value to state
                onChange={handleEmailChange} // Handle change event
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-80`}
                type="password"
                id="password"
                name="password"
                value={password} // Bind value to state
                onChange={handlePasswordChange} // Handle change event
              />
            </div>
            <button
              className={`${cssClasses.secondaryButton} w-full`}
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <a className="text-[#282828]" href="/forgot-password">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessSupport;
