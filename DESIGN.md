# DESIGN SYSTEM & FRONTEND RULES (`DESIGN.md`)

> **MANDATORY DIRECTIVE FOR ALL CODE GENERATION & UI IMPLEMENTATIONS**
> This document establishes the strict design constitution for the `samuel-cesar` portfolio codebase.
> Every component, page, layout, and style written in this repository must comply with the rules below. No ad-hoc styles, generic tropes, or forbidden patterns are permitted.

---

## 1. Repository Audit Summary & Baseline

- **Core Stack**:
  - **Framework**: Astro 5 (`astro: ^5.17.1`)
  - **Interactive Islands**: React 19 (`@astrojs/react: ^4.4.2`, `react: ^19.2.4`)
  - **Styling**: Tailwind CSS v4 (`@tailwindcss/vite: ^4.1.18`, `tailwindcss: ^4.1.18`, `tailwindcss-animate: ^1.0.7`)
  - **Icons**: Lucide React (`lucide-react: ^0.563.0`)
  - **Motion**: Framer Motion (`framer-motion: ^12.33.0`)
- **Key Legacy Anti-Patterns to Eliminate**:
  - Repetitive 3-card symmetrical grids (`grid-cols-1 md:grid-cols-3` identical containers across Projects, About, Certifications, Curriculum).
  - Centered-everything hero section in `HeroNetworking.tsx`.
  - Competing multi-color palette (purple, indigo, emerald, cyan, amber) and purple/indigo gradients on white or dark.
  - Excessive low-opacity drop shadows (`shadow-[0_8px_32px_rgba(0,0,0,0.4)]`) used indiscriminately instead of crisp border architecture.
  - Generic fonts (`Inter, Roboto, Arial, system-ui`).

---

## 2. Typography Rules

### Designated Typefaces & CSS Variables

Fonts are defined as root CSS variables and applied systematically:

```css
:root {
  --font-display: 'Syne', 'Space Grotesk', sans-serif;
  --font-body: 'Geist Sans', 'Satoshi', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

| Role | Primary Choice | Fallback Choice | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Display** | **Syne** | **Space Grotesk** | Major titles, section headings, high-impact statements |
| **Body** | **Geist** | **Satoshi** | Running copy, descriptions, navigation, documentation |
| **Mono** | **JetBrains Mono** | Modern mono stack | Code snippets, technical metrics, telemetry, badges |

### Strictly Blacklisted Fonts (NEVER USE)
The following generic fonts are **banned** from font stacks, imports, and styles:
- ❌ `Inter`
- ❌ `Roboto`
- ❌ `Open Sans`
- ❌ `Arial`
- ❌ `system-ui`

### Weight Extremes & Scale Architecture
- **Contrasting Weight Extremes**:
  - Lightweight supporting text: **200 (ExtraLight / Thin)** to **300 (Light)**.
  - Prominent headings & anchor titles: **800 (ExtraBold)** to **900 (Black)**.
  - Avoid muddy, uniform mid-weights (400–600) as the defining typographic look. Reserve regular weights strictly for dense functional body copy to ensure readability and WCAG accessibility across all viewports.
- **~3× Size Hierarchy Leaps**:
  - Major display headings jump roughly **3×** above small supporting text (e.g., `14px–16px` small supporting copy jumps directly to `48px–56px` display titles on desktop, scaling cleanly on mobile).
  - Eliminate flat, incremental scales (`14px` -> `16px` -> `18px`) that lack intentional visual hierarchy.

---

## 3. Color Architecture & CSS Variables

### Strict Palette: ONE Dominant Color + ONE Accent Color
No secondary competing brand colors are permitted. Colors are centralized in CSS variables:

```css
@theme {
  /* Dominant Brand Color */
  --color-dominant: #00f0ff;          /* Electric Cyan */
  --color-dominant-muted: rgba(0, 240, 255, 0.12);
  --color-dominant-border: rgba(0, 240, 255, 0.35);

  /* Single Accent Color */
  --color-accent: #10b981;            /* Emerald / Neon Green */
  --color-accent-muted: rgba(16, 185, 129, 0.12);
  --color-accent-border: rgba(16, 185, 129, 0.35);

  /* Unified Neutral Palette */
  --color-bg-base: #09090b;           /* Deep obsidian canvas */
  --color-surface-panel: #121216;     /* Primary container surface */
  --color-surface-subtle: #18181f;    /* Interactive card surface */
  --color-border-hairline: rgba(255, 255, 255, 0.08);
  --color-border-subtle: rgba(255, 255, 255, 0.15);

  /* Neutral Text Tokens */
  --color-text-primary: #ffffff;
  --color-text-secondary: #94a3b8;
  --color-text-tertiary: #52525b;
}
```

### Complete Ban on Purple & Indigo Gradients
- ❌ **BAN all purple and indigo gradients**, including:
  - Decorative background radials or blur orbs.
  - Text gradient clips (`bg-gradient-to-r from-emerald via-purple to-cyan`).
  - Colored glow pseudo-elements.
  - Gradient overlays.
- All decorative accents and highlights must draw exclusively from `--color-dominant`, `--color-accent`, and the neutral palette.

---

## 4. Spacing: 8px-Based Rhythm & Nuances

### Core 8px Grid & 4px Subdivisions
- **Default Rhythm**: Increments of **8px** (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`) for standard margins, paddings, and section gaps.
- **Fine Adjustments (4px Subdivision)**: Permitted for micro-adjustments such as compact badge padding (`py-1` = 4px), icon-to-label gaps (`gap-1.5` = 6px / `gap-1` = 4px), and inline tags.
- **Optical Alignment & Practical Flexibility**:
  - The 8px rule is not interpreted literally to the detriment of craft.
  - Border widths (`1px`, `2px`), icon dimensions (`14px`, `18px`, `20px`), optical center offsets, and fluid clamp values (`clamp(...)`) for responsive layouts are valid and expected.

