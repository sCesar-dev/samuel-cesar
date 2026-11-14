import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  FileDown, 
  QrCode, 
  X, 
  ExternalLink,
  ChevronDown,
  Database,
  BrainCircuit,
  Eye,
  Shield,
  ArrowRight,
  Activity
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import { formatString } from '../i18n/translations';
import type { LocalizedString, ProjectItem, BadgeItem } from '../../data/schemas/portfolio';
import type { ProjectTabFilter } from './ProjectsList';

type BenchDomain = 'data-engineering' | 'data-science' | 'robotics-cv' | 'cybersecurity';

interface HeroNetworkingProps {
  name: string;
  role: LocalizedString;
  availabilityBadge: LocalizedString;
  headline: LocalizedString;
  linkedInUrl: string;
  resumePath: string;
  resumeFilename: string;
  qrCodePath: string;
  projects: ProjectItem[];
  badges: BadgeItem[];
}

export default function HeroNetworking({
  name,
  role,
  availabilityBadge,
  headline,
  linkedInUrl,
  resumePath,
  resumeFilename,
  qrCodePath,
  projects,
  badges,
}: HeroNetworkingProps) {
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeDomain, setActiveDomain] = useState<BenchDomain>('data-engineering');
  const { t, locale } = useI18n();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalActionRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const resumeUrl = `${baseUrl}${resumePath}`;
  const qrCodeUrl = `${baseUrl}${qrCodePath}`;
  const linkedInAria = formatString(t.nav.linkedInAria, { name });

  const domainLeads = useMemo(() => {
    const byPriority = [...projects].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.order - b.order;
    });

    const pickFor = (categories: ProjectItem['category'][]) =>
      byPriority.find((p) => categories.includes(p.category)) ?? null;

    return {
      'data-engineering': pickFor(['data-engineering']),
      'data-science': pickFor(['data-science']),
      'robotics-cv': pickFor(['robotics-cv', 'computer-vision']),
      cybersecurity: pickFor(['cybersecurity']),
    } satisfies Record<BenchDomain, ProjectItem | null>;
  }, [projects]);

  const activeProject = domainLeads[activeDomain];
  const hermesBadges = useMemo(
    () => badges.filter((b) => b.syncMeta.sourceAgent === 'hermes'),
    [badges]
  );

  const jumpToProjectsTab = (tab: ProjectTabFilter) => {
    window.dispatchEvent(new CustomEvent('portfolio:select-project-tab', { detail: { tab } }));
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const domainConfig: Record<
    BenchDomain,
    {
      label: string;
      tabFilter: ProjectTabFilter;
      tone: 'dominant' | 'accent';
      icon: React.ReactNode;
    }
  > = {
    'data-engineering': {
      label: t.hero.domainDataEng,
      tabFilter: 'data-engineering',
      tone: 'dominant',
      icon: <Database size={15} aria-hidden="true" />,
    },
    'data-science': {
      label: t.hero.domainDataScience,
      tabFilter: 'data-science',
      tone: 'accent',
      icon: <BrainCircuit size={15} aria-hidden="true" />,
    },
    'robotics-cv': {
      label: t.hero.domainVision,
      tabFilter: 'computer-vision',
      tone: 'dominant',
      icon: <Eye size={15} aria-hidden="true" />,
    },
    cybersecurity: {
      label: t.hero.domainCyberSec,
      tabFilter: 'cybersecurity',
      tone: 'accent',
      icon: <Shield size={15} aria-hidden="true" />,
    },
  };

  useEffect(() => {
    if (showQrModal) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowQrModal(false);
          return;
        }
        if (e.key === 'Tab') {
          const focusables = [closeButtonRef.current, modalActionRef.current].filter(
            (el): el is HTMLButtonElement | HTMLAnchorElement => Boolean(el)
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
  }, [showQrModal]);

  return (
    <section id="home" className="relative pt-6 pb-14 md:pt-12 md:pb-20 w-full scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (7/12): High-Contrast Asymmetric Editorial Hero */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 pt-1">
          <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-ink leading-[1.04] tracking-[-0.025em] font-display">
            {name}, <br />
            <span className="text-dominant-ink">{pickLocalized(role, locale)}</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-[54ch]">
            {pickLocalized(headline, locale)}
          </p>

          <p className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-secondary">
            <span className="inline-flex h-2 w-2 bg-dominant shrink-0" aria-hidden="true"></span>
            <span>{pickLocalized(availabilityBadge, locale)}</span>
          </p>

          {/* Direct Tactical Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-sm bg-dominant hover:bg-dominant-hover text-on-dominant font-display font-bold text-sm transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer"
            >
              <span>{t.hero.exploreProjects}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </a>

            <a
              href={resumeUrl}
              download={resumeFilename}
              className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-sm bg-control hover:bg-control-hover text-ink border border-edge-strong text-sm font-medium transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer"
            >
              <FileDown size={16} className="text-dominant-ink shrink-0" aria-hidden="true" />
              <span>{t.hero.curriculumPdf}</span>
            </a>

            <div className="flex items-center gap-1.5">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-sm text-ink-secondary hover:text-ink hover:bg-control text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <QrCode size={16} className="text-accent-ink shrink-0" aria-hidden="true" />
                <span>{t.hero.mobileQr}</span>
              </button>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedInAria}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-sm font-medium text-ink-tertiary hover:text-dominant-ink transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
              >
                <Linkedin size={16} aria-hidden="true" />
                <span>{t.hero.linkedIn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (5/12): 4-Domain Operational Telemetry Bench ("One Live Thing") */}
        <aside
          aria-label={t.hero.benchTitle}
          className="lg:col-span-5 w-full bg-surface border border-edge"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-surface-alt">
            <span className="text-sm font-display font-bold text-ink">
              {t.hero.benchTitle}
            </span>
            <Activity size={16} className="text-dominant-ink shrink-0" aria-hidden="true" />
          </div>

          <div
            role="group"
            aria-label={t.hero.benchDomainSelectorAria}
            className="grid grid-cols-2 gap-px bg-edge"
          >
            {(Object.keys(domainConfig) as BenchDomain[]).map((domainKey) => {
              const cfg = domainConfig[domainKey];
              const isSelected = activeDomain === domainKey;
              const activeTextClass = cfg.tone === 'accent' ? 'text-accent-ink' : 'text-dominant-ink';
              const ringClass = cfg.tone === 'accent' ? 'focus-visible:ring-accent' : 'focus-visible:ring-dominant';

              return (
                <button
                  key={domainKey}
                  type="button"
                  onClick={() => setActiveDomain(domainKey)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 px-3.5 py-3 min-h-[44px] text-left text-[13px] font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset ${ringClass} ${
                    isSelected
                      ? `bg-surface-alt ${activeTextClass} font-semibold`
                      : 'bg-surface text-ink-secondary hover:text-ink hover:bg-surface-alt/50'
                  }`}
                >
                  <span className={isSelected ? activeTextClass : 'text-ink-tertiary'}>
                    {cfg.icon}
                  </span>
                  <span className="truncate">{cfg.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-5 space-y-4">
            {activeProject ? (
              <>
                {activeProject.images.length > 0 && (
                  <a
                    href={`${baseUrl}/projects/${activeProject.id}`}
                    className="block aspect-[16/9] w-full overflow-hidden bg-surface-alt border border-edge-subtle group focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                  >
                    <img
                      src={`${baseUrl}${activeProject.images[0]}`}
                      alt={pickLocalized(activeProject.title, locale)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="eager"
                    />
                  </a>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-ink font-display leading-snug">
                      {pickLocalized(activeProject.title, locale)}
                    </h2>
                    <span className="text-[13px] font-medium text-ink-tertiary shrink-0">
                      {pickLocalized(activeProject.categoryLabel, locale)}
                    </span>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {activeProject.oneLinerImpact
                      ? pickLocalized(activeProject.oneLinerImpact, locale)
                      : pickLocalized(activeProject.description, locale)}
                  </p>
                </div>

                {activeProject.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-px bg-edge border border-edge">
                    {activeProject.metrics.slice(0, 2).map((metric, metricIdx) => (
                      <div key={metricIdx} className="bg-surface-alt px-3.5 py-2.5">
                        <div className="text-base font-extrabold text-ink font-display tabular-nums">
                          {pickLocalized(metric.value, locale)}
                        </div>
                        <div className="text-[13px] text-ink-tertiary truncate">
                          {pickLocalized(metric.label, locale)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeProject.techs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5" aria-label={t.hero.benchStackLabel}>
                    {activeProject.techs.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[13px] font-medium bg-surface-alt text-ink-secondary border border-edge-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`${baseUrl}/projects/${activeProject.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-dominant-ink hover:underline min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
                  >
                    <span>{t.hero.benchOpenProject}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => jumpToProjectsTab(domainConfig[activeDomain].tabFilter)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink cursor-pointer min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
                  >
                    <span>{t.hero.benchFilterDomain}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-accent-soft text-accent-ink border border-accent-edge shrink-0">
                    <Shield size={18} aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-ink font-display leading-snug">
                      {t.hero.benchCyberScopeTitle}
                    </h2>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {t.hero.benchCyberScopeDesc}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-alt border border-edge p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-semibold text-ink">{t.hero.benchHermesStatus}</span>
                    <span className="text-[13px] font-medium text-accent-ink tabular-nums">
                      {hermesBadges.length > 0
                        ? formatString(t.hero.benchHermesSynced, { count: hermesBadges.length })
                        : t.hero.benchHermesStandby}
                    </span>
                  </div>

                  {badges.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {badges.slice(0, 2).map((badge) => (
                        <li key={badge.id} className="flex items-center justify-between gap-2 text-sm">
                          <span className="text-ink-secondary truncate">
                            {badge.platform} · {pickLocalized(badge.title, locale)}
                          </span>
                          <span className="font-semibold text-ink tabular-nums shrink-0">
                            {pickLocalized(badge.rankOrMetric, locale)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href="#certifications"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span>{t.hero.benchOpenVault}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => jumpToProjectsTab('cybersecurity')}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink cursor-pointer min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span>{t.hero.benchFilterDomain}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="qr-modal-title"
              className="relative w-full max-w-sm bg-modal-bg border border-modal-edge p-6 rounded-sm shadow-2xl flex flex-col items-center text-center"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-3.5 right-3.5 text-ink-tertiary hover:text-ink p-1.5 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label={t.hero.qrModalClose}
              >
                <X size={20} aria-hidden="true" />
              </button>

              <h3 id="qr-modal-title" className="text-lg font-bold text-ink mb-1 font-display">{t.hero.qrModalTitle}</h3>
              <p className="text-[13px] text-ink-tertiary mb-5 max-w-[260px]">
                {formatString(t.hero.qrModalDesc, { name })}
              </p>

              <div className="p-3 bg-white border border-edge mb-4">
                <img src={qrCodeUrl} alt={formatString(t.hero.qrModalAlt, { name })} className="w-48 h-48 object-contain" />
              </div>

              <div className="w-full flex gap-2">
                <a
                  ref={modalActionRef}
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 min-h-[42px] rounded-sm bg-dominant hover:bg-dominant-hover text-on-dominant text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                >
                  <span>{t.hero.qrModalAction}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
