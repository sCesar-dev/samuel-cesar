---
title: "AirFlow - Motor de Otimização Logística & Indexação de Rotas"
description: "Sistema de roteamento e indexação de malha aérea com algoritmo de Dijkstra em grafos e Árvore-B para consultas O(log n)."
techs: ["Python", "Flask", "Graph Algorithms", "B-Trees", "Folium", "Geopy"]
stack: "Data Engineering & Algorithms"
category: "data-engineering"
categoryLabel: "Engenharia de Dados & Algoritmos"
oneLinerImpact: "Roteamento de menor custo com algoritmo de Dijkstra em grafos e busca cadastral O(log n) via Árvore-B em memória."
hardwareBadges: ["In-Memory B-Trees", "Graph Engine", "Flask REST", "Geospatial Folium"]
technicalHighlights:
  - "Indexador customizado de Árvores-B eliminando overhead de varreduras lineares (O(n) -> O(log n)) em bases cadastrais."
  - "Modelagem da malha aérea em grafos direcionados ponderados com Dijkstra para cálculo ótimo de conexões e milhas."
  - "Pipeline de geocodificação e projeção dinâmica de trajetórias no navegador com Folium e Geopy."
metrics:
  "Busca": "O(log n)"
  "Algoritmo": "Dijkstra Grafos"
  "Storage": "Index B-Tree"
featured: true
order: 3
github: "https://github.com/sCesar-dev/AirFlow"
live: "#"
images: 
  - "/images/airflow/img1.png"
videos:
  - "/images/airflow/vid1.webm"
---

# AirFlow System

## AirFlow System[(Click Here to access)](https://github.com/sCesar-dev/AirFlow)

Developers: [sCesar-dev](https://github.com/sCesar-dev), [zabeldsc](https://github.com/zabeldsc)

**AirFlow System** is a web-based solution developed in Python and Flask to automate and manage the operational workflow of commercial airlines. The system centralizes flight registrations, passenger data management, and ticketing, featuring route calculation and interactive geospatial visualization.

The goal of this project is to demonstrate the application of Data Structures, Software Engineering, and Object-Oriented Programming (OOP) concepts to solve real-world logistical problems.

### Key Features

* **Route Optimization (Dijkstra's Algorithm):** A graph-based pathfinder that calculates the most economical flight route (cheapest ticket price) between cities, tracking connections, total miles, and total price.
* **Geospatial Flight Mapping:** Integration with **Folium** and **Geopy** to geocode airports and render interactive, dynamic maps highlighting flight trajectories and connecting airports directly in the browser.
* **High-Performance Passenger Indexing:** A custom-built **B-Tree** structure (`ArvoreB`) that enables rapid indexing and searching of client databases by CPF or name prefixes.
* **Complete Flight & Passenger Administration:** Admin dashboard to register flights, manage schedules, and quickly lookup passengers, alongside a passenger portal to search routes, book flights, and view travel history.

### Architecture and Design

The project was structured following the pillars of modular programming and clean software design:

* **Graph Representation:** Airports are modeled as nodes, and flights are represented as directed edges containing ticket prices, miles, and aircraft types.
* **Custom Indexes (B-Tree):** Implemented from scratch to avoid linear scan overhead. Passenger search (either exact search by CPF or prefix autocomplete by name) scales logarithmically ($O(\log n)$).
* **Data Separation:** Clear division of responsibilities through Flask Blueprints (`admin_bp`, `passageiro_bp`, `user_bp`), and a dedicated data access layer (`data.py`) managing CSV (passengers) and JSON (flights/reservas) serialization.

### Technologies Used

* **Language:** Python (3.x)
* **Web Framework:** Flask
* **Data Structures:** Custom B-Tree and Graph structures (using Python's `heapq` for Dijkstra)
* **Geospatial & Visualization:** Folium (map rendering) & Geopy (Nominatim geocoding)
* **Date & Time:** Python `datetime` and `time` modules
* **Storage:** JSON and CSV (using native Python modules)

---

## How to Run the Project

Follow the steps below to set up and run the project locally.

### Prerequisites

* Python 3.x
* `pip` (Python package manager)

### Installation & Run

1. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask application:**
   ```bash
   python3 run.py
   ```

4. **Access the application in your browser:**
   * Main portal: http://127.0.0.1:5000/
   * Flight administration: http://127.0.0.1:5000/admin/voos
