# GEMINI.md

Siga integralmente as regras arquiteturais, o lock de unicidade (`U-Score >= 85/100`) e o roteamento de skills definidos em [AGENTS.md](./AGENTS.md).

- **Dados de Domínio (`/data/*.yaml`)**: Consulte e execute o fluxo da skill [`.agents/skills/portfolio-data-ops/SKILL.md`](./.agents/skills/portfolio-data-ops/SKILL.md). Nunca duplique dados de domínio em `src/i18n/translations.ts` nem em componentes `.astro`/`.tsx`.
- **Frontend, Design System & Rebranding**: Consulte [`PRODUCT.md`](./PRODUCT.md), [`DESIGN.md`](./DESIGN.md) e [`design-system/samuel-cesar-portfolio/MASTER.md`](./design-system/samuel-cesar-portfolio/MASTER.md), acionando `.agents/skills/design-taste-frontend`, `.agents/skills/impeccable` e `.agents/skills/ui-ux-pro-max`. Não altere a estrutura ou mecânica dos recursos **Tier S (`U-Score >= 85/100`)**.
