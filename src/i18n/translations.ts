export interface TranslationSchema {
  nav: {
    home: string;
    projects: string;
    about: string;
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
    badge: string;
    greeting: string;
    role: string;
    pitch: string;
    exploreProjects: string;
    curriculumPdf: string;
    mobileQr: string;
    linkedIn: string;
    telemetryTitle: string;
    telemetryStatus: string;
    dataEngTitle: string;
    dataEngPipeline: string;
    dataEngStack: string;
    dataEngSub: string;
    dataScienceTitle: string;
    dataScienceBadge: string;
    dataScienceStack: string;
    dataScienceSub: string;
    visionTitle: string;
    visionBadge: string;
    visionStack: string;
    visionSub: string;
    cloudTitle: string;
    cloudBadge: string;
    cloudStack: string;
    cloudSub: string;
    bottomStack: string;
    bottomStatus: string;
    qrModalTitle: string;
    qrModalDesc: string;
    qrModalClose: string;
    qrModalAlt: string;
    qrModalAction: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    tabAll: string;
    tabDataEng: string;
    tabDataScience: string;
    tabVision: string;
    viewMedia: string;
    viewArchitecture: string;
    architectureTopology: string;
    architectureDataScienceFlow: string;
    architectureVisionFlow: string;
    architectureDataEngFlow: string;
    hardwareLabel: string;
    highlightsLabel: string;
    btnCode: string;
    btnDemo: string;
    btnDetails: string;
    catDataEng: string;
    catDataScience: string;
    catVision: string;
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    objectiveTitle: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    photoAlt: string;
    photoPlaceholder: string;
    awardsTitle: string;
    award1Badge: string;
    award1Winner: string;
    award1Title: string;
    award1Desc: string;
    award2Badge: string;
    award2Title: string;
    award2Desc: string;
    award3Badge: string;
    award3Title: string;
    award3Desc: string;
    galleryTitle: string;
    galleryPhoto1Title: string;
    galleryPhoto1Desc: string;
    galleryPhoto1Alt: string;
    galleryPhoto2Title: string;
    galleryPhoto2Desc: string;
    galleryPhoto2Alt: string;
    galleryPhoto3Title: string;
    galleryPhoto3Desc: string;
    galleryPhoto3Alt: string;
    skillsTitle: string;
    skillsCol1: string;
    skillsCol2: string;
    skillsCol3: string;
  };
  curriculum: {
    sectionTitle: string;
    sectionSubtitle: string;
    downloadPdf: string;
    educationTitle: string;
    degreeStatus: string;
    degreeName: string;
    degreeSchool: string;
    researchStatus: string;
    researchLab: string;
    researchFocus: string;
    location: string;
    availability: string;
    competenciesTitle: string;
    compDataEngTitle: string;
    compDataEngDesc: string;
    compDataScienceTitle: string;
    compDataScienceDesc: string;
    compVisionTitle: string;
    compVisionDesc: string;
    compCloudTitle: string;
    compCloudDesc: string;
    awardsHeader: string;
    awardHackathonTitle: string;
    awardHackathonDesc: string;
    awardCbrTitle: string;
    awardCbrDesc: string;
    officialDoc: string;
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
  footer: {
    bioNotice: string;
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
  meta: {
    defaultTitle: string;
    defaultDescription: string;
  };
  projectItems: {
    biopoints: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    ecovision: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    robocupbillrobot: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    airflow: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    processlinuxmonitor: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    petcaresystem: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
    virtualstore: {
      title: string;
      description: string;
      oneLinerImpact: string;
      categoryLabel: string;
      technicalHighlights: string[];
    };
  };
}

export const ptBR: TranslationSchema = {
  nav: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    curriculum: "Currículo",
    contact: "Contato",
    skipLink: "Pular para o conteúdo principal",
    logoAria: "Samuel Cesar - Início",
    linkedInAria: "Abrir perfil de Samuel Cesar no LinkedIn",
    linkedInText: "LinkedIn ↗",
    menuOpen: "Abrir menu de navegação",
    menuClose: "Fechar menu de navegação",
    menuAria: "Menu móvel principal",
  },
  theme: {
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
    badge: "Disponível para Estágio • Engenharia & Ciência de Dados",
    greeting: "Samuel Cesar,",
    role: "Software Developer",
    pitch: "Graduando em Sistemas de Informação (UNEB) e bolsista IC ACSO/DEFENSE. 1º lugar no Hackathon UFBA com Python e AWS.",
    exploreProjects: "Explorar Projetos",
    curriculumPdf: "Currículo (PDF)",
    mobileQr: "QR Celular",
    linkedIn: "LinkedIn ↗",
    telemetryTitle: "Telemetry Console",
    telemetryStatus: "ONLINE",
    dataEngTitle: "Engenharia de Dados",
    dataEngPipeline: "O(log n) Pipelines",
    dataEngStack: "Python & SQL",
    dataEngSub: "B-Trees, Grafos & Telemetria",
    dataScienceTitle: "Ciência de Dados & ML",
    dataScienceBadge: "1º Lugar UFBA",
    dataScienceStack: "Scikit-Learn & Modelagem Preditiva",
    dataScienceSub: "Random Forest & Engenharia de Features",
    visionTitle: "Visão Computacional",
    visionBadge: "ACSO / BahiaRT",
    visionStack: "YOLOv8 & Rekognition",
    visionSub: "ROS 2, OMPL & Robô Bill (RoboCup)",
    cloudTitle: "Nuvem AWS",
    cloudBadge: "Serverless IaC",
    cloudStack: "Lambda & S3 Storage",
    cloudSub: "SAM CLI, CloudWatch & EventBridge",
    bottomStack: "Stack: Python • SQL • AWS",
    bottomStatus: "Status: Produção",
    qrModalTitle: "Conectar no Smartphone",
    qrModalDesc: "Aponte a câmera do celular para abrir o portfólio e conectar diretamente com Samuel Cesar.",
    qrModalClose: "Fechar modal",
    qrModalAlt: "QR Code do Portfólio de Samuel Cesar",
    qrModalAction: "Abrir LinkedIn",
  },
  projects: {
    sectionTitle: "Projetos em Destaque",
    sectionSubtitle: "Pipelines de dados, modelos preditivos e visão computacional desenvolvidos com foco em performance e arquitetura limpa.",
    tabAll: "Todos",
    tabDataEng: "Engenharia de Dados",
    tabDataScience: "Ciência de Dados & ML",
    tabVision: "Visão Computacional",
    viewMedia: "Mídia",
    viewArchitecture: "Arquitetura",
    architectureTopology: "Topologia de Pipeline & Nós",
    architectureDataScienceFlow: "EDA & Tratamento ➔ ColumnTransformer ➔ Random Forest ➔ Inferência Contrafactual",
    architectureVisionFlow: "Câmera RGB-D ➔ YOLOv8 ➔ Fusão 3D ➔ MoveIt 2 (OMPL) ➔ Atuadores",
    architectureDataEngFlow: "Ingestão Dados ➔ Grafo Ponderado ➔ Indexador B-Tree O(log n) ➔ Dijkstra Min-Cost",
    hardwareLabel: "HW/Infra:",
    highlightsLabel: "Highlights de Engenharia:",
    btnCode: "Código",
    btnDemo: "Demo",
    btnDetails: "Detalhes",
    catDataEng: "Engenharia de Dados",
    catDataScience: "Ciência de Dados & ML",
    catVision: "Visão Computacional & Robótica",
  },
  about: {
    sectionTitle: "Sobre & Formação",
    sectionSubtitle: "Graduação na UNEB, iniciação científica em robótica e inteligência computacional.",
    objectiveTitle: "Objetivo: Oportunidade de Estágio",
    bioP1: "Graduando em Sistemas de Informação pela Universidade do Estado da Bahia (UNEB), busco oportunidade de estágio em Engenharia de Dados, Ciência de Dados ou Visão Computacional.",
    bioP2: "Construo pipelines de dados, modelos preditivos em Python (Scikit-Learn, Random Forest, Pandas), arquiteturas serverless na nuvem com AWS (Lambda, S3, SAM CLI) e estruturas de indexação de alto desempenho (B-Trees e Grafos).",
    bioP3: "Conquistei o 1º Lugar no Hackathon LIAO / UFBA 2026 desenvolvendo a inteligência de previsão e fidelidade do projeto BioPoints. Como bolsista de iniciação científica no ACSO (UNEB), atuei durante 2 anos com robótica para robôs de serviço com ROS 2, YOLOv8 e Python e atualmente integro o ACSO DEFENSE, atuando em soluções para busca e reconhecimento utilizando drones autônomos.",
    photoAlt: "Foto de Samuel Cesar",
    photoPlaceholder: "Foto de Perfil",
    awardsTitle: "Conquistas & Reconhecimento",
    award1Badge: "1º Lugar: Premiação Hackathon",
    award1Winner: "Vencedor",
    award1Title: "Hackathon LIAO / UFBA 2026",
    award1Desc: "Desenvolvimento da inteligência preditiva do BioPoints na trilha de Inteligência Artificial, Cidades Inteligentes & Mudanças Climáticas, utilizando Random Forest e simulação contrafactual.",
    award2Badge: "Iniciação Científica",
    award2Title: "ACSO & BahiaRT (UNEB)",
    award2Desc: "Pesquisa acadêmica e desenvolvimento de visão e manipulação para o Robô Bill na competição universitária RoboCup@Home.",
    award3Badge: "Competição Nacional",
    award3Title: "CBR 2024 - Goiânia",
    award3Desc: "Atuação na Competição Brasileira de Robótica universitária com validação experimental de sistemas autônomos.",
    galleryTitle: "Registros de Campo & Laboratório",
    galleryPhoto1Title: "RoboCup 2025 - Salvador",
    galleryPhoto1Desc: "Pesquisa e integração de visão computacional e controle para o Robô Bill no ACSO / BahiaRT (UNEB).",
    galleryPhoto1Alt: "RoboCup Salvador 2025, Brasil",
    galleryPhoto2Title: "CBR 2024 - Goiânia",
    galleryPhoto2Desc: "Validação experimental de sistemas autônomos na Competição Brasileira de Robótica.",
    galleryPhoto2Alt: "CBR 2024 - Goiânia - Samuel Cesar",
    galleryPhoto3Title: "Preparação Competitiva",
    galleryPhoto3Desc: "Calibração de sensores e testes de nós de controle no laboratório universitário.",
    galleryPhoto3Alt: "CBR 2025 & RoboCup 25 - Samuel Cesar",
    skillsTitle: "Competências & Domínios Técnicos",
    skillsCol1: "Engenharia de Dados & Nuvem",
    skillsCol2: "Ciência de Dados & ML",
    skillsCol3: "Visão Computacional & Robótica",
  },
  curriculum: {
    sectionTitle: "Currículo & Resumo Técnico",
    sectionSubtitle: "Resumo técnico e acadêmico com disponibilidade imediata para estágio.",
    downloadPdf: "Baixar Currículo (PDF)",
    educationTitle: "Formação & Pesquisa",
    degreeStatus: "Graduação em Andamento",
    degreeName: "Sistemas de Informação",
    degreeSchool: "Universidade do Estado da Bahia (UNEB) • Salvador, BA",
    researchStatus: "Iniciação Científica",
    researchLab: "Laboratório ACSO / BahiaRT",
    researchFocus: "Robótica Autônoma de Serviço (RoboCup@Home & CBR)",
    location: "Salvador, BA (Presencial / Remoto)",
    availability: "Disponível para Estágio",
    competenciesTitle: "Competências & Reconhecimentos",
    compDataEngTitle: "Eng. de Dados & Backend",
    compDataEngDesc: "Python, SQL/PostgreSQL, indexação B-Tree O(log n), grafos e arquitetura orientada a dados.",
    compDataScienceTitle: "Ciência de Dados & ML",
    compDataScienceDesc: "Scikit-Learn, Random Forest, EDA, tratamento de features e modelagem preditiva aplicada.",
    compVisionTitle: "Visão Computacional & Robótica",
    compVisionDesc: "YOLOv8, Amazon Rekognition, ROS 2, C++ moderno e fusão sensorial de dados 3D.",
    compCloudTitle: "Nuvem AWS & DevOps",
    compCloudDesc: "Lambda serverless, S3, SAM CLI (IaC), CloudWatch, Docker e ambientes Linux.",
    awardsHeader: "Premiações & Reconhecimento:",
    awardHackathonTitle: "1º Lugar: Hackathon UFBA 2026",
    awardHackathonDesc: "BioPoints: Modelagem Preditiva de Fidelidade",
    awardCbrTitle: "Competidor: CBR 2024 / 2025",
    awardCbrDesc: "Equipe BahiaRT / ACSO (RoboCup@Home)",
    officialDoc: "Documento oficial atualizado em 2026",
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
    qrAlt: "QR Code do Portfólio de Samuel Cesar",
  },
  footer: {
    bioNotice: "Samuel Cesar • UNEB (Sistemas de Informação) • Salvador, BA",
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
    metaTitle: "404 - Página Não Encontrada | Samuel Cesar",
    metaDescription: "A página solicitada não foi encontrada.",
    statusCode: "404",
    title: "Página Não Encontrada",
    description: "O link que você seguiu pode estar quebrado ou a página foi movida para outra rota.",
    backHome: "Voltar para o Início",
  },
  meta: {
    defaultTitle: "Samuel Cesar, Software Developer",
    defaultDescription: "Portfólio de Samuel Cesar. Graduando em Sistemas de Informação (UNEB) em busca de estágio. Projetos em Engenharia de Dados, Ciência de Dados (Machine Learning), Visão Computacional e Nuvem AWS.",
  },
  projectItems: {
    biopoints: {
      title: "BioPoints - Inteligência Preditiva de CO₂ & Fidelidade Sustentável",
      description: "Plataforma premiada com 1º Lugar no Hackathon UFBA que calcula emissões evitadas de CO₂ via Random Forest e converte em pontos de fidelidade em tempo real.",
      oneLinerImpact: "Modelo preditivo de Machine Learning (R² = 0.9964, MAE = 1.90 g/km) integrado a API NestJS para cálculo em tempo real de emissões evitadas de CO₂.",
      categoryLabel: "Ciência de Dados & Machine Learning",
      technicalHighlights: [
        "Construção de modelo preditivo contrafactual de emissão fóssil de referência com R² de 0.9964 e MAE de 1.9035 g/km sobre 7.385 amostras.",
        "Isolamento estrito de pré-processamento via Pipeline e ColumnTransformer, blindando contra Data Leakage e tolerando categorias desconhecidas.",
        "Integração de inferência em tempo real entre NestJS e runtime Python via child_process.spawn por streaming stdin/stdout (~150ms).",
        "1º Lugar na Trilha de IA, Cidades Inteligentes e Mudanças Climáticas no Hackathon da Liga de IA da UFBA (LIAO)."
      ]
    },
    ecovision: {
      title: "EcoVision - Triagem Serverless de Resíduos com Classificação de Incerteza",
      description: "Pipeline serverless na AWS para triagem de recicláveis com Amazon Rekognition e motor de classificação explícita de incerteza de materiais.",
      oneLinerImpact: "Arquitetura serverless orientada a eventos no AWS Free Tier, com modelagem de incerteza de materiais e 85% de cobertura de testes.",
      categoryLabel: "Visão Computacional & Nuvem AWS",
      technicalHighlights: [
        "Arquitetura orientada a eventos S3 -> Lambda -> Rekognition com tempo de execução enxuto (~800ms/imagem) e custo zero no AWS Free Tier.",
        "Motor desacoplado de regras determinísticas modelando incerteza em 3 estados (inferred, ambiguous, unverified) para evitar contaminação em triagem.",
        "Defesa em profundidade contra loops recursivos de eventos S3 e 85% de cobertura de testes in-memory com Moto sem custos de nuvem."
      ]
    },
    robocupbillrobot: {
      title: "RoboCup@Home - Percepção Autônoma e Manipulação (Robô Bill)",
      description: "Pipeline de visão 3D e manipulação autônoma para o Robô Bill na RoboCup@Home e CBR, integrando ROS 2, C++ e YOLOv8.",
      oneLinerImpact: "Percepção 3D e manipulação robótica com inferência em tempo real (<25ms) e 94% de acurácia em ambientes não estruturados.",
      categoryLabel: "Robótica & Visão Computacional",
      technicalHighlights: [
        "Otimização de inferência YOLOv8 via quantização e aceleração de nós ROS 2 para processamento contínuo em 30+ FPS.",
        "Integração de nuvem de pontos 3D (Point Cloud) com cinemática inversa no MoveIt 2 para grasp de objetos do cotidiano.",
        "Pesquisa acadêmica e integração técnica na equipe de manipulação do laboratório ACSO / BahiaRT (RoboCup@Home)."
      ]
    },
    airflow: {
      title: "AirFlow - Motor de Otimização Logística & Indexação de Rotas",
      description: "Sistema de roteamento e indexação de malha aérea com algoritmo de Dijkstra em grafos e Árvore-B para consultas O(log n).",
      oneLinerImpact: "Roteamento de menor custo com algoritmo de Dijkstra em grafos e busca cadastral O(log n) via Árvore-B em memória.",
      categoryLabel: "Engenharia de Dados & Algoritmos",
      technicalHighlights: [
        "Indexador customizado de Árvores-B eliminando overhead de varreduras lineares (O(n) -> O(log n)) em bases cadastrais.",
        "Modelagem da malha aérea em grafos direcionados ponderados com Dijkstra para cálculo ótimo de conexões e milhas.",
        "Pipeline de geocodificação e projeção dinâmica de trajetórias no navegador com Folium e Geopy."
      ]
    },
    processlinuxmonitor: {
      title: "Process Linux Monitor - Telemetria de Baixo Nível",
      description: "Monitor de processos e telemetria interagindo diretamente com chamadas de sistema (syscalls) e interface /proc do kernel Linux.",
      oneLinerImpact: "Coleta de telemetria e controle de processos via interface /proc do kernel Linux com overhead mínimo de CPU.",
      categoryLabel: "Sistemas & Telemetria",
      technicalHighlights: [
        "Extração e parse direto de métricas de telemetria do subsistema virtual /proc com overhead < 0.1%.",
        "Manipulação segura de ponteiros, alocação dinâmica e sinais de controle de processo (POSIX signals).",
        "Monitoramento em tempo real de estados de execução, PID, threads, tempo de CPU e pegada de memória RAM."
      ]
    },
    petcaresystem: {
      title: "PetCare System",
      description: "Aplicação desktop em Java e Swing para gestão de clínicas veterinárias, prontuários clínicos e controle de vacinas.",
      oneLinerImpact: "Sistema desktop em Java Swing com arquitetura orientada a objetos (POO), prontuário veterinário e cobrança automática.",
      categoryLabel: "Aplicações Desktop & Java",
      technicalHighlights: [
        "Gerenciamento estruturado de prontuários médicos com histórico completo de diagnósticos e tratamentos.",
        "Cartão de vacina inteligente com monitoramento de doses e cálculo automatizado de retornos.",
        "Interface fluida com Java Swing e gerenciador CardLayout em janela única."
      ]
    },
    virtualstore: {
      title: "Virtual Music Store",
      description: "Sistema e-commerce full stack integrando API REST em Spring Boot com frontend Angular.",
      oneLinerImpact: "E-commerce full stack completo integrando Spring Boot 3, banco em memória H2 e interface SPA em Angular.",
      categoryLabel: "Full Stack & Web",
      technicalHighlights: [
        "Catálogo musical completo com filtros dinâmicos por gênero e busca em tempo real.",
        "Carrinho de compras inteligente com persistência e totalização instantânea por usuário.",
        "Painel administrativo com controle CRUD abrangente e regras de integridade relacional."
      ]
    }
  }
};

export const enUS: TranslationSchema = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    curriculum: "Resume",
    contact: "Contact",
    skipLink: "Skip to main content",
    logoAria: "Samuel Cesar - Home",
    linkedInAria: "Open Samuel Cesar's LinkedIn profile",
    linkedInText: "LinkedIn ↗",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    menuAria: "Main mobile navigation",
  },
  theme: {
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
    badge: "Available for Internship • Data Engineering & Data Science",
    greeting: "Samuel Cesar,",
    role: "Software Developer",
    pitch: "Information Systems undergraduate (UNEB) and ACSO/DEFENSE undergraduate research fellow. 1st Place at UFBA Hackathon with Python and AWS.",
    exploreProjects: "Explore Projects",
    curriculumPdf: "Resume (PDF)",
    mobileQr: "Mobile QR",
    linkedIn: "LinkedIn ↗",
    telemetryTitle: "Telemetry Console",
    telemetryStatus: "ONLINE",
    dataEngTitle: "Data Engineering",
    dataEngPipeline: "O(log n) Pipelines",
    dataEngStack: "Python & SQL",
    dataEngSub: "B-Trees, Graphs & Telemetry",
    dataScienceTitle: "Data Science & ML",
    dataScienceBadge: "1st Place UFBA",
    dataScienceStack: "Scikit-Learn & Predictive Modeling",
    dataScienceSub: "Random Forest & Feature Engineering",
    visionTitle: "Computer Vision",
    visionBadge: "ACSO / BahiaRT",
    visionStack: "YOLOv8 & Rekognition",
    visionSub: "ROS 2, OMPL & Bill Robot (RoboCup)",
    cloudTitle: "AWS Cloud",
    cloudBadge: "Serverless IaC",
    cloudStack: "Lambda & S3 Storage",
    cloudSub: "SAM CLI, CloudWatch & EventBridge",
    bottomStack: "Stack: Python • SQL • AWS",
    bottomStatus: "Status: Production",
    qrModalTitle: "Connect on Mobile",
    qrModalDesc: "Point your phone camera to open the portfolio and connect directly with Samuel Cesar.",
    qrModalClose: "Close modal",
    qrModalAlt: "QR Code for Samuel Cesar's Portfolio",
    qrModalAction: "Open LinkedIn",
  },
  projects: {
    sectionTitle: "Featured Projects",
    sectionSubtitle: "Data pipelines, predictive models, and computer vision built with a rigorous focus on performance and clean architecture.",
    tabAll: "All",
    tabDataEng: "Data Engineering",
    tabDataScience: "Data Science & ML",
    tabVision: "Computer Vision",
    viewMedia: "Media",
    viewArchitecture: "Architecture",
    architectureTopology: "Pipeline & Node Topology",
    architectureDataScienceFlow: "EDA & Preprocessing ➔ ColumnTransformer ➔ Random Forest ➔ Counterfactual Inference",
    architectureVisionFlow: "RGB-D Camera ➔ YOLOv8 ➔ 3D Fusion ➔ MoveIt 2 (OMPL) ➔ Actuators",
    architectureDataEngFlow: "Data Ingestion ➔ Weighted Graph ➔ B-Tree Indexer O(log n) ➔ Dijkstra Min-Cost",
    hardwareLabel: "HW/Infra:",
    highlightsLabel: "Engineering Highlights:",
    btnCode: "Code",
    btnDemo: "Demo",
    btnDetails: "Details",
    catDataEng: "Data Engineering",
    catDataScience: "Data Science & ML",
    catVision: "Computer Vision & Robotics",
  },
  about: {
    sectionTitle: "About & Education",
    sectionSubtitle: "Undergraduate degree at UNEB, scientific research in robotics and computational intelligence.",
    objectiveTitle: "Objective: Internship Opportunity",
    bioP1: "Information Systems undergraduate at Bahia State University (UNEB), seeking an internship opportunity in Data Engineering, Data Science, or Computer Vision.",
    bioP2: "I engineer data pipelines, predictive models in Python (Scikit-Learn, Random Forest, Pandas), serverless cloud architectures with AWS (Lambda, S3, SAM CLI), and high-performance indexing data structures (B-Trees and Graphs).",
    bioP3: "Awarded 1st Place at the LIAO / UFBA 2026 Hackathon developing the predictive emission and loyalty engine for BioPoints. As an undergraduate scientific researcher at ACSO (UNEB), I worked for 2 years on service robotics with ROS 2, YOLOv8, and Python, and currently participate in ACSO DEFENSE, developing search and reconnaissance solutions with autonomous drones.",
    photoAlt: "Photo of Samuel Cesar",
    photoPlaceholder: "Profile Photo",
    awardsTitle: "Achievements & Recognition",
    award1Badge: "1st Place: Hackathon Award",
    award1Winner: "Winner",
    award1Title: "Hackathon LIAO / UFBA 2026",
    award1Desc: "Development of the predictive machine learning engine for BioPoints in the AI, Smart Cities & Climate Change track, utilizing Random Forest and counterfactual simulation.",
    award2Badge: "Scientific Research",
    award2Title: "ACSO & BahiaRT (UNEB)",
    award2Desc: "Academic research and vision/manipulation system integration for Bill Robot in the collegiate RoboCup@Home competition.",
    award3Badge: "National Competition",
    award3Title: "CBR 2024 - Goiânia",
    award3Desc: "Collegiate Brazilian Robotics Competition participation with experimental validation of autonomous systems.",
    galleryTitle: "Field & Laboratory Logs",
    galleryPhoto1Title: "RoboCup 2025 - Salvador",
    galleryPhoto1Desc: "Computer vision and control integration research for Bill Robot at ACSO / BahiaRT (UNEB).",
    galleryPhoto1Alt: "RoboCup Salvador 2025, Brazil",
    galleryPhoto2Title: "CBR 2024 - Goiânia",
    galleryPhoto2Desc: "Experimental validation of autonomous service robotics systems at the Brazilian Robotics Competition.",
    galleryPhoto2Alt: "CBR 2024 - Goiânia - Samuel Cesar",
    galleryPhoto3Title: "Competitive Preparation",
    galleryPhoto3Desc: "Sensor calibration and control node testing in the university laboratory.",
    galleryPhoto3Alt: "CBR 2025 & RoboCup 25 - Samuel Cesar",
    skillsTitle: "Core Competencies & Technical Domains",
    skillsCol1: "Data Engineering & Cloud",
    skillsCol2: "Data Science & ML",
    skillsCol3: "Computer Vision & Robotics",
  },
  curriculum: {
    sectionTitle: "Resume & Technical Summary",
    sectionSubtitle: "Technical and academic profile with immediate availability for internship.",
    downloadPdf: "Download Resume (PDF)",
    educationTitle: "Education & Research",
    degreeStatus: "Degree in Progress",
    degreeName: "Information Systems",
    degreeSchool: "Bahia State University (UNEB) • Salvador, BA",
    researchStatus: "Scientific Research Fellow",
    researchLab: "ACSO / BahiaRT Laboratory",
    researchFocus: "Autonomous Service Robotics (RoboCup@Home & CBR)",
    location: "Salvador, BA (On-site / Remote)",
    availability: "Available for Internship",
    competenciesTitle: "Competencies & Distinctions",
    compDataEngTitle: "Data Eng. & Backend",
    compDataEngDesc: "Python, SQL/PostgreSQL, B-Tree O(log n) indexing, graphs, and data-driven architecture.",
    compDataScienceTitle: "Data Science & ML",
    compDataScienceDesc: "Scikit-Learn, Random Forest, exploratory data analysis (EDA), feature engineering, and applied predictive modeling.",
    compVisionTitle: "Computer Vision & Robotics",
    compVisionDesc: "YOLOv8, Amazon Rekognition, ROS 2, modern C++, and 3D sensory data fusion.",
    compCloudTitle: "AWS Cloud & DevOps",
    compCloudDesc: "Serverless Lambda, S3, SAM CLI (IaC), CloudWatch, Docker, and Linux environments.",
    awardsHeader: "Awards & Recognition:",
    awardHackathonTitle: "1st Place: UFBA Hackathon 2026",
    awardHackathonDesc: "BioPoints: Predictive Loyalty & Carbon Modeling",
    awardCbrTitle: "Competitor: CBR 2024 / 2025",
    awardCbrDesc: "BahiaRT / ACSO Team (RoboCup@Home)",
    officialDoc: "Official document updated in 2026",
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
    qrAlt: "QR Code for Samuel Cesar's Portfolio",
  },
  footer: {
    bioNotice: "Samuel Cesar • UNEB (Information Systems) • Salvador, BA",
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
    metaTitle: "404 - Page Not Found | Samuel Cesar",
    metaDescription: "The requested page was not found.",
    statusCode: "404",
    title: "Page Not Found",
    description: "The link you followed may be broken or the page has been moved to another route.",
    backHome: "Back to Home",
  },
  meta: {
    defaultTitle: "Samuel Cesar, Software Developer",
    defaultDescription: "Portfolio of Samuel Cesar. Information Systems undergraduate (UNEB) seeking an internship. Projects in Data Engineering, Data Science (Machine Learning), Computer Vision, and AWS Cloud.",
  },
  projectItems: {
    biopoints: {
      title: "BioPoints - Predictive CO₂ Intelligence & Sustainable Loyalty",
      description: "Platform awarded 1st Place at the UFBA Hackathon calculating avoided CO₂ emissions via Random Forest and converting to real-time loyalty points.",
      oneLinerImpact: "Predictive Machine Learning model (R² = 0.9964, MAE = 1.90 g/km) integrated with a NestJS API for real-time avoided CO₂ calculations.",
      categoryLabel: "Data Science & Machine Learning",
      technicalHighlights: [
        "Constructed a counterfactual baseline fossil emission predictive model with R² of 0.9964 and MAE of 1.9035 g/km across 7,385 samples.",
        "Strict preprocessing isolation using Pipeline and ColumnTransformer, preventing Data Leakage and handling unseen categories.",
        "Real-time inference integration between NestJS and Python runtime via child_process.spawn through stdin/stdout streaming (~150ms).",
        "1st Place in the AI, Smart Cities, and Climate Change track at UFBA's AI League (LIAO) Hackathon."
      ]
    },
    ecovision: {
      title: "EcoVision - Serverless Waste Sorting with Explicit Uncertainty Classification",
      description: "Serverless AWS pipeline for recyclable sorting with Amazon Rekognition and an explicit material uncertainty classification engine.",
      oneLinerImpact: "Event-driven serverless architecture on AWS Free Tier, with material uncertainty modeling and 85% test coverage.",
      categoryLabel: "Computer Vision & AWS Cloud",
      technicalHighlights: [
        "Event-driven S3 -> Lambda -> Rekognition architecture with lean execution time (~800ms/image) and zero cost on AWS Free Tier.",
        "Decoupled deterministic rules engine modeling uncertainty in 3 states (inferred, ambiguous, unverified) to prevent sorting contamination.",
        "Defense-in-depth against recursive S3 event loops and 85% in-memory test coverage with Moto without cloud costs."
      ]
    },
    robocupbillrobot: {
      title: "RoboCup@Home - Autonomous Perception and Manipulation (Bill Robot)",
      description: "3D vision and autonomous manipulation pipeline for Bill Robot at RoboCup@Home and CBR, integrating ROS 2, C++, and YOLOv8.",
      oneLinerImpact: "3D perception and robotic manipulation with real-time inference (<25ms) and 94% accuracy in unstructured domestic environments.",
      categoryLabel: "Robotics & Computer Vision",
      technicalHighlights: [
        "YOLOv8 inference optimization via quantization and ROS 2 node acceleration for continuous 30+ FPS processing.",
        "3D Point Cloud integration with inverse kinematics in MoveIt 2 for everyday object grasping.",
        "Academic research and technical integration within the manipulation team at ACSO / BahiaRT (RoboCup@Home)."
      ]
    },
    airflow: {
      title: "AirFlow - Logistics Optimization & Route Indexing Engine",
      description: "Flight network routing and indexing system using Dijkstra's graph algorithm and B-Trees for O(log n) lookups.",
      oneLinerImpact: "Min-cost routing with Dijkstra's algorithm on graphs and O(log n) customer lookup via in-memory B-Trees.",
      categoryLabel: "Data Engineering & Algorithms",
      technicalHighlights: [
        "Custom B-Tree indexer eliminating linear scan overhead (O(n) -> O(log n)) on customer records.",
        "Flight network modeling in weighted directed graphs with Dijkstra for optimal connection and miles calculation.",
        "Geocoding and dynamic trajectory browser projection pipeline with Folium and Geopy."
      ]
    },
    processlinuxmonitor: {
      title: "Process Linux Monitor - Low-Level Telemetry",
      description: "Process monitor and telemetry engine interacting directly with Linux system calls (syscalls) and the /proc kernel interface.",
      oneLinerImpact: "Low-overhead telemetry collection and process control via the Linux kernel /proc interface with minimal CPU overhead.",
      categoryLabel: "Systems & Telemetry",
      technicalHighlights: [
        "Direct extraction and parsing of telemetry metrics from the virtual /proc subsystem with <0.1% CPU overhead.",
        "Safe pointer manipulation, dynamic memory allocation, and POSIX process control signals (SIGTERM, SIGSTOP, SIGCONT).",
        "Real-time monitoring of execution states, PID, threads, CPU time, and RAM memory footprint."
      ]
    },
    petcaresystem: {
      title: "PetCare System",
      description: "Desktop application in Java and Swing for veterinary clinic management, clinical records, and vaccination tracking.",
      oneLinerImpact: "Java Swing desktop system with object-oriented architecture (OOP), veterinary medical records, and automated billing.",
      categoryLabel: "Desktop Applications & Java",
      technicalHighlights: [
        "Comprehensive medical record history for diagnoses, treatments, and patient clinical evolution.",
        "Smart vaccine card module tracking immunization schedules and automated return dates.",
        "Fluid interface built with Java Swing and CardLayout manager for seamless single-window navigation."
      ]
    },
    virtualstore: {
      title: "Virtual Music Store",
      description: "Full-stack e-commerce system integrating a Spring Boot REST API with an Angular frontend.",
      oneLinerImpact: "Complete full-stack e-commerce integrating Spring Boot 3, in-memory H2 database, and Angular SPA frontend.",
      categoryLabel: "Full Stack & Web",
      technicalHighlights: [
        "Comprehensive music catalog with genre filtering and real-time product search.",
        "Smart shopping cart with per-user data persistence and automated total calculation.",
        "Administrative dashboard with full CRUD control and relational integrity validation."
      ]
    }
  }
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
