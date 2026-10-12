import React from 'react';
import { Download, GraduationCap, Award, Briefcase, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface CurriculumContentProps {
  baseUrl: string;
}

export default function CurriculumContent({ baseUrl }: CurriculumContentProps) {
  const { t } = useI18n();
  const resumeUrl = `${baseUrl}/docs/Samuel_Cesar_Curriculum.pdf`;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">
            {t.curriculum.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
            {t.curriculum.sectionSubtitle}
          </p>
        </div>
        <div>
          <a
            href={resumeUrl}
            download="Samuel_Cesar_Curriculum.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            <Download size={16} aria-hidden="true" />
            <span>{t.curriculum.downloadPdf}</span>
          </a>
        </div>
      </div>

      {/* Asymmetric 2-Column Executive Summary Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Education & Fast Profile (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-[#121216]/80 border border-white/10 p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 text-cyan-400 mb-5">
              <GraduationCap size={22} aria-hidden="true" />
              <h3 className="font-bold text-white text-base md:text-lg font-display">{t.curriculum.educationTitle}</h3>
            </div>
            
            <div className="space-y-4 text-sm text-zinc-300 divide-y divide-white/5">
              <div className="pt-2 first:pt-0">
                <span className="text-xs font-mono text-cyan-400 block mb-0.5">{t.curriculum.degreeStatus}</span>
                <strong className="text-white block text-sm">{t.curriculum.degreeName}</strong>
                <span className="text-xs text-zinc-400">{t.curriculum.degreeSchool}</span>
              </div>

              <div className="pt-3">
                <span className="text-xs font-mono text-emerald-400 block mb-0.5">{t.curriculum.researchStatus}</span>
                <strong className="text-white block text-sm">{t.curriculum.researchLab}</strong>
                <span className="text-xs text-zinc-400">{t.curriculum.researchFocus}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-cyan-400" aria-hidden="true" />
              {t.curriculum.location}
            </span>
            <span className="text-emerald-400 font-semibold">{t.curriculum.availability}</span>
          </div>
        </div>

        {/* Right Column: Technical Competencies & Distinctions (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-[#121216]/80 border border-white/10 p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-400 mb-5">
              <Briefcase size={22} aria-hidden="true" />
              <h3 className="font-bold text-white text-base md:text-lg font-display">{t.curriculum.competenciesTitle}</h3>
            </div>

            <div className="space-y-4">
              {/* Competencies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-2">
                <div className="border-l-2 border-cyan-400/40 pl-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-0.5">
                    {t.curriculum.compDataEngTitle}
                  </span>
                  <p className="text-xs text-zinc-300">
                    {t.curriculum.compDataEngDesc}
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400/40 pl-3">
                  <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block mb-0.5">
                    {t.curriculum.compDataScienceTitle}
                  </span>
                  <p className="text-xs text-zinc-300">
                    {t.curriculum.compDataScienceDesc}
                  </p>
                </div>

                <div className="border-l-2 border-cyan-400/40 pl-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-0.5">
                    {t.curriculum.compVisionTitle}
                  </span>
                  <p className="text-xs text-zinc-300">
                    {t.curriculum.compVisionDesc}
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400/40 pl-3">
                  <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block mb-0.5">
                    {t.curriculum.compCloudTitle}
                  </span>
                  <p className="text-xs text-zinc-300">
                    {t.curriculum.compCloudDesc}
                  </p>
                </div>
              </div>

              {/* Academic Distinctions Strip */}
              <div className="pt-3 border-t border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  {t.curriculum.awardsHeader}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="flex items-start gap-2.5">
                    <Award size={16} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="text-xs text-white block">{t.curriculum.awardHackathonTitle}</strong>
                      <span className="text-xs text-zinc-400">{t.curriculum.awardHackathonDesc}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award size={16} className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="text-xs text-white block">{t.curriculum.awardCbrTitle}</strong>
                      <span className="text-xs text-zinc-400">{t.curriculum.awardCbrDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">{t.curriculum.officialDoc}</span>
            <a
              href={resumeUrl}
              download="Samuel_Cesar_Curriculum.pdf"
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <Download size={13} aria-hidden="true" />
              <span>{t.curriculum.directDownload}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
