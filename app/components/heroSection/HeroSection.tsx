import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-[url('/images/wRwevRCQnc6X8qELXpzt6aHESs.jpg')] bg-cover bg-center relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-b from-transparent to-[#0d0f17]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-6">
        <span className="text-sm uppercase tracking-widest text-amber-500 block border border-amber-500/50 text-center py-2 px-4 rounded bg-amber-500/10">
          Maîtrisez les raids de FFXIV
        </span>
        <h1 className="text-6xl font-bold sm:text-center">
          Bienvenue sur <span className="text-amber-500">Rhalgr</span>
        </h1>
        <p className="text-white/75 text-xl center max-w-2xl sm:text-center">
          Votre compagnon ultime pour les raids de FFXIV. Découvrez des guides
          détaillés, des stratégies de boss, et des outils pour maîtriser chaque
          combat et vaincre les boss les plus redoutables.
        </p>
      </div>
    </section>
  );
}
