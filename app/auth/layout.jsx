import React from "react";
import { cssClasses } from "../lib/cssClasses";

const Login = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="flex-1 bg-[#066fe4] flex flex-col justify-center items-center text-center">
        {/* image  */}
        <img
          src="/media/logo.png"
          alt="IPark Logo"
          className="w-80 h-64 mb-4"
        />
        <h1 className={`${cssClasses.header1} text-white mb-7`}>IPark</h1>
        <p className={`text-white`}>
          Revolutionize Your Parking System With IPark!
        </p>
      </div>

      {/* Right side with AdminLogin component */}
      <div className="flex-1 justify-end items-end">{children}</div>
    </div>
  );
};

export default Login;
