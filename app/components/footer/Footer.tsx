import Link from "next/link";
import { Swords, Heart } from "lucide-react";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/raids", label: "Raids" },
  { href: "/news", label: "News" },
  { href: "/glossary", label: "Glossaire" },
];

const resources = [
  {
    href: "https://www.thebalanceffxiv.com/",
    label: "The Balance",
    description: "Guides de jobs",
  },
  {
    href: "https://www.fflogs.com/",
    label: "FFLogs",
    description: "Analyse de parse",
  },
  {
    href: "https://etro.gg/",
    label: "Etro.gg",
    description: "Optimisation BiS",
  },
  {
    href: "https://fr.tomestone.gg/",
    label: "Tomestone",
    description: "Profil général de progression",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/60 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded border border-amber-500/30 bg-amber-500/10">
                <Swords size={16} className="text-amber-500" />
              </div>
              <span className="font-bold uppercase tracking-wide">
                XIV <span className="font-bold text-amber-500">Rhalgr</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Guides stratégiques communautaires pour les raids de Final Fantasy
              XIV. Progressez plus vite, comprenez chaque mécanique.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Ressources
            </h3>
            <ul className="flex flex-col gap-3">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col"
                  >
                    <span className="text-amber-500 hover:text-amber-400 transition-colors text-sm">
                      {resource.label}
                    </span>
                    <span className="text-white/30 text-xs">
                      {resource.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © 2026 XIV <span className="font-bold">Rhalgr</span> — Communauté
            francophone
          </p>
          <p className="text-white/30 text-xs">
            Final Fantasy XIV © 2010–2026 SQUARE ENIX CO., LTD. Site non
            officiel.
          </p>
        </div>
      </div>
    </footer>
  );
}
