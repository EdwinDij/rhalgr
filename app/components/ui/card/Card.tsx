import React from "react";
import Link from "next/link";

interface CardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ href, children, className }: CardProps) {
  return (
    <Link
      href={href}
      className={`rounded-xl border border-gray-700/80 bg-gray-800/60 hover:bg-gray-700/60 transition-colors flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </Link>
  );
}