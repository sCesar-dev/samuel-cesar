import React, { useState, useEffect } from 'react';
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

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const linkedInUrl = "https://www.linkedin.com/in/s-cesar/";
  const resumeUrl = `${baseUrl}/docs/Samuel_Cesar_Curriculum.pdf`;
  const qrCodeUrl = `${baseUrl}/qrcode.svg`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQrModal(false);
      }
    };
    if (showQrModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal]);

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-16 md:pb-24 w-full scroll-mt-24">
      {/* Asymmetric Command-Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Pitch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Badge - Rectangular & Crisp */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider font-semibold text-[11px]">
              {t.hero.badge}
            </span>
          </div>

          {/* High-Impact Display Typography with ~3x Leap */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
            {t.hero.greeting} <br className="hidden sm:inline" />
            <span className="text-cyan-400">{t.hero.role}</span>
          </h1>

          {/* Refined Copy */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-lg">
            {t.hero.pitch}
          </p>

          {/* Direct Tactical Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            >
              <span>{t.hero.exploreProjects}</span>
              <ChevronDown size={15} aria-hidden="true" />
            </a>

            <a
              href={resumeUrl}
              download="Samuel_Cesar_Curriculum.pdf"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            >
              <FileDown size={16} className="text-cyan-400" aria-hidden="true" />
              <span>{t.hero.curriculumPdf}</span>
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono transition-all duration-200 active:scale-[0.98] cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <QrCode size={16} className="text-emerald-400" aria-hidden="true" />
              <span>{t.hero.mobileQr}</span>
            </button>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.linkedInAria}
              className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
            >
              <Linkedin size={15} aria-hidden="true" />
              <span>{t.hero.linkedIn}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Telemetry & Core Domains Console (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-xl border border-white/10 bg-[#121216]/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-colors">
            
            {/* Header Telemetry Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <Terminal size={14} className="text-cyan-400" />
                <span className="font-semibold text-zinc-300 uppercase tracking-wider text-xs">{t.hero.telemetryTitle}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <Activity size={12} />
                <span>{t.hero.telemetryStatus}</span>
              </div>
            </div>

            {/* Core Domain Telemetry Blocks - Flattened into clean divided list */}
            <div className="divide-y divide-white/5">
              {/* Domain 1: Data Engineering */}
              <div className="py-3 first:pt-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Database size={15} />
                    <span>{t.hero.dataEngTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{t.hero.dataEngPipeline}</span>
                </div>
                <div className="text-sm font-semibold text-white">{t.hero.dataEngStack}</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">{t.hero.dataEngSub}</div>
              </div>

              {/* Domain 2: Data Science & ML */}
              <div className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <BrainCircuit size={15} />
                    <span>{t.hero.dataScienceTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{t.hero.dataScienceBadge}</span>
                </div>
                <div className="text-sm font-semibold text-white">{t.hero.dataScienceStack}</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">{t.hero.dataScienceSub}</div>
              </div>

              {/* Domain 3: Computer Vision & Robotics */}
              <div className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Eye size={15} />
                    <span>{t.hero.visionTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{t.hero.visionBadge}</span>
                </div>
                <div className="text-sm font-semibold text-white">{t.hero.visionStack}</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">{t.hero.visionSub}</div>
              </div>

              {/* Domain 4: Cloud Infrastructure */}
              <div className="py-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <Cloud size={15} />
                    <span>{t.hero.cloudTitle}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{t.hero.cloudBadge}</span>
                </div>
                <div className="text-sm font-semibold text-white">{t.hero.cloudStack}</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">{t.hero.cloudSub}</div>
              </div>
            </div>

            {/* Bottom Bar Telemetry Info */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>{t.hero.bottomStack}</span>
              <span className="text-emerald-400 font-medium">{t.hero.bottomStatus}</span>
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
              aria-label={t.hero.qrModalTitle}
              className="relative w-full max-w-sm bg-[#121216] border border-white/15 p-6 rounded-xl shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer min-h-[28px] min-w-[28px] flex items-center justify-center"
                aria-label={t.hero.qrModalClose}
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-white mb-1 font-display">{t.hero.qrModalTitle}</h3>
              <p className="text-xs text-zinc-400 mb-5 max-w-[260px]">
                {t.hero.qrModalDesc}
              </p>

              <div className="p-3 bg-white rounded-xl shadow-inner mb-4">
                <img src={qrCodeUrl} alt={t.hero.qrModalAlt} className="w-48 h-48 object-contain" />
              </div>

              <div className="w-full flex gap-2">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>{t.hero.qrModalAction}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
