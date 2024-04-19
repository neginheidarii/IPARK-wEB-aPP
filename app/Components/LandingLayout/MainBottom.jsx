import React from "react";

const MainBottom = () => {
  return (
    <>
      <div className="bg-blue-300/40 ">
        <h1 className="text-center font-sans text-2xl py-6 font-bold pt-9">
          For Drivers
        </h1>
        {/* 4 pictures small with radius */}
        <div className="grid grid-cols-4 gap-4 px-28 h-80 ">
          <div className="flex flex-col justify-center items-center h-full mt-1 ">
            <div className="bg-[#cddff2] rounded-xl relative">
              <img
                src="/media/landing_page/find_parking.jpg"
                alt="parking image"
                className="object-cover	rounded-2xl w-full h-[200px]"
              />
              <span
                className="text-center text-white font-sans text-lg
            font-bold absolute top-2 ml-2 bg-white/60 rounded-full w-8 h-8 items-center justify-center flex"
              >
                1
              </span>
            </div>
            <span className="font-bold text-[#282828] pt-2 self-start">
              Choose a spot
            </span>
            <span className="text-[#282828] self-start">
              Find and select a parking spot
            </span>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="bg-gray-300 rounded-xl relative w-[300px] h-[195px]">
              <img
                src="/media/landing_page/reserve.jpg"
                alt="parking image"
                className="object-cover	rounded-2xl w-full h-[200px]"
              />
              <span
                className="text-center text-white font-sans text-lg 
          font-bold absolute top-2 ml-2 bg-white/60 rounded-full w-8 h-8 items-center justify-center flex"
              >
                2
              </span>
            </div>
            <span className="font-bold text-[#282828] pt-2 self-start">
              Reserve
            </span>
            <span className="text-[#282828] self-start">
              Book the spot with ease
            </span>
          </div>

          <div className="flex flex-col justify-center items-center h-full mt-[13px] ">
            <div className="bg-gray-300 rounded-xl relative">
              <img
                src="/media/landing_page/check-in.jpg"
                alt="parking image"
                className="object-cover	rounded-2xl w-full h-[200px]"
              />
              <span
                className="text-center text-white font-sans text-lg 
          font-bold absolute top-2 ml-2 bg-white/60 rounded-full w-8 h-8 items-center justify-center flex"
              >
                3
              </span>
            </div>
            <span className="font-bold text-[#282828] pt-2 self-start">
              Arrive and check-in
            </span>
            <span className="text-[#282828] self-start">
              Arrive at the spot and check-in with your phone
            </span>
          </div>

          <div className="flex flex-col justify-center items-center h-full">
            <div className="bg-gray-300 rounded-xl relative">
              <img
                src="/media/landing_page/parking.jpg"
                alt="parking image"
                className="object-cover	rounded-2xl w-full h-[200px]"
              />
              <span
                className="text-center text-white font-sans text-lg 
          font-bold absolute top-2 ml-2 bg-white/60 rounded-full w-8 h-8 items-center justify-center flex"
              >
                4
              </span>
            </div>
            <span className="font-bold text-[#282828] pt-2 self-start">
              Park
            </span>
            <span className="text-[#282828]  self-start">
              Enjoy hessle free parking
            </span>
          </div>
        </div>

        <h3 className="text-center font-sans text-xl py-5 font-bold pt-9">
          Download the IPark app and reserve your spot!
        </h3>

        <div className="flex flex-row justify-center items-center pb-10 px-5">
          <img
            src="/media/download_icons/appstore.jpg"
            alt="appstore"
            className="w-40 h-auto "
          />
          <img
            src="/media/download_icons/googleplay.png"
            alt="playstore"
            className="w-[173px] h-auto "
          />
        </div>
      </div>
    </>
  );
};

export default MainBottom;
