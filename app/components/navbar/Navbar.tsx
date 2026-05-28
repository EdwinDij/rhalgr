"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/keystatic")) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-sm shadow-md"
          : "bg-[#0f0f0f]/35 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <h1>
          XIV <span className="text-amber-500">Rhalgr</span>
        </h1>

        <div className="hidden md:flex space-x-10 text-white/75">
          <NavLinks />
        </div>

        <button
          className="md:hidden text-white/75 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-md border-t border-gray-800/60 px-6 py-4">
          <NavLinks onLinkClick={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
