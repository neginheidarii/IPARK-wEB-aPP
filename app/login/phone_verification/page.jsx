"use client";
import React, { useState } from "react";
import { cssClasses } from "@/lib/cssClasses";

const PhoneVerification = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handlePhoneOrEmailChange = (e) => {
    setPhoneOrEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl font-bold mb-10">Phone Verification</h2>
          <form className="mt-4 space-y-6">
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="phoneOrEmail"
              >
                Phone or Email
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                type="text"
                id="phoneOrEmail"
                name="phoneOrEmail"
                value={phoneOrEmail}
                onChange={handlePhoneOrEmailChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2 text-gray-600"
                htmlFor="verificationCode"
              >
                Verification Code
              </label>
              <input
                className={`${cssClasses.primaryInput} bg-[#f5f5f5] shadow-lg p-1 w-full`}
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </div>
            <button
              className={`${cssClasses.secondaryButton} w-80`}
              style={{ width: "full" }}
              type="submit"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
