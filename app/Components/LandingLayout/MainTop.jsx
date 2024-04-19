import React from "react";
import Card from "@/ui/Card";
// import { RiAdminFill } from "react-icons/ri";
import { FaCarSide, FaCar, FaParking } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";

const MainTop = () => {
  return (
    <div className="pb-24">
      <div className="text-center font-sans text-2xl py-6 font-bold pt-9">
        What IPark Offers
      </div>
      <div className="grid grid-cols-3 gap-4 py-3 px-28 text-gray-600 ">
        <Card
          Icon={FaCarSide}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="Hessle free parking Reservation System."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />
        <Card
          Icon={FaParking}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="Convenient check-in and check-out system."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />
        <Card
          Icon={CgUserlane}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="User-friendly interface for easy booking."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />

        <Card
          Icon={FaCar}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="New system for managing parking spaces."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />
        <Card
          Icon={MdOutlinePayment}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="Convenient payment methods for users."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />
        <Card
          Icon={FaMapLocationDot}
          iconClasses={"text-[#066fe4] w-[80px] h-[80px] "}
          children="Easy access to parking spaces."
          className="!bg-blue-300/40 rounded-2xl justify-center items-center text-center"
        />
      </div>
    </div>
  );
};

export default MainTop;
