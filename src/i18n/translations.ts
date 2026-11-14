export interface TranslationSchema {
  nav: {
    home: string;
    projects: string;
    about: string;
    certifications: string;
    curriculum: string;
    contact: string;
    skipLink: string;
    logoAria: string;
    linkedInAria: string;
    linkedInText: string;
    menuOpen: string;
    menuClose: string;
    menuAria: string;
  };
  theme: {
    label: string;
    toggleLight: string;
    toggleDark: string;
    currentDark: string;
    currentLight: string;
    darkLabel: string;
    lightLabel: string;
  };
  locale: {
    switchPt: string;
    switchEn: string;
    ptLabel: string;
    enLabel: string;
    language: string;
  };
  hero: {
    exploreProjects: string;
    curriculumPdf: string;
    mobileQr: string;
    linkedIn: string;
    qrModalTitle: string;
    qrModalDesc: string;
    qrModalClose: string;
    qrModalAlt: string;
    qrModalAction: string;
    benchTitle: string;
    benchDomainSelectorAria: string;
    domainDataEng: string;
    domainDataScience: string;
    domainVision: string;
    domainCyberSec: string;
    benchStackLabel: string;
    benchOpenProject: string;
    benchFilterDomain: string;
    benchOpenVault: string;
    benchHermesStatus: string;
    benchHermesStandby: string;
    benchHermesSynced: string;
    benchCyberScopeTitle: string;
    benchCyberScopeDesc: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    tabAll: string;
    tabDataEng: string;
    tabDataScience: string;
    tabVision: string;
    tabCyberSec: string;
    viewMedia: string;
    viewArchitecture: string;
    architectureTopology: string;
    architectureDataScienceFlow: string;
    architectureVisionFlow: string;
    architectureDataEngFlow: string;
    architectureCyberSecFlow: string;
    catCyberSec: string;
    emptyTrackTitle: string;
    emptyTrackDesc: string;
    hardwareLabel: string;
    highlightsLabel: string;
    showMoreHighlights: string;
    showLessHighlights: string;
    btnCode: string;
    btnDemo: string;
    btnDetails: string;
    catDataEng: string;
    catDataScience: string;
    catVision: string;
    featuredTag: string;
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    photoAlt: string;
    photoPlaceholder: string;
    awardsTitle: string;
    galleryTitle: string;
    skillsTitle: string;
  };
  certifications: {
    sectionTitle: string;
    sectionSubtitle: string;
    emptyTitle: string;
    emptyDescription: string;
    viewCredential: string;
    filterAll: string;
    filterBugBountyPentest: string;
    filterSoc: string;
    filterCrypto: string;
    filterCoding: string;
    filterFormal: string;
    badgesTrackHeading: string;
    formalTrackHeading: string;
    hermesBadgeReadyTitle: string;
    hermesBadgeReadyDesc: string;
    syncSourceHermes: string;
    syncSourceManual: string;
    verifyBadge: string;
    emptyFilterMessage: string;
    formalCompactEmpty: string;
    trackBugBounty: string;
    trackSoc: string;
    trackPentest: string;
    trackCrypto: string;
    trackCoding: string;
  };
  curriculum: {
    sectionTitle: string;
    sectionSubtitle: string;
    downloadPdf: string;
    educationTitle: string;
    competenciesTitle: string;
    awardsHeader: string;
    directDownload: string;
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    linkedInLabel: string;
    gitHubLabel: string;
    emailLabel: string;
    instantAccessTitle: string;
    instantAccessDesc: string;
    startChat: string;
    qrAlt: string;
  };
  projectDetail: {
    backToProjects: string;
    viewSource: string;
    liveDemo: string;
    prevImage: string;
    nextImage: string;
    goToImage: string;
  };
  notFound: {
    metaTitle: string;
    metaDescription: string;
    statusCode: string;
    title: string;
    description: string;
    backHome: string;
  };
}

