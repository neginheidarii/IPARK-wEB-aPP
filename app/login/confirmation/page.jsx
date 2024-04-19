import React from "react";
import { cssClasses } from "@/lib/cssClasses";

const Congratulations = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xs mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Congratulations!</h2>
          <p className="text-gray-600 mb-8">
            You have successfully created your account.
          </p>
          <button
            className={`${cssClasses.secondaryButton} w-full`}
            type="button"
            // onClick={() => console.log("Get started clicked")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
