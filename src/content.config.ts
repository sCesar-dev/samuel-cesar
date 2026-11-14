import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import {
  ProfileSchema,
  EducationItemSchema,
  ExperienceItemSchema,
  ProjectItemSchema,
  ProjectBodySchema,
  SkillDomainSchema,
  CertificationItemSchema,
  BadgeItemSchema,
  AchievementItemSchema,
} from '../data/schemas/portfolio.ts';

const profile = defineCollection({
  loader: file('data/profile.yaml'),
  schema: ProfileSchema,
});

const education = defineCollection({
  loader: file('data/education.yaml'),
  schema: EducationItemSchema,
});

const experience = defineCollection({
  loader: file('data/experience.yaml'),
  schema: ExperienceItemSchema,
});

const projects = defineCollection({
  loader: file('data/projects.yaml'),
  schema: ProjectItemSchema,
});

const projectBodies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ProjectBodySchema,
});

const skills = defineCollection({
  loader: file('data/skills.yaml'),
  schema: SkillDomainSchema,
});

const certifications = defineCollection({
  loader: file('data/certifications.yaml'),
  schema: CertificationItemSchema,
});

const badges = defineCollection({
  loader: file('data/badges.yaml'),
  schema: BadgeItemSchema,
});

const achievements = defineCollection({
  loader: file('data/achievements.yaml'),
  schema: AchievementItemSchema,
});

export const collections = {
  profile,
  education,
  experience,
  projects,
  projectBodies,
  skills,
  certifications,
  badges,
  achievements,
};
