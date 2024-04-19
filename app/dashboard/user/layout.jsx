"use client";
import React from "react";
import Image from "next/image";
import { cssClasses } from "@/lib/cssClasses";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import Footer from "@/ui/Footer";

const layout = ({ children }) => {


  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <section className="container" style={{ flex: 1 }}>
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default layout;
