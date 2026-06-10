import React from "react";

interface PhaseSectionProps {
  name: string;
  timeline?: string;
  children: React.ReactNode;
}

export default function PhaseSection({ name, timeline, children }: PhaseSectionProps) {
  return (
    <div className="my-8 border-l-2 border-amber-500/30 pl-6 not-prose">
      <div className="flex items-baseline gap-3 mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        {timeline && (
          <span className="text-xs font-mono text-amber-400/70 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {timeline}
          </span>
        )}
      </div>
      <div className="prose prose-invert prose-amber prose-sm max-w-none
        prose-p:text-white/70 prose-p:leading-relaxed
        prose-strong:text-white
        prose-ul:text-white/70 prose-li:marker:text-amber-500">
        {children}
      </div>
    </div>
  );
}
