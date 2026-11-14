# CLAUDE.md

Siga integralmente as regras arquiteturais, o lock de unicidade (`U-Score >= 85/100`) e o roteamento de skills definidos em [AGENTS.md](./AGENTS.md).

- **Dados de Domínio (`/data/*.yaml`)**: Siga [`.agents/skills/portfolio-data-ops/SKILL.md`](./.agents/skills/portfolio-data-ops/SKILL.md) e [`.agents/skills/portfolio-data-ops/references/data-schema.md`](./.agents/skills/portfolio-data-ops/references/data-schema.md).
- **Frontend, Design System & Rebranding**: Consulte [`PRODUCT.md`](./PRODUCT.md), [`DESIGN.md`](./DESIGN.md) e [`design-system/samuel-cesar-portfolio/MASTER.md`](./design-system/samuel-cesar-portfolio/MASTER.md), utilizando as skills em `.agents/skills/` (`design-taste-frontend`, `impeccable`, `ui-ux-pro-max`). Preserve integralmente os componentes **Tier S (`U-Score >= 85/100`)**.
- **Gate de Qualidade**: Valide sempre com `npm run validate:data && npm test && npm run typecheck && npm run build`.
