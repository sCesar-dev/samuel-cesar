---
title: "TaskCapture"
description: "Mobile app focused on task management via audio transcription, optimizing intern workflow through artificial intelligence and natural language processing."
techs: ["React Native", "Gemini API", "Python"]
github: "#"
live: "#"
images: 
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=TaskCapture+Main"
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=TaskCapture+App"
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=TaskCapture+Settings"
---

# TaskCapture

**TaskCapture** is an innovative mobile application designed to revolutionize the way interns and professionals manage their daily tasks. Through the integration of advanced Artificial Intelligence and Natural Language Processing, the app allows tasks to be captured via audio, automatically and intelligently converting speech into structured action items.

## The Challenge

Early-career professionals and interns often face difficulties documenting and prioritizing tasks received verbally in quick meetings or informal conversations. The challenge was to create a tool that eliminated the friction of manually typing out tasks, reducing lost time and minimizing the risk of forgetting critical details.

## The Solution

We developed TaskCapture using **React Native** to ensure a fluid and cross-platform experience (iOS and Android). The backend, built in **Python**, acts as a processing hub, sending recorded audio to the **Gemini API**. The AI not only transcribes the audio but also understands the context, categorizes the task, extracts mentioned deadlines, and suggests a priority level.

### Key Features
- **One-Tap Audio Recording:** A minimalist interface that allows users to start recording instantly.
- **Smart Transcription:** Highly accurate speech-to-text conversion.
- **Metadata Extraction:** Automatic identification of dates, assignees, and priorities.
- **Task Management (Kanban/List):** Intuitive organization and visualization of created tasks.

## Insights and Results

Integrating the Gemini API demonstrated the power of LLMs (Large Language Models) in daily mobile applications. The architecture had to be optimized to reduce network latency, ensuring the AI's response was fast enough not to break the user experience. Using React Native allowed us to iterate quickly on the UI design, achieving a modern and responsive layout.
