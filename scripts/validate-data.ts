import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { z } from 'zod';
import {
  ProfileSchema,
  EducationItemSchema,
  ExperienceItemSchema,
  ProjectItemSchema,
  SkillDomainSchema,
  CertificationItemSchema,
  BadgeItemSchema,
  AchievementItemSchema,
  type ProfileData,
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type SkillDomain,
  type CertificationItem,
  type BadgeItem,
  type AchievementItem,
} from '../data/schemas/portfolio.ts';

export interface ValidationIssue {
  file: string;
  path: string;
  message: string;
}

export interface ValidatedPortfolioData {
  profile: ProfileData;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillDomain[];
  certifications: CertificationItem[];
  badges: BadgeItem[];
  achievements: AchievementItem[];
}

function readYamlFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(raw, { filename: filePath });
}

function formatZodIssues(file: string, error: z.ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    file,
    path: issue.path.length > 0 ? issue.path.join('.') : '<root>',
    message: issue.message,
  }));
}

function assertUniqueIds(
  file: string,
  items: Array<{ id: string }>,
  issues: ValidationIssue[]
): void {
  const seen = new Set<string>();
  items.forEach((item, index) => {
    if (seen.has(item.id)) {
      issues.push({
        file,
        path: `[${index}].id`,
        message: `Duplicate id "${item.id}"`,
      });
    }
    seen.add(item.id);
  });
}

function checkAssetExists(
  rootDir: string,
  file: string,
  fieldPath: string,
  assetPath: string | null | undefined,
  issues: ValidationIssue[]
): void {
  if (!assetPath || assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return;
  }
  const normalized = assetPath.replace(/^\/+/, '');
  const fullPath = path.join(rootDir, 'public', normalized);
  if (!fs.existsSync(fullPath)) {
    issues.push({
      file,
      path: fieldPath,
      message: `Referenced public asset does not exist: public/${normalized}`,
    });
  }
}

