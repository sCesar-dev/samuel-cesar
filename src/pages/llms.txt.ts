import type { APIRoute } from 'astro';
import { loadPortfolioGraph } from '../lib/portfolioData';

export const prerender = true;

export const GET: APIRoute = async () => {
  const graph = await loadPortfolioGraph();
  const { profile, education, experience, projects, skills, certifications, badges, achievements } = graph;
  const siteBase = profile.contacts.website.replace(/\/$/, '');
  const awards = achievements.filter((item) => item.kind === 'award');

  const lines: string[] = [
    `# ${profile.name} — ${profile.role.en}`,
    '',
    `> ${profile.headline.en}`,
    '',
    `- **Availability**: ${profile.availabilityBadge.en}`,
    `- **Location**: ${profile.location.label.en}`,
    `- **Website**: ${siteBase}`,
    `- **Structured JSON**: ${siteBase}/profile.json`,
    `- **Resume (PDF)**: ${siteBase}${profile.assets.resumePdf}`,
    `- **GitHub**: ${profile.contacts.github}`,
    `- **LinkedIn**: ${profile.contacts.linkedin}`,
    `- **Email**: ${profile.contacts.email}`,
    '',
    '## Bio',
    '',
    ...profile.bio.paragraphs.map((p) => p.en),
    '',
    '## Education',
    '',
    ...education.map((edu) => {
      const period = [edu.startDate ?? 'N/A', edu.endDate ?? (edu.current ? 'Present' : 'N/A')].join(' – ');
      return `- **${edu.degree.en}** — ${edu.institution.en} (${edu.location}) | Status: ${edu.status.en} | Period: ${period}`;
    }),
    '',
    '## Research & Experience',
    '',
    ...experience.map((exp) => {
      const period = [exp.startDate ?? 'N/A', exp.endDate ?? (exp.current ? 'Present' : 'N/A')].join(' – ');
      return [
        `### ${exp.organization} — ${exp.role.en}`,
        `- **Focus**: ${exp.focus.en}`,
        `- **Status**: ${exp.status.en} (${period})`,
        `- **Stack**: ${exp.stack.join(', ')}`,
        `- **Summary**: ${exp.description.en}`,
      ].join('\n');
    }),
    '',
    '## Projects',
    '',
    ...projects.map((project) => {
      const metricsStr = project.metrics
        .map((m) => `${m.label.en}: ${m.value.en}`)
        .join(' | ');
      const parts = [
        `### [${project.title.en}](${siteBase}/projects/${project.id})`,
        `- **Category**: ${project.categoryLabel.en}`,
        `- **Description**: ${project.oneLinerImpact?.en ?? project.description.en}`,
        `- **Techs**: ${project.techs.join(', ')}`,
      ];
      if (metricsStr) {
        parts.push(`- **Metrics**: ${metricsStr}`);
      }
      if (project.github) {
        parts.push(`- **Repository**: ${project.github}`);
      }
      if (project.live) {
        parts.push(`- **Live**: ${project.live}`);
      }
      return parts.join('\n');
    }),
    '',
    '## Technical Skills',
    '',
    ...skills.map(
      (domain) => `- **${domain.title.en}**: ${domain.items.map((item) => item.en).join(', ')}`
    ),
    '',
    '## Achievements & Recognition',
    '',
    ...awards.map(
      (award) => `- **${award.title.en}** (${award.organization}${award.date ? `, ${award.date}` : ''}): ${award.description.en}`
    ),
    '',
    '## Certifications',
    '',
    ...(certifications.length > 0
      ? certifications.map(
          (cert) =>
            `- **${cert.title.en}** — ${cert.issuer}${cert.issueDate ? ` (${cert.issueDate})` : ''}${cert.credentialUrl ? ` | ${cert.credentialUrl}` : ''}`
        )
      : ['- No certifications listed yet.']),
    '',
    '## Operational Badges',
    '',
    ...(badges.length > 0
      ? badges.map(
          (badge) =>
            `- **${badge.title.en}** (${badge.platform} · ${badge.categoryLabel.en}) — ${badge.rankOrMetric.en} [sync: ${badge.syncMeta.sourceAgent}]${badge.verifyUrl ? ` | ${badge.verifyUrl}` : ''}`
        )
      : ['- No external operational badges synced yet (Hermes sync pipeline ready).']),
    '',
  ];

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
