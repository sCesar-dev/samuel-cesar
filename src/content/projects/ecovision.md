---
title: "EcoVision - Triagem Serverless de Resíduos com Classificação de Incerteza"
description: "Pipeline serverless na AWS para triagem de recicláveis com Amazon Rekognition e motor de classificação explícita de incerteza de materiais."
techs: ["AWS Lambda", "Amazon S3", "Amazon Rekognition", "AWS SAM", "Python 3.11", "Pillow", "pytest", "Moto", "CloudWatch"]
stack: "Cloud Serverless & Computer Vision"
category: "computer-vision"
categoryLabel: "Visão Computacional & Nuvem AWS"
oneLinerImpact: "Arquitetura serverless orientada a eventos no AWS Free Tier, com modelagem de incerteza de materiais e 85% de cobertura de testes."
hardwareBadges: ["AWS Lambda 256MB", "Amazon S3", "Amazon Rekognition", "AWS SAM (IaC)"]
technicalHighlights:
  - "Arquitetura orientada a eventos S3 -> Lambda -> Rekognition com tempo de execução enxuto (~800ms/imagem) e custo zero no AWS Free Tier."
  - "Motor desacoplado de regras determinísticas modelando incerteza em 3 estados (inferred, ambiguous, unverified) para evitar contaminação em triagem."
  - "Defesa em profundidade contra loops recursivos de eventos S3 e 85% de cobertura de testes in-memory com Moto sem custos de nuvem."
architectureDiagram: "/images/ecovision/architecture.png"
metrics:
  "Latência": "~800ms / img"
  "Cobertura": "85% pytest"
  "Custo Base": "$0.00 Free Tier"
  "Retenção": "30 dias S3"
featured: true
order: 2
github: "https://github.com/sCesar-dev/ecoVision"
live: "https://github.com/sCesar-dev/ecoVision"
images: 
  - "/images/ecovision/logo.png"
  - "/images/ecovision/test02-terminal.png"
  - "/images/ecovision/water_bottle_annotated.jpeg"
  - "/images/ecovision/test02-aws.png"
  - "/images/ecovision/architecture.png"
---

# EcoVision - Triagem de Resíduos em Nuvem

Pipeline serverless orientado a eventos na AWS para triagem de materiais recicláveis com classificação ética de incerteza de materiais, operando com escala até zero e custo nulo no AWS Free Tier.