| Step | Pixels | Tailwind Utility | Context |
| :--- | :--- | :--- | :--- |
| **0.5x** | `4px` | `p-1`, `gap-1` | Badge padding, micro tag offsets |
| **1x** | `8px` | `p-2`, `gap-2` | Button inner padding, icon offsets |
| **2x** | `16px` | `p-4`, `gap-4` | Card interior padding, field gaps |
| **3x** | `24px` | `p-6`, `gap-6` | Container padding, column gaps |
| **4x** | `32px` | `p-8`, `gap-8` | Section interior dividers |
| **6x** | `48px` | `py-12`, `gap-12` | Major card separation |
| **8x** | `64px` | `py-16` | Standard section top/bottom padding |
| **12x** | `96px` | `py-24` | Hero & boundary transitions |

---

## 5. Component Architecture & Reuse Strategy

### Core Reuse Directive
> **"Before building a screen, inventory my existing components. List every reusable UI primitive in my repo (buttons, inputs, cards, modals, tables) with import paths and key props.**
>
> **Then build a new screen using ONLY those where they exist, and flag anything genuinely new. Do not hand-roll a second button style."**

### Principles of Reuse & Extension
1. **Reuse Existing Components**: Do not hand-roll duplicate markup for components already built in the repo.
2. **Standardized Paths**: Import via clean, predictable module paths.
3. **Composition & Variants**: Extend functionality using props, slots, and variants rather than copying HTML.
4. **Balanced Primitives**: Reuse does **not** mean forcing shadcn/ui for every single custom design. Bespoke product components (like interactive hardware badges, architecture diagram toggles, and live telemetry cards) should be custom-developed while honoring all system tokens and accessibility standards.

### Existing Project Components Registry

