"use client";

import React from "react";
import Footer from "@/ui/Footer";
import Header from "@/Components/LandingLayout/Header";
import Navbar from "@/Components/LandingLayout/Navbar";
import MainTop from "@/Components/LandingLayout/MainTop";
import MainBottom from "@/Components/LandingLayout/MainBottom";

const page = () => {
  // const router = useRouter();
  return (
    <>
      <Header />
      <Navbar />
      <MainTop />
      <MainBottom />
      <Footer />
    </>
  );
};

export default page;
