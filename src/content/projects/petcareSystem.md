---
title: "PetCare System"
description: "Desktop solution to automate and manage the operational workflow of veterinary clinics. The system centralizes everything from pet owner and patient registration to detailed clinical control, including vaccine management and automated billing."
techs: ["Java", "Swing", "OOP"]
stack: "Desktop Application"
github: "#"
live: "#"
featured: false
order: 9
images: 
  - "/images/veterinary_clinic/veterinary_clinic_img1.png"
  - "/images/veterinary_clinic/veterinary_clinic_img2.png"
  - "/images/veterinary_clinic/veterinary_clinic_img3.png"
---

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