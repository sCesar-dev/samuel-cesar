import React from 'react';
import { Download, GraduationCap, Award, Briefcase, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import type {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  LocalizedString,
  SkillDomain,
} from '../../data/schemas/portfolio';

type CurriculumAward = Extract<AchievementItem, { kind: 'award' }>;

interface CurriculumContentProps {
  baseUrl: string;
  resumePath: string;
  resumeFilename: string;
  resumeUpdatedNote: LocalizedString;
  locationLabel: LocalizedString;
  availabilityStatus: LocalizedString;
  education: EducationItem[];
  experiences: ExperienceItem[];
  competencies: SkillDomain[];
  awards: CurriculumAward[];
}

export default function CurriculumContent({
  baseUrl,
  resumePath,
  resumeFilename,
  resumeUpdatedNote,
  locationLabel,
  availabilityStatus,
  education,
  experiences,
  competencies,
  awards,
}: CurriculumContentProps) {
  const { t, locale } = useI18n();
  const resumeUrl = `${baseUrl}${resumePath}`;
  const primaryDegree = education[0];
  const primaryResearch = experiences[0];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-edge">
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
            download={resumeFilename}
            className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-sm bg-accent hover:bg-accent-hover text-on-accent font-sans font-semibold text-sm transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            <Download size={16} aria-hidden="true" />
            <span>{t.curriculum.downloadPdf}</span>
          </a>
        </div>
      </div>

      {/* Single Unified Technical Specification Sheet (Zero nested rounded sub-cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t-2 border-ink border-x border-b border-edge bg-surface divide-y lg:divide-y-0 lg:divide-x divide-edge transition-colors">
        
        {/* Left Column: Academic Foundation & Location Telemetry (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-edge">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2.5 text-dominant-ink mb-6">
              <GraduationCap size={20} aria-hidden="true" />
              <h3 className="font-bold text-ink text-base md:text-lg font-display">{t.curriculum.educationTitle}</h3>
            </div>
            
            <div className="divide-y divide-edge-subtle text-sm text-ink-secondary">
              {primaryDegree && (
                <div className="pb-5 border-l-2 border-dominant pl-4">
                  <span className="text-[13px] font-sans font-semibold text-dominant-ink block mb-1">
                    {pickLocalized(primaryDegree.status, locale)}
                  </span>
                  <strong className="text-ink block text-[15px] font-display">
                    {pickLocalized(primaryDegree.degree, locale)}
                  </strong>
                  <span className="text-[13px] text-ink-tertiary block mt-0.5">
                    {pickLocalized(primaryDegree.institution, locale)} • {primaryDegree.location}
                  </span>
                </div>
              )}

              {primaryResearch && (
                <div className="pt-5 border-l-2 border-accent pl-4">
                  <span className="text-[13px] font-sans font-semibold text-accent-ink block mb-1">
                    {pickLocalized(primaryResearch.status, locale)}
                  </span>
                  <strong className="text-ink block text-[15px] font-display">
                    {primaryResearch.organization}
                  </strong>
                  <span className="text-[13px] text-ink-tertiary block mt-0.5">
                    {pickLocalized(primaryResearch.focus, locale)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface-alt/60 px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-[13px] font-sans text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-dominant-ink shrink-0" aria-hidden="true" />
              {pickLocalized(locationLabel, locale)}
            </span>
            <span className="text-accent-ink font-semibold">{pickLocalized(availabilityStatus, locale)}</span>
          </div>
        </div>

        {/* Right Column: Technical Competencies Matrix & Distinctions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-edge">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2.5 text-accent-ink mb-5">
              <Briefcase size={20} aria-hidden="true" />
              <h3 className="font-bold text-ink text-base md:text-lg font-display">{t.curriculum.competenciesTitle}</h3>
            </div>

            {/* 2x2 Shared-Hairline Competency Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-edge-subtle gap-px border border-edge-subtle">
              {competencies.map((comp) => {
                const toneClass = comp.tone === 'accent' ? 'text-accent-ink' : 'text-dominant-ink';
                return (
                  <div key={comp.id} className="bg-surface p-4">
                    <span className={`text-sm font-display font-bold ${toneClass} block mb-1.5`}>
                      {pickLocalized(comp.shortTitle, locale)}
                    </span>
                    <p className="text-[13px] leading-relaxed text-ink-secondary">
                      {pickLocalized(comp.summary, locale)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Distinctions Strip */}
          <div className="px-6 md:px-8 py-5 bg-surface-alt/25">
            <span className="text-[13px] font-sans font-semibold text-ink-tertiary block mb-3">
              {t.curriculum.awardsHeader}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:divide-x divide-edge-subtle">
              {awards.map((award, index) => (
                <div key={award.id} className={`flex items-start gap-2.5 ${index > 0 ? 'sm:pl-4' : ''}`}>
                  <Award
                    size={16}
                    className={`${award.tone === 'accent' ? 'text-accent-ink' : 'text-dominant-ink'} shrink-0 mt-0.5`}
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-[13px] text-ink block">
                      {pickLocalized(award.shortTitle ?? award.title, locale)}
                    </strong>
                    <span className="text-[13px] text-ink-tertiary">
                      {pickLocalized(award.shortDescription ?? award.description, locale)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Download Footer Bar */}
          <div className="bg-surface-alt/60 px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 text-[13px] font-sans">
            <span className="text-ink-tertiary">{pickLocalized(resumeUpdatedNote, locale)}</span>
            <a
              href={resumeUrl}
              download={resumeFilename}
              className="text-dominant-ink hover:text-dominant font-medium inline-flex items-center gap-1.5 min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
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
