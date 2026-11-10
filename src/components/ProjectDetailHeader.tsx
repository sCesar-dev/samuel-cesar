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
        className="inline-flex items-center gap-2 text-ink-tertiary hover:text-dominant-ink text-sm font-medium transition-colors mb-8 group min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        <span>{t.projectDetail.backToProjects}</span>
      </a>

      <header className="mb-12 border-b border-edge pb-8 transition-colors">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink mb-4 font-display">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-ink-secondary mb-6 max-w-3xl leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techs.map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded text-[13px] font-mono bg-surface-alt text-ink-secondary border border-edge-subtle">
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
              className="inline-flex items-center gap-2 min-h-[36px] text-ink-secondary hover:text-dominant-ink text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded"
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
              className="inline-flex items-center gap-2 min-h-[36px] text-dominant-ink hover:text-dominant text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded"
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
