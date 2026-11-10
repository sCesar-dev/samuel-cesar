import React from 'react';
import { Mail, Github, Linkedin, MessageCircle, QrCode } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface ContactContentProps {
  baseUrl: string;
}

export default function ContactContent({ baseUrl }: ContactContentProps) {
  const { t } = useI18n();
  const qrCodeUrl = `${baseUrl}/qrcode.svg`;
  const linkedInUrl = "https://www.linkedin.com/in/s-cesar/";
  const githubUrl = "https://github.com/sCesar-dev";
  const email = "samueljc003@gmail.com";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-xl">
            {t.contact.sectionSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="flex flex-col gap-3.5 justify-center">
          <a 
            href={linkedInUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={t.nav.linkedInAria}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-edge text-ink hover:border-dominant-edge transition-colors transition-transform duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
          >
            <div className="p-3 bg-surface-alt border border-edge-subtle rounded-lg text-dominant-ink group-hover:bg-dominant-soft group-hover:border-dominant-edge transition-colors">
              <Linkedin size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.linkedInLabel}</span>
              <p className="text-ink font-semibold text-[15px]">Samuel Cesar</p>
            </div>
          </a>

          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Samuel Cesar"
            className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-edge text-ink hover:border-accent-edge transition-colors transition-transform duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="p-3 bg-surface-alt border border-edge-subtle rounded-lg text-accent-ink group-hover:bg-accent-soft group-hover:border-accent-edge transition-colors">
              <Github size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.gitHubLabel}</span>
              <p className="text-ink font-semibold text-[15px]">github.com/sCesar-dev</p>
            </div>
          </a>

          <a 
            href={`mailto:${email}`} 
            aria-label={`${t.contact.emailLabel}: ${email}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-edge text-ink hover:border-dominant-edge transition-colors transition-transform duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
          >
            <div className="p-3 bg-surface-alt border border-edge-subtle rounded-lg text-dominant-ink group-hover:bg-dominant-soft group-hover:border-dominant-edge transition-colors">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-[13px] text-ink-tertiary font-sans font-medium block">{t.contact.emailLabel}</span>
              <p className="text-ink font-semibold text-sm sm:text-[15px]">{email}</p>
            </div>
          </a>
        </div>

        <div className="rounded-xl bg-surface border border-edge p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 transition-colors">
          <div className="p-3 bg-white rounded-xl border border-edge transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src={qrCodeUrl} 
              alt={t.contact.qrAlt} 
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
              aria-label={t.nav.linkedInAria}
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-dominant hover:bg-dominant-hover text-on-dominant font-sans font-semibold text-sm transition-colors transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
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
