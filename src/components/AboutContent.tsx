import React from 'react';
import { CircleUserRound, Camera, Trophy, CodeXml, FlaskConical } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface AboutContentProps {
  baseUrl: string;
}

export default function AboutContent({ baseUrl }: AboutContentProps) {
  const { t, locale } = useI18n();
  const profilePhoto = `${baseUrl}/images/profile.jpg`;

  const eventPhotos = [
    {
      src: `${baseUrl}/images/robocup-image.jpg`,
      alt: t.about.galleryPhoto1Alt,
      title: t.about.galleryPhoto1Title,
      description: t.about.galleryPhoto1Desc,
      span: "md:col-span-7"
    },
    {
      src: `${baseUrl}/images/personal-image.jpg`,
      alt: t.about.galleryPhoto2Alt,
      title: t.about.galleryPhoto2Title,
      description: t.about.galleryPhoto2Desc,
      span: "md:col-span-5"
    },
    {
      src: `${baseUrl}/images/robocup-image2.jpg`,
      alt: t.about.galleryPhoto3Alt,
      title: t.about.galleryPhoto3Title,
      description: t.about.galleryPhoto3Desc,
      span: "md:col-span-12"
    }
  ];

  const dataEngSkills = locale === 'en-US'
    ? ['Python', 'SQL & PostgreSQL', 'AWS (Lambda, S3, SAM)', 'B-Trees & Indexing', 'Graphs & Dijkstra', 'Docker & Linux']
    : ['Python', 'SQL & PostgreSQL', 'AWS (Lambda, S3, SAM)', 'B-Trees & Índices', 'Grafos & Dijkstra', 'Docker & Linux'];

  const dataScienceSkills = locale === 'en-US'
    ? ['Scikit-Learn', 'Random Forest', 'Pandas & NumPy', 'Feature Engineering', 'Exploratory Analysis (EDA)', 'Predictive Modeling']
    : ['Scikit-Learn', 'Random Forest', 'Pandas & NumPy', 'Feature Engineering', 'Análise Exploratória (EDA)', 'Modelagem Preditiva'];

  const visionSkills = ['YOLOv8', 'Amazon Rekognition', 'ROS 2 (RoboCup@Home)', 'C++ (Modern)', 'MoveIt 2', 'OpenCV'];

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-ink font-display">
            {t.about.sectionTitle}
          </h2>
          <p className="text-ink-tertiary text-sm md:text-base mt-2 max-w-xl">
            {t.about.sectionSubtitle}
          </p>
        </div>
      </div>
      
      {/* Asymmetric Bento: Bio (8 cols) + Photo (4 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div className="md:col-span-8 rounded-xl bg-surface border border-edge p-6 md:p-8 flex flex-col justify-center transition-colors">
          <div className="flex items-center gap-2.5 mb-4 text-dominant-ink">
            <CircleUserRound size={22} aria-hidden="true" />
            <h3 className="text-lg font-bold text-ink font-display">{t.about.objectiveTitle}</h3>
          </div>
          <div className="text-ink-secondary leading-relaxed text-sm md:text-base space-y-4 max-w-[58ch]">
            <p>
              {locale === 'en-US' ? (
                <>
                  Information Systems undergraduate at <strong className="text-ink font-semibold">Bahia State University (UNEB)</strong>, seeking an <strong className="text-accent-ink font-semibold">internship opportunity</strong> in Data Engineering, Data Science, or Computer Vision.
                </>
              ) : (
                <>
                  Graduando em Sistemas de Informação pela <strong className="text-ink font-semibold">Universidade do Estado da Bahia (UNEB)</strong>, busco oportunidade de <strong className="text-accent-ink font-semibold">estágio</strong> em Engenharia de Dados, Ciência de Dados ou Visão Computacional.
                </>
              )}
            </p>
            <p>
              {locale === 'en-US' ? (
                <>
                  I engineer data pipelines, predictive models in Python (<strong className="text-ink font-semibold">Scikit-Learn, Random Forest, Pandas</strong>), serverless cloud architectures with <strong className="text-dominant-ink font-semibold">AWS (Lambda, S3, SAM CLI)</strong> and high-performance indexing data structures (B-Trees and Graphs).
                </>
              ) : (
                <>
                  Construo pipelines de dados, modelos preditivos em Python (<strong className="text-ink font-semibold">Scikit-Learn, Random Forest, Pandas</strong>), arquiteturas serverless na nuvem com <strong className="text-dominant-ink font-semibold">AWS (Lambda, S3, SAM CLI)</strong> e estruturas de indexação de alto desempenho (B-Trees e Grafos).
                </>
              )}
            </p>
            <p>
              {locale === 'en-US' ? (
                <>
                  Awarded <strong className="text-accent-ink font-semibold">1st Place at the LIAO / UFBA 2026 Hackathon</strong> developing the predictive emission and loyalty engine for BioPoints. As an undergraduate scientific researcher at <strong className="text-ink font-semibold">ACSO</strong> (UNEB), I worked for 2 years on service robotics with <span className="font-mono text-dominant-ink text-[13px] bg-dominant-soft px-1.5 py-0.5 rounded border border-dominant-edge">ROS 2, YOLOv8, and Python</span> and currently participate in <strong className="text-dominant-ink font-semibold">ACSO DEFENSE</strong>, developing search and reconnaissance solutions with autonomous drones.
                </>
              ) : (
                <>
                  Conquistei o <strong className="text-accent-ink font-semibold">1º Lugar no Hackathon LIAO / UFBA 2026</strong> desenvolvendo a inteligência de previsão e fidelidade do projeto BioPoints. Como bolsista de iniciação científica no <strong className="text-ink font-semibold">ACSO</strong> (UNEB), atuei durante 2 anos com robótica para robôs de serviço com <span className="font-mono text-dominant-ink text-[13px] bg-dominant-soft px-1.5 py-0.5 rounded border border-dominant-edge">ROS 2, YOLOv8 e Python</span> e atualmente integro o <strong className="text-dominant-ink font-semibold">ACSO DEFENSE</strong>, atuando em soluções para busca e reconhecimento utilizando drones autônomos.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="md:col-span-4 rounded-xl bg-surface border border-edge p-2 flex items-center justify-center min-h-[300px] md:min-h-full relative group overflow-hidden transition-colors">
          {profilePhoto ? (
            <img 
              src={profilePhoto} 
              alt={t.about.photoAlt} 
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 rounded-lg" 
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-ink-muted">
              <Camera size={36} aria-hidden="true" />
              <span className="text-[13px] font-sans">{t.about.photoPlaceholder}</span>
            </div>
          )}
        </div>

        {/* Asymmetric Recognition Banner */}
        <div className="col-span-1 md:col-span-12 rounded-xl bg-surface border border-edge p-6 md:p-8 transition-colors">
          <div className="flex items-center gap-2.5 mb-6 text-accent-ink">
            <Trophy size={22} aria-hidden="true" />
            <h3 className="text-lg font-bold text-ink font-display">{t.about.awardsTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* 1st Place Card */}
            <div className="md:col-span-6 rounded-lg bg-accent-soft border border-accent-edge p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-accent-ink font-sans text-[13px] font-semibold">{t.about.award1Badge}</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-surface text-accent-ink border border-accent-edge">{t.about.award1Winner}</span>
                </div>
                <h4 className="text-ink font-extrabold text-base font-display">{t.about.award1Title}</h4>
                <p className="text-ink-secondary text-[13px] leading-relaxed mt-1.5">
                  {t.about.award1Desc}
                </p>
              </div>
            </div>

            {/* ACSO Lab Card */}
            <div className="md:col-span-3 rounded-lg bg-surface-alt border border-edge-subtle p-4 flex flex-col justify-between">
              <div>
                <span className="text-dominant-ink font-sans text-[13px] font-semibold block mb-2">{t.about.award2Badge}</span>
                <h4 className="text-ink font-bold text-[15px] font-display">{t.about.award2Title}</h4>
                <p className="text-ink-secondary text-[13px] leading-relaxed mt-1.5">
                  {t.about.award2Desc}
                </p>
              </div>
            </div>

            {/* CBR 2024 Card */}
            <div className="md:col-span-3 rounded-lg bg-surface-alt border border-edge-subtle p-4 flex flex-col justify-between">
              <div>
                <span className="text-ink-tertiary font-sans text-[13px] font-semibold block mb-2">{t.about.award3Badge}</span>
                <h4 className="text-ink font-bold text-[15px] font-display">{t.about.award3Title}</h4>
                <p className="text-ink-secondary text-[13px] leading-relaxed mt-1.5">
                  {t.about.award3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory & Field Gallery */}
        <div className="col-span-1 md:col-span-12 rounded-xl bg-surface border border-edge p-6 md:p-8 transition-colors">
          <div className="flex items-center gap-2.5 mb-6 text-dominant-ink">
            <FlaskConical size={22} aria-hidden="true" />
            <h3 className="text-lg font-bold text-ink font-display">{t.about.galleryTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {eventPhotos.map((photo, index) => (
              <div key={index} className={`${photo.span} bg-zinc-950 border border-edge rounded-xl overflow-hidden group/event hover:border-dominant-edge transition-colors flex flex-col h-64 relative`}>
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover/event:scale-[1.03] transition-transform duration-500 opacity-90 group-hover/event:opacity-100" 
                />
                <div className="media-overlay absolute bottom-0 inset-x-0 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">{photo.title}</h4>
                  <p className="text-zinc-200 text-[13px]">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Skills Console */}
        <div className="col-span-1 md:col-span-12 rounded-xl bg-surface border border-edge p-6 md:p-8 transition-colors">
          <div className="flex items-center gap-2.5 mb-5 text-accent-ink">
            <CodeXml size={22} aria-hidden="true" />
            <h3 className="text-lg font-bold text-ink font-display">{t.about.skillsTitle}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-[13px] font-sans font-semibold text-dominant-ink block mb-2.5">
                {t.about.skillsCol1}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dataEngSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded text-[13px] font-mono bg-surface-alt border border-edge-subtle text-ink-secondary">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[13px] font-sans font-semibold text-accent-ink block mb-2.5">
                {t.about.skillsCol2}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dataScienceSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded text-[13px] font-mono bg-surface-alt border border-edge-subtle text-ink-secondary">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[13px] font-sans font-semibold text-dominant-ink block mb-2.5">
                {t.about.skillsCol3}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {visionSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded text-[13px] font-mono bg-surface-alt border border-edge-subtle text-ink-secondary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
