import React from 'react';
import { Mail, Github, Linkedin, MessageCircle, QrCode, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { formatString } from '../i18n/translations';

interface ContactContentProps {
  baseUrl: string;
  ownerName: string;
  linkedInUrl: string;
  githubUrl: string;
  githubHandle: string;
  email: string;
  qrCodePath: string;
}

export default function ContactContent({
  baseUrl,
  ownerName,
  linkedInUrl,
  githubUrl,
  githubHandle,
  email,
  qrCodePath,
}: ContactContentProps) {
  const { t } = useI18n();
  const qrCodeUrl = `${baseUrl}${qrCodePath}`;
  const linkedInAria = formatString(t.nav.linkedInAria, { name: ownerName });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-edge">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-xl">
            {t.contact.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* Unified Connection Console: 3 Interactive Channel Rows (7 cols) + Integrated QR Terminal (5 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-edge bg-surface divide-y md:divide-y-0 md:divide-x divide-edge items-stretch transition-colors">
        
        {/* Left: Continuous Interactive Channel Index */}
        <div className="md:col-span-7 divide-y divide-edge flex flex-col justify-between">
          <a 
            href={linkedInUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={linkedInAria}
            className="flex-1 flex items-center justify-between gap-4 px-6 py-5 bg-surface hover:bg-surface-alt text-ink transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dominant"
          >
            <div className="flex items-center gap-4">
              <Linkedin size={20} className="text-dominant-ink shrink-0" aria-hidden="true" />
              <div>
                <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.linkedInLabel}</span>
                <p className="text-ink font-semibold text-[15px] group-hover:text-dominant-ink transition-colors">{ownerName}</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-ink-tertiary group-hover:text-dominant-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform transition-colors duration-200 shrink-0" aria-hidden="true" />
          </a>

          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`GitHub ${ownerName}`}
            className="flex-1 flex items-center justify-between gap-4 px-6 py-5 bg-surface hover:bg-surface-alt text-ink transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <div className="flex items-center gap-4">
              <Github size={20} className="text-accent-ink shrink-0" aria-hidden="true" />
              <div>
                <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.gitHubLabel}</span>
                <p className="text-ink font-semibold text-[15px] group-hover:text-accent-ink transition-colors">{githubHandle}</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-ink-tertiary group-hover:text-accent-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform transition-colors duration-200 shrink-0" aria-hidden="true" />
          </a>

          <a 
            href={`mailto:${email}`} 
            aria-label={`${t.contact.emailLabel}: ${email}`}
            className="flex-1 flex items-center justify-between gap-4 px-6 py-5 bg-surface hover:bg-surface-alt text-ink transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dominant"
          >
            <div className="flex items-center gap-4">
              <Mail size={20} className="text-dominant-ink shrink-0" aria-hidden="true" />
              <div>
                <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.emailLabel}</span>
                <p className="text-ink font-semibold text-sm sm:text-[15px] group-hover:text-dominant-ink transition-colors">{email}</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-ink-tertiary group-hover:text-dominant-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform transition-colors duration-200 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* Right: Integrated QR Code Access Terminal */}
        <div className="md:col-span-5 bg-surface-alt/35 p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4">
          <div className="p-3 bg-white border border-edge transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src={qrCodeUrl} 
              alt={formatString(t.contact.qrAlt, { name: ownerName })} 
              width="144"
              height="144"
              className="w-32 h-32 md:w-36 md:h-36 object-contain" 
            />
          </div>

          <div>
            <h3 className="text-base md:text-lg font-bold text-ink flex items-center justify-center gap-2 font-display">
              <QrCode size={18} className="text-dominant-ink" aria-hidden="true" />
              <span>{t.contact.instantAccessTitle}</span>
            </h3>
            <p className="text-ink-tertiary text-sm mt-1 max-w-xs">
              {t.contact.instantAccessDesc}
            </p>
          </div>

          <div className="pt-1">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkedInAria}
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-sm bg-dominant hover:bg-dominant-hover text-on-dominant font-sans font-semibold text-sm transition-colors transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>{t.contact.startChat}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
