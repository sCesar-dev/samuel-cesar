import React from 'react';
import { CircleUserRound, Camera, Trophy, FlaskConical } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { pickLocalized } from '../i18n/localize';
import { formatString } from '../i18n/translations';
import type { AchievementItem, LocalizedString } from '../../data/schemas/portfolio';

type AwardItem = Extract<AchievementItem, { kind: 'award' }>;
type GalleryItem = Extract<AchievementItem, { kind: 'gallery' }>;

interface AboutContentProps {
  baseUrl: string;
  ownerName: string;
  profilePhotoPath: string;
  objectiveTitle: LocalizedString;
  bioParagraphs: LocalizedString[];
  awards: AwardItem[];
  gallery: GalleryItem[];
}

export default function AboutContent({
  baseUrl,
  ownerName,
  profilePhotoPath,
  objectiveTitle,
  bioParagraphs,
  awards,
  gallery,
}: AboutContentProps) {
  const { t, locale } = useI18n();
  const profilePhoto = profilePhotoPath ? `${baseUrl}${profilePhotoPath}` : '';
  const photoAlt = formatString(t.about.photoAlt, { name: ownerName });

  const landscapePhotos = gallery.filter((photo) => photo.orientation === 'landscape');
  const portraitPhotos = gallery.filter((photo) => photo.orientation === 'portrait');

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-edge">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.about.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-xl">
            {t.about.sectionSubtitle}
          </p>
        </div>
      </div>
      
      {/* 1. Unified Editorial Block: Bio (8 cols) + Full-Bleed Portrait (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 border border-edge bg-surface divide-y md:divide-y-0 md:divide-x divide-edge transition-colors">
        <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-4 text-dominant-ink">
            <CircleUserRound size={20} aria-hidden="true" />
            <h3 className="text-lg font-bold text-ink font-display">{pickLocalized(objectiveTitle, locale)}</h3>
          </div>
          <div className="text-ink-secondary leading-relaxed text-sm md:text-base space-y-4 max-w-[58ch]">
            {bioParagraphs.map((paragraph, idx) => (
              <p key={idx}>{pickLocalized(paragraph, locale)}</p>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 bg-zinc-950 flex items-center justify-center min-h-[300px] md:min-h-full relative group overflow-hidden">
          {profilePhoto ? (
            <img 
              src={profilePhoto} 
              alt={photoAlt} 
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-ink-muted">
              <Camera size={36} aria-hidden="true" />
              <span className="text-[13px] font-sans">{t.about.photoPlaceholder}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Open Architectural Recognition Strip (Zero nested boxes) */}
      <div className="border-y border-edge py-8">
        <div className="flex items-center gap-2.5 mb-6 text-accent-ink">
          <Trophy size={20} aria-hidden="true" />
          <h3 className="text-lg font-bold text-ink font-display">{t.about.awardsTitle}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 md:divide-x divide-edge">
          {awards.map((award, index) => {
            const isPrimary = index === 0;
            const colClass = isPrimary
              ? 'md:col-span-6 md:pr-8 border-l-2 border-accent pl-4 flex flex-col justify-between'
              : index === awards.length - 1
              ? 'md:col-span-3 md:pl-6 flex flex-col justify-between'
              : 'md:col-span-3 md:px-6 flex flex-col justify-between';

            const badgeColorClass =
              award.tone === 'accent'
                ? 'text-accent-ink'
                : award.tone === 'dominant'
                ? 'text-dominant-ink'
                : 'text-ink-tertiary';

            return (
              <div key={award.id} className={colClass}>
                <div>
                  {award.winnerLabel ? (
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`${badgeColorClass} font-sans text-[13px] font-semibold`}>
                        {pickLocalized(award.badge, locale)}
                      </span>
                      <span className="px-2.5 py-0.5 text-[13px] font-sans font-medium bg-accent-soft text-accent-ink border border-accent-edge">
                        {pickLocalized(award.winnerLabel, locale)}
                      </span>
                    </div>
                  ) : (
                    <span className={`${badgeColorClass} font-sans text-[13px] font-semibold block mb-2`}>
                      {pickLocalized(award.badge, locale)}
                    </span>
                  )}
                  <h4 className={`text-ink ${isPrimary ? 'font-extrabold text-base' : 'font-bold text-[15px]'} font-display`}>
                    {pickLocalized(award.title, locale)}
                  </h4>
                  <p className="text-ink-secondary text-[13px] leading-relaxed mt-1.5">
                    {pickLocalized(award.description, locale)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Unboxed Laboratory & Field Mosaic (Sharp-edged frames matching natural aspect ratios) */}
      <div>
        <div className="flex items-center gap-2.5 mb-5 text-dominant-ink">
          <FlaskConical size={20} aria-hidden="true" />
          <h3 className="text-lg font-bold text-ink font-display">{t.about.galleryTitle}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          <div className="md:col-span-6 flex flex-col gap-4">
            {landscapePhotos.map((photo) => {
              const src = `${baseUrl}${photo.image}`;
              return (
                <figure
                  key={photo.id}
                  className="bg-surface border border-edge overflow-hidden group/event hover:border-dominant-edge transition-colors flex flex-col"
                >
                  <div className={`w-full ${photo.aspectClass} bg-zinc-950 overflow-hidden`}>
                    <img
                      src={src}
                      alt={pickLocalized(photo.alt, locale)}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/event:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="p-4 border-t border-edge bg-surface transition-colors">
                    <h4 className="text-ink font-bold text-sm md:text-[15px] font-display mb-1">
                      {pickLocalized(photo.title, locale)}
                    </h4>
                    <p className="text-ink-secondary text-[13px] leading-relaxed">
                      {pickLocalized(photo.description, locale)}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="md:col-span-6 flex">
            {portraitPhotos.map((photo) => {
              const src = `${baseUrl}${photo.image}`;
              return (
                <figure
                  key={photo.id}
                  className="w-full h-full bg-surface border border-edge overflow-hidden group/event hover:border-dominant-edge transition-colors flex flex-col"
                >
                  <div className={`w-full ${photo.aspectClass} bg-zinc-950 overflow-hidden shrink-0`}>
                    <img
                      src={src}
                      alt={pickLocalized(photo.alt, locale)}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/event:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="p-4 md:p-5 border-t border-edge bg-surface flex-1 flex flex-col justify-center transition-colors">
                    <h4 className="text-ink font-bold text-sm md:text-[15px] font-display mb-1">
                      {pickLocalized(photo.title, locale)}
                    </h4>
                    <p className="text-ink-secondary text-[13px] leading-relaxed">
                      {pickLocalized(photo.description, locale)}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
