import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <>
  
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        ></link>

      <div className="relative w-full h-[520px] bg-gray-800 text-white">
        <img
          src="/media/landing_page/header.jpg"
          alt="landing_headpic"
          style={{ opacity: 0.8, filter: "brightness(0.5)" }}
          className="object-cover w-full h-full"
          // width={1920}
          // height={1080}
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-7xl font-bold">
            I
            <span style={{ color: "#066fe4", fontFamily: "Open Sans" }}>P</span>
            ARK
          </h1>
          <h4 className="text-2xl">
            Revolutionize Your Parking System with IPark!
          </h4>
        </div>
      </div>
    </>
  );
};

export default Header;
