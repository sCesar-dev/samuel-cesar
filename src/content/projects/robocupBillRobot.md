---
title: "RoboCup@Home — Percepção Autônoma e Manipulação (Robô Bill)"
description: "Pipeline de visão computacional 3D e controle autônomo para o Robô Bill na competição RoboCup@Home e CBR, integrando ROS 2, C++, Python e YOLOv8."
techs: ["ROS 2", "Python", "C++", "YOLOv8", "OpenCV", "MoveIt 2", "LiDAR", "Linux"]
stack: "Robotics & Computer Vision"
category: "computer-vision"
categoryLabel: "Robótica & Visão Computacional"
oneLinerImpact: "Pipeline de percepção 3D e manipulação robótica autônoma operando com inferência em tempo real (<25ms) e 94% de acurácia em ambientes dinâmicos não mapeados."
hardwareBadges: ["NVIDIA Jetson", "ROS 2 Humble", "Câmera RGB-D Intel RealSense", "LiDAR 2D/3D"]
technicalHighlights:
  - "Otimização de inferência YOLOv8 via quantização e aceleração de nós ROS 2 para processamento contínuo em 30+ FPS."
  - "Integração de nuvem de pontos 3D (Point Cloud) com cinemática inversa no MoveIt 2 para grasp de objetos do cotidiano."
  - "Pesquisa acadêmica e integração técnica na equipe de manipulação do laboratório ACSO / BahiaRT (RoboCup@Home)."
metrics:
  "Latência": "<25ms"
  "Taxa FPS": "30+ FPS"
  "Acurácia": "94.2%"
featured: true
order: 1
github: "https://github.com/sCesar-dev"
live: "#"
images: 
  - "/images/robocup-image.jpg"
  - "/images/robocup-image2.jpg"
---

# Robô Bill — Percepção Autônoma & Manipulação (RoboCup@Home)

Projeto de pesquisa acadêmica, extensão e iniciação científica para o **Robô Bill**, robô de serviço de grande porte competindo na categoria universitária **RoboCup@Home** e na **Competição Brasileira de Robótica (CBR)** pelo laboratório **ACSO / BahiaRT (UNEB)**.

---

## 🎯 Desafio de Engenharia

O ambiente doméstico e corporativo da RoboCup@Home é altamente não estruturado: iluminação variável, humanos se movimentando e objetos desconhecidos dispostos em alturas e orientações imprevisíveis. 

O objetivo foi projetar e implementar um pipeline resiliente capaz de:
1. Detectar e segmentar objetos de uso cotidiano a partir de sensores de visão estéreo RGB-D.
2. Estimar a pose 6D dos objetos em relação à base do manipulador robótico.
3. Executar trajetórias de preensão (grasping) sem colisões em tempo real.

---

## 🏗️ Arquitetura do Sistema e Fluxo de Dados

A arquitetura foi construída de forma distribuída e modular utilizando **ROS 2 (Robot Operating System)**:

```
[ Câmera Intel RealSense RGB-D ] 
           │
           ▼
[ /camera/color/image_raw (640x480 @ 30fps) ]
           │
           ▼
[ Nó de Percepção: YOLOv8 + TensorRT ] ──► Bounding Boxes & Classes
           │
           ▼
[ Fusão Sensorial 3D: PCL (Point Cloud Library) ] ──► Coordenadas Tridimensionais (X, Y, Z)
           │
           ▼
[ Transformada de Coordenadas (tf2 ROS2) ] ──► Frame 'base_link' do Robô
           │
           ▼
[ Planejador de Trajetória: MoveIt 2 (OMPL) ] ──► Cinemática Inversa e Desvio de Obstáculos
           │
           ▼
[ Controladores de Hardware: ros2_control ] ──► Motores do Braço e Garra
```

---

## ⚡ Highlights Técnicos & Otimizações

* **Inferência de Baixa Latência em Edge:** Otimização do pipeline de detecção para hardware embarcado, garantindo latência total de percepção abaixo de **25 milissegundos**.
* **Manipulação Robótica Adaptativa:** Algoritmos em C++ integrados ao MoveIt 2 calculando trajetórias de aproximação seguras com restrição de torque e envelope de colisão.
* **Comunicação por DDS:** Configuração de Quality of Service (QoS) no ROS 2 com políticas de `Best Effort` para streams de imagem e `Reliable` para comandos de segurança e paradas de emergência.

---

## 🏆 Impacto e Competições

* **CBR 2024 (Goiânia):** Validação dos subsistemas autônomos e navegação em arena competitiva.
* **CBR 2025 & RoboCup 2025 (Salvador):** Liderança dos testes finais de integração de manipulação e percepção em nível global.
