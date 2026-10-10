---
title: "Process Linux Monitor — Telemetria de Baixo Nível"
description: "Monitor de telemetria e processos do sistema operacional interagindo diretamente com chamadas de sistema (syscalls) e interface /proc do kernel Linux."
techs: ["C", "Linux", "POSIX APIs", "Operating Systems", "Low-Level"]
stack: "System Telemetry & C"
category: "data-engineering"
categoryLabel: "Sistemas & Telemetria"
oneLinerImpact: "Monitor de processos e telemetria de alta performance interagindo com chamadas de sistema do kernel Linux via interface /proc com overhead mínimo de CPU."
hardwareBadges: ["Linux Kernel", "Syscalls POSIX", "C Nativo", "Process Control"]
technicalHighlights:
  - "Extração e parse direto de métricas de telemetria do subsistema virtual /proc com overhead < 0.1%."
  - "Manipulação segura de ponteiros, alocação dinâmica e sinais de controle de processo (POSIX signals)."
  - "Monitoramento em tempo real de estados de execução, PID, threads, tempo de CPU e pegada de memória RAM."
metrics:
  "Interface": "Kernel /proc"
  "Overhead": "<0.1% CPU"
  "Linguagem": "C Nativo"
featured: true
order: 4
github: "https://github.com/sCesar-dev/linux_process_monitor"
live: "#"
images: 
  - "/images/processLinuxMonitor/linux_monitor_img1.png"
---

# Process Linux Monitor

Aplicação desenvolvida em **C nativo** voltada à monitoração em tempo real e telemetria de processos do sistema operacional Linux, interagindo diretamente com chamadas do sistema e a interface do kernel `/proc`.

## Objetivos e Arquitetura

* **Comunicação Direta com o Kernel:** O monitoramento é realizado via parsing eficiente das estruturas de dados expostas pelo kernel do Linux, sem dependência de bibliotecas de alto nível.
* **Inspeção de Recursos:** Coleta contínua de utilização de tempo de processador (User & Kernel mode), identificadores de processo (`PID`, `PPID`), estado das threads e consumo de páginas de memória (`Resident Set Size` e `Virtual Memory`).
* **Sinais e Controle:** Envio de sinais POSIX (`SIGTERM`, `SIGSTOP`, `SIGCONT`) para gerenciamento ativo dos processos monitorados.
