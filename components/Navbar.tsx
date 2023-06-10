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
      className={`fixed top-0 z-20 flex w-screen items-center justify-center bg-white/30 ${
        hasScrolled ? "shadow-sm" : ""
      } backdrop-blur-sm`}
    >
      <div className="xs:w-9/12 flex items-center justify-between py-[0.5rem] md:w-9/12 lg:w-9/12">
        <Image src={stackLogo} alt="Stack AI logo" width={140} fill={false} />
        <UserLogin />
      </div>
    </div>
  );
}
