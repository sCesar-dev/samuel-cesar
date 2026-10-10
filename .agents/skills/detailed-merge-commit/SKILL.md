---
name: atomic-commits
description: >-
  Generates clean, structured, atomic commits for the Samuel Cesar portfolio repository.
  Instead of grouping unrelated changes into one monolithic commit, this skill
  analyzes changed files, categorizes them according to the portfolio architecture
  (pages, components, content collections, styles, public assets, CI/CD, config),
  and creates individual, well-documented Conventional Commits for each change made.
metadata:
  version: "2.0.0"
  last-reviewed: "2026-10-10"
  author: "sCesar-dev"
---

# Atomic Commit Generator — Samuel Cesar Portfolio

## Purpose

Instead of bundling multiple disparate changes into a single monolithic commit (or a generic "update project" / "fix all" commit), this skill enforces an **atomic commit workflow** tailored for **Samuel Cesar's personal portfolio & engineering showcase** (`sCesar-dev/samuel-cesar`).

An atomic commit:
1. **Focuses on a single logical responsibility** (e.g., adding a new project case study, creating a React client island, updating collection schemas, or refining Tailwind animations).
2. **Keeps the build in a working, deployable state** at every step (`npm run build` succeeds).
3. **Makes git history, code reviews, and rollbacks effortless** by isolating individual changes with clear context and rationale.

---

## When to Use

- When multiple files across different layers of the portfolio have been modified, created, or deleted.
- Before pushing changes to a remote branch or opening a pull request.
- When the user asks to:
  - "Split changes into multiple commits" / "dividir em diversos commits"
  - "Commit each change separately" / "um commit para cada alteração"
  - "Organize git history with atomic commits" / "estruturar commits atômicos"
  - "Faça os commits das alterações" / "comite as mudanças separadamente"

---

## File Taxonomy for this Portfolio

Files in this repository are organized into distinct architectural layers. Commits should be scoped to these layers rather than mixing unrelated files:

