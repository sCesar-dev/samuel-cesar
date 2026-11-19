import React from 'react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import type { LocalizedString } from '../../data/schemas/portfolio';

interface FooterProps {
  footerNotice: LocalizedString;
  githubUrl: string;
  linkedInUrl: string;
  email: string;
}

export default function Footer({
  footerNotice,
  githubUrl,
  linkedInUrl,
  email,
}: FooterProps) {
  const { locale } = useI18n();
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <footer className="w-full border-t border-footer-edge bg-footer-bg py-10 text-sm text-ink-tertiary font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 bg-dominant shrink-0" aria-hidden="true"></span>
            <span className="font-display font-extrabold text-base text-ink tracking-tight">
              sCesar<span className="text-dominant-ink">.dev</span>
            </span>
          </div>
          <p className="text-[13px] text-ink-secondary">
            {pickLocalized(footerNotice, locale)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-secondary">
          <a
            href={`${baseUrl}/llms.txt`}
            className="inline-flex items-center min-h-[36px] hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            llms.txt
          </a>
          <a
            href={`${baseUrl}/profile.json`}
            className="inline-flex items-center min-h-[36px] hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            profile.json
          </a>
          <span className="text-edge-strong select-none" aria-hidden="true">·</span>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[36px] hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
          >
            GitHub
          </a>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[36px] hover:text-dominant-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center min-h-[36px] hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
