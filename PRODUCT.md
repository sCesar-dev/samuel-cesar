# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Audience**: Technical recruiters, Engineering Managers, Data/ML/Security Tech Leads, SOC/AppSec Engineers, and Academic Research Coordinators evaluating candidates for internships, junior engineering roles, and R&D fellowships.
- **Usage Situation**: Scanning the portfolio on desktop (`1440px`) or mobile (`390px`, often via QR code at academic/tech events) to verify real systems engineering depth across Data Engineering, Machine Learning, Cybersecurity (Cryptography & SOC/Monitoring), and Robotics/Computer Vision within 30–90 seconds, inspect operational badges (Bug Bounty, Pentest/SOC labs, LeetCode), download the CV PDF, or inspect source code and live demos.

## Product Purpose

Personal engineering portfolio and technical showcase for **Samuel Cesar (`sCesar.dev`)**, Information Systems undergraduate at UNEB and undergraduate researcher at **ACSO / DEFENSE**. It converts visitors into interview/networking contacts by proving hands-on execution across cloud data lakehouses, predictive ML pipelines, cybersecurity/cryptography & observability, and autonomous robotics (`ROS 2` / `YOLOv8`).

## Positioning

Unlike single-track student portfolios that show generic CRUD clones, `sCesar.dev` demonstrates the operational intersection of **four hard-engineering domains**:
1. **Cloud & Lakehouse Data Engineering**: Distributed ETL/ELT pipelines (`Apache Spark`, `Apache Airflow`, `DBT`, `Snowflake`, `MinIO`, `AWS`, `Terraform`, `Docker`) processing 1M+ financial/transactional records.
2. **Data Science & Machine Learning**: End-to-end predictive modeling (`Scikit-Learn`, `XGBoost`, `LightGBM`, `Pandas`) with verifiable metrics (`R² > 0.85`).
3. **Robotics & Computer Vision**: Real-time embedded perception and autonomous navigation (`ROS 2`, `YOLOv8`, `OpenCV`, `SLAM`, `NVIDIA Jetson Nano` at `30+ FPS`), backed by **1st Place at the UFBA Innovation Hackathon** and **RoboCup Brazil (FBot / @Home)** competition research.
4. **Cybersecurity, Cryptography & SOC Monitoring**: Applied cryptography implementations, network/system security monitoring, SIEM/SOC telemetry pipelines, and offensive/defensive security practice validated through verifiable **Bug Bounty, SOC/Pentest (TryHackMe, HackTheBox, LetsDefend), and Algorithmic (LeetCode) Badges**.

## Operating Context

- **Dual Usage Scene**:
  1. **Remote Technical Review**: Recruiters and engineers inspecting project architecture topologies, GitHub repositories, case-study markdown articles (`/projects/[slug]`), operational badges, and downloading `Curriculo_Samuel_Cesar.pdf`.
  2. **In-Person Event & Lab Networking**: Instant mobile access via the integrated LinkedIn QR Code modal and terminal during hackathons, security conferences, symposiums, and RoboCup competitions.
- **Machine/Agent Readability & Autonomous Ingestion ("AI Mind" SSOT + Hermes Ready)**:
  - Automatically exposes structured portfolio data at `/profile.json` and `/llms.txt` built from `/data/*.yaml`.
  - Structured to allow autonomous external agents (such as **Hermes**) to detect new achievements/badges from external platforms (Bug Bounty, TryHackMe, HackTheBox, LeetCode, GitHub) and upsert them deterministically into `/data/badges.yaml` (and `/data/projects.yaml`) without touching UI component code.

## Capabilities and Constraints

- **Stack**: Astro `5.17.1` (Static SSG), React `19.2.4` interactive islands, Tailwind CSS `4.1.18` (`@tailwindcss/vite`), Framer Motion, Lucide React, and Zod `3.25.76` schema validation.
- **Single Source of Truth (SSOT)**: All domain content (profile, education, experience, projects, skills, certifications, achievements) lives exclusively in `/data/*.yaml` and `src/content/projects/*.md`. UI chrome strings live in `src/i18n/translations.ts`.
- **Bilingual Parity**: Full client-side instant switching between `pt-BR` and `en-US` with URL (`?lang=`), `localStorage`, and `navigator.languages` detection.
- **Dual-Adaptive Theme**: Dark-first (`#09090b`) and WCAG 2.2 AA Light-adaptive (`#f8fafc`) themes resolved synchronously before first paint.
- **Uniqueness Preservation Constraint**: Components classified as **Tier S (`U-Score >= 85/100`)** in `design-system/samuel-cesar-portfolio/MASTER.md` are locked against structural or functional regression during any visual rebranding.

## Brand Commitments

- **Brand Identifier**: `sCesar.dev` (`Samuel Cesar`).
- **Voice**: Technical, precise, evidence-driven, and unpretentious—stating real architectures, hardware constraints, and quantitative metrics without marketing fluff or invented claims.
- **Color Commitment**: Dual semantic accent polarity on an obsidian zinc / slate canvas:
  - **Telemetry Cyan (`#00f0ff` dark / `#0369a1` light)** for Data Engineering, Computer Vision/Robotics, and primary interactive actions.
  - **Electric Indigo (`#818cf8` dark / `#4338ca` light)** for Data Science/ML, academic distinctions, and secondary telemetry accents.
- **Typography Commitment**: `Cabinet Grotesk` (Display) + `Satoshi` (Body/UI) + `Fragment Mono` (Code, stack tokens, and quantitative metrics).

## Evidence on Hand

- **Real Photography & Video**: `public/images/profile.jpg`, `public/images/personal-image.jpg`, `public/images/robocup-image.jpg`, `public/images/veterinary_clinic_img2.png`, `public/images/qrcode-linkedin.png`, and project demonstration videos/diagrams referenced in `data/projects.yaml`.
- **Real Documents**: `public/docs/Curriculo_Samuel_Cesar.pdf`.
- **Honest Absences**: `data/certifications.yaml` currently contains `items: []`; never fabricate certificates, testimonials, client logos, or unverified metrics.

## Product Principles

1. **Artifact Before Ornament**: Show the real system—its video feed, its architecture topology, its hardware target, and its measured throughput—before decorative chrome.
2. **Single Source of Truth**: Domain facts are authored once in `/data/*.yaml` and projected deterministically to HTML, `/profile.json`, and `/llms.txt`.
3. **Zero-Hack Dual Polarity**: Every surface must maintain high contrast and visual intentionality in both Dark (`#09090b`) and Light (`#f8fafc`) modes solely through semantic tokens.
4. **Preserve Proven Uniqueness**: Never flatten custom interactive mechanisms (such as the Media/Architecture card toggle or the SSOT data pipeline) into generic template blocks.

## Accessibility & Inclusion

- **Target Standard**: WCAG 2.2 AA minimum across both themes (approaching AAA `19.01:1` on primary dark surfaces).
- **Motor & Keyboard**: Minimum `24×24px` (`36px–44px` enforced on controls) touch targets, visible `:focus-visible` rings, skip-to-content link, and full keyboard focus traps with trigger restoration on all modals and drawers.
- **Motion Sensitivity**: Full `@media (prefers-reduced-motion: reduce)` support preserving layout and content visibility without blank scroll bands.
