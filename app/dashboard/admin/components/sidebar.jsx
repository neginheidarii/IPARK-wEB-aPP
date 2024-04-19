"use client"
import React from "react";
import Link from "next/link";
import {  MdLocalParking } from "react-icons/md";

import { FaLocationCrosshairs } from "react-icons/fa6";


const SidebarAdmin= () => {
  
  const menuItems = [
    
    {
      href: "/dashboard/admin/ticket/panel",
      label: "tickets",
      Icon: MdLocalParking,
      
    },
    {
      href: "/dashboard/admin/errors",
      label: "Errors",
      Icon: FaLocationCrosshairs,
     
    },
    

  ];

  return (
    <div
      className={
        "px-4 flex space-y-1 text-sm flex-col text-gray-400 bg-gray-700"
      }
    >
      {menuItems.map(({ href, label, Icon, Component }) => (
        <React.Fragment key={href}>
          {Component ? (
            <Component href={href} />
          ) : (
            <Link
              href={href}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg`}
            >
              <Icon className={"h-5 w-5"} style={{ color: "#066fe4" }} />{" "}
              {/* Apply blue color here */}
              <span>{label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { SidebarAdmin};
