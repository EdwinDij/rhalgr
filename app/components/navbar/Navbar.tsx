import React from "react";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <div className="flex justify-around p-4 text-white border-b border-gray-800/60">
      <div className="px-4 py-2">
        <h1>XIV <span className="text-yellow-500">Thaliak</span></h1>
      </div>
      <div className="flex space-x-10 text-white/75 ">
      <NavLinks />
      </div>
    </div>
  );
}
