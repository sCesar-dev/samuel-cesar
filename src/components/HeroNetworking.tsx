import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  FileDown, 
  Sparkles, 
  Cpu, 
  Database, 
  BrainCircuit,
  Eye,
  QrCode, 
  X, 
  ExternalLink,
  ChevronDown,
  Cloud,
  GraduationCap
} from 'lucide-react';

export default function HeroNetworking() {
  const [showQrModal, setShowQrModal] = useState(false);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  const linkedInUrl = "https://www.linkedin.com/in/s-cesar/";
  const resumeUrl = `${baseUrl}/docs/Samuel_Cesar_Curriculum.pdf`;
  const qrCodeUrl = `${baseUrl}/qrcode.svg`;

  return (
    <section id="home" className="relative pt-12 pb-16 md:pt-20 md:pb-24 w-full max-w-5xl mx-auto px-4 scroll-mt-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[650px] h-80 md:h-[450px] bg-gradient-to-tr from-purple-500/15 via-emerald-500/10 to-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Live Event Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide uppercase font-semibold">Disponível para Estágio • Engenharia & Ciência de Dados</span>
        </div>
      </div>

      {/* Main Pitch */}
      <div className="text-center space-y-5">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Engenharia de Dados, Ciência de Dados & <br />
          <span className="bg-gradient-to-r from-emerald-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Visão Computacional
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
          Graduando em Sistemas de Informação (<strong className="text-white font-medium">UNEB</strong>) em busca de <strong className="text-cyan-300 font-medium">oportunidades de estágio</strong> em Engenharia de Dados, Ciência de Dados (Machine Learning) ou Visão Computacional. Vencedor do <strong className="text-purple-300 font-medium">1º Lugar no Hackathon da UFBA</strong> com inteligência preditiva e modelagem em Python, aliado à arquitetura em nuvem com <strong className="text-emerald-300 font-medium">AWS (Lambda, S3, SAM)</strong> e pesquisa aplicada no laboratório <strong className="text-white font-medium">ACSO / BahiaRT</strong> (RoboCup@Home).
        </p>
      </div>

      {/* Quick Metrics Bar (10s Scan for recruiters & visitors) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 max-w-4xl mx-auto">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-md text-center hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
            <Database size={16} />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Eng. de Dados</span>
          </div>
          <div className="text-sm font-semibold text-white">Python & SQL</div>
          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">B-Trees, Grafos & Telemetria</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-md text-center hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-center gap-1.5 text-purple-400 mb-1">
            <BrainCircuit size={16} />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Ciência de Dados</span>
          </div>
          <div className="text-sm font-semibold text-white">Scikit-Learn & ML</div>
          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Random Forest (1º Lugar UFBA)</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-md text-center hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
            <Eye size={16} />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Visão Computacional</span>
          </div>
          <div className="text-sm font-semibold text-white">YOLOv8 & Rekognition</div>
          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">ROS 2 & Incerteza Heurística</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-md text-center hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
            <Cloud size={16} />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Cloud AWS</span>
          </div>
          <div className="text-sm font-semibold text-white">Lambda & S3</div>
          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">SAM (IaC) & CloudWatch</div>
        </div>
      </div>

      {/* Quick Action Buttons (Networking-Ready) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200 active:scale-95"
        >
          <Linkedin size={18} />
          <span>Conectar no LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white border border-white/15 text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <QrCode size={18} className="text-emerald-400" />
          <span>QR Code no Celular</span>
        </button>

        <a
          href={resumeUrl}
          download="Samuel_Cesar_Curriculum.pdf"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/15 text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <FileDown size={18} className="text-cyan-400" />
          <span>Baixar Currículo (PDF)</span>
        </a>

        <a
          href="#projects"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/15 text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <span>Ver Projetos</span>
          <ChevronDown size={16} />
        </a>
      </div>

      {/* QR Code Modal for Instant Scanning in Person */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-zinc-950 border border-white/20 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-bold text-white mb-1">Escanear no Smartphone</h3>
              <p className="text-xs text-zinc-400 mb-5">
                Aponte a câmera do celular para abrir o portfólio e conectar diretamente com Samuel Cesar
              </p>

              <div className="p-3 bg-white rounded-xl shadow-inner mb-4">
                <img src={qrCodeUrl} alt="QR Code do Portfólio" className="w-52 h-52 object-contain" />
              </div>

              <div className="w-full flex gap-2">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Abrir Perfil Direto</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
