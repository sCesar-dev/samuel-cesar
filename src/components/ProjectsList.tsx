import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, SquareArrowOutUpRight, ImageIcon } from 'lucide-react';

type Project = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    techs: string[];
    stack: string;
    images?: string[];
    videos?: string[];
    github?: string;
    live?: string;
  };
};

interface Props {
  projects: Project[];
}

export default function ProjectsList({ projects }: Props) {
  const [activeStack, setActiveStack] = useState<string>('All');

  const stacks = useMemo(() => {
    const allStacks = projects.map((p) => p.data.stack);
    const uniqueStacks = Array.from(new Set(allStacks)).sort();
    return ['All', ...uniqueStacks];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeStack === 'All') return projects;
    return projects.filter((project) => project.data.stack === activeStack);
  }, [projects, activeStack]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {stacks.map((stack) => (
          <button
            key={stack}
            onClick={() => setActiveStack(stack)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 glass-button ${
              activeStack === stack
                ? 'text-neon-green border-neon-green/80 shadow-[0_0_10px_rgba(57,255,20,0.2)]'
                : 'text-white/80 hover:text-neon-green hover:border-neon-green/50'
            }`}
          >
            {stack}
          </button>
        ))}
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
              className="relative rounded-2xl flex flex-col h-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-colors duration-300 overflow-hidden group"
            >
              <div className="absolute -inset-x-0 -inset-y-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-green/10 via-forest-green/5 to-transparent pointer-events-none" />

              {/* Cover Image/Video Area */}
              <div className="relative h-56 w-full border-b border-white/5 bg-black/20 overflow-hidden flex items-center justify-center">
                {project.data.images && project.data.images.length > 0 ? (
                  <img 
                    src={project.data.images[0]} 
                    alt={`Cover for ${project.data.title}`} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                ) : project.data.videos && project.data.videos.length > 0 ? (
                  <video 
                    src={project.data.videos[0]} 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                ) : (
                  <ImageIcon size={48} className="text-white/30 group-hover:scale-110 transition-transform duration-500" />
                )}
              </div>

              {/* Content Area */}
              <div className="relative z-10 flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-100 leading-tight mb-3">
                  {project.data.title}
                </h3>
                
                <p className="text-silver text-sm leading-relaxed mb-6 flex-1">
                  {project.data.description}
                </p>

                {/* Techs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.data.techs.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded-md glass-button text-white text-[11px] uppercase tracking-wider font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  {project.data.github && project.data.github !== "#" && (
                    <a 
                      href={project.data.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/80 hover:text-neon-green transition-colors"
                    >
                      <Github size={16} />
                      <span className="font-medium">Code</span>
                    </a>
                  )}
                  <a 
                    href={`/projects/${project.slug}`} 
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-neon-green transition-colors ml-auto"
                  >
                    <SquareArrowOutUpRight size={16} />
                    <span className="font-medium">View Details</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