**Status:** MVP Concluído · **Período:** Setembro - Outubro de 2026 · **Papel:** Engenheiro de Software & Arquiteto Cloud Serverless  
**Repositório Oficial:** [github.com/sCesar-dev/ecoVision](https://github.com/sCesar-dev/ecoVision) · **Stack Principal:** AWS SAM, Lambda (Python 3.11), S3, Rekognition, CloudWatch

---

## 🎯 1. Elevator Pitch & O Problema Real de Engenharia

A automação da triagem de recicláveis sofre com um problema crítico: a visão computacional RGB convencional identifica formas visuais como garrafas, mas **não comprova a composição química de polímeros ou vidros**.

No **EcoVision**, desenvolvi um pipeline serverless orientado a eventos na AWS utilizando Amazon Rekognition e um motor de inferência heurístico desacoplado. Em vez de assumir certezas artificiais que contaminam fardos industriais, o sistema modela a incerteza como cidadão de primeira classe, distinguindo status **inferido**, **ambíguo** e **não verificado** com persistência estruturada no Amazon S3.

### A Dor e o Impacto no Negócio:
* **Quem sofre com isso?** Centros municipais de triagem de materiais recicláveis (MRFs), cooperativas de reciclagem e operadores de gestão de resíduos sólidos.
* **Qual é o risco?** A contaminação de um único fardo de material reciclável (ex.: vidro misturado a fardos de PET, ou alumínio triturado em esteiras plásticas) pode inutilizar toneladas de insumos e gerar multas operacionais severas.
* **Por que importa?** No desenvolvimento de software e IA aplicada, promessas ingênuas de 99% de precisão mascaram riscos de negócio. Sistemas confiáveis devem explicitar os limites físicos da detecção visual e sinalizar ambiguidades antes de enviar resíduos para prensagem ou trituração.

---

## 🏗️ 2. A Solução e Taxonomia de Incerteza

O EcoVision implementa uma esteira completa de ingestão, análise e classificação em nuvem com foco em separação de responsabilidades e governança de dados:

1. **Ingestão Orientada a Eventos no Amazon S3:** Upload de imagens nos formatos JPEG ou PNG no prefixo `input/` dispara automaticamente uma função AWS Lambda via notificações `s3:ObjectCreated`, sem necessidade de servidores em execução contínua.
2. **Detecção Semântica e Bounding Boxes com Amazon Rekognition:** Extração de rótulos visuais semânticos (`DetectLabels`), níveis de confiança estatística, hierarquias de categorias pai e coordenadas espaciais para caixas delimitadoras de cada instância detectada.
3. **Motor Desacoplado de Inferência Heurística:** Mapeia rótulos visuais para fluxos de reciclagem (`paper_cardboard`, `plastic`, `metal`, `glass`, `other`) e classifica a decisão sob três estados explícitos:
   - `inferred`: mapeamento unívoco e direto (ex.: *"Cardboard"* $\rightarrow$ papelão).
   - `ambiguous`: formas polissêmicas ou rótulos conflitantes (ex.: *"Bottle"* $\rightarrow$ candidatos: plástico e vidro).
   - `unverified`: confiança insuficiente ou ausência de regras aplicáveis (ex.: fotos de mãos, ambiente de fundo ou móveis).
4. **Inspeção Visual Anotada e CLI Local:** Utilitário baseado em Pillow que projeta caixas delimitadoras e banners coloridos com o disclaimer de incerteza, integrado a uma CLI com suporte a execução via bytes diretos (sem custos e sem depender de bucket).
5. **Benchmark Automatizado de Ground Truth:** Utilitário estatístico em `evaluation/evaluate.py` para comparar predições contra conjuntos anotados via CSV, calculando acurácia, precisão, revocação (*recall*), F1-score e matriz de confusão, isolando casos ambíguos.

---

## ⚡ 3. Stack Tecnológica e Decisões de Arquitetura

| Camada | Tecnologia | Decisão Técnica e Racional |
| :--- | :--- | :--- |
| **Computação Serverless** | AWS Lambda (Python 3.11) | Execução sob demanda, escala até zero quando ocioso, sem custo de servidor fixo, com tempo de execução enxuto (~800 ms/imagem). |
| **Armazenamento de Objetos** | Amazon S3 | Ingestão altamente durável e desacoplada, disparador nativo de eventos e ciclo de vida automatizado de 30 dias para controle de custos. |
| **Visão Computacional / AI** | Amazon Rekognition | Serviço gerenciado de detecção semântica que elimina a complexidade e os custos de provisionamento de clusters de GPU dedicados. |
| **Infraestrutura como Código (IaC)** | AWS SAM / CloudFormation | Definição declarativa e versionável de recursos, políticas IAM granulares, gatilhos de eventos e alarmes de métricas. |
| **Processamento de Imagem** | Pillow (PIL 10.2+) | Manipulação eficiente de imagens em memória para projeção geométrica de caixas delimitadoras e renderização de banners informativos. |
| **Testes e Mocking** | pytest 8.0+ / Moto 5.0+ | Execução determinística de testes unitários e de integração com S3 simulado em memória, sem consumir cotas de nuvem e sem custos. |
| **Qualidade e Estilo** | flake8 / black | Garantia de aderência aos padrões da PEP 8 e padronização visual em toda a base de código através do `Makefile`. |
| **Automação de CI/CD** | GitHub Actions | Validação contínua a cada push/PR, executando linters e testes com trava de cobertura mínima configurada em 80%. |
| **Observabilidade e Monitoramento** | Amazon CloudWatch | Emissão de logs estruturados em JSON para consultas via CloudWatch Logs Insights e alarme ativo para qualquer erro de execução (`Errors > 0`). |

### Topologia de Pipeline & Fluxo de Eventos

```
[ Cliente / App / CLI ]
       │
       ▼ (1. Upload JPEG/PNG)
[ s3://bucket/input/ ]
       │
       ▼ (2. Notificação de Evento s3:ObjectCreated)
[ AWS Lambda Handler (Python 3.11 / 256MB) ]
       │
       ├──► (3. Anti-Recursão & Validação de Payload)
       │
       ├──► (4. Chamada rekognition:DetectLabels) ──► [ Amazon Rekognition ]
       │                                                     │
       │◄─── (5. Rótulos, Confiança & Bounding Boxes) ────────┘
       │
       ├──► (6. Motor Heurístico classifier.py)
       │        └── Status: inferred / ambiguous / unverified
       │
       ├──► (7. Grava s3:PutObject) ──► [ s3://bucket/results/ (Payload JSON) ]
       │
       └──► (8. Emite Logs JSON Estruturados) ──► [ CloudWatch Logs & Alarme ]
```

---

## 🛡️ 4. Padrões de Engenharia e Defesa em Profundidade

* **Defesa em Duas Camadas contra Loops Recursivos:**
  Em arquiteturas de bucket único com Lambda, funções que escrevem no mesmo bucket correm risco de auto-invocação infinita (`ObjectCreated` $\rightarrow$ Lambda $\rightarrow$ `PutObject` $\rightarrow$ `ObjectCreated`). O EcoVision implementa duplo isolamento:
  1. *Camada de Infraestrutura (SAM):* Filtro estrito de notificação para acionar somente prefixos `input/` e extensões de imagem permitidas (`.jpg`, `.jpeg`, `.png`).
  2. *Camada de Código (Handler):* Validação defensiva imediata no início do handler (`src/lambda_handler.py`), descartando qualquer chave fora de `input/` antes de qualquer chamada ao Rekognition.
* **Arquitetura Limpa e Funções Puras:** O motor de classificação (`src/classifier.py`) é desacoplado do SDK Boto3 e de dependências de rede. Toda a lógica de decisão é pura, determinística e instantaneamente testável.
* **Princípio do Menor Privilégio no IAM:** Políticas granulares configuradas no `template.yaml` concedendo `s3:GetObject` apenas em `input/*`, `s3:PutObject` apenas em `results/*` e `rekognition:DetectLabels` sem permissões administrativas excedentes.
* **FinOps e Governança de Custos:** Ciclo de vida (Lifecycle Rule) configurado no S3 expirando automaticamente todos os uploads após 30 dias, limite defensivo de 5 MB por arquivo e guia de configuração de AWS Budget de US$ 5,00/mês.

---

## 🧪 5. Qualidade de Engenharia & Testes In-Memory

A suíte de testes foi projetada para rodar localmente e em CI sem qualquer dependência de credenciais ativas da nuvem, eliminando custos e latência de rede:

* **26 Testes Automatizados:** Cobrindo testes unitários da lógica de regras, injeção de dependência do client Rekognition, projeção de anotações com Pillow, integração completa do Lambda com bucket simulado em memória via Moto e tratamento de exceções.
* **Tempo de Execução:** Suíte inteira executada em **1,95 segundo**.
* **Cobertura de Código de 85%** aferida via `pytest-cov`:
  - `src/classifier.py`: **93%**
  - `src/rekognition_client.py`: **92%**
  - `src/visualize.py`: **89%**
  - `src/config.py`: **88%**
  - `src/lambda_handler.py`: **83%**
  - `src/local_run.py`: **70%**
* **Pipeline de CI/CD no GitHub Actions:** Execução automática de `flake8` (PEP 8), `black --check` e `pytest` com barreira rigorosa de falha caso a cobertura caia abaixo de 80% (`--cov-fail-under=80`).

---

## 📊 6. Resultados, Métricas e FinOps

### Métricas Comprovadas do Sistema
* **Tempo Médio de Processamento:** **~800 ms a 850 ms** por imagem na função Lambda dimensionada com 256 MB em `us-east-1`.
* **Custo Base sob o AWS Free Tier:** **US$ 0,00/mês** (contemplando até 5.000 imagens/mês no Rekognition, 1 milhão de requisições no Lambda e 5 GB de armazenamento no S3).
* **Custo Estimado em Escala Leve (10.000 imagens/mês):** Apenas **~US$ 5,13/mês** (sendo US$ 5,00 referentes ao Amazon Rekognition e US$ 0,13 para Lambda e S3).
* **Armazenamento Efêmero Automatizado:** 100% dos arquivos brutos e inferências removidos automaticamente após 30 dias via regra de ciclo de vida do S3.

### Evidência de Saída JSON de Inferência:
Abaixo, o payload estruturado persistido em `results/` demonstrando a classificação ambígua fundamentada de uma garrafa d'água:

```json
{
  "image": "water_bottle.jpeg",
  "analyzed_at": "2026-10-10T03:29:50.883415+00:00",
  "detected_objects": [
    { "label": "Bottle", "confidence": 99.99, "instances": [] },
    { "label": "Plastic", "confidence": 98.92, "instances": [] },
    { "label": "Water Bottle", "confidence": 98.29, "instances": [] },
    { "label": "Shaker", "confidence": 90.68, "instances": [...] }
  ],
  "material_classification": {
    "label": "other",
    "classification_status": "ambiguous",
    "candidates": ["glass", "plastic"],
    "reason": "Ambiguous classification: matched label(s) (Bottle, Plastic, Water Bottle) point to multiple potential categories (glass, plastic). Material cannot be determined with certainty without physical inspection.",
    "matched_labels": ["Bottle", "Plastic", "Water Bottle"]
  },
  "disclaimer": "Material is inferred from object labels, not verified."
}
```

---

## 🚀 7. Roadmap & Próximas Evoluções

* [ ] **Integração com Amazon API Gateway:** Criação de endpoints RESTful para geração de URLs pré-assinadas (`POST /upload-url`) e consulta de resultados (`GET /results/{id}`) para consumo por aplicações mobile e web.
* [ ] **Arquitetura Dual-Head com Modelo Customizado:** Avaliação comparativa entre o Amazon Rekognition e um modelo leve customizado (ex.: YOLOv10 / MobileNetV4) treinado nos datasets TACO (*Trash Annotations in Context*) e TrashNet.
* [ ] **Fila de Mensageria Resiliente (SQS + DLQ):** Implementação de fila intermediária para amortecimento de picos massivos de uploads simultâneos e tratamento avançado de falhas transitórias em lote.
* [ ] **Interface Web Interativa (React / Vite):** Frontend para upload por arrastar-e-soltar (*drag-and-drop*) com renderização imediata do JSON de inferência e da imagem anotada.

---

## 💼 8. Perguntas Técnicas & Arquitetura em Entrevistas

1. **"Por que usar o Amazon Rekognition em vez de treinar um modelo próprio de visão?"**  
   *Resposta:* Para um pipeline serverless orientado a eventos, o Rekognition fornece detecção semântica imediata e robusta sem custos de manutenção ou provisionamento de GPUs dedicadas. Isso permitiu focar o esforço de engenharia na arquitetura serverless, na segurança do pipeline e no motor de regras de incerteza, mantendo o custo em zero no Free Tier.

2. **"Como você evitou que a escrita do arquivo de resultado no S3 gerasse um loop infinito no Lambda?"**  
   *Resposta:* Adotei defesa em duas camadas: na infraestrutura via AWS SAM, configurei filtros de evento para acionar apenas chaves sob o prefixo `input/` com extensões de imagem. No código do handler, validei explicitamente o caminho antes de qualquer processamento, abortando imediatamente se a origem estiver fora de `input/` e garantindo isolamento total de escrita em `results/`.

3. **"Por que você criou um status 'ambíguo' em vez de sempre retornar a categoria mais provável?"**  
   *Resposta:* Porque a visão RGB tradicional reconhece silhuetas visuais, não polímeros químicos. Dizer que uma garrafa é plástico quando ela pode ser de vidro contamina cadeias reais de reciclagem. Na engenharia, assumir incertezas explicitamente com os status `inferred`, `ambiguous` e `unverified` protege o negócio contra decisões erradas baseadas em falsas certezas da IA.
