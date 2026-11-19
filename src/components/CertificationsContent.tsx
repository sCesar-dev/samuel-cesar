import React, { useState, useMemo } from 'react';
import {
  BadgeCheck,
  ExternalLink,
  Shield,
  ShieldAlert,
  Activity,
  Terminal,
  KeyRound,
  Code2,
  Bot,
} from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import { formatDate } from '../i18n/translations';
import type { CertificationItem, BadgeItem, BadgeCategory } from '../../data/schemas/portfolio';

type VaultFilter =
  | 'all'
  | 'bug-bounty-pentest'
  | 'soc'
  | 'crypto'
  | 'coding'
  | 'formal';

interface CertificationsContentProps {
  certifications: CertificationItem[];
  badges: BadgeItem[];
}

function getBadgeIcon(iconKey: string, category: BadgeCategory) {
  if (iconKey === 'bug' || category === 'bug-bounty') {
    return <ShieldAlert size={18} aria-hidden="true" />;
  }
  if (iconKey === 'activity' || category === 'soc-blue-team') {
    return <Activity size={18} aria-hidden="true" />;
  }
  if (iconKey === 'key' || category === 'cryptography') {
    return <KeyRound size={18} aria-hidden="true" />;
  }
  if (iconKey === 'code' || category === 'competitive-coding') {
    return <Code2 size={18} aria-hidden="true" />;
  }
  if (iconKey === 'terminal' || category === 'pentest-ctf') {
    return <Terminal size={18} aria-hidden="true" />;
  }
  return <Shield size={18} aria-hidden="true" />;
}

