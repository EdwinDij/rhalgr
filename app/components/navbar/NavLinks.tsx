"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, House, Swords, BookA } from "lucide-react";

const links = [
  {
    href: "/",
    label: "Accueil",
    icon: <House className="inline mr-1" size={14} />,
    external: false,
  },
  {
    href: "/raids",
    label: "Raids",
    icon: <Swords className="inline mr-1" size={14} />,
    external: false,
  },
  {
    href: "/glossary",
    label: "Glossaire",
    icon: <BookA className="inline mr-1" size={14} />,
    external: false,
  },
  {
    href: "/strat-board",
    label: "Tableau stratégique",
    // icon: <ExternalLink className="inline ml-1" size={14} />,
    external: false,
  },
  {
    href: "https://www.thebalanceffxiv.com/",
    label: "The Balance",
    icon: <ExternalLink className="inline ml-1" size={14} />,
    external: true,
  },
];

interface NavLinksProps {
  onLinkClick?: () => void;
}

export default function NavLinks({ onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`text-md font-medium transition-colors hover:text-amber-500 ${
              isActive
                ? "text-amber-500 bg-amber-500/10 p-2 rounded"
                : "text-white/70"
            }`}
            onClick={onLinkClick}
          >
            {link.label === "The Balance" ? (
              <>
                {link.label}
                {link.icon}
              </>
            ) : (
              <>
                {link.icon}
                {link.label}
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
