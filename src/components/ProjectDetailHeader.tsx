import React from 'react';
import { ArrowLeft, Github, SquareArrowOutUpRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface ProjectDetailHeaderProps {
  slug: string;
  initialTitle: string;
  initialDescription: string;
  techs: string[];
  github?: string;
  live?: string;
  baseUrl: string;
}

export default function ProjectDetailHeader({
  slug,
  initialTitle,
  initialDescription,
  techs,
  github,
  live,
  baseUrl,
}: ProjectDetailHeaderProps) {
  const { t } = useI18n();

  const slugKey = slug.toLowerCase().replace(/[^a-z0-9]/g, '') as keyof typeof t.projectItems;
  const localized = t.projectItems[slugKey];

  const title = localized?.title || initialTitle;
  const description = localized?.description || initialDescription;

  return (
    <>
      <a 
        href={`${baseUrl}/#projects`} 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 font-mono text-xs uppercase tracking-wider transition-colors mb-8 group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        <span>{t.projectDetail.backToProjects}</span>
      </a>

      <header className="mb-12 border-b border-white/10 pb-8 transition-colors">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-display">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 mb-6 font-light max-w-3xl leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techs.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/10">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {github && github !== "#" && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-cyan-400 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <Github size={16} aria-hidden="true" />
              <span>{t.projectDetail.viewSource}</span>
            </a>
          )}
          {live && live !== "#" && (
            <a 
              href={live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <SquareArrowOutUpRight size={15} aria-hidden="true" />
              <span>{t.projectDetail.liveDemo}</span>
            </a>
          )}
        </div>
      </header>
    </>
  );
}