export default function CertificationsContent({
  certifications,
  badges,
}: CertificationsContentProps) {
  const [activeFilter, setActiveFilter] = useState<VaultFilter>('all');
  const { t, locale } = useI18n();

  const sortedBadges = useMemo(
    () => [...badges].sort((a, b) => a.order - b.order),
    [badges]
  );

  const filteredBadges = useMemo(() => {
    if (activeFilter === 'all') return sortedBadges;
    if (activeFilter === 'bug-bounty-pentest') {
      return sortedBadges.filter(
        (b) => b.category === 'bug-bounty' || b.category === 'pentest-ctf'
      );
    }
    if (activeFilter === 'soc') {
      return sortedBadges.filter((b) => b.category === 'soc-blue-team');
    }
    if (activeFilter === 'crypto') {
      return sortedBadges.filter((b) => b.category === 'cryptography');
    }
    if (activeFilter === 'coding') {
      return sortedBadges.filter((b) => b.category === 'competitive-coding');
    }
    return [];
  }, [sortedBadges, activeFilter]);

  const counts = useMemo(
    () => ({
      all: sortedBadges.length + certifications.length,
      bugBountyPentest: sortedBadges.filter(
        (b) => b.category === 'bug-bounty' || b.category === 'pentest-ctf'
      ).length,
      soc: sortedBadges.filter((b) => b.category === 'soc-blue-team').length,
      crypto: sortedBadges.filter((b) => b.category === 'cryptography').length,
      coding: sortedBadges.filter((b) => b.category === 'competitive-coding').length,
      formal: certifications.length,
    }),
    [sortedBadges, certifications]
  );

  const filterOptions: Array<{
    key: VaultFilter;
    label: string;
    count: number;
    tone: 'dominant' | 'accent';
  }> = [
    { key: 'all', label: t.certifications.filterAll, count: counts.all, tone: 'dominant' },
    {
      key: 'bug-bounty-pentest',
      label: t.certifications.filterBugBountyPentest,
      count: counts.bugBountyPentest,
      tone: 'accent',
    },
    { key: 'soc', label: t.certifications.filterSoc, count: counts.soc, tone: 'accent' },
    { key: 'crypto', label: t.certifications.filterCrypto, count: counts.crypto, tone: 'accent' },
    { key: 'coding', label: t.certifications.filterCoding, count: counts.coding, tone: 'dominant' },
    { key: 'formal', label: t.certifications.filterFormal, count: counts.formal, tone: 'dominant' },
  ];

  const supportedTracks = [
    { key: 'bug-bounty', label: t.certifications.trackBugBounty, icon: <ShieldAlert size={15} aria-hidden="true" /> },
    { key: 'soc', label: t.certifications.trackSoc, icon: <Activity size={15} aria-hidden="true" /> },
    { key: 'pentest', label: t.certifications.trackPentest, icon: <Terminal size={15} aria-hidden="true" /> },
    { key: 'crypto', label: t.certifications.trackCrypto, icon: <KeyRound size={15} aria-hidden="true" /> },
    { key: 'coding', label: t.certifications.trackCoding, icon: <Code2 size={15} aria-hidden="true" /> },
  ];

  const showBadgesSection = activeFilter !== 'formal';
  const showFormalSection = activeFilter === 'all' || activeFilter === 'formal';

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.certifications.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2.5 max-w-2xl">
            {t.certifications.sectionSubtitle}
          </p>
        </div>

        {/* Vault Category Filter Bar */}
        <div
          role="group"
          aria-label={t.certifications.sectionTitle}
          className="flex flex-wrap gap-2"
        >
          {filterOptions.map((option) => {
            const isSelected = activeFilter === option.key;
            const activeClasses =
              option.tone === 'accent'
                ? 'bg-accent-soft text-accent-ink border-accent-edge font-semibold'
                : 'bg-dominant-soft text-dominant-ink border-dominant-edge font-semibold';
            const focusRing =
              option.tone === 'accent'
                ? 'focus-visible:ring-accent'
                : 'focus-visible:ring-dominant';

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setActiveFilter(option.key)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] text-[13px] border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${focusRing} ${
                  isSelected
                    ? activeClasses
                    : 'bg-surface text-ink-secondary border-edge hover:bg-surface-alt hover:text-ink'
                }`}
              >
                <span>{option.label}</span>
                <span className="text-[13px] tabular-nums opacity-85">
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track 1: Operational Badges (Hermes & Manual Platform Achievements) */}
      {showBadgesSection && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg md:text-xl font-bold text-ink font-display">
              {t.certifications.badgesTrackHeading}
            </h3>
            <span className="text-[13px] font-medium text-accent-ink">
              {t.hero.benchHermesStatus}
            </span>
          </div>

          {filteredBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBadges.map((badge) => {
                const isAccent = badge.tone === 'accent';
                const badgeToneClass = isAccent
                  ? 'bg-accent-soft text-accent-ink border-accent-edge'
                  : 'bg-dominant-soft text-dominant-ink border-dominant-edge';

                return (
                  <article
                    key={badge.id}
                    className="bg-surface border border-edge p-6 flex flex-col justify-between gap-5 transition-colors hover:border-edge-strong"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 border flex items-center justify-center shrink-0 ${badgeToneClass}`}
                          >
                            {getBadgeIcon(badge.badgeIcon, badge.category)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-ink">
                              {badge.platform}
                            </div>
                            <div className="text-[13px] text-ink-tertiary">
                              {pickLocalized(badge.categoryLabel, locale)}
                            </div>
                          </div>
                        </div>

                        <span className="text-[13px] font-medium text-ink-secondary bg-surface-alt px-2.5 py-1 border border-edge-subtle shrink-0">
                          {badge.syncMeta.sourceAgent === 'hermes'
                            ? t.certifications.syncSourceHermes
                            : t.certifications.syncSourceManual}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold text-ink font-display leading-snug">
                          {pickLocalized(badge.title, locale)}
                        </h4>
                        <p className="text-base font-extrabold text-accent-ink tabular-nums">
                          {pickLocalized(badge.rankOrMetric, locale)}
                        </p>
                      </div>

                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {pickLocalized(badge.description, locale)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[13px]">
                      <span className="text-ink-tertiary tabular-nums">
                        {badge.issuedAt ? formatDate(badge.issuedAt, locale) : badge.externalId}
                      </span>

                      {badge.verifyUrl && (
                        <a
                          href={badge.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-dominant-ink hover:underline min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-sm"
                        >
                          <span>{t.certifications.verifyBadge}</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : sortedBadges.length === 0 && activeFilter === 'all' ? (
            <div className="bg-surface border border-edge p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 flex items-start gap-4">
                <div className="w-11 h-11 border border-accent-edge bg-accent-soft text-accent-ink flex items-center justify-center shrink-0">
                  <Bot size={20} aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-ink font-display">
                    {t.certifications.hermesBadgeReadyTitle}
                  </h4>
                  <p className="text-sm text-ink-secondary leading-relaxed max-w-xl">
                    {t.certifications.hermesBadgeReadyDesc}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-wrap gap-2">
                {supportedTracks.map((track) => (
                  <span
                    key={track.key}
                    className="inline-flex items-center gap-2 px-3 py-2 text-[13px] font-medium bg-surface-alt text-ink-secondary border border-edge-subtle"
                  >
                    <span className="text-accent-ink">{track.icon}</span>
                    <span>{track.label}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-surface-alt border border-edge px-5 py-4 text-sm text-ink-secondary">
              {t.certifications.emptyFilterMessage}
            </div>
          )}
        </div>
      )}

      {/* Track 2: Formal Certifications Ledger */}
      {showFormalSection && (
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-ink font-display">
            {t.certifications.formalTrackHeading}
          </h3>

          {certifications.length > 0 ? (
            <div className="divide-y divide-edge border border-edge bg-surface">
              {certifications.map((cert) => (
                <article
                  key={cert.id}
                  className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-surface-alt/50"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <BadgeCheck size={18} className="text-dominant-ink shrink-0" aria-hidden="true" />
                      <h4 className="text-lg font-bold text-ink font-display leading-snug">
                        {pickLocalized(cert.title, locale)}
                      </h4>
                    </div>
                    <p className="text-sm text-ink-secondary">
                      {cert.issuer}
                      {cert.issueDate ? ` · ${formatDate(cert.issueDate, locale)}` : ''}
                      {cert.credentialId ? ` · ID ${cert.credentialId}` : ''}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] bg-surface-alt border border-edge hover:border-dominant-edge text-sm font-semibold text-dominant-ink shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                    >
                      <span>{t.certifications.viewCredential}</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-edge px-5 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <BadgeCheck size={18} className="text-dominant-ink shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-ink-secondary">
                  {t.certifications.formalCompactEmpty}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
