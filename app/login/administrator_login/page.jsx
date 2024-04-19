import React, {useState} from "react";
import { cssClasses } from "@/lib/cssClasses";
import css from "styled-jsx/css";

const AdminLogin = () => {
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange =(e) =>{
    setPassword(e.target.value)
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="w-80 mx-auto ml-auto">
          {" "}
          {/* Set width to 80 */}
          <h2 className="text-2xl font-bold mb-4">Administrator Login</h2>
          <form className="mt-14">
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
                value={username}
                onChange={handleUsernameChange}
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
                value={password}
                onChange={handlePasswordChange}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
