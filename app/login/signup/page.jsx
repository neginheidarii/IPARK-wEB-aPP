"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add your sign-up logic, for example, an API call using Axios or any other client library
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-10">Sign Up</h2>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4 flex space-x-4">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2 text-gray-600"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChangeFirstName}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2 text-gray-600"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChangeLastName}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
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
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="repeatPassword"
              >
                Repeat Password
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={handleChangeRepeatPassword}
              />
            </div>
            <button
              className={`${cssClasses.secondaryButton} w-80`}
              style={{ width: "full" }}
              type="submit"
            >
              Next Step
            </button>
          </form>
          <div className="mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