export const ptBR: TranslationSchema = {
  nav: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    certifications: "Badges & Credenciais",
    curriculum: "Currículo",
    contact: "Contato",
    skipLink: "Pular para o conteúdo principal",
    logoAria: "{name} - Início",
    linkedInAria: "Abrir perfil de {name} no LinkedIn",
    linkedInText: "LinkedIn ↗",
    menuOpen: "Abrir menu de navegação",
    menuClose: "Fechar menu de navegação",
    menuAria: "Menu móvel principal",
  },
  theme: {
    label: "Tema",
    toggleLight: "Alternar para tema claro",
    toggleDark: "Alternar para tema escuro",
    currentDark: "Tema escuro ativo",
    currentLight: "Tema claro ativo",
    darkLabel: "Escuro",
    lightLabel: "Claro",
  },
  locale: {
    switchPt: "Mudar idioma para Português (Brasil)",
    switchEn: "Mudar idioma para English (US)",
    ptLabel: "Português (Brasil)",
    enLabel: "English (US)",
    language: "Idioma",
  },
  hero: {
    exploreProjects: "Explorar Projetos",
    curriculumPdf: "Currículo (PDF)",
    mobileQr: "QR Celular",
    linkedIn: "LinkedIn ↗",
    qrModalTitle: "Conectar no Smartphone",
    qrModalDesc: "Aponte a câmera do celular para abrir o portfólio e conectar diretamente com {name}.",
    qrModalClose: "Fechar modal",
    qrModalAlt: "QR Code do Portfólio de {name}",
    qrModalAction: "Abrir LinkedIn",
    benchTitle: "Bancada de Telemetria Operacional",
    benchDomainSelectorAria: "Selecionar domínio técnico na bancada de telemetria",
    domainDataEng: "Eng. Dados",
    domainDataScience: "Ciência de Dados",
    domainVision: "Robótica & CV",
    domainCyberSec: "CyberSec & SOC",
    benchStackLabel: "Stack verificada",
    benchOpenProject: "Inspecionar projeto",
    benchFilterDomain: "Ver projetos da trilha",
    benchOpenVault: "Abrir Vault Cyber & Badges",
    benchHermesStatus: "Protocolo Hermes",
    benchHermesStandby: "Sync pronto (0 badges externos sincronizados)",
    benchHermesSynced: "{count} badge(s) sincronizado(s) via Hermes",
    benchCyberScopeTitle: "Trilha de Cibersegurança, Criptografia & Monitoramento",
    benchCyberScopeDesc: "Arquitetura pronta para projetos de detecção SOC, auditoria de criptografia e badges operacionais de Bug Bounty, Pentest/CTF e LeetCode.",
  },
  projects: {
    sectionTitle: "Projetos em Destaque",
    sectionSubtitle: "Pipelines de dados, modelos preditivos e visão computacional desenvolvidos com foco em performance e arquitetura limpa.",
    tabAll: "Todos",
    tabDataEng: "Engenharia de Dados",
    tabDataScience: "Ciência de Dados & ML",
    tabVision: "Visão Computacional",
    tabCyberSec: "Cibersegurança",
    viewMedia: "Mídia",
    viewArchitecture: "Arquitetura",
    architectureTopology: "Topologia de Pipeline & Nós",
    architectureDataScienceFlow: "EDA & Tratamento → ColumnTransformer → Random Forest → Inferência Contrafactual",
    architectureVisionFlow: "Câmera RGB-D → YOLOv8 → Fusão 3D → MoveIt 2 (OMPL) → Atuadores",
    architectureDataEngFlow: "Ingestão Dados → Grafo Ponderado → Indexador B-Tree O(log n) → Dijkstra Min-Cost",
    architectureCyberSecFlow: "Coleta Telemetria → Parser & Hashes → Motor Cripto / Regras SOC → Alerta & Auditoria",
    catCyberSec: "Cibersegurança & SOC",
    emptyTrackTitle: "Nenhum projeto publicado nesta trilha ainda",
    emptyTrackDesc: "Novos repositórios e estudos de caso desta área serão listados aqui automaticamente via SSOT.",
    hardwareLabel: "HW/Infra:",
    highlightsLabel: "Highlights de Engenharia",
    showMoreHighlights: "Ver mais ({count})",
    showLessHighlights: "Mostrar menos",
    btnCode: "Código",
    btnDemo: "Demo",
    btnDetails: "Detalhes",
    catDataEng: "Engenharia de Dados",
    catDataScience: "Ciência de Dados & ML",
    catVision: "Visão Computacional & Robótica",
    featuredTag: "FEATURED",
  },
  about: {
    sectionTitle: "Sobre & Formação",
    sectionSubtitle: "Graduação na UNEB, iniciação científica em robótica e inteligência computacional.",
    photoAlt: "Foto de {name}",
    photoPlaceholder: "Foto de Perfil",
    awardsTitle: "Conquistas & Reconhecimento",
    galleryTitle: "Registros de Campo & Laboratório",
    skillsTitle: "Competências & Domínios Técnicos",
  },
  certifications: {
    sectionTitle: "Badges Operacionais & Credenciais",
    sectionSubtitle: "Conquistas contínuas em plataformas externas sincronizadas via protocolo Hermes e certificações formais verificáveis.",
    emptyTitle: "Nenhuma certificação listada no momento",
    emptyDescription: "Esta seção está estruturada para reunir certificados e credenciais técnicas.",
    viewCredential: "Verificar credencial",
    filterAll: "Todos",
    filterBugBountyPentest: "Bug Bounty & Pentest",
    filterSoc: "SOC & Monitoramento",
    filterCrypto: "Criptografia",
    filterCoding: "LeetCode & Algoritmos",
    filterFormal: "Certificações Formais",
    badgesTrackHeading: "Badges Operacionais & Telemetria Externa",
    formalTrackHeading: "Certificações Formais",
    hermesBadgeReadyTitle: "Integração Hermes Ativa — Aguardando Primeira Sincronização",
    hermesBadgeReadyDesc: "Trilha operacional estruturada em SSOT para ingerir badges verificáveis sem confundi-los com certificações formais.",
    syncSourceHermes: "Sync: Hermes",
    syncSourceManual: "Sync: Manual",
    verifyBadge: "Verificar conquista",
    emptyFilterMessage: "Nenhum registro publicado nesta categoria ainda.",
    formalCompactEmpty: "Sem certificações formais emitidas listadas no momento.",
    trackBugBounty: "Bug Bounty",
    trackSoc: "SOC / Blue Team",
    trackPentest: "Pentest & CTF",
    trackCrypto: "Criptografia",
    trackCoding: "LeetCode",
  },
  curriculum: {
    sectionTitle: "Currículo & Resumo Técnico",
    sectionSubtitle: "Resumo técnico e acadêmico com disponibilidade imediata para estágio.",
    downloadPdf: "Baixar Currículo (PDF)",
    educationTitle: "Formação & Pesquisa",
    competenciesTitle: "Competências & Reconhecimentos",
    awardsHeader: "Premiações & Reconhecimento",
    directDownload: "Download Direto (PDF A4)",
  },
  contact: {
    sectionTitle: "Vamos Conversar?",
    sectionSubtitle: "Aberto a propostas de estágio em Engenharia de Dados, Ciência de Dados, Visão Computacional ou Nuvem AWS.",
    linkedInLabel: "LinkedIn",
    gitHubLabel: "GitHub",
    emailLabel: "Email Direto",
    instantAccessTitle: "Acesso Instantâneo no Celular",
    instantAccessDesc: "Escaneie para abrir o portfólio e conectar diretamente pelo smartphone.",
    startChat: "Iniciar Conversa no LinkedIn",
    qrAlt: "QR Code do Portfólio de {name}",
  },
  projectDetail: {
    backToProjects: "Voltar aos Projetos",
    viewSource: "Ver Código-Fonte",
    liveDemo: "Demonstração Online",
    prevImage: "Imagem anterior",
    nextImage: "Próxima imagem",
    goToImage: "Ir para a imagem {index}",
  },
  notFound: {
    metaTitle: "404 - Página Não Encontrada",
    metaDescription: "A página solicitada não foi encontrada.",
    statusCode: "404",
    title: "Página Não Encontrada",
    description: "O link que você seguiu pode estar quebrado ou a página foi movida para outra rota.",
    backHome: "Voltar para o Início",
  },
};