| Component | Path | Key Props & Inputs | Responsibility |
| :--- | :--- | :--- | :--- |
| **`Layout`** | `src/layouts/Layout.astro` | `title?: string`, `description?: string` | Global shell, header navigation, footers, meta tags, font links. |
| **`HeroNetworking`** | `src/components/HeroNetworking.tsx` | None (internal state for QR modal: `showQrModal: boolean`) | Hero section, personal pitch, QR modal, networking triggers. |
| **`Home`** | `src/components/Home.astro` | None | Hero section Astro wrapper. |
| **`Projects`** | `src/components/Projects.astro` | None (queries Astro content collection internally) | Project content collection wrapper. |
| **`ProjectsList`** | `src/components/ProjectsList.tsx` | `projects: AstroProject[]` | Filter tabs & interactive animated grid for engineering projects. |
| **`ProjectCardVisual`** | `src/components/ProjectCardVisual.tsx` | `project: ProjectCardData` (`title`, `slug`, `category`, `mediaVideoUrl`, `mediaImageUrl`, `architectureDiagramUrl`, `metrics`, `hardwareBadges`, `techs`, `technicalHighlights`, `githubUrl`, `liveDemoUrl`) | Specialized project card with media preview, architecture diagram, and hardware badges. |
| **`ImageCarousel`** | `src/components/ImageCarousel.tsx` | `images: string[]`, `altPrefix: string` | Accessible image gallery carousel with controls. |
| **`About`** | `src/components/About.astro` | None | Academic trajectory, ACSO/BahiaRT lab research, achievements. |
| **`Certifications`** | `src/components/Certifications.astro` | None | Credentials section wrapper. |
| **`CertificationsList`** | `src/components/CertificationsList.tsx` | `certifications: Certification[]` (`id`, `title`, `issuer`, `date`, `skills`, `badgeUrl`, `certificateUrl`) | Interactive credentials & skill filter with popovers. |
| **`Curriculum`** | `src/components/Curriculum.astro` | None | One-pager curriculum synthesis & direct PDF download. |
| **`Contact`** | `src/components/Contact.astro` | None | Direct contact channels & mobile QR scan. |

### shadcn/ui Primitives (`src/components/ui/`)
Adopt official shadcn/ui primitives for universal UI patterns:
- `@/components/ui/button` - Button variants and links.
- `@/components/ui/dialog` - Accessible modals (QR code, architecture preview).
- `@/components/ui/badge` - Categorization and tech tags.
- `@/components/ui/tabs` - Tabbed content filters.
- `@/components/ui/tooltip` - Metric and definition explainers.
- `@/components/ui/separator` - Hairline structural dividing lines.

---

## 6. Forbidden Anti-Patterns vs. Recommended Solutions

| Forbidden Anti-Pattern | Why It Is Prohibited | Required Implementation |
| :--- | :--- | :--- |
| ❌ **Three identical rounded cards in a row (`grid-cols-1 md:grid-cols-3`)** | Cookie-cutter, template-heavy aesthetic that looks like a generic boilerplate. | **Asymmetric compositions**: 60/40 splits, bento grids with varying aspect ratios, featured lead projects with stacked secondary items, or rich single-column detail rows. |
| ❌ **Overly centered-everything heroes** | Lacks editorial authority and punch; looks like a generic landing page template. | **Strong alignment & asymmetry**: Left-anchored editorial typography, bold offset metrics, command-center layouts, intentional whitespace. |
| ❌ **0.1-opacity drop shadows on everything** | Blurs edge definition and creates muddy, indistinct floating boxes. | **Subtle hairline borders**: Crisp 1px borders (`border-white/10` or `border-[var(--color-border-hairline)]`), surface contrast layering. **Shadows used only when communicating genuine elevation or active interaction.** |
| ❌ **Purple or indigo gradients on white / dark** | Disconnected, dated SaaS aesthetic. | Strict adherence to **`--color-dominant` (Cyan)** and **`--color-accent` (Emerald)** over neutral obsidian surfaces. |
| ❌ **Generic web fonts (Inter, Roboto, Arial, system-ui)** | Lacks distinct personality and craft. | **Syne / Space Grotesk** for Display, **Geist / Satoshi** for Body, **JetBrains Mono** for Mono. |
| ❌ **Predictable 1.5x type increments** | Visually flat and lacking hierarchy. | **Weight extremes (200 vs 800)** and **~3× size jumps** between display titles and small supporting text. |

---

## 7. Quality & Verification Checklist

Before any component or page change is finalized:
- [ ] Are fonts loaded and using CSS variables (`--font-display`, `--font-body`, `--font-mono`)?
- [ ] Is there extreme weight contrast (200 vs 800) and ~3× size hierarchy on key headings?
- [ ] Are colors restricted to `--color-dominant` and `--color-accent` on a neutral dark palette?
- [ ] Are all purple and indigo gradients, glows, and overlays 100% eliminated?
- [ ] Does spacing follow the 8px rhythm (with 4px for fine adjustments and optical alignment allowed)?
- [ ] Are existing components and shadcn primitives reused via clean import paths?
- [ ] Is the layout free of centered-everything heroes and repetitive 3-card grids?
- [ ] Are drop shadows restrained to purposeful elevation and active states?
