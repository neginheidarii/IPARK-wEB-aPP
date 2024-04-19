"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";
import css from "styled-jsx/css";

const UserLogin = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Event handler for username change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Event handler for password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for handling form submission here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs w-80 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="mt-14" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1`}
                type="text"
                id="username"
                name="username"
                value={username} // Bind value to state
                onChange={handleUsernameChange} // Handle change event
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1`}
                type="password"
                id="password"
                name="password"
                value={password} // Bind value to state
                onChange={handlePasswordChange} // Handle change event
              />
            </div>
            <button className={cssClasses.secondaryButton} type="submit">
              Login
            </button>
            <div className="mt-4">
              <a className="text-[#282828]" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="mt-4">
              <p className="text-[#282828]">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