export function validatePortfolioData(rootDir: string): {
  valid: boolean;
  issues: ValidationIssue[];
  data?: ValidatedPortfolioData;
} {
  const issues: ValidationIssue[] = [];
  const dataDir = path.join(rootDir, 'data');

  const requiredFiles = [
    'profile.yaml',
    'education.yaml',
    'experience.yaml',
    'projects.yaml',
    'skills.yaml',
    'certifications.yaml',
    'badges.yaml',
    'achievements.yaml',
  ];

  for (const relFile of requiredFiles) {
    const fullPath = path.join(dataDir, relFile);
    if (!fs.existsSync(fullPath)) {
      issues.push({
        file: `data/${relFile}`,
        path: '<file>',
        message: 'Required data file is missing',
      });
    }
  }

  if (issues.length > 0) {
    return { valid: false, issues };
  }

  // 1. profile.yaml (expects { main: Profile })
  const rawProfileWrapper = readYamlFile(path.join(dataDir, 'profile.yaml'));
  const profileWrapperResult = z
    .object({ main: ProfileSchema })
    .safeParse(rawProfileWrapper);
  if (!profileWrapperResult.success) {
    issues.push(...formatZodIssues('data/profile.yaml', profileWrapperResult.error));
  }

  // 2. List collections
  const educationResult = z
    .array(EducationItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'education.yaml')));
  if (!educationResult.success) {
    issues.push(...formatZodIssues('data/education.yaml', educationResult.error));
  }

  const experienceResult = z
    .array(ExperienceItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'experience.yaml')));
  if (!experienceResult.success) {
    issues.push(...formatZodIssues('data/experience.yaml', experienceResult.error));
  }

  const projectsResult = z
    .array(ProjectItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'projects.yaml')));
  if (!projectsResult.success) {
    issues.push(...formatZodIssues('data/projects.yaml', projectsResult.error));
  }

  const skillsResult = z
    .array(SkillDomainSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'skills.yaml')));
  if (!skillsResult.success) {
    issues.push(...formatZodIssues('data/skills.yaml', skillsResult.error));
  }

  const certificationsResult = z
    .array(CertificationItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'certifications.yaml')));
  if (!certificationsResult.success) {
    issues.push(...formatZodIssues('data/certifications.yaml', certificationsResult.error));
  }

  const badgesResult = z
    .array(BadgeItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'badges.yaml')));
  if (!badgesResult.success) {
    issues.push(...formatZodIssues('data/badges.yaml', badgesResult.error));
  }

  const achievementsResult = z
    .array(AchievementItemSchema)
    .safeParse(readYamlFile(path.join(dataDir, 'achievements.yaml')));
  if (!achievementsResult.success) {
    issues.push(...formatZodIssues('data/achievements.yaml', achievementsResult.error));
  }

  if (
    !profileWrapperResult.success ||
    !educationResult.success ||
    !experienceResult.success ||
    !projectsResult.success ||
    !skillsResult.success ||
    !certificationsResult.success ||
    !badgesResult.success ||
    !achievementsResult.success
  ) {
    return { valid: false, issues };
  }

  const profile = profileWrapperResult.data.main;
  const education = educationResult.data;
  const experience = experienceResult.data;
  const projects = projectsResult.data;
  const skills = skillsResult.data;
  const certifications = certificationsResult.data;
  const badges = badgesResult.data;
  const achievements = achievementsResult.data;

  // 3. Unique IDs across every collection
  assertUniqueIds('data/education.yaml', education, issues);
  assertUniqueIds('data/experience.yaml', experience, issues);
  assertUniqueIds('data/projects.yaml', projects, issues);
  assertUniqueIds('data/skills.yaml', skills, issues);
  assertUniqueIds('data/certifications.yaml', certifications, issues);
  assertUniqueIds('data/badges.yaml', badges, issues);
  assertUniqueIds('data/achievements.yaml', achievements, issues);

  const seenExternalIds = new Set<string>();
  badges.forEach((badge, idx) => {
    if (seenExternalIds.has(badge.externalId)) {
      issues.push({
        file: 'data/badges.yaml',
        path: `[${idx}].externalId`,
        message: `Duplicate externalId "${badge.externalId}"`,
      });
    }
    seenExternalIds.add(badge.externalId);
  });

  // 4. Referential integrity: public assets & markdown bodies
  checkAssetExists(rootDir, 'data/profile.yaml', 'main.meta.ogImage', profile.meta.ogImage, issues);
  checkAssetExists(rootDir, 'data/profile.yaml', 'main.assets.profilePhoto', profile.assets.profilePhoto, issues);
  checkAssetExists(rootDir, 'data/profile.yaml', 'main.assets.qrCode', profile.assets.qrCode, issues);
  checkAssetExists(rootDir, 'data/profile.yaml', 'main.assets.resumePdf', profile.assets.resumePdf, issues);

  const mdFiles = fs
    .readdirSync(path.join(rootDir, 'src/content/projects'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, '').toLowerCase());

  projects.forEach((project, idx) => {
    const bodyPath = path.join(rootDir, project.bodyFile);
    if (!fs.existsSync(bodyPath)) {
      issues.push({
        file: 'data/projects.yaml',
        path: `[${idx}].bodyFile`,
        message: `Referenced Markdown body file does not exist: ${project.bodyFile}`,
      });
    }
    if (!mdFiles.includes(project.id)) {
      issues.push({
        file: 'data/projects.yaml',
        path: `[${idx}].id`,
        message: `Project id "${project.id}" does not match any Markdown slug in src/content/projects/`,
      });
    }
    if (project.technicalHighlights && project.technicalHighlights.pt.length !== project.technicalHighlights.en.length) {
      issues.push({
        file: 'data/projects.yaml',
        path: `[${idx}].technicalHighlights`,
        message: `PT/EN highlight count mismatch (${project.technicalHighlights.pt.length} vs ${project.technicalHighlights.en.length})`,
      });
    }
    checkAssetExists(rootDir, 'data/projects.yaml', `[${idx}].architectureDiagram`, project.architectureDiagram, issues);
    project.images.forEach((img, imgIdx) =>
      checkAssetExists(rootDir, 'data/projects.yaml', `[${idx}].images[${imgIdx}]`, img, issues)
    );
    project.videos.forEach((vid, vidIdx) =>
      checkAssetExists(rootDir, 'data/projects.yaml', `[${idx}].videos[${vidIdx}]`, vid, issues)
    );
    if (project.reports) {
      checkAssetExists(rootDir, 'data/projects.yaml', `[${idx}].reports.pt`, project.reports.pt, issues);
      checkAssetExists(rootDir, 'data/projects.yaml', `[${idx}].reports.en`, project.reports.en, issues);
    }
  });

  achievements.forEach((item, idx) => {
    if (item.kind === 'gallery') {
      checkAssetExists(rootDir, 'data/achievements.yaml', `[${idx}].image`, item.image, issues);
    }
  });

  badges.forEach((badge, idx) => {
    checkAssetExists(rootDir, 'data/badges.yaml', `[${idx}].badgeImageUrl`, badge.badgeImageUrl, issues);
  });

  return {
    valid: issues.length === 0,
    issues,
    data: {
      profile,
      education,
      experience,
      projects,
      skills,
      certifications,
      badges,
      achievements,
    },
  };
}

const isCliEntry =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCliEntry) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const result = validatePortfolioData(rootDir);

  if (!result.valid || !result.data) {
    console.error(`❌ Data validation failed with ${result.issues.length} issue(s):`);
    for (const issue of result.issues) {
      console.error(`  - [${issue.file}] (${issue.path}): ${issue.message}`);
    }
    process.exit(1);
  }

  const { data } = result;
  console.log(
    `✅ All /data/*.yaml validated successfully (` +
      `profile: 1, education: ${data.education.length}, experience: ${data.experience.length}, ` +
      `projects: ${data.projects.length}, skills: ${data.skills.length}, ` +
      `certifications: ${data.certifications.length}, badges: ${data.badges.length}, achievements: ${data.achievements.length}).`
  );
}
