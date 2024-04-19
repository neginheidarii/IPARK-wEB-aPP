"use client";
import React from "react";
import Image from "next/image";
import { cssClasses } from "@/lib/cssClasses";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import Footer from "@/ui/Footer";

const layout = ({ children }) => {
  // get ticket number from children
  // const ticketNumber = children.props.ticketNumber;

  return (
    <>
      <header className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className={`${cssClasses.header1} pt-14`}>Ticketing & Support</h1>

          <figure>
            {/* <img src="../favicon.ico" />  */}
            <Avatar className={cssClasses.ticketLogo}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </figure>
        </div>
      </header>
      <section className="container min-h-screen ">{children}</section>
      <Footer />
    </>
  );
};

export default layout;
