import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
};

interface Props {
  certifications: Certification[];
}

export default function CertificationsList({ certifications }: Props) {
  const [activeSkill, setActiveSkill] = useState<string>('All');

  const skills = useMemo(() => {
    const allSkills = certifications.flatMap((cert) => cert.skills);
    const uniqueSkills = Array.from(new Set(allSkills)).sort();
    return ['All', ...uniqueSkills];
  }, [certifications]);

  const filteredCertifications = useMemo(() => {
    if (activeSkill === 'All') return certifications;
    return certifications.filter((cert) => cert.skills.includes(activeSkill));
  }, [certifications, activeSkill]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {skills.map((skill) => (
          <button
            key={skill}
            onClick={() => setActiveSkill(skill)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSkill === skill
                ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-indigo-500'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 backdrop-blur-md border border-white/10'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredCertifications.map((cert) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
              className="relative p-6 rounded-2xl flex flex-col h-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:bg-white/10 transition-colors duration-300 overflow-hidden group"
            >
              <div className="absolute -inset-x-0 -inset-y-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-xl font-bold text-gray-100 leading-tight">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-lg shrink-0 border border-indigo-500/20">
                    {cert.date}
                  </span>
                </div>
                
                <p className="text-indigo-200/70 font-medium mb-6 text-sm">
                  {cert.issuer}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
