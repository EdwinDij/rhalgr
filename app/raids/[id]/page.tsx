import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronRight, Swords, Shield, Users } from "lucide-react";
import { getGuideById, getAllGuides } from "@/lib/mdx";
import { getDifficulty } from "@/lib/difficulties";
import MechanicCard from "../../components/raidsCard/MechanicCard";
import PositionSchema from "../../components/raidComponents/PositionSchema";
import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const guide = getGuideById(id);
  if (!guide) return { title: "Guide introuvable" };

  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      images: guide.frontmatter.coverImage
        ? [{ url: guide.frontmatter.coverImage }]
        : [],
    },
  };
}

const components = {
  MechanicCard,
  PositionSchema,
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}
export default async function RaidGuidePage({ params }: Props) {
  const { id } = await params;
  const guide = getGuideById(id);
  if (!guide) notFound();
  const { frontmatter, content } = guide;
  const difficulty = getDifficulty(frontmatter.difficulty);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
          <span className="text-white/70">{frontmatter.extension}</span>
          <ChevronRight size={14} />
          <span>
            {frontmatter.difficulty === "Savage"
              ? "Raid"
              : frontmatter.difficulty === "Ultimate"
                ? "Raid"
                : frontmatter.difficulty === "Extreme"
                  ? "Défi"
                  : frontmatter.difficulty}
          </span>
          <ChevronRight size={14} />
          <span className={difficulty?.color.text}>
            {frontmatter.difficulty}
          </span>
          <ChevronRight size={14} />
          <span className="text-white/70">{frontmatter.title}</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded border ${difficulty?.color.badge}`}
            >
              {frontmatter.difficulty}
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded border border-white/20 text-white/60">
              {frontmatter.extension}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3">{frontmatter.title}</h1>
          <p className="text-white/60 text-lg">{frontmatter.description}</p>

          <div className="flex gap-6 mt-6 text-white/40 text-sm">
            <span className="flex items-center gap-1">
              <Swords size={14} /> {frontmatter.bossCount} boss
            </span>
            <span className="flex items-center gap-1">
              <Shield size={14} /> iLvl {frontmatter.iLvl}+
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> 8 joueurs
            </span>
          </div>
        </div>

        <div
          className="prose prose-invert prose-amber max-w-none
          prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-gray-800/60 prose-h2:pb-2
          prose-h3:text-lg prose-h3:font-semibold prose-h3:text-white/90
          prose-p:text-white/70 prose-p:leading-relaxed
          prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-amber-400
          prose-pre:bg-gray-800/60 prose-pre:border prose-pre:border-gray-700/80
          prose-strong:text-white
          prose-a:text-amber-500 prose-a:no-underline hover:prose-a:text-amber-400"
        >
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    </div>
  );
}
