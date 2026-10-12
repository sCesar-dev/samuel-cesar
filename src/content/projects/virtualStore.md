---
title: "Virtual Music Store"
description: "Sistema e-commerce full stack integrando API REST em Spring Boot com frontend Angular."
techs: ["Java", "Spring Boot", "Angular", "TypeScript"]
stack: "Backend & Frontend"
github: "#"
live: "#"
featured: false
order: 10
images: 
  - "/images/a_onda/a_onda_img1.png"
videos:
  - "/images/a_onda/website-video.webm"
---

## Virtual Music Store - Full Stack Project [(Click Here to acess)](https://github.com/sCesar-dev/LojaVirtual)

Developers: [sCesar-dev](https://github.com/sCesar-dev), [AnaPaulaSPin](https://github.com/AnaPaulaSPin), [Kessia-Silva](https://github.com/Kessia-Silva) and [rsantan4](https://github.com/rssantan4)

Complete e-commerce system for selling music CDs, integrating a **Spring Boot REST API** with an **Angular Frontend**.

Developed as the final project for the **Programming Language III** course (**Information Systems - UNEB**).

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
