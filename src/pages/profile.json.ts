import type { APIRoute } from 'astro';
import { loadPortfolioGraph } from '../lib/portfolioData';

export const prerender = true;

export const GET: APIRoute = async () => {
  const graph = await loadPortfolioGraph();
  const siteBase = graph.profile.contacts.website.replace(/\/$/, '');

  const payload = {
    schemaVersion: '1.0.0',
    source: 'data/*.yaml',
    endpoints: {
      website: siteBase,
      profileJson: `${siteBase}/profile.json`,
      llmsTxt: `${siteBase}/llms.txt`,
      resumePdf: `${siteBase}${graph.profile.assets.resumePdf}`,
    },
    profile: graph.profile,
    education: graph.education,
    experience: graph.experience,
    projects: graph.projects.map((project) => ({
      ...project,
      url: `${siteBase}/projects/${project.id}`,
    })),
    skills: graph.skills,
    certifications: graph.certifications,
    badges: graph.badges,
    achievements: graph.achievements,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
