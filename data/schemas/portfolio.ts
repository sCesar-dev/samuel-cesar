import { z } from 'zod';

/**
 * Bilingual string schema preserving parity between Portuguese (pt) and English (en).
 */
export const LocalizedStringSchema = z.object({
  pt: z.string().trim().min(1),
  en: z.string().trim().min(1),
});

export const LocalizedStringListSchema = z.object({
  pt: z.array(z.string().trim().min(1)).min(1),
  en: z.array(z.string().trim().min(1)).min(1),
});

/**
 * ISO-8601 date or partial year-month / year string (e.g., "2026", "2026-03", "2026-03-15"),
 * or null when not yet filled.
 */
export const NullableIsoDateSchema = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Expected ISO date format YYYY, YYYY-MM, or YYYY-MM-DD')
  .nullable();

const AssetPathSchema = z
  .string()
  .trim()
  .regex(/^(\/|https?:\/\/)/, 'Expected root-relative asset path (/...) or http(s) URL');

const OptionalUrlSchema = z.string().url().nullable();

export const ProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  brand: z.string().trim().min(1),
  role: LocalizedStringSchema,
  availabilityBadge: LocalizedStringSchema,
  availabilityStatus: LocalizedStringSchema,
  headline: LocalizedStringSchema,
  meta: z.object({
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    ogImage: AssetPathSchema,
  }),
  location: z.object({
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1),
    label: LocalizedStringSchema,
    footerNotice: LocalizedStringSchema,
  }),
  contacts: z.object({
    email: z.string().email(),
    phone: z.string().trim().min(1).nullable(),
    website: z.string().url(),
    github: z.string().url(),
    githubHandle: z.string().trim().min(1),
    linkedin: z.string().url(),
    linkedinHandle: z.string().trim().min(1),
  }),
  assets: z.object({
    profilePhoto: AssetPathSchema,
    qrCode: AssetPathSchema,
    resumePdf: AssetPathSchema,
    resumeFilename: z.string().trim().min(1),
    resumeUpdatedNote: LocalizedStringSchema,
  }),
  bio: z.object({
    objectiveTitle: LocalizedStringSchema,
    paragraphs: z.array(LocalizedStringSchema).min(1),
  }),
});

export const EducationItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
  institution: LocalizedStringSchema,
  shortInstitution: z.string().trim().min(1),
  degree: LocalizedStringSchema,
  status: LocalizedStringSchema,
  location: z.string().trim().min(1),
  startDate: NullableIsoDateSchema,
  endDate: NullableIsoDateSchema,
  current: z.boolean(),
});

export const ExperienceItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
  role: LocalizedStringSchema,
  organization: z.string().trim().min(1),
  type: z.enum(['research', 'internship', 'work', 'project']),
  status: LocalizedStringSchema,
  focus: LocalizedStringSchema,
  description: LocalizedStringSchema,
  stack: z.array(z.string().trim().min(1)).min(1),
  startDate: NullableIsoDateSchema,
  endDate: NullableIsoDateSchema,
  current: z.boolean(),
  showInCurriculumSummary: z.boolean().default(false),
});

export const ProjectMetricSchema = z.object({
  label: LocalizedStringSchema,
  value: LocalizedStringSchema,
});

export const ProjectItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9-]+)*$/, 'Expected lowercase slug id'),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  oneLinerImpact: LocalizedStringSchema.nullable(),
  category: z.enum(['data-engineering', 'data-science', 'computer-vision', 'robotics-cv', 'cybersecurity']),
  categoryLabel: LocalizedStringSchema,
  stack: z.string().trim().min(1),
  techs: z.array(z.string().trim().min(1)).min(1),
  hardwareBadges: z.array(z.string().trim().min(1)).default([]),
  technicalHighlights: LocalizedStringListSchema.nullable(),
  architectureDiagram: AssetPathSchema.nullable(),
  metrics: z.array(ProjectMetricSchema).default([]),
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
  startDate: NullableIsoDateSchema,
  endDate: NullableIsoDateSchema,
  github: OptionalUrlSchema,
  live: OptionalUrlSchema,
  images: z.array(AssetPathSchema).default([]),
  videos: z.array(AssetPathSchema).default([]),
  reports: z
    .object({
      pt: AssetPathSchema.nullable(),
      en: AssetPathSchema.nullable(),
    })
    .optional(),
  bodyFile: z.string().trim().min(1),
});

export const ProjectBodySchema = z
  .object({
    title: z.string().optional(),
  })
  .passthrough();

export const SkillDomainSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
  order: z.number().int().nonnegative(),
  title: LocalizedStringSchema,
  shortTitle: LocalizedStringSchema,
  summary: LocalizedStringSchema,
  tone: z.enum(['dominant', 'accent']),
  showInAboutTable: z.boolean(),
  showInCurriculumMatrix: z.boolean(),
  items: z.array(LocalizedStringSchema).min(1),
});

export const CertificationItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
  title: LocalizedStringSchema,
  issuer: z.string().trim().min(1),
  issueDate: NullableIsoDateSchema,
  credentialId: z.string().trim().min(1).nullable(),
  credentialUrl: OptionalUrlSchema,
  tags: z.array(z.string().trim().min(1)).default([]),
});

export const BadgeCategorySchema = z.enum([
  'bug-bounty',
  'soc-blue-team',
  'pentest-ctf',
  'cryptography',
  'competitive-coding',
]);

export const BadgeItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9-]+)*$/, 'Expected kebab-case slug id'),
  externalId: z.string().trim().min(1),
  platform: z.string().trim().min(1),
  category: BadgeCategorySchema,
  categoryLabel: LocalizedStringSchema,
  title: LocalizedStringSchema,
  rankOrMetric: LocalizedStringSchema,
  description: LocalizedStringSchema,
  tone: z.enum(['dominant', 'accent']).default('accent'),
  badgeIcon: z.string().trim().min(1).default('shield'),
  badgeImageUrl: AssetPathSchema.nullable(),
  verifyUrl: OptionalUrlSchema,
  issuedAt: NullableIsoDateSchema,
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  syncMeta: z.object({
    sourceAgent: z.enum(['manual', 'hermes']).default('manual'),
    lastSyncedAt: z.string().trim().min(1),
    autoUpdate: z.boolean().default(true),
  }),
});

export const AchievementItemSchema = z.discriminatedUnion('kind', [
  z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
    kind: z.literal('award'),
    order: z.number().int().nonnegative(),
    badge: LocalizedStringSchema,
    winnerLabel: LocalizedStringSchema.nullable(),
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    shortTitle: LocalizedStringSchema.nullable(),
    shortDescription: LocalizedStringSchema.nullable(),
    organization: z.string().trim().min(1),
    date: NullableIsoDateSchema,
    tone: z.enum(['accent', 'dominant', 'neutral']),
    featured: z.boolean(),
    showInCurriculum: z.boolean(),
  }),
  z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected kebab-case slug id'),
    kind: z.literal('gallery'),
    order: z.number().int().nonnegative(),
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    alt: LocalizedStringSchema,
    image: AssetPathSchema,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    aspectClass: z.string().trim().min(1),
    orientation: z.enum(['landscape', 'portrait']),
    date: NullableIsoDateSchema,
  }),
]);

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;
export type LocalizedStringList = z.infer<typeof LocalizedStringListSchema>;
export type ProfileData = z.infer<typeof ProfileSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type SkillDomain = z.infer<typeof SkillDomainSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type BadgeCategory = z.infer<typeof BadgeCategorySchema>;
export type BadgeItem = z.infer<typeof BadgeItemSchema>;
export type AchievementItem = z.infer<typeof AchievementItemSchema>;
