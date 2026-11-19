import React, { useState } from 'react';
import {
  Download,
  GraduationCap,
  Award,
  Briefcase,
  MapPin,
  FileText,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized, pickLocalizedList } from '../i18n/localize';
import { formatIsoDateUtc, formatString } from '../i18n/translations';
import type {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  LocalizedString,
  PublicationItem,
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
  publications: PublicationItem[];
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
  publications,
}: CurriculumContentProps) {
  const { t, locale } = useI18n();
  const [selectedPubId, setSelectedPubId] = useState<string>(publications[0]?.id ?? '');

  const resumeUrl = `${baseUrl}${resumePath}`;
  const primaryDegree = education[0];
  const activePub =
    publications.find((pub) => pub.id === selectedPubId) ?? publications[0] ?? null;

  const formatPeriod = (exp: ExperienceItem) => {
    if (!exp.startDate && !exp.endDate) return null;
    const start = exp.startDate ? formatIsoDateUtc(exp.startDate, locale) : '';
    const end = exp.endDate
      ? formatIsoDateUtc(exp.endDate, locale)
      : exp.current
      ? t.curriculum.presentLabel
      : '';
    if (start && end) return `${start} – ${end}`;
    return start || end;
  };

  const resolveAssetUrl = (url: string | null | undefined) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const activePdfUrl = resolveAssetUrl(activePub?.pdfUrl);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-edge">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.curriculum.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-2xl">
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

      {/* Unified Technical Specification Sheet */}
      <div className="border-t-2 border-ink border-x border-b border-edge bg-surface divide-y divide-edge transition-colors">
        {/* Band 1: Top 5:7 Academic Foundation & Competency Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-edge">
          {/* Left Column: Academic Foundation & Location Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-edge">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2.5 text-dominant-ink mb-6">
                <GraduationCap size={20} aria-hidden="true" />
                <h3 className="font-bold text-ink text-base md:text-lg font-display">
                  {t.curriculum.educationTitle}
                </h3>
              </div>

              <div className="divide-y divide-edge-subtle text-sm text-ink-secondary">
                {primaryDegree && (
                  <div className="pb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-dominant shrink-0" aria-hidden="true" />
                      <span className="text-sm font-sans font-semibold text-dominant-ink">
                        {pickLocalized(primaryDegree.status, locale)}
                      </span>
                    </div>
                    <strong className="text-ink block text-base font-display">
                      {pickLocalized(primaryDegree.degree, locale)}
                    </strong>
                    <span className="text-sm text-ink-tertiary block mt-0.5">
                      {pickLocalized(primaryDegree.institution, locale)} • {primaryDegree.location}
                    </span>
                  </div>
                )}

                {experiences.map((exp, idx) => {
                  const period = formatPeriod(exp);
                  const isAccent = idx % 2 === 1;
                  return (
                    <div key={exp.id} className="py-4 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={`w-2 h-2 shrink-0 ${
                              isAccent ? 'bg-dominant' : 'bg-accent'
                            }`}
                            aria-hidden="true"
                          />
                          <span
                            className={`text-sm font-sans font-semibold ${
                              isAccent ? 'text-dominant-ink' : 'text-accent-ink'
                            }`}
                          >
                            {pickLocalized(exp.status, locale)}
                          </span>
                        </span>
                        {period && (
                          <span className="text-xs font-sans font-medium text-ink-tertiary tabular-nums">
                            {period}
                          </span>
                        )}
                      </div>
                      <strong className="text-ink block text-base font-display">
                        {exp.organization}
                      </strong>
                      <span className="text-sm text-ink-tertiary block mt-0.5">
                        {pickLocalized(exp.focus, locale)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-surface-alt/60 px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-sm font-sans text-ink-secondary">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-dominant-ink shrink-0" aria-hidden="true" />
                {pickLocalized(locationLabel, locale)}
              </span>
              <span className="text-accent-ink font-semibold">
                {pickLocalized(availabilityStatus, locale)}
              </span>
            </div>
          </div>

          {/* Right Column: Technical Competencies Matrix & Distinctions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-edge">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2.5 text-accent-ink mb-5">
                <Briefcase size={20} aria-hidden="true" />
                <h3 className="font-bold text-ink text-base md:text-lg font-display">
                  {t.curriculum.competenciesTitle}
                </h3>
              </div>

              {/* 2x2 Shared-Hairline Competency Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-edge-subtle gap-px border border-edge-subtle">
                {competencies.map((comp) => {
                  const toneClass =
                    comp.tone === 'accent' ? 'text-accent-ink' : 'text-dominant-ink';
                  return (
                    <div key={comp.id} className="bg-surface p-4">
                      <span className={`text-sm font-display font-bold ${toneClass} block mb-1.5`}>
                        {pickLocalized(comp.shortTitle, locale)}
                      </span>
                      <p className="text-sm leading-relaxed text-ink-secondary">
                        {pickLocalized(comp.summary, locale)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Distinctions Strip */}
            <div className="px-6 md:px-8 py-5 bg-surface-alt/25">
              <span className="text-sm font-sans font-semibold text-ink-tertiary block mb-3">
                {t.curriculum.awardsHeader}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:divide-x divide-edge-subtle">
                {awards.map((award, index) => (
                  <div
                    key={award.id}
                    className={`flex items-start gap-2.5 ${index > 0 ? 'sm:pl-4' : ''}`}
                  >
                    <Award
                      size={16}
                      className={`${
                        award.tone === 'accent' ? 'text-accent-ink' : 'text-dominant-ink'
                      } shrink-0 mt-0.5`}
                      aria-hidden="true"
                    />
                    <div>
                      <strong className="text-sm text-ink block">
                        {pickLocalized(award.shortTitle ?? award.title, locale)}
                      </strong>
                      <span className="text-sm text-ink-tertiary">
                        {pickLocalized(award.shortDescription ?? award.description, locale)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Download Footer Bar */}
            <div className="bg-surface-alt/60 px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 text-sm font-sans">
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

        {/* Band 2: Detailed Academic Research & R&D Fellowships */}
        {experiences.length > 0 && (
          <div>
            <div className="px-6 md:px-8 py-4 bg-surface-alt/40 border-b border-edge flex items-center gap-2.5">
              <FlaskConical size={18} className="text-dominant-ink shrink-0" aria-hidden="true" />
              <h3 className="font-bold text-ink text-base md:text-lg font-display">
                {t.curriculum.researchLogTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-edge">
              {experiences.map((exp, idx) => {
                const period = formatPeriod(exp);
                const bullets = exp.highlights ? pickLocalizedList(exp.highlights, locale) : [];
                const isAccent = idx % 2 === 1;

                return (
                  <article key={exp.id} className="p-6 md:p-8 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-extrabold text-ink font-display leading-snug">
                            {exp.organization}
                          </h4>
                          <p
                            className={`text-sm font-semibold mt-0.5 ${
                              isAccent ? 'text-dominant-ink' : 'text-accent-ink'
                            }`}
                          >
                            {pickLocalized(exp.focus, locale)}
                          </p>
                        </div>
                        {period && (
                          <span className="px-2.5 py-1 text-xs font-sans font-medium bg-surface-alt text-ink-secondary border border-edge-subtle tabular-nums shrink-0">
                            {period}
                          </span>
                        )}
                      </div>

                      {bullets.length > 0 ? (
                        <ul className="space-y-2.5">
                          {bullets.map((bullet, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              className="flex items-start gap-2.5 text-sm text-ink-secondary leading-relaxed"
                            >
                              <CheckCircle2
                                size={15}
                                className={`${
                                  isAccent ? 'text-dominant-ink' : 'text-accent-ink'
                                } shrink-0 mt-1`}
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-ink-secondary leading-relaxed">
                          {pickLocalized(exp.description, locale)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-edge-subtle">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono bg-surface-alt text-ink-secondary border border-edge-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Band 3: Technical & Scientific Papers (TDPs) Vault & Inline Viewer */}
        {publications.length > 0 && activePub && (
          <div id="publications">
            <div className="px-6 md:px-8 py-4 bg-surface-alt/40 border-b border-edge flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <FileText size={18} className="text-accent-ink shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-ink text-base md:text-lg font-display">
                    {t.curriculum.publicationsTitle}
                  </h3>
                  <p className="text-sm text-ink-tertiary mt-0.5">
                    {t.curriculum.publicationsSubtitle}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-sans font-semibold bg-accent-soft text-accent-ink border border-accent-edge tabular-nums shrink-0">
                {formatString(t.curriculum.publicationsCount, { count: publications.length })}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-edge">
              {/* Left 5 cols: Interactive TDP List */}
              <div
                role="group"
                aria-label={t.curriculum.publicationSelectorAria}
                className="lg:col-span-5 divide-y divide-edge-subtle"
              >
                {publications.map((pub) => {
                  const isSelected = pub.id === activePub.id;
                  const hasPdf = Boolean(pub.pdfUrl);

                  return (
                    <button
                      key={pub.id}
                      type="button"
                      onClick={() => setSelectedPubId(pub.id)}
                      aria-pressed={isSelected}
                      className={`w-full text-left p-5 md:p-6 min-h-[44px] transition-colors cursor-pointer flex flex-col gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                        isSelected
                          ? 'bg-surface-alt text-ink'
                          : 'bg-surface text-ink-secondary hover:bg-surface-alt/50 hover:text-ink'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
                        <span className={isSelected ? 'text-accent-ink font-semibold' : 'text-ink-tertiary'}>
                          {pickLocalized(pub.venue, locale)} · {pub.location}
                        </span>
                        <span
                          className={`px-2 py-0.5 border tabular-nums ${
                            hasPdf
                              ? 'bg-dominant-soft text-dominant-ink border-dominant-edge font-medium'
                              : 'bg-surface text-ink-tertiary border-edge-subtle'
                          }`}
                        >
                          {hasPdf ? t.curriculum.publicationPdfAttached : t.curriculum.publicationPdfPending}
                        </span>
                      </div>

                      <span className="text-base font-display font-bold text-ink leading-snug">
                        {pickLocalized(pub.title, locale)}
                      </span>

                      <span className="text-sm text-ink-tertiary">
                        {pickLocalized(pub.typeLabel, locale)} · {pickLocalized(pub.authorRole, locale)} ({pub.year})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right 7 cols: Active TDP Inspector & Embedded PDF Reader */}
              <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-sans font-semibold text-accent-ink">
                      {pickLocalized(activePub.typeLabel, locale)} · {activePub.year}
                    </span>
                    <span className="text-xs font-sans font-medium text-ink-tertiary">
                      {activePub.affiliation}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-ink font-display leading-snug">
                    {pickLocalized(activePub.title, locale)}
                  </h4>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-alt/50 border border-edge-subtle p-4 text-sm">
                    <div>
                      <dt className="font-semibold text-ink-tertiary">
                        {t.curriculum.publicationVenueLabel}
                      </dt>
                      <dd className="text-ink mt-0.5">
                        {pickLocalized(activePub.venue, locale)} — {activePub.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-tertiary">
                        {t.curriculum.publicationAuthorsLabel}
                      </dt>
                      <dd className="text-ink mt-0.5">
                        {activePub.authors.join(', ')} ({pickLocalized(activePub.authorRole, locale)})
                      </dd>
                    </div>
                  </dl>

                  <div>
                    <span className="text-sm font-sans font-semibold text-ink block mb-1.5">
                      {t.curriculum.publicationScopeLabel}
                    </span>
                    <p className="text-sm text-ink-secondary leading-relaxed max-w-[62ch]">
                      {pickLocalized(activePub.abstract, locale)}
                    </p>
                  </div>

                  {activePub.keywords.length > 0 && (
                    <div
                      className="flex flex-wrap gap-1.5"
                      aria-label={t.curriculum.publicationKeywordsLabel}
                    >
                      {activePub.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 text-xs font-mono bg-surface-alt text-ink-secondary border border-edge-subtle"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Embedded PDF Reader when PDF is attached */}
                  {activePdfUrl ? (
                    <div className="space-y-3 pt-2">
                      <div className="border border-edge bg-zinc-950 overflow-hidden">
                        <iframe
                          src={activePdfUrl}
                          title={formatString(t.curriculum.publicationIframeTitle, {
                            title: pickLocalized(activePub.title, locale),
                          })}
                          className="w-full h-[460px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-surface-alt/50 border border-edge-subtle px-4 py-3 text-sm text-ink-tertiary leading-relaxed">
                      {t.curriculum.publicationPdfPendingNote}
                    </div>
                  )}
                </div>

                {/* Paper Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-edge-subtle">
                  {activePdfUrl && (
                    <>
                      <a
                        href={activePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-sm bg-dominant hover:bg-dominant-hover text-on-dominant text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        <span>{t.curriculum.publicationOpenNewTab}</span>
                      </a>
                      <a
                        href={activePdfUrl}
                        download
                        className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-sm bg-control hover:bg-control-hover text-ink border border-edge-strong text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                      >
                        <Download size={14} aria-hidden="true" />
                        <span>{t.curriculum.publicationDownloadPdf}</span>
                      </a>
                    </>
                  )}

                  {activePub.externalUrl && (
                    <a
                      href={activePub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-sm bg-accent-soft text-accent-ink border border-accent-edge hover:bg-surface-alt text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>{t.curriculum.publicationExternalLink}</span>
                    </a>
                  )}

                  {activePub.projectId && (
                    <a
                      href={`${baseUrl}/projects/${activePub.projectId}`}
                      className="ml-auto inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-dominant-ink hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
                    >
                      <span>{t.curriculum.publicationRelatedProject}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
