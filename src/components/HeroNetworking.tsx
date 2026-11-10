import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  FileDown, 
  Database, 
  BrainCircuit,
  Eye,
  QrCode, 
  X, 
  ExternalLink,
  ChevronDown,
  Cloud,
  Terminal,
  Activity
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

export default function HeroNetworking() {
  const [showQrModal, setShowQrModal] = useState(false);
  const { t } = useI18n();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalActionRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const linkedInUrl = "https://www.linkedin.com/in/s-cesar/";
  const resumeUrl = `${baseUrl}/docs/Samuel_Cesar_Curriculum.pdf`;
  const qrCodeUrl = `${baseUrl}/qrcode.svg`;

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
    <section id="home" className="relative pt-8 pb-16 md:pt-16 md:pb-24 w-full scroll-mt-24">
      {/* Asymmetric Command-Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Pitch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Availability Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-soft border border-accent-edge text-[13px] font-medium text-accent-ink">
            <span className="inline-flex rounded-full h-2 w-2 bg-accent shrink-0" aria-hidden="true"></span>
            <span>{t.hero.badge}</span>
          </div>

          {/* High-Impact Display Typography */}
          <h1 className="text-[2.125rem] sm:text-5xl lg:text-[3.75rem] font-extrabold text-ink leading-[1.08] tracking-[-0.02em] font-display">
            {t.hero.greeting} <br />
            <span className="text-dominant-ink">{t.hero.role}</span>
          </h1>

          {/* Refined Copy */}
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-[56ch]">
            {t.hero.pitch}
          </p>

          {/* Direct Tactical Actions with Clear Visual Hierarchy */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-dominant hover:bg-dominant-hover text-on-dominant font-display font-bold text-sm transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer"
            >
              <span>{t.hero.exploreProjects}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </a>

            <a
              href={resumeUrl}
              download="Samuel_Cesar_Curriculum.pdf"
              className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-control hover:bg-control-hover text-ink border border-edge-strong text-sm font-medium transition-colors transition-transform duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer"
            >
              <FileDown size={16} className="text-dominant-ink shrink-0" aria-hidden="true" />
              <span>{t.hero.curriculumPdf}</span>
            </a>

            <div className="flex items-center gap-1.5">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-lg text-ink-secondary hover:text-ink hover:bg-control text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <QrCode size={16} className="text-accent-ink shrink-0" aria-hidden="true" />
                <span>{t.hero.mobileQr}</span>
              </button>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.nav.linkedInAria}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-sm font-medium text-ink-tertiary hover:text-dominant-ink transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-lg"
              >
                <Linkedin size={16} aria-hidden="true" />
                <span>{t.hero.linkedIn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry & Core Domains Console (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-xl border border-edge bg-surface p-5 sm:p-6 relative overflow-hidden transition-colors">
            
            {/* Header Telemetry Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 text-xs">
              <div className="flex items-center gap-2 text-ink-tertiary">
                <Terminal size={14} className="text-dominant-ink" aria-hidden="true" />
                <span className="font-semibold text-ink-secondary tracking-wide text-[13px]">{t.hero.telemetryTitle}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent-soft text-accent-ink text-xs font-mono font-medium">
                <Activity size={12} aria-hidden="true" />
                <span>{t.hero.telemetryStatus}</span>
              </div>
            </div>

            {/* Core Domain Telemetry Blocks - Separated via tonal surface steps */}
            <div className="space-y-2.5">
              {/* Domain 1: Data Engineering */}
              <div className="rounded-lg bg-surface-alt px-3.5 py-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-dominant-ink text-[13px] font-semibold">
                    <Database size={15} aria-hidden="true" />
                    <span>{t.hero.dataEngTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-ink-tertiary tabular-nums">{t.hero.dataEngPipeline}</span>
                </div>
                <div className="text-[15px] font-semibold text-ink">{t.hero.dataEngStack}</div>
                <div className="text-[13px] text-ink-tertiary mt-0.5">{t.hero.dataEngSub}</div>
              </div>

              {/* Domain 2: Data Science & ML */}
              <div className="rounded-lg bg-surface-alt px-3.5 py-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-accent-ink text-[13px] font-semibold">
                    <BrainCircuit size={15} aria-hidden="true" />
                    <span>{t.hero.dataScienceTitle}</span>
                  </div>
                  <span className="text-xs font-medium text-accent-ink bg-accent-soft px-2 py-0.5 rounded border border-accent-edge">{t.hero.dataScienceBadge}</span>
                </div>
                <div className="text-[15px] font-semibold text-ink">{t.hero.dataScienceStack}</div>
                <div className="text-[13px] text-ink-tertiary mt-0.5">{t.hero.dataScienceSub}</div>
              </div>

              {/* Domain 3: Computer Vision & Robotics */}
              <div className="rounded-lg bg-surface-alt px-3.5 py-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-dominant-ink text-[13px] font-semibold">
                    <Eye size={15} aria-hidden="true" />
                    <span>{t.hero.visionTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-ink-tertiary">{t.hero.visionBadge}</span>
                </div>
                <div className="text-[15px] font-semibold text-ink">{t.hero.visionStack}</div>
                <div className="text-[13px] text-ink-tertiary mt-0.5">{t.hero.visionSub}</div>
              </div>

              {/* Domain 4: Cloud Infrastructure */}
              <div className="rounded-lg bg-surface-alt px-3.5 py-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-accent-ink text-[13px] font-semibold">
                    <Cloud size={15} aria-hidden="true" />
                    <span>{t.hero.cloudTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-ink-tertiary">{t.hero.cloudBadge}</span>
                </div>
                <div className="text-[15px] font-semibold text-ink">{t.hero.cloudStack}</div>
                <div className="text-[13px] text-ink-tertiary mt-0.5">{t.hero.cloudSub}</div>
              </div>
            </div>

            {/* Bottom Bar Telemetry Info */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-ink-tertiary">
              <span>{t.hero.bottomStack}</span>
              <span className="text-accent-ink font-semibold">{t.hero.bottomStatus}</span>
            </div>
          </div>
        </div>

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
              className="relative w-full max-w-sm bg-modal-bg border border-modal-edge p-6 rounded-xl shadow-2xl flex flex-col items-center text-center"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-3.5 right-3.5 text-ink-tertiary hover:text-ink p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label={t.hero.qrModalClose}
              >
                <X size={20} aria-hidden="true" />
              </button>

              <h3 id="qr-modal-title" className="text-lg font-bold text-ink mb-1 font-display">{t.hero.qrModalTitle}</h3>
              <p className="text-[13px] text-ink-tertiary mb-5 max-w-[260px]">
                {t.hero.qrModalDesc}
              </p>

              <div className="p-3 bg-white rounded-xl border border-edge mb-4">
                <img src={qrCodeUrl} alt={t.hero.qrModalAlt} className="w-48 h-48 object-contain" />
              </div>

              <div className="w-full flex gap-2">
                <a
                  ref={modalActionRef}
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 min-h-[42px] rounded-lg bg-dominant hover:bg-dominant-hover text-on-dominant text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
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
