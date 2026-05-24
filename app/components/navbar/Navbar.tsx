import React from "react";
import Link from "next/link";
import { ExternalLink, House, Swords, BookA } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-around p-4 text-white border-b border-gray-800/60">
      <div className="px-4 py-2">
        <h1>XIV <span className="text-yellow-500">Thaliak</span></h1>
      </div>
      <div className="flex space-x-10 text-white/75 ">
        <Link
          href="/"
          className="hover:text-white border-transparent hover:bg-white/10 rounded-xl px-4 py-2"
        >
          {<House className="inline mr-1" size={14} />}
          Home
        </Link>
        <Link
          href="/raids"
          className="hover:text-white border-transparent hover:bg-white/10 rounded-xl px-4 py-2"
        >
          {<Swords className="inline mr-1" size={14} />}
          Raids
        </Link>
        <Link
          href="/glossary"
          className="hover:text-white border-transparent hover:bg-white/10 rounded-xl px-4 py-2"
        >
          {<BookA className="inline mr-1" size={14} />}
          Glossaire
        </Link>
        <Link
          href="https://www.thebalanceffxiv.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white border-transparent hover:bg-white/10 rounded-xl px-4 py-2"
        >
          The Balance
          {<ExternalLink className="inline ml-1" size={14} />}
        </Link>
        {/* <Link href="/admin">Admin</Link> */}
      </div>
    </div>
  );
}
