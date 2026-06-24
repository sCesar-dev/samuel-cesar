---
title: "Academical Projects Compilation 1"
description: "Compiled from other projects done during my academic period, exploring other stacks."
techs: ["Python", "Flask", "Algorithms", "B-Trees"]
github: "#"
live: "#"
images: 
  - "/images/uneb.png"
  - "/images/a_onda/img1.png"
---

# Academical Projects Compilation 1
Compiled from other projects done during my academic period, exploring other stacks. Here, I put all projects from 1 to 4 semesters.

## Virtual Music Store - Full Stack Project

Complete e-commerce system for selling music CDs, integrating a **Spring Boot REST API** with an **Angular Frontend**.

Developed as the final project for the **Programming Language III** course (**Information Systems - UNEB**).

---

<video src="/images/a_onda/website-video.webm" autoplay loop muted playsinline class="w-full rounded-xl my-4 shadow-lg"></video>

---

### Technologies and Architecture

The project was divided into two main modules:

#### ☕ Backend (API)

* **Java 21**
* **Spring Boot 3** (Web, Data JPA, Validation)
* **H2 Database** (In-memory database)
* **Lombok** & **Maven**

#### 🅰️ Frontend (Interface)

* **Angular** (SPA Framework)
* **JavaScript and TypeScript**
* **HTML5 / CSS3**

---

### ⚙️ System Features

The system fulfills the proposed functional requirements (details available in the project PDF), including:

* **🎧 Music Catalog:** Album browsing with genre filtering and search by name. Automatic initial loading of **100 products**.
* **🛒 Smart Shopping Cart:** Automatic cart creation per user, real-time total calculations, and data persistence.
* **👤 User Management:** Full user registration with address information (ZIP Code, City, State) and profile editing.
* **📦 Orders:** Purchase checkout and order history tracking.
* **🛡️ Administrative Dashboard:** Full control (CRUD) over Products and Music Genres, including integrity validations (e.g., preventing deletion of genres currently in use).

---

### 🧪 Initial Data (Seed)

The system starts with **2 test users** and **100 preloaded products**:

* **Admin:** `admin@loja.com` / `senha1234`
* **Customer:** `cliente@loja.com` / `senha1234`

---

### 👨‍💻 Development Team

* **Rafael & Samuel** – *Backend & API*
* **Késsia & Ana** – *Frontend Development and Integration*

State University of Bahia (UNEB) - 2025

## PetCare System[(Click Here to acess)](https://github.com/sCesar-dev/Veterinary-clinic)

Developers: [sCesar-dev](https://github.com/sCesar-dev), [zabeldsc](https://github.com/zabeldsc)

**PetCare System** is a desktop solution developed in Java to automate and manage the operational workflow of veterinary clinics. The system centralizes everything from pet owner and patient registration to detailed clinical control, including vaccine management and automated billing.

The goal of this project is to demonstrate the practical application of solid Software Engineering and Object-Oriented Programming (OOP) concepts to solve real-world business problems.

### Key Features

* **Medical Records Management:** A complete history system allowing the registration and consultation of diagnoses, treatments, and clinical evolution of animals.
* **Smart Vaccine Card:** A module dedicated to immunological control, monitoring application dates and automatically calculating due dates/returns.
* **Automated Billing System:** Financial integration that calculates the total service value by summing consultations (based on the veterinarian's specialty) and vaccines administered on the day.
* **Fluid GUI:** Interface built with **Java Swing** using the `CardLayout` manager, providing intuitive and fast navigation between screens without opening multiple windows (Single Window Application).

### Architecture and Design

The project was structured following the pillars of **Object-Oriented Programming (OOP)**:

* **Inheritance:** Used to model the hierarchy of users and employees.
* *Example:* The `Veterinario` class extends `Funcionario`, inheriting common attributes and adding specifics such as CRMV (Medical License) and Specialty.
* *Example:* The `Tutor` (Owner) class extends `Pessoa` (Person).


* **Encapsulation:** All attributes of model classes (`Animal`, `Consulta`, `Agendamento`) are private and accessed via getter and setter methods, ensuring data integrity.
* **Polymorphism:** Applied in the generic treatment of lists and the manipulation of derived objects.
* **Organization:** The code is separated into logical packages (`vet.clinic`), clearly distinguishing between model classes, screens (Views), and control logic (`Sistema`).

### Technologies Used

* **Language:** Java (JDK 8+)
* **GUI:** Swing (JFrame, JPanel, CardLayout)
* **Date Handling:** Java Time API (`LocalDate`, `LocalDateTime`, `DateTimeFormatter`) for precision in scheduling and due dates.
* **IDE:** NetBeans

## Process Linux Monitor[(Click Here to acess)](https://github.com/sCesar-dev/linux_process_monitor)
Application that interacts directly with calls to the operating system to monitor running processes