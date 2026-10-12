import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  FileDown, 
  Database, 
  BrainCircuit,
  Eye,
  QrCode, 
  X, 
  ExternalLink,
  ChevronDown,
  Cloud,
  Terminal,
  Activity
} from 'lucide-react';

export default function HeroNetworking() {
  const [showQrModal, setShowQrModal] = useState(false);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const linkedInUrl = "https://www.linkedin.com/in/s-cesar/";
  const resumeUrl = `${baseUrl}/docs/Samuel_Cesar_Curriculum.pdf`;
  const qrCodeUrl = `${baseUrl}/qrcode.svg`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQrModal(false);
      }
    };
    if (showQrModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal]);

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-16 md:pb-24 w-full scroll-mt-24">
      {/* Asymmetric Command-Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Pitch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Badge - Rectangular & Crisp */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider font-semibold text-[11px]">
              Disponível para Estágio • Engenharia &amp; Ciência de Dados
            </span>
          </div>

          {/* High-Impact Display Typography with ~3x Leap */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
            Samuel Cesar, <br className="hidden sm:inline" />
            <span className="text-cyan-400">Software Developer</span>
          </h1>

          {/* Refined Copy: <= 20 words and <= 4 lines */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-xl">
            Graduando em Sistemas de Informação (<strong className="text-white font-medium">UNEB</strong>) e bolsista IC ACSO/DEFENSE. 1º lugar no Hackathon UFBA com Python e AWS.
          </p>

          {/* Direct Tactical Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Explorar Projetos</span>
              <ChevronDown size={15} aria-hidden="true" />
            </a>

            <a
              href={resumeUrl}
              download="Samuel_Cesar_Curriculum.pdf"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <FileDown size={16} className="text-cyan-400" aria-hidden="true" />
              <span>Currículo (PDF)</span>
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono transition-all duration-200 active:scale-[0.98] cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <QrCode size={16} className="text-emerald-400" aria-hidden="true" />
              <span>QR Celular</span>
            </button>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              <Linkedin size={15} aria-hidden="true" />
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Telemetry & Core Domains Console (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-xl border border-white/10 bg-[#121216]/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
            
            {/* Header Telemetry Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <Terminal size={14} className="text-cyan-400" />
                <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">Telemetry Console</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <Activity size={12} />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Core Domain Telemetry Blocks */}
            <div className="space-y-3">
              {/* Domain 1: Data Engineering */}
              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Database size={15} />
                    <span>Engenharia de Dados</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">O(log n) Pipelines</span>
                </div>
                <div className="text-sm font-semibold text-white">Python &amp; SQL</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">B-Trees, Grafos &amp; Telemetria</div>
              </div>

              {/* Domain 2: Data Science & ML */}
              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-400/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <BrainCircuit size={15} />
                    <span>Ciência de Dados &amp; ML</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">1º Lugar UFBA</span>
                </div>
                <div className="text-sm font-semibold text-white">Scikit-Learn &amp; Modelagem Preditiva</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Random Forest &amp; Engenharia de Features</div>
              </div>

              {/* Domain 3: Computer Vision & Robotics */}
              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
                    <Eye size={15} />
                    <span>Visão Computacional</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">ACSO / BahiaRT</span>
                </div>
                <div className="text-sm font-semibold text-white">YOLOv8 &amp; Rekognition</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">ROS 2, OMPL &amp; Robô Bill (RoboCup)</div>
              </div>

              {/* Domain 4: Cloud Infrastructure */}
              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-emerald-400/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                    <Cloud size={15} />
                    <span>Nuvem AWS</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Serverless IaC</span>
                </div>
                <div className="text-sm font-semibold text-white">Lambda &amp; S3 Storage</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">SAM CLI, CloudWatch &amp; EventBridge</div>
              </div>
            </div>

            {/* Bottom Bar Telemetry Info */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Stack: Python • SQL • AWS</span>
              <span className="text-emerald-400/90 font-medium">Status: Produção</span>
            </div>
          </div>
        </div>

      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowQrModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Escanear perfil no smartphone"
              className="relative w-full max-w-sm bg-[#121216] border border-white/15 p-6 rounded-xl shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-white mb-1 font-display">Conectar no Smartphone</h3>
              <p className="text-xs text-zinc-400 mb-5 max-w-[260px]">
                Aponte a câmera do celular para abrir o portfólio e conectar diretamente com Samuel Cesar.
              </p>

              <div className="p-3 bg-white rounded-xl shadow-inner mb-4">
                <img src={qrCodeUrl} alt="QR Code do Portfólio de Samuel Cesar" className="w-48 h-48 object-contain" />
              </div>

              <div className="w-full flex gap-2">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Abrir LinkedIn</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
