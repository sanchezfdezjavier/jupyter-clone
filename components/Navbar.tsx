"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import UserLogin from "@/components/UserLogin";
import stackLogo from "@/public/jupyter-logo.png";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-20 flex w-screen items-center justify-center border-b-2 bg-white/30 ${
        hasScrolled ? "shadow-sm" : ""
      } backdrop-blur-sm`}
    >
      <div className="flex w-11/12 items-center justify-between py-[0.2rem] sm:w-11/12 lg:w-9/12">
        <Image src={stackLogo} alt="Jupyter logo" width={120} fill={false} />
        <UserLogin />
      </div>
    </div>
  );
}
