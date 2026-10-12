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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
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
            className="flex items-center gap-4 p-4 rounded-xl bg-[#121216]/80 border border-white/10 text-white hover:border-cyan-400/40 transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <div className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-colors">
              <Linkedin size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">{t.contact.linkedInLabel}</span>
              <p className="text-white font-semibold text-sm">Samuel Cesar</p>
            </div>
          </a>

          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Samuel Cesar"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#121216]/80 border border-white/10 text-white hover:border-emerald-400/40 transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            <div className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-emerald-400 group-hover:bg-emerald-400/10 group-hover:border-emerald-400/30 transition-colors">
              <Github size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">{t.contact.gitHubLabel}</span>
              <p className="text-white font-semibold text-sm">github.com/sCesar-dev</p>
            </div>
          </a>

          <a 
            href={`mailto:${email}`} 
            aria-label={`${t.contact.emailLabel}: ${email}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#121216]/80 border border-white/10 text-white hover:border-cyan-400/40 transition-all duration-200 active:scale-[0.98] group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <div className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-colors">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider block">{t.contact.emailLabel}</span>
              <p className="text-white font-semibold text-sm font-mono">{email}</p>
            </div>
          </a>
        </div>

        <div className="rounded-xl bg-[#121216]/80 border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 backdrop-blur-xl transition-colors">
          <div className="p-3 bg-white rounded-xl border border-white/20 transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src={qrCodeUrl} 
              alt={t.contact.qrAlt} 
              width="144"
              height="144"
              className="w-32 h-32 md:w-36 md:h-36 object-contain" 
            />
          </div>

          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center justify-center gap-2 font-display">
              <QrCode size={18} className="text-cyan-400" aria-hidden="true" />
              <span>{t.contact.instantAccessTitle}</span>
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-xs">
              {t.contact.instantAccessDesc}
            </p>
          </div>

          <div className="pt-1">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.linkedInAria}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>{t.contact.startChat}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
