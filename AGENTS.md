# AGENTS.md — Regras de Arquitetura & Design System ("AI Mind")

## 1. Stack & Versões Exatas
- **Framework**: Astro `5.17.1` (output estático SSG em `astro.config.mjs`)
- **UI**: React `19.2.4` (`@astrojs/react` `4.4.2`) + Framer Motion + Lucide React
- **Estilização**: Tailwind CSS `4.1.18` via `@tailwindcss/vite` (`src/styles/global.css`)
- **Validação**: Zod `3.25.76` (`data/schemas/portfolio.ts`)
- **Runtime**: Node.js `>= 22.0.0` (`.nvmrc`: `24`, suporte nativo a `--experimental-strip-types`)
- **Gerenciador de Pacotes**: `npm` (lockfile: `package-lock.json`)

## 2. Regra de Ouro — Single Source of Truth (SSOT) & Integração Hermes
- **Dados de domínio vivem exclusivamente em `/data/*.yaml`**:
  - `data/profile.yaml`, `data/education.yaml`, `data/experience.yaml`, `data/projects.yaml`, `data/skills.yaml`, `data/certifications.yaml`, `data/achievements.yaml` e `data/badges.yaml` *(planejado na Fase 0 do Rebranding para Badges de Bug Bounty, SOC/Pentest, Criptografia e LeetCode)*.
  - Corpos longos em Markdown de projetos ficam em `src/content/projects/<id>.md` (referenciados por `bodyFile` em `data/projects.yaml`, suportando as trilhas `data-engineering`, `data-science`, `computer-vision`, `robotics-cv` e `cybersecurity`).
  - **Protocolo de Agente Autônomo (Hermes)**: Conquistas contínuas em plataformas externas (LeetCode, TryHackMe, HackTheBox, HackerOne, Bugcrowd) são registradas como **Badges Operacionais** em `data/badges.yaml` (com `externalId` determinístico e `syncMeta.sourceAgent: "hermes"`), separadas de certificações formais (`data/certifications.yaml`).
- **Strings de UI vivem em `src/i18n/translations.ts`**: apenas rótulos de navegação, botões, acessibilidade e estados genéricos.
- **PROIBIDO** hardcodar projetos, bio, experiências, formação, skills, certificações, badges, conquistas ou links de contato em componentes `.astro`/`.tsx` ou em `translations.ts`.
- **Paridade Bilíngue (`pt` / `en`)**: todo texto de domínio estruturado usa `{ pt, en }` (`LocalizedString`). Campos desconhecidos devem usar `null` com `# TODO`, nunca dados inventados.
- **Endpoints Derivados**: `/profile.json` (`src/pages/profile.json.ts`) e `/llms.txt` (`src/pages/llms.txt.ts`) são gerados automaticamente no build a partir de `/data`.

## 3. APIs Permitidas vs. Proibidas (Astro 5.17.1)
- **Usar (Obrigatório)**:
  - `src/content.config.ts` com `defineCollection` de `'astro:content'` e `file()` / `glob()` de `'astro/loaders'`;
  - `getCollection()`, `getEntry()` e `render(entry)` importados de `'astro:content'`;
  - `entry.id` como identificador estável (slug);
  - Tailwind v4 via `@tailwindcss/vite` (`@import "tailwindcss";` e `@theme inline` em `src/styles/global.css`).
- **Proibido (Legado)**:
  - `src/content/config.ts` ou `type: 'content' | 'data'`;
  - `entry.slug` ou `entry.render()`;
  - `Astro.glob()`;
  - `@astrojs/tailwind` (v3), `tailwind.config.mjs` ou `<ViewTransitions />`.

