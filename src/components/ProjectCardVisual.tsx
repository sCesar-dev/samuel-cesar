import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Network, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

export interface ProjectCardData {
  id: string;
  slug: string;
  title: string;
  category?: 'robotics-cv' | 'data-engineering' | 'data-science' | 'computer-vision';
  categoryLabel?: string;
  oneLinerImpact?: string;
  mediaVideoUrl?: string;
  mediaImageUrl?: string;
  architectureDiagramUrl?: string;
  metrics?: { [label: string]: string };
  hardwareBadges?: string[];
  techs: string[];
  technicalHighlights?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  description: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
}

export default function ProjectCardVisual({ project, className = '' }: ProjectCardProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'architecture'>('preview');
  const { t } = useI18n();
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  const isDataScience = project.category === 'data-science';
  const isVision = project.category === 'computer-vision' || project.category === 'robotics-cv';

  const resolveUrl = (url: string | undefined) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const getThemeColorClass = () => {
    if (isDataScience) return 'bg-emerald-500/25 text-emerald-200 font-semibold border border-emerald-400/50';
    return 'bg-cyan-500/25 text-cyan-200 font-semibold border border-cyan-400/50';
  };

  const getCategoryBadgeClass = () => {
    if (isDataScience) return 'bg-zinc-950/90 text-emerald-300 border-emerald-500/40';
    return 'bg-zinc-950/90 text-cyan-300 border-cyan-500/40';
  };

  const getIconColorClass = () => {
    if (isDataScience) return 'text-emerald-400';
    return 'text-cyan-400';
  };

  const categoryFallback = isDataScience 
    ? t.projects.catDataScience 
    : isVision 
    ? t.projects.catVision 
    : t.projects.catDataEng;

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`group rounded-xl bg-[#121216]/80 border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl overflow-hidden flex flex-col h-full transition-all duration-300 ${className}`}
    >
      {/* Media & Interactive Toggle Header */}
      <div className="media-header relative h-60 w-full bg-zinc-950 overflow-hidden border-b border-white/10">
        
        {/* Toggle between Live Preview and Architecture */}
        <div className="absolute top-3 right-3 z-20 flex bg-zinc-950/90 backdrop-blur-md rounded-lg p-0.5 border border-zinc-700/60 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            aria-pressed={viewMode === 'preview'}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 min-h-[26px] ${
              viewMode === 'preview' 
                ? getThemeColorClass()
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Play size={12} aria-hidden="true" />
            <span>{t.projects.viewMedia}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('architecture')}
            aria-pressed={viewMode === 'architecture'}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 min-h-[26px] ${
              viewMode === 'architecture' 
                ? getThemeColorClass()
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Network size={12} aria-hidden="true" />
            <span>{t.projects.viewArchitecture}</span>
          </button>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono uppercase font-semibold tracking-wider backdrop-blur-md border ${getCategoryBadgeClass()}`}>
            {project.categoryLabel || categoryFallback}
          </span>
        </div>

        {/* Media Content */}
        {viewMode === 'preview' ? (
          project.mediaVideoUrl ? (
            <video
              src={resolveUrl(project.mediaVideoUrl)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          ) : (
            <img
              src={resolveUrl(project.mediaImageUrl) || `${baseUrl}/images/personal-image.jpg`}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          )
        ) : (
          <div className="w-full h-full bg-[#09090b]/95 p-5 flex flex-col items-center justify-center text-center">
            {project.architectureDiagramUrl ? (
              <img 
                src={resolveUrl(project.architectureDiagramUrl)} 
                alt={`${t.projects.viewArchitecture} - ${project.title}`} 
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="space-y-2 text-zinc-400">
                <Layers size={32} className={`mx-auto ${getIconColorClass()}`} />
                <p className="text-xs font-mono font-semibold text-zinc-200">{t.projects.architectureTopology}</p>
                <div className="text-[11px] text-zinc-400 max-w-xs font-mono leading-relaxed border-t border-white/10 pt-2.5 mt-2">
                  {isDataScience ? (
                    t.projects.architectureDataScienceFlow
                  ) : isVision ? (
                    t.projects.architectureVisionFlow
                  ) : (
                    t.projects.architectureDataEngFlow
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Metrics Overlay at the Bottom of Media */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="media-overlay absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent p-3 pt-6 flex flex-wrap gap-4 text-xs font-mono">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5 text-zinc-300">
                <Activity size={12} className={getIconColorClass()} />
                <span className="text-zinc-400">{key}:</span>
                <strong className="text-white font-bold tabular-nums">{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug font-display">
            {project.title}
          </h3>

          {/* One-Liner de Impacto */}
          <p className="text-sm text-zinc-300 mt-2 leading-relaxed font-light">
            {project.oneLinerImpact || project.description}
          </p>

          {/* Hardware & Infrastructure Badges */}
          {project.hardwareBadges && project.hardwareBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
              <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-1">
                <Cpu size={12} /> {t.projects.hardwareLabel}
              </span>
              {project.hardwareBadges.map((hw) => (
                <span 
                  key={hw} 
                  className="px-2 py-0.5 rounded text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/10"
                >
                  {hw}
                </span>
              ))}
            </div>
          )}

          {/* Highlights Técnicos de Engenharia */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <div className="mt-3.5 space-y-1.5 border-t border-white/5 pt-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                {t.projects.highlightsLabel}
              </span>
              {project.technicalHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stack Chips & Action Buttons - Always Pinned to Bottom */}
        <div className="space-y-4 pt-4 border-t border-white/10 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-0.5 rounded text-xs font-mono bg-white/[0.03] text-zinc-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                <Github size={14} />
                <span>{t.projects.btnCode}</span>
              </a>
            )}

            {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                <ExternalLink size={13} />
                <span>{t.projects.btnDemo}</span>
              </a>
            )}

            <a
              href={`${baseUrl}/projects/${project.slug}`}
              className="ml-auto text-xs font-semibold text-white/90 hover:text-cyan-400 flex items-center gap-1.5 group/link transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <span>{t.projects.btnDetails}</span>
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
