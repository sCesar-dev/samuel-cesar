import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCardVisual, { type ProjectCardData } from './ProjectCardVisual';
import { Database, BrainCircuit, Eye, Sparkles, Shield } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized, pickLocalizedList } from '../i18n/localize';
import type { ProjectItem } from '../../data/schemas/portfolio';

interface Props {
  projects: ProjectItem[];
}

export type ProjectTabFilter = 'all' | 'data-engineering' | 'data-science' | 'computer-vision' | 'cybersecurity';

export default function ProjectsList({ projects }: Props) {
  const [activeTab, setActiveTab] = useState<ProjectTabFilter>('all');
  const { t, locale } = useI18n();

  useEffect(() => {
    const handleSelectTab = (event: Event) => {
      const detail = (event as CustomEvent<{ tab?: ProjectTabFilter }>).detail;
      if (detail?.tab) {
        setActiveTab(detail.tab);
      }
    };
    window.addEventListener('portfolio:select-project-tab', handleSelectTab);
    return () => window.removeEventListener('portfolio:select-project-tab', handleSelectTab);
  }, []);

  const mappedProjects = useMemo<ProjectCardData[]>(() => {
    const list = [...projects].sort((a, b) => a.order - b.order);

    return list.map((p) => {
      let resolvedCategory: 'data-engineering' | 'data-science' | 'computer-vision' | 'cybersecurity' = 'data-engineering';

      if (p.category === 'data-science') {
        resolvedCategory = 'data-science';
      } else if (p.category === 'computer-vision' || p.category === 'robotics-cv') {
        resolvedCategory = 'computer-vision';
      } else if (p.category === 'cybersecurity') {
        resolvedCategory = 'cybersecurity';
      }

      const localizedMetrics: Record<string, string> = {};
      for (const metric of p.metrics) {
        localizedMetrics[pickLocalized(metric.label, locale)] = pickLocalized(metric.value, locale);
      }

      return {
        id: p.id,
        title: pickLocalized(p.title, locale),
        description: pickLocalized(p.description, locale),
        category: resolvedCategory,
        categoryLabel: pickLocalized(p.categoryLabel, locale),
        oneLinerImpact: p.oneLinerImpact ? pickLocalized(p.oneLinerImpact, locale) : undefined,
        mediaVideoUrl: p.videos.length > 0 ? p.videos[0] : undefined,
        mediaImageUrl: p.images.length > 0 ? p.images[0] : undefined,
        architectureDiagramUrl: p.architectureDiagram ?? undefined,
        metrics: localizedMetrics,
        hardwareBadges: p.hardwareBadges,
        techs: p.techs,
        technicalHighlights: p.technicalHighlights ? pickLocalizedList(p.technicalHighlights, locale) : [],
        featured: p.featured,
        githubUrl: p.github ?? undefined,
        liveDemoUrl: p.live ?? undefined,
      };
    });
  }, [projects, locale]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'data-engineering') {
      return mappedProjects.filter((p) => p.category === 'data-engineering');
    }
    if (activeTab === 'data-science') {
      return mappedProjects.filter((p) => p.category === 'data-science');
    }
    if (activeTab === 'computer-vision') {
      return mappedProjects.filter((p) => p.category === 'computer-vision');
    }
    if (activeTab === 'cybersecurity') {
      return mappedProjects.filter((p) => p.category === 'cybersecurity');
    }
    return mappedProjects;
  }, [mappedProjects, activeTab]);

  return (
    <div className="w-full">
      {/* Section Header + Coupled Instrument Filter Bar */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10 pb-6 border-b border-edge">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.projects.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2.5 max-w-2xl">
            {t.projects.sectionSubtitle}
          </p>
        </div>

        {/* Coupled Technical Selector Bar (1px hairline matrix via gap-px bg-edge) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:inline-flex bg-edge gap-px border border-edge w-full xl:w-auto shrink-0 sm:[&>*:last-child]:col-span-2 xl:[&>*:last-child]:col-span-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            aria-pressed={activeTab === 'all'}
            className={`flex items-center justify-between xl:justify-start gap-2.5 px-4 py-2.5 text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dominant ${
              activeTab === 'all'
                ? 'bg-surface-alt text-dominant-ink font-semibold'
                : 'bg-surface text-ink-tertiary hover:text-ink hover:bg-surface-alt/50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles size={14} className={activeTab === 'all' ? 'text-dominant-ink' : ''} aria-hidden="true" />
              <span>{t.projects.tabAll}</span>
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 bg-control text-ink-secondary tabular-nums border border-edge-subtle">
              {mappedProjects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('data-engineering')}
            aria-pressed={activeTab === 'data-engineering'}
            className={`flex items-center justify-between xl:justify-start gap-2.5 px-4 py-2.5 text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dominant ${
              activeTab === 'data-engineering'
                ? 'bg-surface-alt text-dominant-ink font-semibold'
                : 'bg-surface text-ink-tertiary hover:text-dominant-ink hover:bg-surface-alt/50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Database size={14} className="text-dominant-ink" aria-hidden="true" />
              <span>{t.projects.tabDataEng}</span>
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 bg-dominant-soft text-dominant-ink tabular-nums border border-dominant-edge">
              {mappedProjects.filter((p) => p.category === 'data-engineering').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('data-science')}
            aria-pressed={activeTab === 'data-science'}
            className={`flex items-center justify-between xl:justify-start gap-2.5 px-4 py-2.5 text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
              activeTab === 'data-science'
                ? 'bg-surface-alt text-accent-ink font-semibold'
                : 'bg-surface text-ink-tertiary hover:text-accent-ink hover:bg-surface-alt/50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <BrainCircuit size={14} className="text-accent-ink" aria-hidden="true" />
              <span>{t.projects.tabDataScience}</span>
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 bg-accent-soft text-accent-ink tabular-nums border border-accent-edge">
              {mappedProjects.filter((p) => p.category === 'data-science').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('computer-vision')}
            aria-pressed={activeTab === 'computer-vision'}
            className={`flex items-center justify-between xl:justify-start gap-2.5 px-4 py-2.5 text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dominant ${
              activeTab === 'computer-vision'
                ? 'bg-surface-alt text-dominant-ink font-semibold'
                : 'bg-surface text-ink-tertiary hover:text-dominant-ink hover:bg-surface-alt/50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Eye size={14} className="text-dominant-ink" aria-hidden="true" />
              <span>{t.projects.tabVision}</span>
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 bg-dominant-soft text-dominant-ink tabular-nums border border-dominant-edge">
              {mappedProjects.filter((p) => p.category === 'computer-vision').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cybersecurity')}
            aria-pressed={activeTab === 'cybersecurity'}
            className={`flex items-center justify-between xl:justify-start gap-2.5 px-4 py-2.5 text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
              activeTab === 'cybersecurity'
                ? 'bg-surface-alt text-accent-ink font-semibold'
                : 'bg-surface text-ink-tertiary hover:text-accent-ink hover:bg-surface-alt/50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Shield size={14} className="text-accent-ink" aria-hidden="true" />
              <span>{t.projects.tabCyberSec}</span>
            </span>
            <span className="text-xs font-mono px-1.5 py-0.5 bg-accent-soft text-accent-ink tabular-nums border border-accent-edge">
              {mappedProjects.filter((p) => p.category === 'cybersecurity').length}
            </span>
          </button>
        </div>
      </div>

      {/* Differentiated Project Architecture: Full-Width Split Showcases + Technical Index Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const isShowcase =
                filteredProjects.length === 1 ||
                (activeTab === 'all' && index < 2);

              const spanClass = isShowcase
                ? 'md:col-span-2 lg:col-span-12'
                : 'md:col-span-1 lg:col-span-6';

              return (
                <div key={project.id} className={spanClass}>
                  <ProjectCardVisual
                    project={project}
                    variant={isShowcase ? 'showcase' : 'index'}
                    indexNumber={index + 1}
                  />
                </div>
              );
            })
          ) : (
            <div className="md:col-span-2 lg:col-span-12 bg-surface border border-edge p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-ink font-display">
                  {t.projects.emptyTrackTitle}
                </h3>
                <p className="text-sm text-ink-tertiary max-w-2xl">
                  {t.projects.emptyTrackDesc}
                </p>
              </div>
              <a
                href="#certifications"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-accent-soft text-accent-ink border border-accent-edge hover:bg-surface-alt transition-colors min-h-[42px] shrink-0"
              >
                <Shield size={15} aria-hidden="true" />
                <span>{t.hero.benchOpenVault}</span>
              </a>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