## 4. Design System, Uniqueness Lock (`U-Score`) & Frontend Specs
Antes de criar, refatorar ou estilizar qualquer componente `.astro`/`.tsx` ou `src/styles/global.css`, leia as especificações locais:
- [`PRODUCT.md`](./PRODUCT.md) — Verdade durável do produto, posicionamento tri-domínio (Engenharia de Dados, Ciência de Dados/ML e Robótica ROS 2/YOLOv8) e restrições de marca.
- [`DESIGN.md`](./DESIGN.md) e [`.impeccable/design.json`](./.impeccable/design.json) — Tokens normativos (`Cabinet Grotesk` + `Satoshi` + `Fragment Mono`, paleta dual-adaptive `Cyan #00f0ff/#0369a1` + `Indigo #818cf8/#4338ca` sobre `Obsidian #09090b` / `Slate #f8fafc`), hierarquia tipográfica e regras de componentes.
- [`design-system/samuel-cesar-portfolio/MASTER.md`](./design-system/samuel-cesar-portfolio/MASTER.md) — **Matriz de `U-Score` (0–100)** e **Plano de Rebranding**:
  - **LOCK DE UNICIDADE (`Tier S: U-Score >= 85/100`)**: Recursos classificados como **Tier S** (`ProjectCardVisual.tsx`, `ProjectsList.tsx`, `HeaderNav.tsx`, `ImageCarousel.tsx`, motor semântico `src/styles/global.css` + zero-flash script em `Layout.astro`, e pipeline SSOT `/data` + `/llms.txt` + `/profile.json`) são **IMUTÁVEIS** em sua estrutura e mecânica interativa. Nunca os substitua por blocos genéricos.
  - Intervenções de rebranding devem focar exclusivamente nos alvos **Tier A (`75–84`)** e **Tier B (`< 75`)** documentados no `MASTER.md`.

## 5. Roteamento de Skills (`.agents/skills/`)
- **Conteúdo e Dados (`/data/*.yaml`, `/profile.json`, `/llms.txt`)**:
  - Ative [`.agents/skills/portfolio-data-ops/SKILL.md`](./.agents/skills/portfolio-data-ops/SKILL.md).
- **Direção de Arte, Rebranding Visual e Inspeção de Browser (`1440px`/`768px`/`390px`)**:
  - Ative [`.agents/skills/design-taste-frontend/SKILL.md`](./.agents/skills/design-taste-frontend/SKILL.md) (`scripts/draw.mjs`, `scripts/lint.mjs`, `scripts/inspect.mjs`, `references/critique.md`).
- **Auditoria Técnica (5 Dimensões), Detector Mecânico e Refinamento de UI**:
  - Ative [`.agents/skills/impeccable/SKILL.md`](./.agents/skills/impeccable/SKILL.md) (`scripts/impeccable context`, `scripts/impeccable detect --json`, `reference/audit.md`, `reference/craft-floor.md`).
- **Taxonomia de Estilo, Paletas e Design Dials (`--variance`, `--motion`, `--density`)**:
  - Ative [`.agents/skills/ui-ux-pro-max/SKILL.md`](./.agents/skills/ui-ux-pro-max/SKILL.md) (`scripts/search.py`).
- **Manutenção de Specs e Skills (`AGENTS.md`, `SKILL.md`, Progressive Disclosure)**:
  - Ative [`.agents/skills/writing-for-agents/SKILL.md`](./.agents/skills/writing-for-agents/SKILL.md) e [`.agents/skills/skill-progressive-disclosure-design/SKILL.md`](./.agents/skills/skill-progressive-disclosure-design/SKILL.md).

## 6. Comandos Oficiais de Verificação
- `npm run dev` — Servidor local de desenvolvimento
- `npm run validate:data` — Valida `/data/*.yaml`, slugs e assets em `public/`
- `npm test` — Executa testes unitários e de integridade (`tests/**/*.test.ts`)
- `npm run typecheck` — `astro sync && tsc --noEmit`
- `npm run build` — Gera build estático em `dist/` (incluindo `dist/profile.json` e `dist/llms.txt`)
- `.agents/skills/impeccable/scripts/impeccable detect --target src --json` — Detector determinístico de anti-padrões de UI
- `node .agents/skills/design-taste-frontend/scripts/lint.mjs src` — Linter estático anti-slop
