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
import { formatString } from '../i18n/translations';

export interface ProjectCardData {
  id: string;
  title: string;
  category?: 'robotics-cv' | 'data-engineering' | 'data-science' | 'computer-vision' | 'cybersecurity';
  categoryLabel?: string;
  oneLinerImpact?: string;
  mediaVideoUrl?: string;
  mediaImageUrl?: string;
  architectureDiagramUrl?: string;
  metrics?: { [label: string]: string };
  hardwareBadges?: string[];
  techs: string[];
  technicalHighlights?: string[];
  featured?: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
  description: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  variant?: 'showcase' | 'index';
  indexNumber?: number;
  className?: string;
}

export default function ProjectCardVisual({
  project,
  variant = 'index',
  indexNumber = 1,
  className = '',
}: ProjectCardProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'architecture'>('preview');
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const { t } = useI18n();
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  const isDataScience = project.category === 'data-science';
  const isVision = project.category === 'computer-vision' || project.category === 'robotics-cv';
  const isCyberSec = project.category === 'cybersecurity';
  const isAccentTrack = isDataScience || isCyberSec;
  const highlights = project.technicalHighlights || [];
  const hasOverflowHighlights = highlights.length > 2;
  const isShowcase = variant === 'showcase';
  const formattedIndex = String(indexNumber).padStart(2, '0');

  const resolveUrl = (url: string | undefined) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const getThemeColorClass = () => {
    if (isAccentTrack) return 'bg-accent-soft text-accent-ink font-semibold border border-accent-edge';
    return 'bg-dominant-soft text-dominant-ink font-semibold border border-dominant-edge';
  };

  const getCategoryBadgeClass = () => {
    if (isAccentTrack) return 'bg-media-pill text-accent-ink border-accent-edge';
    return 'bg-media-pill text-dominant-ink border-dominant-edge';
  };

  const getIconColorClass = () => {
    if (isAccentTrack) return 'text-media-icon-accent';
    return 'text-media-icon-dominant';
  };

  const toggleFocusRingClass = isAccentTrack ? 'focus-visible:ring-accent' : 'focus-visible:ring-dominant';

  const categoryFallback = isDataScience
    ? t.projects.catDataScience
    : isVision
    ? t.projects.catVision
    : isCyberSec
    ? t.projects.catCyberSec
    : t.projects.catDataEng;

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`group bg-surface border border-edge hover:border-dominant-edge overflow-hidden transition-colors duration-300 ${
        isShowcase
          ? 'grid grid-cols-1 lg:grid-cols-12'
          : 'flex flex-col h-full'
      } ${className}`}
    >
      {/* Media & Interactive Toggle Viewport (dark-locked surface for image contrast) */}
      <div
        className={`media-header relative w-full bg-zinc-950 overflow-hidden ${
          isShowcase
            ? 'lg:col-span-7 h-64 sm:h-80 lg:h-full lg:min-h-[360px] border-b lg:border-b-0 lg:border-r border-edge'
            : 'h-52 border-b border-edge'
        }`}
      >
        {/* Top Overlay Controls Bar */}
        <div className="absolute top-2.5 inset-x-2.5 z-20 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
          {/* Category Tag (Sharp Technical Tag) */}
          <span className={`pointer-events-auto max-w-full truncate px-2.5 py-1 text-xs font-mono font-semibold backdrop-blur-md border ${getCategoryBadgeClass()}`}>
            {project.categoryLabel || categoryFallback}
          </span>

          {/* Toggle between Live Preview and Architecture */}
          <div className="pointer-events-auto ml-auto flex bg-media-pill backdrop-blur-md rounded-sm p-0.5 border border-media-pill-edge text-xs font-sans">
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              aria-pressed={viewMode === 'preview'}
              className={`px-2 sm:px-2.5 py-1 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 ${toggleFocusRingClass} min-h-[36px] ${
                viewMode === 'preview' 
                  ? getThemeColorClass()
                  : 'text-media-pill-muted hover:text-media-pill-muted-hover border border-transparent'
              }`}
            >
              <Play size={13} aria-hidden="true" />
              <span>{t.projects.viewMedia}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('architecture')}
              aria-pressed={viewMode === 'architecture'}
              className={`px-2 sm:px-2.5 py-1 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 ${toggleFocusRingClass} min-h-[36px] ${
                viewMode === 'architecture' 
                  ? getThemeColorClass()
                  : 'text-media-pill-muted hover:text-media-pill-muted-hover border border-transparent'
              }`}
            >
              <Network size={13} aria-hidden="true" />
              <span>{t.projects.viewArchitecture}</span>
            </button>
          </div>
        </div>

        {/* Media Content */}
        {viewMode === 'preview' ? (
          project.mediaVideoUrl ? (
            <video
              src={resolveUrl(project.mediaVideoUrl)}
              poster={resolveUrl(project.mediaImageUrl)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <img
              src={resolveUrl(project.mediaImageUrl) || `${baseUrl}/images/personal-image.jpg`}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 opacity-90 group-hover:opacity-100"
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
              <div className="space-y-3 text-zinc-400">
                <Layers size={32} className={`mx-auto ${getIconColorClass()}`} aria-hidden="true" />
                <p className="text-[13px] font-semibold text-zinc-200">{t.projects.architectureTopology}</p>
                <div className="text-[13px] text-zinc-300 max-w-sm font-mono leading-relaxed bg-white/[0.04] border border-white/10 px-3 py-2">
                  {isDataScience ? (
                    t.projects.architectureDataScienceFlow
                  ) : isVision ? (
                    t.projects.architectureVisionFlow
                  ) : isCyberSec ? (
                    t.projects.architectureCyberSecFlow
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
          <div className="media-overlay absolute bottom-0 inset-x-0 p-3 pt-6 flex flex-wrap gap-4 text-xs font-mono">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5 text-zinc-300">
                <Activity size={12} className={getIconColorClass()} aria-hidden="true" />
                <span className="text-zinc-400">{key}:</span>
                <strong className="text-white font-bold tabular-nums">{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specification Column / Body (Zero nested box-in-box containers) */}
      <div
        className={`p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 ${
          isShowcase ? 'lg:col-span-5 lg:p-7' : ''
        }`}
      >
        <div>
          {/* Technical Index Coordinate Header */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono text-ink-tertiary">
            <span>SYS // {formattedIndex}</span>
            {isShowcase && (
              <span className="text-accent-ink font-semibold tracking-wider uppercase">
                FEATURED
              </span>
            )}
          </div>

          <h3 className={`${isShowcase ? 'text-2xl' : 'text-xl'} font-extrabold text-ink group-hover:text-dominant-ink transition-colors leading-snug font-display`}>
            {project.title}
          </h3>

          {/* One-Liner Impact */}
          <p className="text-[15px] text-ink-secondary mt-2 leading-relaxed">
            {project.oneLinerImpact || project.description}
          </p>

          {/* Hardware & Infrastructure Badges */}
          {project.hardwareBadges && project.hardwareBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
              <span className="text-[13px] font-medium text-ink-tertiary inline-flex items-center gap-1 mr-0.5">
                <Cpu size={13} aria-hidden="true" /> {t.projects.hardwareLabel}
              </span>
              {project.hardwareBadges.map((hw) => (
                <span 
                  key={hw} 
                  className="px-2 py-0.5 text-[12px] font-mono bg-surface-alt text-ink-secondary border border-edge-subtle"
                >
                  {hw}
                </span>
              ))}
            </div>
          )}

          {/* Engineering Highlights — Separated by hairline instead of nested rounded box */}
          {highlights.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-edge-subtle space-y-2">
              <span className="text-[12px] font-mono uppercase tracking-wider text-ink-tertiary font-semibold block">
                {t.projects.highlightsLabel}
              </span>
              {highlights.map((hl, i) => {
                const hiddenOnMobile = !showAllHighlights && i >= 2;
                return (
                  <div
                    key={i}
                    className={`${hiddenOnMobile ? 'hidden sm:flex' : 'flex'} items-start gap-2 text-[13px] leading-relaxed text-ink-secondary`}
                  >
                    <CheckCircle2 size={14} className="text-accent-ink shrink-0 mt-1" aria-hidden="true" />
                    <span>{hl}</span>
                  </div>
                );
              })}
              {hasOverflowHighlights && (
                <button
                  type="button"
                  onClick={() => setShowAllHighlights((prev) => !prev)}
                  className="sm:hidden text-[13px] font-medium text-dominant-ink hover:underline cursor-pointer pt-1 min-h-[36px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
                >
                  {showAllHighlights
                    ? t.projects.showLessHighlights
                    : formatString(t.projects.showMoreHighlights, { count: highlights.length - 2 })}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stack Chips & Action Buttons — Pinned to Bottom with Hairline Rule */}
        <div className="space-y-4 pt-3.5 mt-auto border-t border-edge-subtle">
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-0.5 text-[12px] font-mono bg-surface-alt text-ink-secondary border border-edge-subtle"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-0.5">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[36px] text-[13px] font-medium text-ink-secondary hover:text-ink transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
              >
                <Github size={15} aria-hidden="true" />
                <span>{t.projects.btnCode}</span>
              </a>
            )}

            {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[36px] text-[13px] font-medium text-dominant-ink hover:text-dominant transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
              >
                <ExternalLink size={14} aria-hidden="true" />
                <span>{t.projects.btnDemo}</span>
              </a>
            )}

            <a
              href={`${baseUrl}/projects/${project.id}`}
              className="ml-auto inline-flex items-center gap-1.5 min-h-[36px] text-[13px] font-semibold text-ink hover:text-dominant-ink group/link transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
            >
              <span>{t.projects.btnDetails}</span>
              <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
