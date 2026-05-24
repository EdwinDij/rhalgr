"use client";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-around p-4 text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-sm shadow-md"
          : "bg-[#0f0f0f]/35 backdrop-blur-md "
      }`}
    >
      <div className="px-4 py-2">
        <h1>
          XIV <span className="text-amber-500">Thaliak</span>
        </h1>
      </div>
      <div className="flex space-x-10 text-white/75">
        <NavLinks />
      </div>
    </div>
  );
}
