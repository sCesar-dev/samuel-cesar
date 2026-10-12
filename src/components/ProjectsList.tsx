import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCardVisual, { type ProjectCardData } from './ProjectCardVisual';
import { Database, BrainCircuit, Eye, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

type AstroProject = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    techs: string[];
    stack: string;
    category?: 'robotics-cv' | 'data-engineering' | 'data-science' | 'computer-vision';
    categoryLabel?: string;
    oneLinerImpact?: string;
    hardwareBadges?: string[];
    technicalHighlights?: string[];
    architectureDiagram?: string;
    metrics?: Record<string, string>;
    featured?: boolean;
    order?: number;
    images?: string[];
    videos?: string[];
    github?: string;
    live?: string;
  };
};

interface Props {
  projects: AstroProject[];
}

export default function ProjectsList({ projects }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'data-engineering' | 'data-science' | 'computer-vision'>('all');
  const { t } = useI18n();

  // Transforma e ordena os projetos: destacados primeiro, depois por ordem numérica
  const mappedProjects = useMemo<ProjectCardData[]>(() => {
    const list = [...projects].sort((a, b) => {
      const orderA = a.data.order ?? 99;
      const orderB = b.data.order ?? 99;
      return orderA - orderB;
    });

    return list.map((p) => {
      let resolvedCategory: 'data-engineering' | 'data-science' | 'computer-vision' = 'data-engineering';
      
      if (
        p.data.category === 'data-science' || 
        p.data.stack?.toLowerCase().includes('data science') || 
        p.data.stack?.toLowerCase().includes('machine learning') ||
        p.data.techs.some(tech => ['scikit-learn', 'random forest', 'machine learning', 'xgboost'].includes(tech.toLowerCase()))
      ) {
        resolvedCategory = 'data-science';
      } else if (
        p.data.category === 'computer-vision' || 
        p.data.category === 'robotics-cv' || 
        p.data.stack?.toLowerCase().includes('robot') || 
        p.data.stack?.toLowerCase().includes('vision') ||
        p.data.techs.some(tech => ['ros 2', 'opencv', 'yolov8', 'moveit', 'amazon rekognition'].includes(tech.toLowerCase()))
      ) {
        resolvedCategory = 'computer-vision';
      } else {
        resolvedCategory = 'data-engineering';
      }

      // Check for localized project items
      const slugKey = p.slug.toLowerCase().replace(/[^a-z0-9]/g, '') as keyof typeof t.projectItems;
      const localized = t.projectItems[slugKey];

      let resolvedCategoryLabel = localized?.categoryLabel || p.data.categoryLabel;
      if (!resolvedCategoryLabel) {
        if (resolvedCategory === 'data-science') resolvedCategoryLabel = t.projects.catDataScience;
        else if (resolvedCategory === 'computer-vision') resolvedCategoryLabel = t.projects.catVision;
        else resolvedCategoryLabel = t.projects.catDataEng;
      }

      return {
        id: p.id,
        slug: p.slug,
        title: localized?.title || p.data.title,
        description: localized?.description || p.data.description,
        category: resolvedCategory,
        categoryLabel: resolvedCategoryLabel,
        oneLinerImpact: localized?.oneLinerImpact || p.data.oneLinerImpact,
        mediaVideoUrl: p.data.videos && p.data.videos.length > 0 ? p.data.videos[0] : undefined,
        mediaImageUrl: p.data.images && p.data.images.length > 0 ? p.data.images[0] : undefined,
        architectureDiagramUrl: p.data.architectureDiagram,
        metrics: p.data.metrics || {},
        hardwareBadges: p.data.hardwareBadges || [],
        techs: p.data.techs || [],
        technicalHighlights: localized?.technicalHighlights || p.data.technicalHighlights || [],
        githubUrl: p.data.github,
        liveDemoUrl: p.data.live,
      };
    });
  }, [projects, t]);

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
    return mappedProjects;
  }, [mappedProjects, activeTab]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            {t.projects.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl font-light">
            {t.projects.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* Strategic Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          aria-pressed={activeTab === 'all'}
          className={`flex items-center gap-2 px-4 py-2.5 md:py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer min-h-[42px] md:min-h-[36px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'all'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
          }`}
        >
          <Sparkles size={14} className={activeTab === 'all' ? 'text-cyan-400' : ''} aria-hidden="true" />
          <span>{t.projects.tabAll}</span>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 tabular-nums">
            {mappedProjects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('data-engineering')}
          aria-pressed={activeTab === 'data-engineering'}
          className={`flex items-center gap-2 px-4 py-2.5 md:py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer min-h-[42px] md:min-h-[36px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'data-engineering'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30'
          }`}
        >
          <Database size={14} className="text-cyan-400" aria-hidden="true" />
          <span>{t.projects.tabDataEng}</span>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 tabular-nums border border-cyan-400/20">
            {mappedProjects.filter((p) => p.category === 'data-engineering').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('data-science')}
          aria-pressed={activeTab === 'data-science'}
          className={`flex items-center gap-2 px-4 py-2.5 md:py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer min-h-[42px] md:min-h-[36px] focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 ${
            activeTab === 'data-science'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30'
          }`}
        >
          <BrainCircuit size={14} className="text-emerald-400" aria-hidden="true" />
          <span>{t.projects.tabDataScience}</span>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 tabular-nums border border-emerald-500/20">
            {mappedProjects.filter((p) => p.category === 'data-science').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('computer-vision')}
          aria-pressed={activeTab === 'computer-vision'}
          className={`flex items-center gap-2 px-4 py-2.5 md:py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer min-h-[42px] md:min-h-[36px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'computer-vision'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30'
          }`}
        >
          <Eye size={14} className="text-cyan-400" aria-hidden="true" />
          <span>{t.projects.tabVision}</span>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 tabular-nums border border-cyan-400/20">
            {mappedProjects.filter((p) => p.category === 'computer-vision').length}
          </span>
        </button>
      </div>

      {/* Asymmetric Bento Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const spanClass = 
              filteredProjects.length === 1 
                ? 'lg:col-span-12'
                : index === 0 
                ? 'lg:col-span-7'
                : index === 1 
                ? 'lg:col-span-5'
                : index === 2 
                ? 'lg:col-span-5'
                : index === 3 
                ? 'lg:col-span-7'
                : 'lg:col-span-6';

            return (
              <div key={project.id} className={spanClass}>
                <ProjectCardVisual project={project} />
              </div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
