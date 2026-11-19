import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin,
  FileDown,
  QrCode,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import { formatString } from '../i18n/translations';
import type { LocalizedString } from '../../data/schemas/portfolio';

interface HeroNetworkingProps {
  name: string;
  role: LocalizedString;
  availabilityBadge: LocalizedString;
  headline: LocalizedString;
  linkedInUrl: string;
  resumePath: string;
  resumeFilename: string;
  qrCodePath: string;
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
}: HeroNetworkingProps) {
  const [showQrModal, setShowQrModal] = useState(false);
  const { t, locale } = useI18n();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalActionRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const resumeUrl = `${baseUrl}${resumePath}`;
  const qrCodeUrl = `${baseUrl}${qrCodePath}`;
  const linkedInAria = formatString(t.nav.linkedInAria, { name });

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
    <section id="home" className="relative pt-10 pb-16 md:pt-20 md:pb-24 w-full scroll-mt-24">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
        <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-ink leading-[1.06] tracking-[-0.025em] font-display">
          {name}, <br />
          <span className="text-dominant-ink">{pickLocalized(role, locale)}</span>
        </h1>

        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-[56ch] mx-auto">
          {pickLocalized(headline, locale)}
        </p>

        <p className="text-sm font-medium text-ink-secondary text-center">
          <span className="inline-block h-2 w-2 bg-dominant align-middle mr-2" aria-hidden="true"></span>
          <span>{pickLocalized(availabilityBadge, locale)}</span>
        </p>

        {/* Direct Tactical Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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

              <h3 id="qr-modal-title" className="text-lg font-bold text-ink mb-1 font-display">
                {t.hero.qrModalTitle}
              </h3>
              <p className="text-[13px] text-ink-tertiary mb-5 max-w-[260px]">
                {formatString(t.hero.qrModalDesc, { name })}
              </p>

              <div className="p-3 bg-white border border-edge mb-4">
                <img
                  src={qrCodeUrl}
                  alt={formatString(t.hero.qrModalAlt, { name })}
                  className="w-48 h-48 object-contain"
                />
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
