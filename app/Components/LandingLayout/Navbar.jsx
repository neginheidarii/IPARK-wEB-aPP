import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

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
        />


      <div className="flex justify-center items-center py-8 px-8 bg-[#282828] text-white">
        <div
          className="flex justify-between w-full md:w-2/3 lg:w-3/5"
          style={{ fontFamily: "Open Sans" }}
        >
          <Link
            href="/dashboard/admin"
            className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg`}
          >
            <RiAdminFill size={26} />I am an Administrator
          </Link>
          <Link
            href="/dashboard/user"
            className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg ${
              router.pathname === "/help" ? "font-bold" : ""
            }`}
          >
            <IoMdHelpCircle size={27} />I need Help
          </Link>
          <Link
            href="/dashboard/owner"
            className={`hover:text-blue-500 flex justify-center items-center gap-2 text-lg`}
          >
            <FaUserTie size={25} /> I am a Parking Owner
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
