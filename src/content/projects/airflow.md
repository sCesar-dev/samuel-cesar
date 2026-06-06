---
title: "AirFlow - Flight Management"
description: "Advanced flight management system focused on structural performance. Implements Dijkstra's algorithm for routing and B-Trees for data organization."
techs: ["Python", "Flask", "Algorithms", "B-Trees"]
github: "#"
live: "#"
images: 
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=AirFlow+Dashboard"
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=AirFlow+Routes"
---

# AirFlow - Flight Management

AirFlow is a back-end system focused on high performance and scalability for managing airline networks and flight data. The essence of the project lies in the application of classic data structures and algorithms to solve routing, time optimization, and efficient organization problems in vast flight databases.

## The Challenge

Flight management systems handle a massive number of daily queries, including searching for flights, checking routes between airports, and tracking layovers. Storing and querying this information inefficiently results in unacceptable slowness for the end user. The project aimed to build the algorithmic core capable of handling this volume in a highly performant way.

## The Solution

The architecture of AirFlow is divided into two crucial components, accessible through a RESTful API built with **Flask** (Python):

### Data Organization with B-Trees
To guarantee that searches, insertions, and deletions of flight records (identified by unique codes) maintained logarithmic complexity O(log n), even with thousands of records, we manually implemented a B-Tree data structure. This simulates the indexing behavior found in advanced relational databases.

### Routing with Dijkstra's Algorithm
The airline network is modeled as a weighted undirected graph, where vertices represent airports and edges represent flight connections (with weight representing flight duration or ticket cost). Dijkstra's algorithm was implemented to find the shortest/fastest path between any pair of airports in the network, returning the ideal layovers for the passenger.

## Insights and Results

The rigorous structured implementation deepened practical knowledge of graph theory and memory optimization in Python. The system demonstrated consistent low response times in CRUD (Create, Read, Update, Delete) operations on an artificially inflated flight database, and instant calculations of the lowest-cost routes, validating the effectiveness of the chosen structures.
