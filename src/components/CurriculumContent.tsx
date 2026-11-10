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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.curriculum.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-xl">
            {t.curriculum.sectionSubtitle}
          </p>
        </div>
        <div>
          <a
            href={resumeUrl}
            download="Samuel_Cesar_Curriculum.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-accent hover:bg-accent-hover text-on-accent font-sans font-semibold text-sm transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            <Download size={16} aria-hidden="true" />
            <span>{t.curriculum.downloadPdf}</span>
          </a>
        </div>
      </div>

      {/* Asymmetric 2-Column Executive Summary Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Education & Fast Profile (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-surface border border-edge p-6 md:p-8 flex flex-col justify-between space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 text-dominant-ink mb-5">
              <GraduationCap size={22} aria-hidden="true" />
              <h3 className="font-bold text-ink text-base md:text-lg font-display">{t.curriculum.educationTitle}</h3>
            </div>
            
            <div className="space-y-3 text-sm text-ink-secondary">
              <div className="rounded-lg bg-surface-alt border border-edge-subtle p-4">
                <span className="text-[13px] font-medium text-dominant-ink block mb-1">{t.curriculum.degreeStatus}</span>
                <strong className="text-ink block text-[15px]">{t.curriculum.degreeName}</strong>
                <span className="text-[13px] text-ink-tertiary block mt-0.5">{t.curriculum.degreeSchool}</span>
              </div>

              <div className="rounded-lg bg-surface-alt border border-edge-subtle p-4">
                <span className="text-[13px] font-medium text-accent-ink block mb-1">{t.curriculum.researchStatus}</span>
                <strong className="text-ink block text-[15px]">{t.curriculum.researchLab}</strong>
                <span className="text-[13px] text-ink-tertiary block mt-0.5">{t.curriculum.researchFocus}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-surface-alt px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-[13px] font-sans text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-dominant-ink shrink-0" aria-hidden="true" />
              {t.curriculum.location}
            </span>
            <span className="text-accent-ink font-semibold">{t.curriculum.availability}</span>
          </div>
        </div>

        {/* Right Column: Technical Competencies & Distinctions (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-surface border border-edge p-6 md:p-8 flex flex-col justify-between space-y-6 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 text-accent-ink mb-5">
              <Briefcase size={22} aria-hidden="true" />
              <h3 className="font-bold text-ink text-base md:text-lg font-display">{t.curriculum.competenciesTitle}</h3>
            </div>

            <div className="space-y-5">
              {/* Competencies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3.5">
                  <span className="text-[13px] font-sans font-semibold text-dominant-ink block mb-1">
                    {t.curriculum.compDataEngTitle}
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink-secondary">
                    {t.curriculum.compDataEngDesc}
                  </p>
                </div>

                <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3.5">
                  <span className="text-[13px] font-sans font-semibold text-accent-ink block mb-1">
                    {t.curriculum.compDataScienceTitle}
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink-secondary">
                    {t.curriculum.compDataScienceDesc}
                  </p>
                </div>

                <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3.5">
                  <span className="text-[13px] font-sans font-semibold text-dominant-ink block mb-1">
                    {t.curriculum.compVisionTitle}
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink-secondary">
                    {t.curriculum.compVisionDesc}
                  </p>
                </div>

                <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3.5">
                  <span className="text-[13px] font-sans font-semibold text-accent-ink block mb-1">
                    {t.curriculum.compCloudTitle}
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink-secondary">
                    {t.curriculum.compCloudDesc}
                  </p>
                </div>
              </div>

              {/* Academic Distinctions Strip */}
              <div>
                <span className="text-[13px] font-sans font-semibold text-ink block mb-2.5">
                  {t.curriculum.awardsHeader}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3 flex items-start gap-2.5">
                    <Award size={16} className="text-accent-ink shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="text-[13px] text-ink block">{t.curriculum.awardHackathonTitle}</strong>
                      <span className="text-[13px] text-ink-tertiary">{t.curriculum.awardHackathonDesc}</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-surface-alt border border-edge-subtle p-3 flex items-start gap-2.5">
                    <Award size={16} className="text-dominant-ink shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="text-[13px] text-ink block">{t.curriculum.awardCbrTitle}</strong>
                      <span className="text-[13px] text-ink-tertiary">{t.curriculum.awardCbrDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[13px] font-sans">
            <span className="text-ink-tertiary">{t.curriculum.officialDoc}</span>
            <a
              href={resumeUrl}
              download="Samuel_Cesar_Curriculum.pdf"
              className="text-dominant-ink hover:text-dominant font-medium inline-flex items-center gap-1.5 min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded"
            >
              <Download size={14} aria-hidden="true" />
              <span>{t.curriculum.directDownload}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
