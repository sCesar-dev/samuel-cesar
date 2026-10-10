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

export default function ProjectCardVisual({ project }: { project: ProjectCardData }) {
  const [viewMode, setViewMode] = useState<'preview' | 'architecture'>('preview');

  const isDataScience = project.category === 'data-science';
  const isVision = project.category === 'computer-vision' || project.category === 'robotics-cv';
  const isDataEngineering = project.category === 'data-engineering' || (!isDataScience && !isVision);

  const getThemeColorClass = () => {
    if (isDataScience) return 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 shadow-sm';
    if (isVision) return 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm';
    return 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm';
  };

  const getCategoryBadgeClass = () => {
    if (isDataScience) return 'bg-purple-950/90 text-purple-300 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.25)]';
    if (isVision) return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
    return 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
  };

  const getIconColorClass = () => {
    if (isDataScience) return 'text-purple-400';
    if (isVision) return 'text-cyan-400';
    return 'text-emerald-400';
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 backdrop-blur-xl overflow-hidden flex flex-col h-full transition-all duration-300 shadow-xl hover:shadow-2xl"
    >
      {/* Media & Interactive Toggle Header */}
      <div className="relative h-60 w-full bg-zinc-950 overflow-hidden border-b border-white/10">
        
        {/* Toggle between Live Preview and Architecture */}
        <div className="absolute top-3 right-3 z-20 flex bg-zinc-950/85 backdrop-blur-md rounded-lg p-0.5 border border-white/15 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'preview' 
                ? getThemeColorClass()
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Play size={12} />
            <span>Mídia</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('architecture')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'architecture' 
                ? getThemeColorClass()
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Network size={12} />
            <span>Arquitetura</span>
          </button>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-bold tracking-wider backdrop-blur-md border ${getCategoryBadgeClass()}`}>
            {project.categoryLabel || (isDataScience ? 'Ciência de Dados' : isVision ? 'Visão Computacional' : 'Engenharia de Dados')}
          </span>
        </div>

        {/* Media Content */}
        {viewMode === 'preview' ? (
          project.mediaVideoUrl ? (
            <video
              src={project.mediaVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src={project.mediaImageUrl || '/images/personal-image.jpg'}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          )
        ) : (
          <div className="w-full h-full bg-zinc-950/95 p-5 flex flex-col items-center justify-center text-center">
            {project.architectureDiagramUrl ? (
              <img 
                src={project.architectureDiagramUrl} 
                alt={`Arquitetura de ${project.title}`} 
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="space-y-2 text-zinc-400">
                <Layers size={36} className={`mx-auto ${getIconColorClass()}`} />
                <p className="text-xs font-mono font-semibold text-zinc-200">Topologia de Pipeline & Nós</p>
                <div className="text-[11px] text-zinc-400 max-w-xs font-mono leading-relaxed bg-zinc-900/80 p-2.5 rounded-lg border border-white/5">
                  {isDataScience ? (
                    'EDA & Tratamento ➔ ColumnTransformer ➔ Random Forest ➔ Inferência Contrafactual ➔ Bonificação'
                  ) : isVision ? (
                    'Câmera RGB-D ➔ YOLOv8 ➔ Fusão 3D ➔ MoveIt 2 (OMPL) ➔ Atuadores'
                  ) : (
                    'Ingestão Dados ➔ Grafo Ponderado ➔ Indexador B-Tree O(log n) ➔ Dijkstra Min-Cost'
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Metrics Overlay at the Bottom of Media */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent p-3 pt-6 flex flex-wrap gap-4 text-xs font-mono">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5 text-zinc-300">
                <Activity size={12} className={getIconColorClass()} />
                <span className="text-zinc-400">{key}:</span>
                <strong className="text-white font-bold">{value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* One-Liner de Impacto */}
          <p className="text-sm text-zinc-300 mt-2.5 leading-relaxed font-light">
            {project.oneLinerImpact || project.description}
          </p>

          {/* Hardware & Infrastructure Badges */}
          {project.hardwareBadges && project.hardwareBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3.5 pt-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                <Cpu size={11} /> HW/Infra:
              </span>
              {project.hardwareBadges.map((hw) => (
                <span 
                  key={hw}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/25"
                >
                  {hw}
                </span>
              ))}
            </div>
          )}

          {/* Highlights Técnicos de Engenharia */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                Highlights de Engenharia:
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

        {/* Stack Chips & Action Buttons */}
        <div className="space-y-4 pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-zinc-300 border border-white/10"
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
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
              >
                <Github size={15} />
                <span>Código</span>
              </a>
            )}

            {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Demo</span>
              </a>
            )}

            <a
              href={`/projects/${project.slug}`}
              className="ml-auto text-xs font-semibold text-white/90 hover:text-cyan-400 flex items-center gap-1.5 group/link transition-colors"
            >
              <span>Detalhes</span>
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