| Layer / Scope | File Patterns | Description & Responsibility |
| :--- | :--- | :--- |
| **`content`** | `src/content/projects/*.md`, `src/content/config.ts`, `src/data/*.json` | Markdown project case studies, Zod collection schemas (`config.ts`), and structured data (`certifications.json`). |
| **`components`** | `src/components/*.astro`, `src/components/*.tsx` | Astro UI sections (`About.astro`, `Home.astro`, `Projects.astro`, `Contact.astro`) and interactive React islands (`ProjectsList.tsx`, `HeroNetworking.tsx`, `ImageCarousel.tsx`, `ProjectCardVisual.tsx`, `CertificationsList.tsx`). |
| **`pages`** | `src/pages/**/*.astro` | Route handlers, landing page (`index.astro`), and dynamic project deep-dive routes (`src/pages/projects/[slug].astro`). |
| **`layout`** | `src/layouts/Layout.astro` | Base HTML document, navbar, footer, metadata, SEO tags, and global container shell. |
| **`styles`** | `src/styles/*.css`, `tailwind.config.*` | Global stylesheet (`global.css`), Tailwind v4 setup, typography, and custom micro-animations. |
| **`assets`** | `public/images/**`, `public/docs/**`, `public/favicon.*`, `src/assets/**` | Static media, screenshots, diagrams, profile pictures, resume PDFs, and favicons. |
| **`ci`** | `.github/workflows/*.yml` | GitHub Actions automated workflows (e.g., GitHub Pages deployment via `deploy.yml`). |
| **`config` / `chore`** | `astro.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `.gitignore` | Project configuration, Astro integrations (`@astrojs/react`, `@tailwindcss/vite`), TypeScript setup, and npm dependencies. |
| **`agent`** | `.agents/**` | Agent skills, rules, and assistant customizations. |
| **`docs`** | `README.md`, `docs/**` | Repository documentation, guides, and project overviews. |

---

## Commit Message Format

Every commit follows the **Conventional Commits** specification:

```
<type>(<scope>): <short imperative summary (<= 72 chars)>

[Optional body: 1-3 concise bullet points or short paragraph]
- Why: Reason for the change / goal being addressed
- What: Key technical modifications made
- Impact / Verification: Validation performed (e.g., build verified with npm run build)
```

### Commit Types:
- **`feat`**: New functionality, UI components, project case studies, or interactive features.
- **`fix`**: Bug fixes, layout adjustments, schema validation fixes, or broken link corrections.
- **`refactor`**: Code reorganization, component modularization, or asset directory restructuring without changing external behavior.
- **`style`**: Visual-only styling updates, Tailwind classes, typography, animations, or spacing adjustments.
- **`assets`**: Adding, updating, or optimizing media files, project screenshots, or document downloads.
- **`docs`**: Documentation updates (README, markdown guides).
- **`ci`**: GitHub Actions workflows and deployment scripts.
- **`chore`**: Dependency updates, Astro/TypeScript config changes, `.gitignore`, or tooling metadata.

---

## Procedure — Creating Atomic Commits Step-by-Step

### Step 1 — Inspect Current Working State
Identify all modified, staged, and untracked files:

```bash
git status -s
git diff --stat
```

### Step 2 — Partition Files into Logical Batches
Group the changed files into independent batches where each batch represents **one logical change**.

**Partitioning Rules**:
1. **Never combine content and tooling/configuration**: Keep markdown/JSON changes separate from `astro.config.mjs` or `package.json`.
2. **Pair related assets with content when introducing a feature**: Adding a new project case study can include its dedicated screenshots in `public/images/<project>/` if tightly coupled, OR be split if the image reorganization was a separate refactoring effort.
3. **Keep UI components separate from layout changes**: Modifying `src/components/` should generally be its own commit apart from changes to `src/layouts/Layout.astro`.
4. **Isolate CI/CD and configuration**: Workflows (`.github/workflows/deploy.yml`) or Astro config (`astro.config.mjs`) must have dedicated commits.
5. **Never commit build artifacts**: Verify that `dist/`, `.astro/`, or `node_modules/` are not staged.

### Step 3 — Run Validation Before Committing
Ensure that the changes compile cleanly and static generation passes:

```bash
npm run build
```
*(Astro build validates TypeScript, Zod content schemas, and static routing for all project pages).*

### Step 4 — Stage and Commit Each Batch Independently
For each logical batch, stage **only** the associated files and commit with a descriptive message:

```bash
# Example Batch 1: Content Collection schema and project case studies
git add src/content/config.ts src/content/projects/biopoints.md
git commit -m "feat(content): add BioPoints case study and update project schema"

# Example Batch 2: Static project media assets
git add public/images/biopoints/
git commit -m "assets(projects): add UI screenshots and architecture diagram for BioPoints"

# Example Batch 3: Interactive UI component
git add src/components/ProjectsList.tsx
git commit -m "feat(components): implement interactive stack filter in ProjectsList"
```

### Step 5 — Verify Git Log
Review the final commit tree to ensure clarity, atomicity, and linear progression:

```bash
git log --oneline -n 10
```

---

## Common Portfolio Commit Sequences (Example Breakdown)

When unbundling multiple changes across the portfolio, apply a sequence of atomic commits such as:

### Scenario A: Adding or Overhauling Project Case Studies
1. **`feat(content): update project content schema and add new case studies`**
   - Files: `src/content/config.ts`, `src/content/projects/*.md`
2. **`assets(projects): add screenshots and media for new project showcases`**
   - Files: `public/images/<project>/*`
3. **`feat(components): enhance project card visuals and interactive tags`**
   - Files: `src/components/ProjectCardVisual.tsx`, `src/components/ProjectsList.tsx`

### Scenario B: Design & UI Overhaul
1. **`style(theme): update global color palette and typography in global.css`**
   - Files: `src/styles/global.css`
2. **`feat(components): add HeroNetworking interactive canvas and animation`**
   - Files: `src/components/HeroNetworking.tsx`, `src/components/Home.astro`
3. **`refactor(layout): update navbar links and responsive mobile menu in Layout`**
   - Files: `src/layouts/Layout.astro`

### Scenario C: Infrastructure & CI/CD Deployment
1. **`chore(config): configure GitHub Pages site and base URL in astro.config.mjs`**
   - Files: `astro.config.mjs`
2. **`ci(deploy): configure GitHub Pages deployment workflow with Astro action`**
   - Files: `.github/workflows/deploy.yml`

---

## Verification Checklist

Before considering an atomic commit sequence complete:

- [ ] Each commit contains changes to only **one logical layer** or concern.
- [ ] No commit contains unrelated files (e.g., config changes mixed into project content).
- [ ] Commit messages follow `<type>(<scope>): <summary>` format.
- [ ] Build and schema validation passes (`npm run build`).
- [ ] No temporary, scratch, or build files (`dist/`, `.astro/`, `.cache`) are staged.
- [ ] All sensitive files and credentials are excluded via `.gitignore`.