export const enUS: TranslationSchema = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    certifications: "Badges & Credentials",
    curriculum: "Resume",
    contact: "Contact",
    skipLink: "Skip to main content",
    logoAria: "{name} - Home",
    linkedInAria: "Open {name}'s LinkedIn profile",
    linkedInText: "LinkedIn ↗",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    menuAria: "Main mobile navigation",
  },
  theme: {
    label: "Theme",
    toggleLight: "Switch to light theme",
    toggleDark: "Switch to dark theme",
    currentDark: "Dark theme active",
    currentLight: "Light theme active",
    darkLabel: "Dark",
    lightLabel: "Light",
  },
  locale: {
    switchPt: "Switch language to Português (Brasil)",
    switchEn: "Switch language to English (US)",
    ptLabel: "Português (Brasil)",
    enLabel: "English (US)",
    language: "Language",
  },
  hero: {
    exploreProjects: "Explore Projects",
    curriculumPdf: "Resume (PDF)",
    mobileQr: "Mobile QR",
    linkedIn: "LinkedIn ↗",
    qrModalTitle: "Connect on Mobile",
    qrModalDesc: "Point your phone camera to open the portfolio and connect directly with {name}.",
    qrModalClose: "Close modal",
    qrModalAlt: "QR Code for {name}'s Portfolio",
    qrModalAction: "Open LinkedIn",
    benchTitle: "Operational Telemetry Bench",
    benchDomainSelectorAria: "Select engineering domain in telemetry bench",
    domainDataEng: "Data Eng",
    domainDataScience: "Data Science",
    domainVision: "Robotics & CV",
    domainCyberSec: "CyberSec & SOC",
    benchStackLabel: "Verified stack",
    benchOpenProject: "Inspect project",
    benchFilterDomain: "Explore track projects",
    benchOpenVault: "Open Cyber & Badges Vault",
    benchHermesStatus: "Hermes Protocol",
    benchHermesStandby: "Sync ready (0 external badges synced)",
    benchHermesSynced: "{count} badge(s) synced via Hermes",
    benchCyberScopeTitle: "Cybersecurity, Cryptography & Monitoring Track",
    benchCyberScopeDesc: "Architecture ready for SOC telemetry projects, cryptography tooling, and operational Bug Bounty, Pentest/CTF, and LeetCode badges.",
  },
  projects: {
    sectionTitle: "Featured Projects",
    sectionSubtitle: "Data pipelines, predictive models, and computer vision built with a rigorous focus on performance and clean architecture.",
    tabAll: "All",
    tabDataEng: "Data Engineering",
    tabDataScience: "Data Science & ML",
    tabVision: "Computer Vision",
    tabCyberSec: "Cybersecurity",
    viewMedia: "Media",
    viewArchitecture: "Architecture",
    architectureTopology: "Pipeline & Node Topology",
    architectureDataScienceFlow: "EDA & Preprocessing → ColumnTransformer → Random Forest → Counterfactual Inference",
    architectureVisionFlow: "RGB-D Camera → YOLOv8 → 3D Fusion → MoveIt 2 (OMPL) → Actuators",
    architectureDataEngFlow: "Data Ingestion → Weighted Graph → B-Tree Indexer O(log n) → Dijkstra Min-Cost",
    architectureCyberSecFlow: "Telemetry Capture → Parser & Hashes → Crypto / SOC Rules Engine → Audit & Alert",
    catCyberSec: "Cybersecurity & SOC",
    emptyTrackTitle: "No projects published in this track yet",
    emptyTrackDesc: "New repositories and case studies in this track will appear here automatically from SSOT.",
    hardwareLabel: "HW/Infra:",
    highlightsLabel: "Engineering Highlights",
    showMoreHighlights: "Show more ({count})",
    showLessHighlights: "Show less",
    btnCode: "Code",
    btnDemo: "Demo",
    btnDetails: "Details",
    catDataEng: "Data Engineering",
    catDataScience: "Data Science & ML",
    catVision: "Computer Vision & Robotics",
    featuredTag: "FEATURED",
  },
  about: {
    sectionTitle: "About & Education",
    sectionSubtitle: "Undergraduate degree at UNEB, scientific research in robotics and computational intelligence.",
    photoAlt: "Photo of {name}",
    photoPlaceholder: "Profile Photo",
    awardsTitle: "Achievements & Recognition",
    galleryTitle: "Field & Laboratory Logs",
    skillsTitle: "Core Competencies & Technical Domains",
  },
  certifications: {
    sectionTitle: "Operational Badges & Credentials",
    sectionSubtitle: "Continuous operational achievements synced via Hermes protocol alongside verified formal credentials.",
    emptyTitle: "No certifications listed yet",
    emptyDescription: "This section is structured to showcase technical certificates and verified credentials.",
    viewCredential: "Verify credential",
    filterAll: "All",
    filterBugBountyPentest: "Bug Bounty & Pentest",
    filterSoc: "SOC & Monitoring",
    filterCrypto: "Cryptography",
    filterCoding: "LeetCode & Algorithms",
    filterFormal: "Formal Certifications",
    badgesTrackHeading: "Operational Badges & External Telemetry",
    formalTrackHeading: "Formal Certifications",
    hermesBadgeReadyTitle: "Hermes Sync Armed — Awaiting First Ingestion",
    hermesBadgeReadyDesc: "Operational SSOT pipeline ready to ingest verifiable platform badges without conflating them with formal certifications.",
    syncSourceHermes: "Sync: Hermes",
    syncSourceManual: "Sync: Manual",
    verifyBadge: "Verify achievement",
    emptyFilterMessage: "No entries published in this category yet.",
    formalCompactEmpty: "No formal certificates listed at this time.",
    trackBugBounty: "Bug Bounty",
    trackSoc: "SOC / Blue Team",
    trackPentest: "Pentest & CTF",
    trackCrypto: "Cryptography",
    trackCoding: "LeetCode",
  },
  curriculum: {
    sectionTitle: "Resume & Technical Summary",
    sectionSubtitle: "Technical and academic profile with immediate availability for internship.",
    downloadPdf: "Download Resume (PDF)",
    educationTitle: "Education & Research",
    competenciesTitle: "Competencies & Distinctions",
    awardsHeader: "Awards & Recognition",
    directDownload: "Direct Download (PDF A4)",
  },
  contact: {
    sectionTitle: "Let's Connect",
    sectionSubtitle: "Open to internship opportunities in Data Engineering, Data Science, Computer Vision, or AWS Cloud.",
    linkedInLabel: "LinkedIn",
    gitHubLabel: "GitHub",
    emailLabel: "Direct Email",
    instantAccessTitle: "Instant Mobile Access",
    instantAccessDesc: "Scan to open the portfolio and connect directly from your smartphone.",
    startChat: "Start Chat on LinkedIn",
    qrAlt: "QR Code for {name}'s Portfolio",
  },
  projectDetail: {
    backToProjects: "Back to Projects",
    viewSource: "View Source Code",
    liveDemo: "Live Demo",
    prevImage: "Previous image",
    nextImage: "Next image",
    goToImage: "Go to image {index}",
  },
  notFound: {
    metaTitle: "404 - Page Not Found",
    metaDescription: "The requested page was not found.",
    statusCode: "404",
    title: "Page Not Found",
    description: "The link you followed may be broken or the page has been moved to another route.",
    backHome: "Back to Home",
  },
};

export const dictionaries = {
  'pt-BR': ptBR,
  'en-US': enUS,
} as const;

/**
 * Interpolates values into a string with {key} placeholders.
 */
export function formatString(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (key in values) {
      return String(values[key]);
    }
    return match;
  });
}

/**
 * Returns formatted number according to the locale.
 */
export function formatNumber(value: number, locale: 'pt-BR' | 'en-US', options?: Intl.NumberFormatOptions): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Returns formatted date according to the locale.
 */
export function formatDate(date: Date | string | number, locale: 'pt-BR' | 'en-US', options?: Intl.DateTimeFormatOptions): string {
  try {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return String(date);
  }
}
