import { getCollection, getEntry } from 'astro:content';
import type {
  ProfileData,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillDomain,
  CertificationItem,
  BadgeItem,
  AchievementItem,
} from '../../data/schemas/portfolio.ts';

export interface PortfolioGraph {
  profile: ProfileData;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillDomain[];
  certifications: CertificationItem[];
  badges: BadgeItem[];
  achievements: AchievementItem[];
}

export async function loadProfile(): Promise<ProfileData> {
  const entry = await getEntry('profile', 'main');
  if (!entry) {
    throw new Error('Missing "main" entry in data/profile.yaml');
  }
  return entry.data;
}

export async function loadEducation(): Promise<EducationItem[]> {
  return (await getCollection('education')).map((e) => e.data);
}

export async function loadExperience(): Promise<ExperienceItem[]> {
  return (await getCollection('experience')).map((e) => e.data);
}

export async function loadProjects(): Promise<ProjectItem[]> {
  return (await getCollection('projects'))
    .map((e) => e.data)
    .sort((a, b) => a.order - b.order);
}

export async function loadSkills(): Promise<SkillDomain[]> {
  return (await getCollection('skills'))
    .map((e) => e.data)
    .sort((a, b) => a.order - b.order);
}

export async function loadCertifications(): Promise<CertificationItem[]> {
  return (await getCollection('certifications')).map((e) => e.data);
}

export async function loadBadges(): Promise<BadgeItem[]> {
  return (await getCollection('badges'))
    .map((e) => e.data)
    .sort((a, b) => a.order - b.order);
}

export async function loadAchievements(): Promise<AchievementItem[]> {
  return (await getCollection('achievements'))
    .map((e) => e.data)
    .sort((a, b) => a.order - b.order);
}

export async function loadPortfolioGraph(): Promise<PortfolioGraph> {
  const [
    profile,
    education,
    experience,
    projects,
    skills,
    certifications,
    badges,
    achievements,
  ] = await Promise.all([
    loadProfile(),
    loadEducation(),
    loadExperience(),
    loadProjects(),
    loadSkills(),
    loadCertifications(),
    loadBadges(),
    loadAchievements(),
  ]);

  return {
    profile,
    education,
    experience,
    projects,
    skills,
    certifications,
    badges,
    achievements,
  };
}
