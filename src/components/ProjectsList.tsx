import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCardVisual, { type ProjectCardData } from './ProjectCardVisual';
import { Database, BrainCircuit, Eye, Sparkles } from 'lucide-react';

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
        p.data.techs.some(t => ['scikit-learn', 'random forest', 'machine learning', 'xgboost'].includes(t.toLowerCase()))
      ) {
        resolvedCategory = 'data-science';
      } else if (
        p.data.category === 'computer-vision' || 
        p.data.category === 'robotics-cv' || 
        p.data.stack?.toLowerCase().includes('robot') || 
        p.data.stack?.toLowerCase().includes('vision') ||
        p.data.techs.some(t => ['ros 2', 'opencv', 'yolov8', 'moveit', 'amazon rekognition'].includes(t.toLowerCase()))
      ) {
        resolvedCategory = 'computer-vision';
      } else {
        resolvedCategory = 'data-engineering';
      }

      let resolvedCategoryLabel = p.data.categoryLabel;
      if (!resolvedCategoryLabel) {
        if (resolvedCategory === 'data-science') resolvedCategoryLabel = 'Ciência de Dados & ML';
        else if (resolvedCategory === 'computer-vision') resolvedCategoryLabel = 'Visão Computacional & Robótica';
        else resolvedCategoryLabel = 'Engenharia de Dados';
      }

      return {
        id: p.id,
        slug: p.slug,
        title: p.data.title,
        description: p.data.description,
        category: resolvedCategory,
        categoryLabel: resolvedCategoryLabel,
        oneLinerImpact: p.data.oneLinerImpact,
        mediaVideoUrl: p.data.videos && p.data.videos.length > 0 ? p.data.videos[0] : undefined,
        mediaImageUrl: p.data.images && p.data.images.length > 0 ? p.data.images[0] : undefined,
        architectureDiagramUrl: p.data.architectureDiagram,
        metrics: p.data.metrics || {},
        hardwareBadges: p.data.hardwareBadges || [],
        techs: p.data.techs || [],
        technicalHighlights: p.data.technicalHighlights || [],
        githubUrl: p.data.github,
        liveDemoUrl: p.data.live,
      };
    });
  }, [projects]);

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
      {/* Strategic Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'all'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
          }`}
        >
          <Sparkles size={14} className={activeTab === 'all' ? 'text-cyan-400' : ''} />
          <span>Todos</span>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 tabular-nums">
            {mappedProjects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('data-engineering')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'data-engineering'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30'
          }`}
        >
          <Database size={14} className="text-cyan-400" />
          <span>Engenharia de Dados</span>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 tabular-nums">
            {mappedProjects.filter((p) => p.category === 'data-engineering').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('data-science')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 ${
            activeTab === 'data-science'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30'
          }`}
        >
          <BrainCircuit size={14} className="text-emerald-400" />
          <span>Ciência de Dados &amp; ML</span>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 tabular-nums">
            {mappedProjects.filter((p) => p.category === 'data-science').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('computer-vision')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
            activeTab === 'computer-vision'
              ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-[#121216]/80 text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30'
          }`}
        >
          <Eye size={14} className="text-cyan-400" />
          <span>Visão Computacional</span>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 tabular-nums">
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
