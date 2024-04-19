"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
          <form className="mt-4 space-y-6">
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1`}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <button
              className={`${cssClasses.secondaryButton} w-full`}
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-4">
            <p className="text-gray-600">
              Remember your password?{" "}
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

export default ForgotPassword;
