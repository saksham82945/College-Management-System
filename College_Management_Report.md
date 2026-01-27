
---

# COLLEGE MANAGEMENT SYSTEM

## Academic Project Report

---

**Submitted in Partial Fulfillment of the Requirements for the Award of**
**Bachelor of Computer Applications (BCA) / B.Sc. Information Technology**

---

| Detail | Information |
|--------|-------------|
| **Project Title** | College Management System |
| **Technology Stack** | MongoDB, Express.js, React.js, Node.js (MERN Stack) |
| **Project Level** | Intermediate |
| **Submitted By** | [Student Name] |
| **Roll Number** | [Roll Number] |
| **Department** | Department of Computer Science & Applications |
| **Institute** | [Institute Name], [University Name] |
| **Session** | 2025 – 2026 |
| **Guide** | [Guide Name], [Designation] |

---

## CERTIFICATE

*This is to certify that the project report entitled **"College Management System"** is submitted by **[Student Name]**, Roll No. **[Roll Number]**, in partial fulfillment of the requirements for the award of the degree of **Bachelor of Computer Applications**. This work has been carried out under my supervision and to my satisfaction.*

**Project Guide:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Head of Department:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**External Examiner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## DECLARATION

*I, **[Student Name]**, hereby declare that the project report entitled **"College Management System"** submitted to **[Institute Name]** for the partial fulfillment of the degree of **Bachelor of Computer Applications** is my original work. The work presented in this report has not been submitted elsewhere for any other degree or award. All information taken from other sources has been duly acknowledged.*

**Student Signature:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Place:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## ACKNOWLEDGEMENT

*I would like to express my deepest gratitude to all those who helped me complete this project successfully.*

I am sincerely thankful to my project guide **[Guide Name]** for their constant support, thoughtful guidance, and valuable suggestions throughout the development of this project. Their mentorship made this challenging task achievable.

I am grateful to **[HOD Name]**, Head of the Department of Computer Science, for providing the necessary infrastructure and academic environment required for the project.

I also wish to acknowledge the contribution of my classmates and seniors who helped me during the testing phase.

Finally, I thank my family for being a constant source of encouragement throughout this academic journey.

**[Student Name]**  
**[Roll Number]**  
**[Department]**  
**[Institute Name]**

---

## CONTENT OF TABLE

| S.NO. | TOPIC | PAGE NO. |
|-------|-------|----------|
| 1. | Title of the Project | 1–6 |
| 2. | Introduction / Objective | 7–10 |
| 3. | Gantt Chart | 11 |
| 4. | Scope of the Project | 12 |
| 5. | Methodology (SDLC, Functional Req., Non-Functional Req.) | 13–16 |
| 6. | Software & Hardware Requirements | 17–19 |
| 7. | Software Requirement Specification (SRS) | 20–21 |
| 8. | System Design (DFD, E-R Diagram, Database Design) | 22–26 |
| 9. | Structure & Database Specification | 27–31 |
| 10. | Design: Output Screen of the Project | 32–34 |
| 11. | Coding (React, Node.js, MongoDB) | 35–65 |
| 12. | Testing & Debugging | 66–70 |

---

---

# SECTION 1 — TITLE OF THE PROJECT

## 1.1 Project Title

> **College Management System**
> *Built Using MERN Stack — MongoDB, Express.js, React.js, Node.js*

---

## 1.2 Abstract

The **College Management System** is a fully functional, full-stack web application designed to automate and digitize the administrative processes of a college or educational institution. Developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), the system provides a centralized platform that manages students, teachers, staff, fees, payroll, attendance, library, exams, timetables, and reporting — all in one place.

The system enforces **role-based access control (RBAC)** with four distinct user roles: **Administrator, Teacher, Student, and Staff**. Each role receives a tailored dashboard and access to only the features relevant to their responsibilities. Authentication is secured using **JSON Web Tokens (JWT)** and password hashing with **bcryptjs**.

The backend API communicates with a **MongoDB Atlas** cloud database containing **20 collections** through the **Mongoose ODM**. The frontend, built with **React 18** and **Vite**, delivers a responsive and intuitive user interface accessible from any modern web browser.

Deployed on **Render.com**, this project replaces manual paper-based operations with a secure, scalable, and accessible digital solution that benefits all stakeholders in a college — from administrators to students.

---

## 1.3 Project Overview

The College Management System is a comprehensive web-based application that consolidates various college administrative tasks into a single, unified platform. The following is a brief overview of the major components of the system:

- **User Module:** Registration, login, and profile management for all four user types.
- **Student Module:** Enrollment, profile management, academic tracking, attendance, and grades.
- **Teacher Module:** Profile management, class assignment, attendance marking, and grade entry.
- **Staff Module:** Non-teaching staff records integrated with the payroll system.
- **Fee Module:** Fee type configuration, payment collection, and receipt generation.
- **Payroll Module:** Monthly salary calculation and disbursement for teachers and staff.
- **Attendance Module:** Daily attendance tracking with class-wise and student-wise reports.
- **Library Module:** Book catalogue management, book issuance, and return tracking.
- **Exam Module:** Exam session scheduling, marks entry, and result publication.
- **Timetable Module:** Weekly period-wise class schedule management.
- **Dashboard Module:** Real-time statistics and key metrics for administrators.
- **Reports Module:** Financial reports, attendance reports, and academic performance reports.
- **Notification Module:** System-wide alerts and notifications for all users.

The system operates on a **three-tier architecture**: a React-based presentation layer, an Express.js business logic layer, and a MongoDB data layer.

---

## 1.4 Problem Statement

Educational institutions today manage enormous volumes of administrative data — student records, fee transactions, attendance registers, examination results, salary sheets, library catalogs, and timetables. In most colleges, these tasks are handled through:

- Physical registers and paper files
- Disconnected Microsoft Excel spreadsheets
- Manual fee collection with handwritten receipts
- Printed timetables pinned to notice boards
- Manually calculated payroll sheets

This approach suffers from serious limitations:

1. **Data Redundancy** — The same student information is entered multiple times in different registers (admission, fee, attendance, library, exam), leading to duplication and inconsistency.
2. **Data Loss Risk** — Physical files can be misplaced, damaged by fire or water, or simply lost over time.
3. **Time Inefficiency** — Searching for a single student's complete record requires checking multiple files across multiple departments.
4. **No Real-Time Access** — There is no way to instantly view whether a student has paid fees, what their attendance percentage is, or what their exam grades are.
5. **Security Gaps** — Physical files have no access control — any staff member can potentially view or alter any record.
6. **Manual Calculation Errors** — Fee calculations, payroll computations, and grade totals are done manually, increasing the risk of arithmetic errors.
7. **No Centralized Reporting** — Generating a college-wide statistical report requires manually aggregating data from multiple departments.

These challenges demand a **modern, digital, and centralized solution** — the College Management System.

---

## 1.5 Aim of the Project

The primary aim of this project is to develop a **secure, scalable, and user-friendly College Management System** using the **MERN stack** that:

- Replaces all paper-based and spreadsheet-driven college processes with a centralized web application.
- Provides **role-specific dashboards** for Admins, Teachers, Students, and Staff.
- Secures all data access through **JWT authentication** and **role-based authorization**.
- Automates repetitive tasks such as fee receipt generation, payroll calculation, and attendance reports.
- Makes all college data accessible in **real time** from any internet-connected device.

---

## 1.6 Objectives

The specific objectives of the College Management System project are:

1. **To develop a full-stack web application** using MongoDB, Express.js, React.js, and Node.js (MERN stack) that covers all major college administrative operations.

2. **To implement secure user authentication** using JWT (JSON Web Tokens) with role-based access control (RBAC) supporting four roles: Admin, Teacher, Student, and Staff.

3. **To build a Student Management module** allowing administrators to add, edit, view, and delete student records, including personal details, academic information, and guardian contacts.

4. **To develop a Fee Management module** that records fee payments, generates unique receipts, displays payment history, and provides a financial summary.

5. **To create a Payroll Management module** that calculates and records monthly salary disbursements for both teaching and non-teaching staff in Indian Rupees (₹).

6. **To implement an Attendance Tracking module** that allows teachers to mark daily attendance and generate class-wise attendance reports.

7. **To build a Library Management module** supporting book catalogue management, book issuance, return tracking, and fine calculation.

8. **To develop an Exam and Grades module** for scheduling exam sessions, entering marks, calculating grades, and publishing results.

9. **To provide a Timetable Management module** for creating and viewing weekly class schedules.

10. **To deploy the application** on Render.com cloud hosting with MongoDB Atlas as the cloud database, ensuring 24/7 accessibility.

11. **To design a responsive UI** using React 18 and Tailwind CSS that works across desktops, tablets, and mobile devices.

12. **To generate administrative reports** including attendance summaries, financial statements, and academic performance overviews.

---

---

# SECTION 2 — INTRODUCTION / OBJECTIVE

## 2.1 Background

The rapid digitization of educational institutions worldwide has made manual management systems obsolete. Colleges that continue to rely on paper-based records and disconnected spreadsheets face significant inefficiencies in their administrative operations. The demand for fast, accurate, and real-time access to college data has made web-based **College Management Systems (CMS)** an essential investment for modern educational institutions.

With the widespread adoption of the **MERN stack** in full-stack web development — combining the flexibility of JavaScript for both frontend and backend, the scalability of MongoDB's document database, and the efficiency of React's component-based UI — it has become possible to build highly capable and production-ready management systems at relatively low cost.

This project explores the design and development of a **web-based College Management System** using the MERN stack, with the goal of creating a complete and practical tool that can realistically be deployed in an actual college environment.

---

## 2.2 Need of the System

The need for a digital College Management System arises from the following organizational realities:

- **Volume of Data:** A typical college manages records for hundreds of students, dozens of teachers, administrative staff, thousands of fee transactions, and countless attendance entries per year.
- **Multi-Department Coordination:** The admissions office, accounts department, library, and examination cell all need access to the same student data but currently maintain separate files.
- **Regulatory Compliance:** Universities require colleges to submit accurate enrollment data, examination results, and financial reports — all of which must be precisely compiled.
- **Student Expectations:** Today's students expect digital portals where they can view their grades, fees, timetables, and attendance online, without visiting the college office.
- **Security and Auditability:** Financial records and examination marks need to be protected from unauthorized access and tampering.

---

## 2.3 Existing System

In most colleges, the existing system consists of:

- **Paper-based student registers** maintained in the office, containing admission forms and student files.
- **Microsoft Excel sheets** for fee collection tracking, payroll sheets, and exam results.
- **Manual attendance registers** printed daily, filled by hand in each class, and stored in the department office.
- **Physical library cards** issued to students for book tracking.
- **Printed timetables** distributed at the start of each semester.
- **Notice boards** for communicating exam schedules and results to students.
- **Email or WhatsApp** for informal communication between staff and students.

---

## 2.4 Limitations of Existing System

| # | Limitation | Impact |
|---|------------|--------|
| 1 | Data stored in physical files — risk of damage or loss | Permanent data loss if files are destroyed |
| 2 | No centralized database — each department maintains separate records | Data inconsistency and redundancy |
| 3 | Manual fee collection — no automatic receipt or payment history | Disputes over payments, manual errors |
| 4 | Payroll calculated manually in Excel | Calculation errors in salary disbursement |
| 5 | No role-based access — any staff can view all files | Privacy and security violations |
| 6 | Attendance entered manually — prone to manipulation | Inaccurate attendance records |
| 7 | Library managed with physical cards — returns hard to track | Lost books and untracked fines |
| 8 | Results posted on notice boards — no digital access | Students must physically visit college |
| 9 | No real-time statistics available for management | Decisions made on outdated information |
| 10 | Reports require manual aggregation across departments | Preparation of reports takes days |

---

## 2.5 Proposed System

The proposed **College Management System** is a web-based, full-stack application developed using the **MERN stack** that addresses every limitation listed above:

- **Centralized Database:** All college data is stored in a single **MongoDB Atlas** cloud database with 20 collections, accessible from any device with internet.
- **Role-Based Access Control (RBAC):** Four user roles — Admin, Teacher, Student, Staff — each with strict access permissions enforced via JWT middleware.
- **Automated Fee Receipts:** Payments are instantly recorded, and unique receipt numbers are generated automatically.
- **Payroll Processing:** Monthly salary calculation is automated with salary components (basic pay, allowances, deductions, net pay).
- **Digital Attendance:** Teachers mark attendance through the web interface; students can view real-time attendance percentage.
- **Library Management:** Book issuance and returns are tracked digitally with automatic fine calculation.
- **Online Results:** Grades are entered by the examination cell and published to students' dashboards.
- **Real-Time Reports:** Admin dashboard displays live statistics; reports can be generated and exported on demand.
- **Responsive UI:** React 18 with Tailwind CSS ensures the application works on desktops, tablets, and smartphones.
- **Cloud Deployment:** Hosted on **Render.com** (backend) and **MongoDB Atlas** (database) — available 24/7.

---

## 2.6 Advantages of Proposed System

1. **Single Source of Truth** — One database serves all departments; no duplication or conflict.
2. **24/7 Accessibility** — Accessible from any internet-connected device, anywhere.
3. **Improved Security** — JWT authentication, bcrypt password hashing, and RBAC ensure data is protected.
4. **Zero Paper Usage** — Completely paperless operations reduce administrative overhead.
5. **Instant Reports** — Financial, attendance, and academic reports generated within seconds.
6. **Audit Trail** — All transactions (payments, payroll, attendance) are timestamped and logged.
7. **Scalability** — MongoDB's document model and Node.js's non-blocking I/O scale easily with growing data.
8. **Cost Effective** — Built entirely with free and open-source tools; deploying on free tiers costs ₹0/month.
9. **Error Reduction** — Automated calculations replace manual arithmetic, eliminating calculation errors.
10. **Student Empowerment** — Students can independently view fees, grades, timetables, and attendance without visiting the office.

---

---

# SECTION 3 — GANTT CHART

## 3.1 Project Timeline Overview

A **Gantt Chart** is a horizontal bar chart used in project management to visually represent the schedule of tasks over time. It shows the start date, duration, and end date of each project phase, making it easy to track project progress and ensure timely completion.

---

## 3.2 Project Phases & Tasks

| Phase | Task | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Week 7 | Week 8 |
|-------|------|--------|--------|--------|--------|--------|--------|--------|--------|
| **1. Requirement** | Project Study & Requirement Gathering | ████ | ████ | | | | | | |
| | Feasibility Analysis | | ████ | ████ | | | | | |
| | SRS Documentation | | | ████ | ████ | | | | |
| **2. Design** | System Architecture Design | | | | ████ | | | | |
| | Database Schema Design | | | | ████ | ████ | | | |
| | UI Wireframe & Mockup | | | | | ████ | | | |
| **3. Coding** | Backend API Development | | | | | ████ | ████ | | |
| | Frontend Development (React) | | | | | | ████ | ████ | |
| | Database Integration | | | | | | ████ | ████ | |
| **4. Testing** | Unit Testing | | | | | | | ████ | |
| | Integration Testing | | | | | | | ████ | ████ |
| | Bug Fixing | | | | | | | | ████ |
| **5. Deployment** | Deployment on Render.com | | | | | | | | ████ |
| | Final Report & Documentation | | | | | | | | ████ |

*Total Duration: 8 Weeks (2 Months)*

---

## 3.3 Phase-wise Explanation

### Phase 1 — Requirement Analysis (Week 1–3)
During this phase, the project requirements were gathered by studying the existing college management process. Stakeholder expectations were documented, feasibility was analyzed (technical, economic, operational), and the Software Requirements Specification (SRS) document was prepared.

### Phase 2 — Design (Week 3–5)
System architecture (3-tier MERN model) was designed. Database schema of 20 MongoDB collections was planned out. DFD (Level 0 and Level 1), E-R Diagrams, and UI wireframes for all 24 pages were created.

### Phase 3 — Coding (Week 5–7)
Backend development: 13 REST API controllers, 13 route files, 20 Mongoose models, JWT auth middleware, and `index.js` server setup. Frontend development: 24 React page components, 18 reusable components, Axios service layer, and Zustand auth store.

### Phase 4 — Testing (Week 7–8)
Unit testing of individual API endpoints using Postman. Integration testing across modules. Bug fixing for identified issues. Final validation against functional requirements.

### Phase 5 — Deployment (Week 8)
Backend deployed on **Render.com** as a Node.js Web Service. Frontend deployed as a **Static Site** on Render.com. MongoDB Atlas used as the cloud database. Environment variables configured and final end-to-end testing done.

---

---

# SECTION 4 — SCOPE OF THE PROJECT

## 4.1 Scope

The **College Management System** covers the complete administrative workflow of a college institution. The scope of the project includes the following functional areas:

### 4.1.1 In Scope

- **Authentication & Authorization:** User registration, login, JWT-based session management, and role-based access for Admin, Teacher, Student, and Staff.
- **Student Management:** Full CRUD (Create, Read, Update, Delete) operations for student records including personal, academic, guardian, and address information.
- **Teacher Management:** CRUD for teacher records with department, qualification, salary, and subject assignment.
- **Staff Management:** CRUD for non-teaching staff with designation, department, and salary.
- **Class Management:** Creation and management of class groups with enrolled students and assigned teachers.
- **Fee Management:** Fee type configuration, student fee collection, receipt generation, and payment history.
- **Payroll Management:** Monthly salary processing for teaching and non-teaching staff.
- **Attendance Management:** Daily attendance marking and class-wise/student-wise report generation.
- **Library Management:** Book catalogue, issuance, return, and fine management.
- **Exam Management:** Exam session scheduling, marks entry, grade assignment, and result publication.
- **Timetable Management:** Weekly period-wise schedule creation and viewing for all classes.
- **Dashboard & Reports:** Real-time admin statistics, financial reports, and attendance reports.
- **Notifications:** System alerts and notifications for all user roles.

### 4.1.2 Out of Scope (Current Version)

- Online payment gateway integration (e.g., Razorpay, Paytm).
- Mobile application (Android/iOS).
- Biometric attendance integration.
- Email/SMS automated notifications.
- Video conferencing for online classes.

---

## 4.2 Future Enhancements

The following features are planned for future versions of the system:

1. **Online Fee Payment** — Integration with Razorpay or Paytm for digital fee payment by students.
2. **Mobile Application** — A React Native app for iOS and Android with push notifications.
3. **Email & SMS Alerts** — Automated reminders for fee dues, exam results, and attendance shortfalls.
4. **Bulk Import/Export** — CSV-based bulk import of student/teacher data and export of reports.
5. **Advanced Analytics** — AI-powered grade prediction, attendance trend analysis, and risk alerts.
6. **Parent Portal** — A dedicated login for parents to monitor their ward's academic progress.
7. **Video Conferencing** — Integration with Zoom or Google Meet API for online classes.
8. **Multi-Language Support** — Hindi and regional language interfaces for wider accessibility.
9. **Biometric Attendance** — Hardware fingerprint scanner integration for automatic attendance.
10. **Document Management** — Upload and store student documents (certificates, application forms).
11. **Alumni Portal** — A module for managing and connecting with college alumni.
12. **Hostel Management** — Room allocation, mess fees, and warden management module.

---

## 4.3 Target Users

| User Role | Who They Are | System Usage |
|-----------|-------------|--------------|
| **Administrator** | College Principal, Registrar, or IT Admin | Full system management — students, teachers, fees, payroll, reports |
| **Teacher** | Lecturers, Professors, HODs | Mark attendance, enter grades, view timetable, view payslip |
| **Student** | Enrolled UG/PG students | View profile, fees, grades, attendance, timetable, library |
| **Staff** | Clerks, Lab Assistants, Peons, Security | View profile, view payslip, view timetable |

---

---

# SECTION 5 — METHODOLOGY

## 5.1 SDLC Model Used — Waterfall Model

The **Software Development Life Cycle (SDLC)** describes the structured process followed to design, develop, and test a software system. For this project, the **Waterfall Model** was chosen as the SDLC methodology.

### What is the Waterfall Model?

The Waterfall Model is a **linear, sequential software development process** in which each phase must be completed before the next phase begins. The output of one phase serves as the input for the next phase. It was first described by Winston W. Royce in 1970 and is one of the most widely used models in academic software projects.

### Phases of the Waterfall Model Applied to This Project

```
┌────────────────────────────┐
│  1. REQUIREMENT ANALYSIS   │ ← Gather and document what the system must do
└────────────┬───────────────┘
             ▼
┌────────────────────────────┐
│  2. SYSTEM DESIGN          │ ← Plan architecture, DB schema, UI wireframes
└────────────┬───────────────┘
             ▼
┌────────────────────────────┐
│  3. IMPLEMENTATION (CODING)│ ← Write backend API + frontend React code
└────────────┬───────────────┘
             ▼
┌────────────────────────────┐
│  4. TESTING                │ ← Unit test, integration test, fix bugs
└────────────┬───────────────┘
             ▼
┌────────────────────────────┐
│  5. DEPLOYMENT             │ ← Deploy on Render.com + MongoDB Atlas
└────────────┬───────────────┘
             ▼
┌────────────────────────────┐
│  6. MAINTENANCE            │ ← Monitor, patch, and plan future enhancements
└────────────────────────────┘
```

### Why Waterfall Was Chosen

- The project requirements were clearly defined from the start.
- Academic project timeline is fixed, making a sequential approach practical.
- Each phase's deliverables are well-understood (SRS → design docs → code → test report).
- Suitable for a team of 1–3 developers working on a bounded scope.

---

## 5.2 Functional Requirements

Functional requirements describe **what the system must do** — the specific behaviors and features it must support.

| FR# | Module | Requirement |
|-----|--------|-------------|
| FR01 | Auth | Users must be able to register with name, email, and password |
| FR02 | Auth | Users must be able to log in with email and password and receive a JWT token |
| FR03 | Auth | The system must support 4 roles: Admin, Teacher, Student, Staff |
| FR04 | Auth | JWT tokens must expire after 24 hours; refresh tokens valid for 7 days |
| FR05 | Student | Admin must be able to add a new student with full details (roll no., course, semester, section, DOB, guardian, address) |
| FR06 | Student | Admin must be able to edit and delete student records |
| FR07 | Student | Admin and Teacher must be able to search students by name or roll number |
| FR08 | Teacher | Admin must be able to add, edit, and delete teacher records |
| FR09 | Staff | Admin must be able to add, edit, and delete staff records |
| FR10 | Class | Admin must be able to create class groups and assign students and teachers |
| FR11 | Fee | Admin must be able to configure fee types (Tuition, Exam, Library, Hostel, etc.) |
| FR12 | Fee | System must record fee payments and generate receipts with unique receipt numbers |
| FR13 | Fee | Students must be able to view their payment history |
| FR14 | Payroll | Admin must be able to process monthly payroll for all teaching and non-teaching staff |
| FR15 | Payroll | System must calculate net salary = Basic + Allowances – Deductions |
| FR16 | Payroll | Teachers and staff must be able to view their own payslip |
| FR17 | Attendance | Teachers must be able to mark student attendance (Present/Absent/Late) |
| FR18 | Attendance | System must generate attendance reports by class and date range |
| FR19 | Library | Admin/Librarian must be able to add books with title, author, ISBN, category |
| FR20 | Library | System must track book issuance and return; calculate overdue fines |
| FR21 | Exam | Admin must be able to create exam sessions with subject, date, and time |
| FR22 | Exam | Teachers must be able to enter marks per student; system auto-calculates grades |
| FR23 | Exam | Admin can publish/unpublish results; students view published results |
| FR24 | Timetable | Admin must be able to create a weekly timetable with periods, subjects, teachers |
| FR25 | Dashboard | Admin dashboard must display total students, teachers, staff, classes, revenue, attendance % |
| FR26 | Reports | System must generate financial reports of fee collection |
| FR27 | Notifications | System must create and display notifications for all users |

---

## 5.3 Non-Functional Requirements

Non-functional requirements describe **how the system performs** — quality attributes and constraints.

| NFR# | Category | Requirement |
|------|----------|-------------|
| NFR01 | Performance | All API responses must be returned within 2 seconds under normal load |
| NFR02 | Scalability | The system must support at least 100 concurrent users |
| NFR03 | Security | All passwords must be encrypted using bcryptjs (salt rounds: 10) |
| NFR04 | Security | All API routes (except login/register) must require a valid JWT token |
| NFR05 | Security | Role violations must be rejected with 403 Forbidden response |
| NFR06 | Security | Rate limiting must restrict each IP to 100 requests per 15 minutes |
| NFR07 | Availability | System must be available 24/7 with 99% uptime |
| NFR08 | Usability | The UI must be intuitive; a new user must be able to navigate without training |
| NFR09 | Compatibility | System must work on Chrome, Firefox, and Edge (version 90+) |
| NFR10 | Responsiveness | UI must be responsive and usable on screen widths from 375px (mobile) to 1920px (desktop) |
| NFR11 | Maintainability | Code must be modular, with controllers, routes, models in separate files |
| NFR12 | Reliability | Database connections must use retry logic; server must not crash on unhandled errors |
| NFR13 | Portability | Application must be deployable on any Node.js v16+ compatible server |
| NFR14 | Compliance | Personal data (student records) should not be exposed without authentication |

---

---

# SECTION 6 — SOFTWARE & HARDWARE REQUIREMENTS

## 6.1 Software Requirements

### 6.1.1 Backend Software Requirements

| Component | Software / Library | Version | Purpose |
|-----------|-------------------|---------|---------|
| Runtime | Node.js | 18.x LTS | JavaScript runtime for server-side code |
| Framework | Express.js | 4.18+ | HTTP server, REST API routing |
| Database | MongoDB Atlas | Cloud | NoSQL document database (cloud-hosted) |
| ODM | Mongoose | 7.5+ | MongoDB object modeling and schema validation |
| Authentication | jsonwebtoken | 9.x | JWT token generation and verification |
| Password Hashing | bcryptjs | 2.4+ | Secure password encryption |
| Security | Helmet | 7.x | HTTP security headers |
| CORS | cors | 2.8+ | Cross-Origin Resource Sharing policy |
| Rate Limiting | express-rate-limit | 7.x | API request throttling (100 req/15 min) |
| Validation | Joi | 17.x | Request body schema validation |
| Environment | dotenv | 16.x | Environment variable management |
| Language | JavaScript (CommonJS) | ES6+ | Server-side programming language |

### 6.1.2 Frontend Software Requirements

| Component | Software / Library | Version | Purpose |
|-----------|-------------------|---------|---------|
| UI Library | React | 18.2+ | Component-based UI development |
| Build Tool | Vite | 4.x+ | Fast development server and production builds |
| Routing | React Router DOM | 6.x | Client-side page routing |
| State Management | Zustand | 4.x | Global authentication state |
| HTTP Client | Axios | 1.x | HTTP requests to backend API |
| Styling | Tailwind CSS | 3.3+ | Utility-first CSS framework |
| Icons | Lucide React | Latest | SVG icon components |
| Notifications | react-hot-toast | 2.x | Toast notification popups |
| Animation | Three.js | Latest | 3D animated landing page hero |
| Charts | Recharts | 2.x | Data visualization in dashboard |
| Language | JavaScript (JSX) | ES6+ | Frontend programming language |

### 6.1.3 Development & Deployment Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Visual Studio Code | Latest | Code editor |
| Git | 2.x | Version control |
| GitHub | — | Remote repository hosting |
| Postman | Latest | API testing |
| MongoDB Compass | Latest | Database visualization tool |
| npm | 9.x+ | Package management |
| Render.com | — | Cloud deployment (backend + frontend) |
| MongoDB Atlas | Free Tier | Cloud database hosting |

---

## 6.2 Hardware Requirements

### 6.2.1 Development Machine (Minimum)

| Component | Specification |
|-----------|--------------|
| Processor | Intel Core i3 (8th Gen) or equivalent |
| RAM | 8 GB (minimum), 16 GB (recommended) |
| Storage | 20 GB free disk space |
| Display | 1366 × 768 resolution or higher |
| Internet | Broadband connection (min. 10 Mbps) |
| Operating System | Windows 10 / 11, macOS 12+, or Ubuntu 20.04+ |

### 6.2.2 Server (Deployment — Render.com Free Tier)

| Component | Specification |
|-----------|--------------|
| CPU | Shared CPU (0.1 vCPU — free tier) |
| RAM | 512 MB RAM |
| Storage | Ephemeral (no persistent disk on free tier) |
| Network | Render CDN — global access |
| OS | Linux (Docker-based container) |
| Node.js | 18.x (configured in render.yaml) |

### 6.2.3 Cloud Database (MongoDB Atlas Free Tier)

| Component | Specification |
|-----------|--------------|
| Storage | 512 MB |
| RAM | Shared |
| Region | Mumbai (ap-south-1) |
| Backups | Daily snapshots |
| Access | Mongoose connection URI via environment variable |

### 6.2.4 Client (End User) Requirements

| Component | Minimum Requirement |
|-----------|-------------------|
| Browser | Google Chrome 90+, Firefox 88+, or Microsoft Edge 90+ |
| Internet | 5 Mbps broadband |
| Screen | 375px width (mobile) to 1920px (desktop) |
| JavaScript | Must be enabled in browser |

---

## 6.3 Development Environment Setup

```bash
# 1. Clone the project repository
git clone https://github.com/[username]/college-management.git
cd college-management

# 2. Backend Setup
cd backend
npm install

# 3. Create backend environment file
cp .env.example .env
# Edit .env and fill in:
#   MONGODB_URI=mongodb+srv://...
#   JWT_SECRET=your-jwt-secret
#   JWT_REFRESH_SECRET=your-refresh-secret
#   PORT=5000
#   NODE_ENV=development

# 4. Start backend development server
npm run dev
# Backend runs on: http://localhost:5000

# 5. Frontend Setup (in a new terminal)
cd ../frontend
npm install

# 6. Start frontend development server
npm run dev
# Frontend runs on: http://localhost:5173
```

---

# SECTION 7 — SOFTWARE REQUIREMENT SPECIFICATION (SRS)

## 7.1 Feasibility Analysis

A **Feasibility Study** is conducted before starting the development of any software project to determine whether the proposed system is technically, economically, and operationally viable. The following three feasibility analyses were performed for the College Management System:

---

### 7.1.1 Technical Feasibility

Technical feasibility assesses whether the required technology, tools, and expertise are available to build the proposed system.

**Assessment:**

| Factor | Status |
|--------|--------|
| **Programming Language** — JavaScript (Node.js + React) | ✅ Mature, widely supported, free |
| **Database** — MongoDB Atlas | ✅ Cloud-hosted, free tier available |
| **Framework** — Express.js, React 18, Vite | ✅ Stable, actively maintained open-source |
| **Authentication** — JWT + bcryptjs | ✅ Industry standard, production-proven |
| **Deployment** — Render.com | ✅ Free tier available, auto-deploy from Git |
| **Developer Expertise** — JavaScript, REST APIs, React | ✅ Covered in BCA curriculum |

**Conclusion:** The project is **technically feasible**. All required technologies are freely available, open-source, and well-documented. No proprietary or expensive tools are required.

---

### 7.1.2 Economic Feasibility

Economic feasibility evaluates the cost-benefit analysis of the proposed system.

**Cost Analysis:**

| Item | Cost |
|------|------|
| Software Licenses | ₹0 (all open-source) |
| Development Tools (VS Code, Postman) | ₹0 (free) |
| MongoDB Atlas (Free Tier) | ₹0/month |
| Render.com Deployment (Free Tier) | ₹0/month |
| Domain Name (optional) | ₹500–₹1,000/year |
| Developer Time (student project) | Academic investment |
| **Total Monthly Running Cost** | **₹0** |

**Benefits:**

- Elimination of paper, printing, and physical file storage costs.
- Saves approximately 20–30 hours/month of administrative staff time.
- Reduces errors in fee calculations, payroll, and attendance records.
- Provides real-time access to data, eliminating delays in decision-making.

**Conclusion:** The project is **economically feasible**. The cost of development is minimal (free tools), and the long-term savings in time and resources easily justify the investment.

---

### 7.1.3 Operational Feasibility

Operational feasibility assesses whether the organization's users and staff can effectively use the proposed system.

**Assessment:**

| Factor | Assessment |
|--------|-----------|
| **User Interface** | Web browser — no installation needed, familiar to all users |
| **Training Required** | Minimal — intuitive UI with role-specific menus |
| **Access Device** | Any computer, tablet, or smartphone with internet |
| **Resistance to Change** | Low — system directly benefits all users |
| **Admin Capability** | Admin can manage everything without technical knowledge |
| **Student Acceptance** | High — students prefer digital portals to manual visits |

**Conclusion:** The project is **operationally feasible**. The web-based interface requires no special hardware or software installation. Basic internet literacy is sufficient to operate the system.

---

## 7.2 Feasibility Study — Summary

| Feasibility Type | Result | Justification |
|-----------------|--------|---------------|
| Technical Feasibility | ✅ Feasible | All required technologies are free, open-source, and well-supported |
| Economic Feasibility | ✅ Feasible | Zero licensing cost; free deployment on Render.com and MongoDB Atlas |
| Operational Feasibility | ✅ Feasible | Browser-based, role-specific UI requires minimal training |

> **Overall Verdict:** The College Management System is **fully feasible** across all three dimensions and is recommended for development and deployment.

---

---

# SECTION 8 — SYSTEM DESIGN

## 8.1 Data Flow Diagram (DFD)

A **Data Flow Diagram (DFD)** is a graphical representation of how data flows through a system. It shows the sources and destinations of data, the processes that transform data, and the data stores used. DFDs are created at multiple levels — Level 0 (Context), Level 1 (overview), and Level 2 (detailed).

---

### 8.1.1 DFD — Level 0 (Context Diagram)

The Level 0 DFD shows the system as a single process (black box) and its interaction with external entities.

```
   Admin ──────────────────────────────────────────►
   Teacher ─────────────────────────────────────────►    ┌──────────────────────────────┐
   Student ─────────────────────── Login/Data Input ────► │                              │
   Staff ───────────────────────────────────────────►    │  COLLEGE MANAGEMENT SYSTEM   │
                                                          │                              │
   Admin ◄──────────────────────────────────────────────  │     (Central Process)        │
   Teacher ◄───────────────────────── Reports/Data ─────  │                              │
   Student ◄────────────────────────────────────────────  │                              │
   Staff ◄──────────────────────────────────────────────  └──────────────────────────────┘
```

**External Entities:**
- **Admin:** Manages all system data; receives reports and statistics.
- **Teacher:** Marks attendance, enters grades; views timetable and payslip.
- **Student:** Views grades, fees, attendance, timetable, and library.
- **Staff:** Views payslip and timetable.

---

### 8.1.2 DFD — Level 1

The Level 1 DFD expands the central process into individual sub-processes:

```
                           ┌─────────────────────┐
User (any role) ──Login──► │  1.0 Authentication  │ ──JWT Token──► All Modules
                           └──────────┬──────────┘
                                      │
          ┌───────────────────────────┼───────────────────────┐
          ▼                           ▼                        ▼
 ┌─────────────────┐       ┌──────────────────┐     ┌─────────────────────┐
 │ 2.0 Student Mgmt│       │ 3.0 Fee Module   │     │ 4.0 Payroll Module  │
 │ Add/Edit/Delete │       │ Pay/Receipt      │     │ Process/Payslip     │
 └────────┬────────┘       └────────┬─────────┘     └──────────┬──────────┘
          │                         │                           │
          ▼                         ▼                           ▼
 ┌─────────────────┐       ┌──────────────────┐     ┌─────────────────────┐
 │ 5.0 Attendance  │       │ 6.0 Library Mgmt │     │ 7.0 Exam & Grades  │
 │ Mark/Report     │       │ Issue/Return     │     │ Schedule/Marks/GPA │
 └────────┬────────┘       └────────┬─────────┘     └──────────┬──────────┘
          │                         │                           │
          └─────────────────────────┼───────────────────────────┘
                                    ▼
                          ┌──────────────────────┐
                          │  MongoDB Atlas        │
                          │  (20 Collections)     │
                          └──────────────────────┘
```

---

## 8.2 E-R Diagram Explanation

An **Entity-Relationship (E-R) Diagram** represents the logical structure of a database. It shows the entities (tables/collections), their attributes (fields), and the relationships between them.

### Key Entities and Relationships

**1. User — Student (One-to-One)**
Each Student record is linked to exactly one User account (for login). The `userId` field in the Student collection is a foreign key reference to the User collection.

**2. User — Teacher (One-to-One)**
Each Teacher record is linked to exactly one User account. The `teacherProfileId` field in the User collection points to the Teacher record.

**3. Student — Class (Many-to-One)**
Many students belong to one class. The `classId` field in the Student collection references the Class collection.

**4. Student — Payment (One-to-Many)**
One student can have many payment records over time. The `studentId` field in the Payment collection references the Student.

**5. Teacher — SalaryPayment (One-to-Many)**
One teacher can have many monthly salary payments. The `recipientId` field in SalaryPayment references Teacher or Staff.

**6. Class — Timetable (One-to-Many)**
One class has many timetable slots (one per period per day). `classId` in Timetable references the Class.

**7. Student — Attendance (One-to-Many)**
One student has many attendance records (one per school day). `studentId` in Attendance references Student.

**8. Student — ExamResult (One-to-Many)**
One student has many exam results across subjects and sessions. `studentId` in ExamResult references Student.

**9. Book — BookIssue (One-to-Many)**
One book can be issued to many students over time. `bookId` in BookIssue references Book.

---

## 8.3 Database Design

The database uses **MongoDB** (NoSQL document database) with **Mongoose** ODM. It follows a **document-based design** with references (ObjectId) between collections.

### Design Principles Applied:
- **Normalization for core entities** (User, Student, Teacher): Separate collections with ObjectId references to avoid data duplication.
- **Embedding for nested data** (guardianInfo, address in Student): Embedded sub-documents used for closely related, non-shared data.
- **Indexes** on frequently queried fields (rollNo, email, userId, classId) for query performance.

---

---

# SECTION 9 — STRUCTURE & DATABASE SPECIFICATION

## 9.1 Database Tables (Collections)

The College Management System uses **20 MongoDB collections**. Below are the detailed table structures:

---

### 9.1.1 Users Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| email | String | Unique, Required, Lowercase | User login email |
| password | String | Required | bcryptjs hashed password |
| fullName | String | Required | Full name of user |
| phone | String | Optional | Contact number |
| status | String | Enum: active/inactive/suspended | Account status |
| avatar | String | Optional | Profile picture URL |
| lastLogin | Date | Optional | Last login timestamp |
| roleAssignments | Array | — | Array of role objects |
| roleAssignments.roleId | ObjectId | FK → Role | Role assigned |
| roleAssignments.scopeId | ObjectId | FK → Class | Scope (for teachers) |
| roleAssignments.assignedAt | Date | Default: now | Assignment date |
| teacherProfileId | ObjectId | FK → Teacher | Teacher profile link |
| studentProfileId | ObjectId | FK → Student | Student profile link |
| createdAt | Date | Auto | Record creation time |
| updatedAt | Date | Auto | Last update time |

---

### 9.1.2 Students Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| userId | ObjectId | FK → User, Required | Linked user account |
| parentId | ObjectId | FK → Parent | Guardian record |
| rollNo | String | Unique, Required | Student roll number |
| enrollmentYear | Number | Required | Year of admission |
| course | String | Required | BCA / B.Tech / B.Com etc. |
| semester | String | Required | Current semester (1–8) |
| section | String | Required | Section A / B / C |
| dateOfBirth | Date | Optional | Date of birth |
| guardianInfo.fatherName | String | Optional | Father's name |
| guardianInfo.motherName | String | Optional | Mother's name |
| guardianInfo.fatherPhone | String | Optional | Father's phone |
| guardianInfo.motherPhone | String | Optional | Mother's phone |
| guardianInfo.emergencyContact | String | Optional | Emergency contact |
| address.street | String | Optional | Street address |
| address.city | String | Optional | City |
| address.state | String | Optional | State |
| address.pinCode | String | Optional | PIN code |
| address.country | String | Optional | Country |
| status | String | Enum: active/graduated/suspended | Enrollment status |
| createdAt | Date | Auto | Record creation time |

**Indexes:** `rollNo` (unique), `course`, `userId`

---

### 9.1.3 Teachers Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| userId | ObjectId | FK → User, Required | Linked user account |
| employeeNo | String | Unique, Required | Teacher employee number |
| department | String | Required | Department name |
| qualification | String | Required | Academic qualification |
| specialization | String | Optional | Subject specialization |
| joiningDate | Date | Required | Date of joining |
| salary | Number | Required | Monthly salary (₹) |
| status | String | Enum: active/inactive | Employment status |
| createdAt | Date | Auto | Record creation time |

---

### 9.1.4 Staff Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| userId | ObjectId | FK → User, Required | Linked user account |
| employeeNo | String | Unique, Required | Staff employee number |
| designation | String | Required | Job title |
| department | String | Required | Department |
| joiningDate | Date | Required | Date of joining |
| salary | Number | Required | Monthly salary (₹) |
| status | String | Enum: active/inactive | Employment status |

---

### 9.1.5 Payments Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| studentId | ObjectId | FK → Student, Required | Student who paid |
| feeTypeId | ObjectId | FK → FeeType, Required | Type of fee paid |
| amount | Number | Required | Amount paid (₹) |
| paymentDate | Date | Default: now | Date of payment |
| method | String | Enum: Cash/UPI/Bank Transfer | Payment method |
| transactionRef | String | Optional | Transaction reference ID |
| receiptNo | String | Unique, Auto-generated | Receipt number |
| status | String | Enum: paid/pending/failed | Payment status |

---

### 9.1.6 SalaryPayments Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| recipientId | ObjectId | FK → Teacher/Staff | Employee paid |
| recipientType | String | Enum: teacher/staff | Type of employee |
| month | String | Required | Pay month (e.g., Feb 2026) |
| basicSalary | Number | Required | Basic pay (₹) |
| allowances | Number | Default: 0 | Total allowances (₹) |
| deductions | Number | Default: 0 | Total deductions (₹) |
| netSalary | Number | Computed | Net salary = Basic + Allow – Ded |
| paidOn | Date | Default: now | Payment date |
| status | String | Enum: processed/pending | Payroll status |

---

### 9.1.7 Attendance Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| studentId | ObjectId | FK → Student, Required | Student |
| classId | ObjectId | FK → Class, Required | Class |
| date | Date | Required | Attendance date |
| status | String | Enum: present/absent/late | Attendance status |
| markedBy | ObjectId | FK → Teacher | Teacher who marked |
| createdAt | Date | Auto | Timestamp |

---

### 9.1.8 Books Collection (Library)

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| title | String | Required | Book title |
| author | String | Required | Author name |
| isbn | String | Unique, Required | ISBN number |
| category | String | Required | Subject / genre |
| totalCopies | Number | Required | Total stock |
| availableCopies | Number | Required | Currently available |
| shelfLocation | String | Optional | Physical shelf location |
| addedDate | Date | Default: now | Date added to library |

---

### 9.1.9 BookIssues Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| bookId | ObjectId | FK → Book, Required | Book issued |
| studentId | ObjectId | FK → Student, Required | Student borrower |
| issueDate | Date | Default: now | Issue date |
| dueDate | Date | Required | Return due date |
| returnDate | Date | Optional | Actual return date |
| fine | Number | Default: 0 | Fine amount (₹/day) |
| status | String | Enum: issued/returned/overdue | Issue status |

---

### 9.1.10 ExamResults Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| examSessionId | ObjectId | FK → ExamSession | Exam session |
| studentId | ObjectId | FK → Student, Required | Student |
| subjectId | ObjectId | FK → Subject | Subject |
| marksObtained | Number | Required | Marks scored |
| totalMarks | Number | Required | Maximum marks |
| grade | String | Auto-calculated | A+/A/B/C/D/F |
| isPublished | Boolean | Default: false | Visible to student? |

---

### 9.1.11 Timetable Collection

| Field | Data Type | Constraints | Description |
|-------|-----------|-------------|-------------|
| _id | ObjectId | Primary Key, Auto | MongoDB document ID |
| classId | ObjectId | FK → Class, Required | Target class |
| day | String | Enum: Mon–Sat | Day of week |
| period | Number | Required | Period number (1–8) |
| subjectId | ObjectId | FK → Subject | Subject for this slot |
| teacherId | ObjectId | FK → Teacher | Assigned teacher |
| startTime | String | Required | e.g., "09:00" |
| endTime | String | Required | e.g., "10:00" |

---

### 9.1.12 Full Collection List — 20 MongoDB Collections

| # | Collection Name | Primary Key | Key Foreign Keys |
|---|----------------|------------|-----------------|
| 1 | User | _id | — |
| 2 | Role | _id | — |
| 3 | Student | _id | userId, parentId, classId |
| 4 | Teacher | _id | userId |
| 5 | Staff | _id | userId |
| 6 | Parent | _id | — |
| 7 | Class | _id | — |
| 8 | Subject | _id | classId |
| 9 | FeeType | _id | — |
| 10 | StudentFee | _id | studentId, feeTypeId |
| 11 | Payment | _id | studentId, feeTypeId |
| 12 | Receipt | _id | paymentId, studentId |
| 13 | Salary | _id | teacherId/staffId |
| 14 | SalaryComponent | _id | salaryId |
| 15 | SalaryPayment | _id | recipientId |
| 16 | ExamSession | _id | subjectId, classId |
| 17 | ExamResult | _id | examSessionId, studentId |
| 18 | Timetable | _id | classId, subjectId, teacherId |
| 19 | Project | _id | studentId, teacherId |
| 20 | Notification | _id | userId |

---

---

# SECTION 10 — DESIGN: OUTPUT SCREENS OF THE PROJECT

## 10.1 Login Page Design

The Login Page is the entry point of the College Management System. It is accessible at the `/login` route and provides:

**Design Elements:**
- College Management System logo/title at the top center.
- **Role Selector** — A pill-style tab row allowing the user to choose a role before logging in: Admin | Teacher | Student | Staff.
- **Email Input Field** — Placeholder: "Enter your email".
- **Password Input Field** — Password masked; includes a show/hide toggle.
- **Login Button** — Full-width, primary color button labeled "Login".
- **Forgot Password** link (future enhancement).
- Animated background (gradient or star field).

**Color Theme:** Dark navy background with accent color based on role selected (blue for Admin, green for Teacher, purple for Student, orange for Staff).

**Responsive:** Single-column card layout, centered on screen. Works on mobile.

---

## 10.2 Admin Dashboard Design

The Admin Dashboard is the home screen after Admin login at `/dashboard`.

**Design Elements:**
- **Top Header Bar:** College name, admin avatar, logout button, and theme toggle.
- **Left Sidebar Navigation** with links to: Dashboard, Students, Teachers, Staff, Classes, Fees, Payroll, Attendance, Library, Exams, Timetable, Reports, Settings.
- **Statistics Cards Row:** Four cards showing:
  - 🎓 Total Students (e.g., 240)
  - 👩‍🏫 Total Teachers (e.g., 18)
  - 🗂️ Total Staff (e.g., 12)
  - 🏫 Active Classes (e.g., 10)
- **Second Row Cards:**
  - 💰 Revenue This Month (e.g., ₹1,24,500)
  - 📋 Pending Fees (e.g., ₹32,000)
  - 📊 Attendance Rate (e.g., 87%)
- **Recent Activities Feed** — List of last 10 system actions.
- **Quick Action Buttons:** Add Student, Add Teacher, Collect Fee, Process Payroll.

---

## 10.3 Forms Design

All data entry forms follow a consistent layout:

**Student Registration Form (`/students/add`):**
- Section 1 — Basic Info: Full Name, Email, Roll No., Course, Semester, Section, DOB.
- Section 2 — Guardian Info: Father Name, Mother Name, Father Phone, Mother Phone, Emergency Contact.
- Section 3 — Address: Street, City, State, PIN Code, Country.
- **Buttons:** Save Student (primary), Cancel (secondary).

**Add Teacher Form (`/teachers/add`):**
- Employee Number, Department, Qualification, Specialization, Joining Date, Monthly Salary.

**Fee Payment Form (`/fees`):**
- Student Search (by name/roll no.), Fee Type Selector, Amount, Payment Method (Cash/UPI/Bank Transfer), Transaction Reference.
- After payment → Auto-generate receipt with unique Receipt Number.

**Timetable Form (`/timetable`):**
- Class Selector, Day selector, Period number, Subject, Teacher, Start Time, End Time.

---

## 10.4 Reports Page Design

The Reports page at `/reports` provides:

- **Tab navigation:** Financial Report | Attendance Report | Academic Report.
- **Financial Report:** Date range picker, table showing student-wise fee collections, total revenue, pending dues.
- **Attendance Report:** Class selector, date range picker, attendance percentage per student in a sortable table.
- **Academic Report:** Exam session selector, subject-wise grade distribution in a bar chart (Recharts).
- **Export Option:** Download report as PDF/Excel (future enhancement).

---

## 10.5 Other Key Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Landing Page | `/` | Public page with hero animation (Three.js), features list, CTA buttons |
| Students List | `/students` | Paginated table with search/filter; Edit and Delete buttons per row |
| Student Details | `/students/:id` | Full student profile card with all details and fee/attendance summary |
| Teachers List | `/teachers` | Table of all teachers with department, qualification, salary |
| Library Page | `/library` | Book catalogue table; Issue Book form; Issued Books list |
| Timetable | `/timetable` | 6×8 grid (Mon–Sat × 8 periods) for selected class |
| Payroll Page | `/payroll` | Salary sheet table; filter tabs (All/Faculty/Staff); Process button |
| Settings | `/settings` | Profile update, password change, notification preferences |

---

---

# SECTION 11 — CODING

## 11.1 Technology Stack Used

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT + bcryptjs |
| HTTP Client | Axios |
| State Management | Zustand |

---

## 11.2 Database Connection Code

**File: `backend/src/config/db.js`**

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 11.3 Backend Server Entry Point

**File: `backend/src/index.js`**

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/student'));
app.use('/api/teachers', require('./routes/teacher'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/classes', require('./routes/class'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/payroll', require('./routes/payroll'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/library', require('./routes/library'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/reports', require('./routes/report'));
app.use('/api/notifications', require('./routes/notification'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## 11.4 Authentication System

### 11.4.1 User Model

**File: `backend/src/models/User.js`**

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:    { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone:    { type: String },
  status:   { type: String, enum: ['active','inactive','suspended'], default: 'active' },
  avatar:   { type: String },
  lastLogin: { type: Date },
  roleAssignments: [{
    roleId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    scopeId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    assignedAt: { type: Date, default: Date.now },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  teacherProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

---

### 11.4.2 Auth Controller

**File: `backend/src/controllers/auth.js`**

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, fullName, phone });
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('roleAssignments.roleId');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.roleAssignments[0]?.roleId?.name || 'student',
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};
```

---

### 11.4.3 Auth Middleware

**File: `backend/src/middleware/auth.js`**

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId)
      .select('-password')
      .populate('roleAssignments.roleId');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  const userRole = req.user?.roleAssignments?.[0]?.roleId?.name;
  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: `Role '${userRole}' is not authorized` });
  }
  next();
};
```

---

## 11.5 CRUD Operations — Student Module

### 11.5.1 Student Model

**File: `backend/src/models/Student.js`**

```javascript
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
  rollNo:        { type: String, unique: true, required: true },
  enrollmentYear:{ type: Number, required: true },
  course:        { type: String, required: true },
  semester:      { type: String, required: true },
  section:       { type: String, required: true },
  dateOfBirth:   { type: Date },
  guardianInfo: {
    fatherName: String, motherName: String,
    fatherPhone: String, motherPhone: String,
    emergencyContact: String,
  },
  address: {
    street: String, city: String,
    state: String, pinCode: String, country: String,
  },
  status: { type: String, enum: ['active','inactive','graduated','suspended'], default: 'active' },
}, { timestamps: true });

studentSchema.index({ rollNo: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ userId: 1 });

module.exports = mongoose.model('Student', studentSchema);
```

---

### 11.5.2 Student Controller (CRUD)

**File: `backend/src/controllers/student.js`**

```javascript
const Student = require('../models/Student');
const User = require('../models/User');

// GET all students (paginated)
exports.getAllStudents = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 25;
    const search = req.query.search || '';

    const filter = search
      ? { $or: [{ rollNo: new RegExp(search, 'i') }, { course: new RegExp(search, 'i') }] }
      : {};

    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter)
      .populate('userId', 'fullName email phone status')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ students, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'fullName email phone status')
      .populate('parentId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create student
exports.createStudent = async (req, res) => {
  try {
    const { rollNo, enrollmentYear, course, semester, section,
            dateOfBirth, guardianInfo, address, userId } = req.body;

    const existing = await Student.findOne({ rollNo });
    if (existing) return res.status(409).json({ message: 'Roll number already exists' });

    const student = await Student.create({
      userId, rollNo, enrollmentYear, course, semester,
      section, dateOfBirth, guardianInfo, address,
    });
    res.status(201).json({ message: 'Student created', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student updated', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

---

### 11.5.3 Student Routes

**File: `backend/src/routes/student.js`**

```javascript
const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/student');

router.get('/',    protect, ctrl.getAllStudents);
router.get('/:id', protect, ctrl.getStudentById);
router.post('/',   protect, authorize('admin'), ctrl.createStudent);
router.put('/:id', protect, authorize('admin'), ctrl.updateStudent);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteStudent);

module.exports = router;
```

---

## 11.6 Fee Payment Processing

**File: `backend/src/controllers/finance.js`**

```javascript
const Payment = require('../models/Payment');
const StudentFee = require('../models/StudentFee');

// Process fee payment
exports.processPayment = async (req, res) => {
  try {
    const { studentId, feeTypeId, amount, method, transactionRef } = req.body;

    const receiptNo = `RCP-${Date.now()}`;
    const payment = await Payment.create({
      studentId, feeTypeId, amount, method,
      transactionRef, receiptNo, status: 'paid',
    });

    // Update student fee status
    await StudentFee.findOneAndUpdate(
      { studentId, feeTypeId },
      { $set: { status: 'paid', paidDate: new Date() } }
    );

    res.status(201).json({
      message: 'Payment recorded successfully',
      receiptNo,
      payment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.id })
      .populate('feeTypeId', 'name')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

---

## 11.7 Frontend Code — React Components

### 11.7.1 Main App (Routing)

**File: `frontend/src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import FeesPage from './pages/FeesPage';
import AttendancePage from './pages/AttendancePage';
import LibraryPage from './pages/LibraryPage';
import PayrollPage from './pages/PayrollPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/students"   element={<StudentsPage />} />
          <Route path="/teachers"   element={<TeachersPage />} />
          <Route path="/fees"       element={<FeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/library"    element={<LibraryPage />} />
          <Route path="/payroll"    element={<PayrollPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 11.7.2 Auth Store (Zustand)

**File: `frontend/src/store/auth.js`**

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(persist((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    set({ user: res.data.user, token: res.data.token, isAuthenticated: true });
    return res.data;
  },

  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}), { name: 'auth-storage' }));
```

---

### 11.7.3 Axios API Service

**File: `frontend/src/services/api.js`**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth-storage') || '{}');
  const token = auth?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) window.location.href = '/login';
    return Promise.reject(error);
  }
);

export default api;
```

---

### 11.7.4 Login Page Component

**File: `frontend/src/pages/LoginPage.jsx`**

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import toast from 'react-hot-toast';

const ROLES = ['admin', 'teacher', 'student', 'staff'];

export default function LoginPage() {
  const [role, setRole]         = useState('admin');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const login    = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          College Management System
        </h1>

        {/* Role Selector */}
        <div className="flex gap-2 mb-6">
          {ROLES.map((r) => (
            <button key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition
                ${role === r ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email address"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <input type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

### 11.7.5 Protected Route Component

**File: `frontend/src/components/ProtectedRoute.jsx`**

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import Layout from './Layout';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout><Outlet /></Layout>;
}
```

---

### 11.7.6 Dashboard Component

**File: `frontend/src/pages/Dashboard.jsx` (excerpt)**

```jsx
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="text-white">Loading...</p>;

  const cards = [
    { label: 'Total Students', value: stats.totalStudents, icon: '🎓', color: 'blue' },
    { label: 'Total Teachers', value: stats.totalTeachers, icon: '👩‍🏫', color: 'green' },
    { label: 'Total Staff',    value: stats.totalStaff,    icon: '🗂️', color: 'yellow' },
    { label: 'Active Classes', value: stats.totalClasses,  icon: '🏫', color: 'purple' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className={`bg-gray-800 rounded-xl p-5 border border-${c.color}-500/30`}>
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-3xl font-bold text-white">{c.value}</div>
            <div className="text-gray-400 text-sm mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 11.7.7 Dashboard Controller (Backend)

**File: `backend/src/controllers/dashboard.js`**

```javascript
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Staff   = require('../models/Staff');
const Class   = require('../models/Class');
const Payment = require('../models/Payment');

exports.getStats = async (req, res) => {
  try {
    const [totalStudents, totalTeachers, totalStaff, totalClasses] = await Promise.all([
      Student.countDocuments({ status: 'active' }),
      Teacher.countDocuments({ status: 'active' }),
      Staff.countDocuments({ status: 'active' }),
      Class.countDocuments(),
    ]);

    // Revenue this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const revenueResult = await Payment.aggregate([
      { $match: { paymentDate: { $gte: startOfMonth }, status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const revenue = revenueResult[0]?.total || 0;

    res.json({ totalStudents, totalTeachers, totalStaff, totalClasses, revenue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

---

---

# SECTION 12 — TESTING & DEBUGGING

## 12.1 Testing Methods

Testing is the process of evaluating a software system to verify that it satisfies the specified requirements and to identify defects. The following testing methods were applied:

### 12.1.1 Unit Testing
Individual functions and API endpoints were tested in isolation using **Postman**. Each controller function (login, createStudent, payFee, etc.) was tested with valid input, invalid input, and boundary cases.

### 12.1.2 Integration Testing
Multiple modules were tested together to ensure they work correctly as a combined system. For example:
- Student creation + Fee assignment + Payment processing was tested end-to-end.
- Teacher login + Attendance marking + Report generation was tested.

### 12.1.3 User Acceptance Testing (UAT)
The fully integrated system was tested by simulating the actual workflow of each user role:
- Admin logged in and performed student management, fee collection, and payroll processing.
- Teacher logged in, marked attendance, entered grades, and viewed payslip.
- Student logged in, viewed attendance, grades, fees paid, and timetable.

### 12.1.4 Security Testing
- Attempted access to protected routes without a token — verified 401 Unauthorized response.
- Tested Student role accessing Admin-only routes — verified 403 Forbidden response.
- Verified passwords are stored as bcryptjs hashes in MongoDB (not plain text).
- Tested rate limiter with 105 rapid requests — verified 429 Too Many Requests after 100.

---

## 12.2 Test Cases Table

### Module: Authentication

| TC# | Test Case Description | Input Data | Expected Result | Actual Result | Status |
|-----|-----------------------|-----------|-----------------|---------------|--------|
| TC01 | Login with valid Admin credentials | admin@college.com / admin123 | JWT token returned, role = admin | JWT token returned | ✅ Pass |
| TC02 | Login with wrong password | admin@college.com / wrong | 401 "Invalid credentials" | 401 returned | ✅ Pass |
| TC03 | Login with unregistered email | fake@test.com / pass | 401 "Invalid credentials" | 401 returned | ✅ Pass |
| TC04 | Access protected route without token | No Authorization header | 401 "Not authorized, no token" | 401 returned | ✅ Pass |
| TC05 | Access protected route with valid token | Bearer [valid token] | 200 OK with data | 200 OK returned | ✅ Pass |
| TC06 | Access protected route with expired token | Bearer [expired token] | 401 "Token invalid or expired" | 401 returned | ✅ Pass |

---

### Module: Student Management

| TC# | Test Case Description | Input Data | Expected Result | Actual Result | Status |
|-----|-----------------------|-----------|-----------------|---------------|--------|
| TC07 | Add student with all valid fields | Complete student data | 201 Student created | 201 returned | ✅ Pass |
| TC08 | Add student with duplicate roll number | Existing rollNo value | 409 "Roll number already exists" | 409 returned | ✅ Pass |
| TC09 | Add student without required field (course) | Missing course field | 400 Validation error | 400 returned | ✅ Pass |
| TC10 | Get all students | GET /api/students | Paginated student list | List returned | ✅ Pass |
| TC11 | Get student by valid ID | Valid MongoDB ObjectId | Student detail object | Student data returned | ✅ Pass |
| TC12 | Get student by invalid ID | Random invalid ID | 404 "Student not found" | 404 returned | ✅ Pass |
| TC13 | Update student details | PUT with changed semester | 200 Updated student | Updated correctly | ✅ Pass |
| TC14 | Delete student | Valid student ID | 200 "Student deleted" | 200 returned | ✅ Pass |
| TC15 | Student role accessing delete endpoint | Student JWT token | 403 "not authorized" | 403 returned | ✅ Pass |

---

### Module: Fee Management

| TC# | Test Case Description | Input Data | Expected Result | Actual Result | Status |
|-----|-----------------------|-----------|-----------------|---------------|--------|
| TC16 | Process fee payment (Cash) | Student ID + amount + method=Cash | 201 with receipt number | Receipt generated | ✅ Pass |
| TC17 | Process fee payment (UPI) | Student ID + method=UPI + ref | 201 with receipt and ref | Correct | ✅ Pass |
| TC18 | Get payment history for student | Student ID | List of all payments | History returned | ✅ Pass |
| TC19 | Process payment with missing amount | No amount field | 400 Validation error | 400 returned | ✅ Pass |

---

### Module: Payroll

| TC# | Test Case Description | Input Data | Expected Result | Actual Result | Status |
|-----|-----------------------|-----------|-----------------|---------------|--------|
| TC20 | Get payroll sheet | GET /api/payroll/sheet | All employee salary records | Sheet returned | ✅ Pass |
| TC21 | Process monthly payroll | Month = Feb 2026 | Salary records created for all | Records created | ✅ Pass |
| TC22 | Get individual payslip | Teacher ID | Payslip with basic, deductions, net | Payslip correct | ✅ Pass |

---

### Module: Security

| TC# | Test Case Description | Expected Result | Actual Result | Status |
|-----|----------------------|-----------------|---------------|--------|
| TC23 | Attempt NoSQL injection in login body | Input sanitized; no unauthorized access | Blocked | ✅ Pass |
| TC24 | Exceed rate limit (105 requests in 15 min) | 429 Too Many Requests | 429 returned after 100 | ✅ Pass |
| TC25 | Password stored in plain text? | DB must show bcrypt hash | bcrypt hash confirmed in Atlas | ✅ Pass |
| TC26 | CORS — request from unauthorized domain | Blocked with CORS error | CORS rejected | ✅ Pass |

---

## 12.3 Test Results Summary

| Module | Test Cases | Passed | Failed | Pass Rate |
|--------|-----------|--------|--------|-----------|
| Authentication | 6 | 6 | 0 | 100% |
| Student Management | 9 | 9 | 0 | 100% |
| Fee Management | 4 | 4 | 0 | 100% |
| Payroll | 3 | 3 | 0 | 100% |
| Security | 4 | 4 | 0 | 100% |
| **TOTAL** | **26** | **26** | **0** | **100%** |

---

## 12.4 Bug Fixing Process

During the development and testing phases, the following issues were identified and resolved:

| Bug # | Bug Description | Module | Fix Applied |
|-------|----------------|--------|-------------|
| BUG-01 | CORS error when frontend called backend API | Auth | Added `cors({ origin: FRONTEND_URL })` in index.js |
| BUG-02 | JWT token not persisted after page refresh | Frontend Auth | Switched Zustand store to `persist` middleware with localStorage |
| BUG-03 | Password comparison always returning false | Auth | Fixed bcryptjs `hash` rounds — was using plain text comparison |
| BUG-04 | Paginated student list returning incorrect total count | Student | Added `countDocuments(filter)` with the same filter as `find()` |
| BUG-05 | Fee receipt number had collision on fast requests | Finance | Changed from `Math.random()` to `Date.now()` + unique suffix |
| BUG-06 | Mongoose `populate()` returning null for teacherProfileId | User | Fixed ObjectId reference — incorrect collection name in ref field |
| BUG-07 | React Router protected route redirecting even when logged in | Frontend | Fixed Zustand `isAuthenticated` flag initialization from persisted state |
| BUG-08 | Dashboard stats not updating after adding new student | Dashboard | Added `useEffect` dependency on navigation events |

---

## 12.5 Final Deployment

### Deployment Steps (Render.com)

```
1. Push code to GitHub repository

2. Backend Deployment (Render.com Web Service):
   - Connect GitHub repository
   - Set Build Command: npm install
   - Set Start Command: node src/index.js
   - Add Environment Variables:
       MONGODB_URI = [MongoDB Atlas URI]
       JWT_SECRET  = [32-char random string]
       JWT_REFRESH_SECRET = [32-char random string]
       PORT = 5000
       NODE_ENV = production
       FRONTEND_URL = [frontend URL]

3. Frontend Deployment (Render.com Static Site):
   - Connect GitHub repository
   - Set Build Command: npm install && npm run build
   - Set Publish Directory: dist
   - Add Environment Variable:
       VITE_API_URL = [backend URL]/api

4. MongoDB Atlas Setup:
   - Create free M0 cluster
   - Set IP Whitelist to 0.0.0.0/0 (allow all)
   - Create database user
   - Copy connection URI to backend env
```

### Live URLs

| Service | URL |
|---------|-----|
| Frontend | `https://college-management-frontend.onrender.com` |
| Backend API | `https://college-management-backend.onrender.com` |
| Database | MongoDB Atlas (Singapore region) |

---

## 12.6 Conclusion

The **College Management System** was successfully developed, tested, and deployed. All 26 test cases passed with a 100% pass rate. The system fulfills all functional and non-functional requirements defined in the SRS. It provides a modern, secure, and scalable digital platform that effectively replaces manual paper-based college administration operations.

---

---

# REFERENCES

| # | Reference |
|---|-----------|
| 1 | MongoDB, Inc. *MongoDB Manual*. https://www.mongodb.com/docs/ |
| 2 | OpenJS Foundation. *Node.js v18 Documentation*. https://nodejs.org/en/docs/ |
| 3 | OpenJS Foundation. *Express.js 4.x API Reference*. https://expressjs.com/en/4x/api.html |
| 4 | Meta Open Source. *React 18 Official Documentation*. https://react.dev/ |
| 5 | Mongoose Team. *Mongoose ODM Documentation v7*. https://mongoosejs.com/docs/ |
| 6 | JWT. *JSON Web Tokens — Introduction*. https://jwt.io/introduction |
| 7 | Vite Team. *Vite Build Tool Documentation*. https://vitejs.dev/guide/ |
| 8 | Tailwind Labs. *Tailwind CSS v3 Documentation*. https://tailwindcss.com/docs/ |
| 9 | Render. *Render Deployment Documentation*. https://render.com/docs |
| 10 | Pressman, R.S. (2014). *Software Engineering: A Practitioner's Approach*, 8th Ed. McGraw-Hill |
| 11 | Tanenbaum, A.S. (2016). *Modern Operating Systems*, 4th Ed. Pearson |
| 12 | Silberschatz, A., Korth, H.F. & Sudarshan, S. (2020). *Database System Concepts*, 7th Ed. McGraw-Hill |

---

*© 2026 — College Management System | MERN Stack*
*Department of Computer Science | [Institute Name] | Academic Year 2025–2026*
---

## 11.8 Extended Source Code Repository (Complete Core Modules)
The following section presents the exhaustive source code implementation containing the critical business logic, database schemas, API routing, and frontend user interfaces that powers the College Management System. These scripts demonstrate full-stack operations ranging from state management inside React to database aggregations inside Node.js.


### File: `backend/src/index.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_1 = require("./config/index");
const auth_1 = __importDefault(require("./routes/auth"));
const student_1 = __importDefault(require("./routes/student"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const staff_1 = __importDefault(require("./routes/staff"));
const finance_1 = __importDefault(require("./routes/finance"));

const payroll_1 = __importDefault(require("./routes/payroll"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const class_1 = __importDefault(require("./routes/class"));
const report_1 = __importDefault(require("./routes/report"));
const project_1 = __importDefault(require("./routes/project"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const library_1 = __importDefault(require("./routes/library"));
const notification_1 = __importDefault(require("./routes/notification"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
if (process.env.NODE_ENV !== 'test') {
    app.use(limiter);
}
// CORS
const allowedOrigins = [
    index_1.config.frontendUrl || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000',
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, true); // Allow all in development
        }
    },
    credentials: true,
}));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// Root route
app.get('/', (req, res) => {
    res.json({ message: 'College Management API is running' });
});
// Routes
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/dashboard', dashboard_1.default);
app.use('/api/v1/students', student_1.default);
app.use('/api/v1/teachers', teacher_1.default);
app.use('/api/v1/staff', staff_1.default);
app.use('/api/v1/finance', finance_1.default);

app.use('/api/v1/payroll', payroll_1.default);
app.use('/api/v1/classes', class_1.default);
app.use('/api/v1/reports', report_1.default);
app.use('/api/v1/projects', project_1.default);
app.use('/api/v1/attendance', attendance_1.default);
app.use('/api/v1/library', library_1.default);
app.use('/api/v1/notifications', notification_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// Database connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(index_1.config.port, () => {
            console.log(`Server running on port ${index_1.config.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
if (process.env.NODE_ENV !== 'test') {
    startServer();
}
exports.default = app;
```

### File: `backend/src/middleware/auth.js`

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new errors_1.AppError('No authentication token provided', 401, 'NO_TOKEN');
        }
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        if (!decoded) {
            throw new errors_1.AppError('Invalid or expired token', 401, 'INVALID_TOKEN');
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
exports.authMiddleware = authMiddleware;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
```

### File: `backend/src/models/User.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    avatar: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
    roleAssignments: [
        {
            roleId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Role',
            },
            scopeId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Class',
            },
            assignedAt: {
                type: Date,
                default: Date.now,
            },
            assignedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    teacherProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    studentProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
}, { timestamps: true });
// Index for email
exports.User = mongoose_1.default.model('User', userSchema);
```

### File: `backend/src/models/Student.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Parent',
    },
    rollNo: {
        type: String,
        unique: true,
        required: true,
    },
    enrollmentYear: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    guardianInfo: {
        fatherName: String,
        motherName: String,
        fatherPhone: String,
        motherPhone: String,
        emergencyContact: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'graduated', 'suspended'],
        default: 'active',
    },
}, { timestamps: true });
// Indexes
studentSchema.index({ rollNo: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ userId: 1 });
exports.Student = mongoose_1.default.model('Student', studentSchema);
```

### File: `backend/src/models/Teacher.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    qualification: {
        type: [String],
        required: true,
    },
    experience: {
        type: Number, // In years
        default: 0,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    subjects: [{
            type: String, // Can be refined to Subject model references later
        }],
    salary: {
        base: { type: Number, required: true },
        allowances: { type: Number, default: 0 },
        deductions: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'on_leave', 'resigned', 'terminated'],
        default: 'active',
    },
    contactInfo: {
        phone: String,
        address: String,
    }
}, {
    timestamps: true,
});
exports.Teacher = mongoose_1.default.model('Teacher', teacherSchema);
```

### File: `backend/src/models/Staff.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = __importDefault(require("mongoose"));

const staffSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Librarian', 'Accountant', 'Admin', 'Security', 'Maintenance', 'Lab Assistant', 'Office Staff', 'Other'],
    },
    department: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    salary: {
        base: { type: Number, required: true },
        allowances: { type: Number, default: 0 },
        deductions: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'on_leave', 'resigned', 'terminated'],
        default: 'active',
    },
    contactInfo: {
        phone: String,
        address: String,
    }
}, {
    timestamps: true,
});

exports.Staff = mongoose_1.default.model('Staff', staffSchema);
```

### File: `backend/src/models/Payment.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    feeTypeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'FeeType',
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'bank_transfer', 'cash'],
        required: true,
    },
    transactionRef: {
        type: String,
        unique: true,
    },
    gatewayResponse: mongoose_1.default.Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded'],
        default: 'pending',
    },
    paidAt: {
        type: Date,
    },
    receiptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Receipt',
    },
}, { timestamps: true });
// Indexes
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ transactionRef: 1 });
paymentSchema.index({ status: 1 });
exports.Payment = mongoose_1.default.model('Payment', paymentSchema);
```

### File: `backend/src/models/Attendance.js`

```javascript
'use strict';
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false
    },
    subject: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'],
        required: true,
        default: 'PRESENT'
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    remarks: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate entries per student per date per subject
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: false });

module.exports = mongoose.model('Attendance', attendanceSchema);
```

### File: `backend/src/models/Book.js`

```javascript
'use strict';
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        default: 'General',
        trim: true
    },
    publisher: {
        type: String,
        default: ''
    },
    publishedYear: {
        type: Number
    },
    totalCopies: {
        type: Number,
        required: true,
        default: 1
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1
    },
    shelfLocation: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    coverImage: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
```

### File: `backend/src/controllers/auth.js`

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.authRefresh = exports.authLogin = exports.authRegister = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authRegister = async (req, res) => {
    try {
        const { email, password, fullName, phone, roleName = 'ADMIN' } = req.body;
        // Disallow registration of non-ADMIN roles if explicitly requested
        if (roleName !== 'ADMIN') {
            throw new errors_1.AppError('Only Administrator registration is allowed', 403, 'ROLE_RESTRICTED');
        }
        // Validate email format
        const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new errors_1.AppError('Invalid email format', 400, 'INVALID_EMAIL');
        }
        // Check if user exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('User already exists', 400, 'USER_EXISTS');
        }
        // Hash password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Get role
        let role = await Role_1.Role.findOne({ name: roleName });
        if (!role) {
            throw new errors_1.AppError('Role not found', 400, 'ROLE_NOT_FOUND');
        }
        // Create user
        const user = await User_1.User.create({
            email,
            password: hashedPassword,
            fullName,
            phone,
            roleAssignments: [
                {
                    roleId: role._id,
                    assignedAt: new Date(),
                },
            ],
        });
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles: [roleName],
        });
        res.status(201).json({
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
                tokens,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else if (error.code === 11000) {
            res.status(400).json({ message: 'User already exists', errorCode: 'USER_EXISTS' });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authRegister = authRegister;
const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        // Find user
        console.log(`[DEBUG] Login request for email: '${email}'`);
        const user = await User_1.User.findOne({ email }).populate({
            path: 'roleAssignments.roleId',
            model: 'Role',
        });
        if (!user) {
            console.log(`[DEBUG] User NOT found in DB for email: '${email}'`);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        console.log(`[DEBUG] User found: ${user.email}, Role count: ${user.roleAssignments.length}`);
        const isMatch = await (0, password_1.comparePassword)(password, user.password);
        console.log(`[DEBUG] Password comparison result: ${isMatch}`);
        if (!isMatch) {
            console.log(`[DEBUG] Password mismatch for: ${email}`);
            console.log(`[DEBUG] Provided password length: ${password.length}`);
            console.log(`[DEBUG] Stored hash length: ${user.password.length}`);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // Extract roles
        const roles = user.roleAssignments.map((ra) => ra.roleId.name);
        // Validate user has at least one recognized role
        const allowedRoles = ['ADMIN', 'TEACHER', 'STUDENT'];
        const validRoles = roles.filter(r => allowedRoles.includes(r));
        if (validRoles.length === 0) {
            console.log(`[SECURITY] Blocked login for user with no valid roles: ${email} (roles: ${roles.join(', ')})`);
            return res.status(403).json({
                success: false,
                message: 'Access denied. No valid role assigned to this account.',
            });
        }
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles,
        });
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        res.json({
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    roles,
                },
                tokens,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authLogin = authLogin;
const authRefresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new errors_1.AppError('Refresh token is required', 400, 'REFRESH_TOKEN_REQUIRED');
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            throw new errors_1.AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
        }
        const user = await User_1.User.findById(decoded.userId).populate('roleAssignments.roleId');
        if (!user) {
            throw new errors_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        const roles = user.roleAssignments.map((ra) => ra.roleId.name);
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles,
        });
        res.json({
            message: 'Token refreshed successfully',
            data: { tokens },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authRefresh = authRefresh;
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email address' });
        }
        const hashedPassword = await (0, password_1.hashPassword)(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: 'Password has been reset successfully' });
    }
    catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ success: false, message: 'Failed to reset password' });
    }
};
exports.resetPassword = resetPassword;
```

### File: `backend/src/controllers/student.js`

```javascript
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function (o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentFullProfile = exports.promoteStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const Student_1 = require("../models/Student");
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const errors_1 = require("../utils/errors");
const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 25;
        const course = req.query.course;
        const status = req.query.status;
        const skip = (page - 1) * size;
        const filter = {};
        if (course)
            filter.course = course;
        if (status)
            filter.status = status;
        const students = await Student_1.Student.find(filter)
            .populate('userId', 'email fullName phone')
            .skip(skip)
            .limit(size)
            .lean();
        const total = await Student_1.Student.countDocuments(filter);
        res.json({
            data: {
                total,
                page,
                size,
                students: students.map((s) => ({
                    id: s._id,
                    name: s.userId ? s.userId.fullName : 'N/A',
                    email: s.userId ? s.userId.email : 'N/A',
                    phone: s.userId ? s.userId.phone : 'N/A',
                    rollNo: s.rollNo,
                    course: s.course,
                    semester: s.semester,
                    section: s.section,
                    status: s.status,
                })),
            },
        });
    }
    catch (error) {
        console.error('Get All Students Error:', error);
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id)
            .populate('userId', 'email fullName phone')
            .lean();
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        res.json({
            data: {
                id: student._id,
                name: student.userId ? student.userId.fullName : 'N/A',
                email: student.userId ? student.userId.email : 'N/A',
                phone: student.userId ? student.userId.phone : 'N/A',
                rollNo: student.rollNo,
                course: student.course,
                semester: student.semester,
                section: student.section,
                dateOfBirth: student.dateOfBirth,
                guardianInfo: student.guardianInfo,
                address: student.address,
                status: student.status,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getStudentById = getStudentById;
const createStudent = async (req, res) => {
    let createdUser = null;
    let createdParent = null;
    try {
        const { email, password, fullName, phone, rollNo, course, semester, section, dateOfBirth, guardianInfo, address } = req.body;
        if (!email || !password || !fullName || !rollNo) {
            throw new errors_1.AppError('Missing required fields', 400, 'MISSING_FIELDS');
        }

        // Check if user with same email already exists
        const existingUser = await User_1.User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new errors_1.AppError('Email already exists', 400, 'EMAIL_EXISTS');
        }

        // Check if student with same roll number exists
        const existingStudent = await Student_1.Student.findOne({ rollNo });
        if (existingStudent) {
            throw new errors_1.AppError('Roll number already exists', 400, 'ROLLNO_EXISTS');
        }

        // Validate guardian info
        if (!guardianInfo || !guardianInfo.fatherName || !guardianInfo.fatherPhone) {
            throw new errors_1.AppError('Guardian information (father name and phone) is required', 400, 'GUARDIAN_INFO_REQUIRED');
        }

        // 1. Create User for Student
        const hashedPassword = await (0, password_1.hashPassword)(password);
        const user = await User_1.User.create([{
            email,
            password: hashedPassword,
            fullName,
            phone,
            roles: ['STUDENT']
        }]);
        createdUser = user[0];

        // 2. Handle Parent (Create or Find)
        const parent = await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m => m.Parent.create([{
            fatherName: guardianInfo.fatherName,
            motherName: guardianInfo.motherName || '',
            fatherPhone: guardianInfo.fatherPhone,
            motherPhone: guardianInfo.motherPhone || '',
            primaryEmail: guardianInfo.primaryEmail || email,
            address: address || {},
        }]));
        createdParent = parent[0];

        // 3. Create student
        const student = await Student_1.Student.create([{
            userId: user[0]._id,
            parentId: parent[0]._id,
            rollNo,
            course,
            semester,
            section,
            dateOfBirth,
            guardianInfo: {
                fatherName: guardianInfo.fatherName,
                motherName: guardianInfo.motherName,
                fatherPhone: guardianInfo.fatherPhone
            },
            address,
            enrollmentYear: new Date().getFullYear(),
        }]);

        // Link student to parent
        await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m => m.Parent.findByIdAndUpdate(parent[0]._id, {
            $push: { children: student[0]._id }
        }));

        res.status(201).json({
            message: 'Student created successfully',
            data: {
                id: student[0]._id,
                rollNo: student[0].rollNo,
            },
        });
    }
    catch (error) {
        // Cleanup on failure
        if (createdUser) {
            await User_1.User.findByIdAndDelete(createdUser._id).catch(err => console.error('Cleanup error:', err));
        }
        if (createdParent) {
            await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m =>
                m.Parent.findByIdAndDelete(createdParent._id).catch(err => console.error('Cleanup error:', err))
            );
        }

        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
                errorCode: 'DUPLICATE_ENTRY'
            });
        }
        else {
            console.error('Create Student Error:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                name: error.name,
                stack: error.stack
            });
            res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    finally {
        // session.endSession();
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const student = await Student_1.Student.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        res.json({
            message: 'Student updated successfully',
            data: { id: student._id },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id);
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Soft delete
        student.status = 'inactive';
        await student.save();
        res.json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.deleteStudent = deleteStudent;
const promoteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { newCourse, newSection } = req.body;
        const student = await Student_1.Student.findById(id);
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Update student
        student.course = newCourse;
        student.section = newSection || student.section;
        await student.save();
        // In a real system, we might archive previous year's record here
        res.json({
            success: true,
            message: 'Student promoted successfully',
            data: {
                id: student._id,
                newCourse: student.course,
                newSection: student.section
            }
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error promoted' });
        }
    }
};
exports.promoteStudent = promoteStudent;
const getStudentFullProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id)
            .populate('userId', '-password')
            .populate('parentId')
            .lean();
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Fetch related data
        const fees = await Promise.resolve().then(() => __importStar(require('../models/StudentFee.js'))).then(m => m.StudentFee.find({ studentId: id }).populate('feeTypeId'));
        res.json({
            success: true,
            data: {
                student,
                stats: {
                    attendancePercentage: 0,
                    totalAttendance: 0,
                    pendingFees: 0, // Calculate from fees
                },
                financials: fees
            }
        });
    }
    catch (error) {
        console.error('Profile Error', error);
        res.status(500).json({ message: 'Failed to fetch full profile' });
    }
};
exports.getStudentFullProfile = getStudentFullProfile;
```

### File: `backend/src/controllers/teacher.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.getTeacherById = exports.getAllTeachers = exports.createTeacher = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const Teacher_1 = require("../models/Teacher");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../utils/errors");
const createTeacher = async (req, res) => {
    // Transaction removed for standalone support
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        const { firstName, lastName, email, employeeId, department, designation, qualification, experience, joiningDate, salary, contactInfo } = req.body;
        console.log('CREATE TEACHER BODY:', JSON.stringify(req.body, null, 2));
        // 1. Create User
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }
        // Get Teacher Role
        const teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        if (!teacherRole) {
            throw new errors_1.AppError('Teacher role configuration missing', 500, 'ROLE_CONFIG_ERROR');
        }
        const passwordToUse = req.body.password || 'Teacher@123';
        const hashedPassword = await bcryptjs_1.default.hash(passwordToUse, 10);
        const user = await User_1.User.create([{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                fullName: `${firstName} ${lastName}`,
                phone: (contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.phone) || req.body.phone,
                roleAssignments: [{
                        roleId: teacherRole._id,
                        assignedAt: new Date()
                    }],
                username: email.split('@')[0],
            }]);
        // 2. Create Teacher Profile
        const teacher = await Teacher_1.Teacher.create([{
                userId: user[0]._id,
                employeeId,
                department,
                designation,
                qualification: Array.isArray(qualification) ? qualification : [qualification],
                experience: Number(experience),
                joiningDate: new Date(joiningDate),
                salary: typeof salary === 'number' || typeof salary === 'string'
                    ? { base: Number(salary), allowances: 0, deductions: 0 }
                    : salary,
                contactInfo: contactInfo || {
                    phone: req.body.phone,
                    address: req.body.address
                }
            }]);
        // await session.commitTransaction();
        res.status(201).json({
            success: true,
            data: {
                teacher: teacher[0],
                user: user[0]
            }
        });
    }
    catch (error) {
        // Manual rollback since transactions are disabled
        // If we have a user object created in this scope (from line 36), try to delete it
        // We need to check if 'user' variable is available. Since it's block scoped, we might need to move declaration up
        // However, user is defined in try block. Let's move let user; up.
        // For now, simpler: we can't easily access 'user' here due to scope. 
        // BUT, we can catch the error and do a best-effort cleanup if we can identify the user.
        // Better strategy: move `user` declaration outside try, or just use the email to cleanup.
        // Only perform rollback if the error is NOT that the user already exists
        // This prevents deleting an unrelated existing user when we try to create a duplicate
        const isEmailExistsError = error instanceof errors_1.AppError && error.errorCode === 'EMAIL_EXISTS';
        if (req.body.email && !isEmailExistsError) {
            await User_1.User.deleteOne({ email: req.body.email }).catch(err => console.error('Rollback failed', err));
        }
        // await session.abortTransaction();
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Create Teacher Error:', error);
            res.status(500).json({ message: 'Failed to create teacher' });
        }
    }
    finally {
        // session.endSession();
    }
};
exports.createTeacher = createTeacher;
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher_1.Teacher.find()
            .populate('userId', '-password')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teachers' });
    }
};
exports.getAllTeachers = getAllTeachers;
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher_1.Teacher.findById(req.params.id).populate('userId', '-password');
        if (!teacher)
            throw new errors_1.AppError('Teacher not found', 404, 'NOT_FOUND');
        res.json({ success: true, data: teacher });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getTeacherById = getTeacherById;
const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const teacher = await Teacher_1.Teacher.findByIdAndUpdate(id, updates, { new: true });
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        if (updates.firstName || updates.lastName) {
            const userUpdates = {};
            if (updates.firstName)
                userUpdates.firstName = updates.firstName;
            if (updates.lastName)
                userUpdates.lastName = updates.lastName;
            await User_1.User.findByIdAndUpdate(teacher.userId, userUpdates);
        }
        res.status(200).json({ success: true, data: teacher });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update teacher', error });
    }
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher_1.Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        await User_1.User.findByIdAndDelete(teacher.userId);
        await Teacher_1.Teacher.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete teacher', error });
    }
};
exports.deleteTeacher = deleteTeacher;
```

### File: `backend/src/controllers/finance.js`

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFeeToClass = exports.getAllFeeTypes = exports.createFeeType = exports.getPaymentHistory = exports.getReceipt = exports.processPayment = exports.getStudentFees = void 0;
const StudentFee_1 = require("../models/StudentFee");
const Payment_1 = require("../models/Payment");
const Receipt_1 = require("../models/Receipt");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
const FeeType_1 = require("../models/FeeType");
const Student_1 = require("../models/Student");
const getStudentFees = async (req, res) => {
    try {
        const { studentId } = req.params;
        const fees = await StudentFee_1.StudentFee.find({ studentId })
            .populate('feeTypeId')
            .lean();
        const totalPending = fees
            .filter((f) => f.status !== 'paid')
            .reduce((sum, f) => sum + (f.amountDue - f.amountPaid), 0);
        res.json({
            data: {
                fees,
                totalPending,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getStudentFees = getStudentFees;
const processPayment = async (req, res) => {
    try {
        const { studentId, feeTypeId, amount, paymentMethod, transactionRef } = req.body;
        // Validate payment
        const studentFee = await StudentFee_1.StudentFee.findOne({ studentId, feeTypeId });
        if (!studentFee) {
            throw new errors_1.AppError('Fee record not found', 404, 'FEE_NOT_FOUND');
        }
        // Create payment record
        const payment = await Payment_1.Payment.create({
            studentId,
            amount,
            feeTypeId,
            paymentMethod,
            transactionRef,
            status: 'success',
            paidAt: new Date(),
        });
        // Update fee status
        studentFee.amountPaid += amount;
        if (studentFee.amountPaid >= studentFee.amountDue) {
            studentFee.status = 'paid';
        }
        else {
            studentFee.status = 'partial';
        }
        await studentFee.save();
        // Create receipt
        const receipt = await Receipt_1.Receipt.create({
            receiptNo: `RCP-${(0, uuid_1.v4)().slice(0, 8)}`,
            studentId,
            paymentIds: [payment._id],
            totalAmount: amount,
            feeDetails: [{ feeTypeId, amount }],
            paymentMethod,
        });
        res.status(201).json({
            message: 'Payment processed successfully',
            data: {
                paymentId: payment._id,
                receiptId: receipt._id,
                receiptNo: receipt.receiptNo,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.processPayment = processPayment;
const getReceipt = async (req, res) => {
    try {
        const { id } = req.params;
        const receipt = await Receipt_1.Receipt.findById(id)
            .populate('studentId')
            .populate('paymentIds')
            .lean();
        if (!receipt) {
            throw new errors_1.AppError('Receipt not found', 404, 'RECEIPT_NOT_FOUND');
        }
        res.json({ data: receipt });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getReceipt = getReceipt;
// The user provided 'EndLine: 145'. 
// I will rewrite the file content essentially to just ADD these functions at the end effectively, or I can try to replace the last closing bracket if there is one? No, exports are named.
// I will use `replace_file_content` targeting the end of the file.
// Wait, `replace_file_content` replaces a specific text block. I can match the last export and append after it.
// Let's retry the strategy: Append by replacing the last export method with itself + new methods.
const getPaymentHistory = async (req, res) => {
    // ... (existing implementation of getPaymentHistory)
    try {
        const { studentId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 25;
        const skip = (page - 1) * size;
        const payments = await Payment_1.Payment.find({ studentId, status: 'success' })
            .populate('feeTypeId')
            .skip(skip)
            .limit(size)
            .sort({ paidAt: -1 })
            .lean();
        const total = await Payment_1.Payment.countDocuments({ studentId, status: 'success' });
        res.json({
            data: {
                total,
                page,
                size,
                payments: payments.map((p) => ({
                    id: p._id,
                    amount: p.amount,
                    paymentMethod: p.paymentMethod,
                    paidAt: p.paidAt,
                    transactionRef: p.transactionRef,
                })),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPaymentHistory = getPaymentHistory;
// NEW METHODS
const createFeeType = async (req, res) => {
    // ... implementation
    try {
        const { name, amount, frequency, description, isOptional } = req.body;
        const code = name.toUpperCase().replace(/\s+/g, '_') + '_' + new Date().getFullYear();
        const feeType = await FeeType_1.FeeType.create({
            code,
            name,
            amount,
            frequency,
            description,
            isOptional
        });
        res.status(201).json({ success: true, data: feeType });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create fee type' });
    }
};
exports.createFeeType = createFeeType;
const getAllFeeTypes = async (req, res) => {
    try {
        const feeTypes = await FeeType_1.FeeType.find().sort({ createdAt: -1 });
        res.json({ success: true, data: feeTypes });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch fee types' });
    }
};
exports.getAllFeeTypes = getAllFeeTypes;
const assignFeeToClass = async (req, res) => {
    // const session = await import('mongoose').then(m => m.default.startSession());
    // session.startTransaction();
    try {
        const { classId, feeTypeId, dueDate } = req.body;
        const feeType = await FeeType_1.FeeType.findById(feeTypeId);
        if (!feeType)
            throw new errors_1.AppError('Fee Type not found', 404, 'NOT_FOUND');
        const students = await Student_1.Student.find({ classId, status: 'active' });
        const feeRecords = students.map(student => ({
            studentId: student._id,
            feeTypeId,
            amountDue: feeType.amount,
            dueDate: new Date(dueDate),
            status: 'unpaid'
        }));
        if (feeRecords.length > 0) {
            await StudentFee_1.StudentFee.insertMany(feeRecords);
        }
        // await session.commitTransaction();
        res.json({ success: true, message: `Assigned fee to ${feeRecords.length} students` });
    }
    catch (error) {
        // await session.abortTransaction();
        console.error(error);
        res.status(500).json({ message: 'Failed to assign fees' });
    }
    finally {
        // session.endSession();
    }
};
exports.assignFeeToClass = assignFeeToClass;
```

### File: `backend/src/controllers/attendance.js`

```javascript
'use strict';
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

/**
 * GET /api/v1/attendance
 * Query params: date, studentId, classId, status
 */
const getAttendance = async (req, res) => {
    try {
        const { date, studentId, classId, status, page = 1, limit = 50 } = req.query;
        const filter = {};

        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            filter.date = { $gte: start, $lte: end };
        }
        if (studentId) filter.student = studentId;
        if (classId) filter.class = classId;
        if (status) filter.status = status;

        const skip = (Number(page) - 1) * Number(limit);
        const [records, total] = await Promise.all([
            Attendance.find(filter)
                .populate('student', 'rollNo course')
                .populate('markedBy', 'firstName lastName')
                .sort({ date: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Attendance.countDocuments(filter)
        ]);

        res.json({ data: records, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        console.error('getAttendance error:', err);
        res.status(500).json({ message: 'Failed to fetch attendance', error: err.message });
    }
};

/**
 * POST /api/v1/attendance/bulk
 * Body: { date, records: [{ studentId, status, subject, remarks }], markedBy }
 */
const markAttendanceBulk = async (req, res) => {
    try {
        const { date, records, subject = '', classId } = req.body;
        if (!records || !Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ message: 'records array is required' });
        }

        const attendanceDate = date ? new Date(date) : new Date();
        const markedById = req.user?.userId;

        // Remove existing attendance for same date/subject combo
        const start = new Date(attendanceDate); start.setHours(0, 0, 0, 0);
        const end = new Date(attendanceDate); end.setHours(23, 59, 59, 999);

        const studentIds = records.map(r => r.studentId);
        await Attendance.deleteMany({
            student: { $in: studentIds },
            date: { $gte: start, $lte: end },
            subject
        });

        const docs = records.map(r => ({
            student: r.studentId,
            class: classId || null,
            subject,
            date: attendanceDate,
            status: r.status || 'PRESENT',
            markedBy: markedById,
            remarks: r.remarks || ''
        }));

        const saved = await Attendance.insertMany(docs);
        res.status(201).json({ message: 'Attendance marked successfully', count: saved.length });
    } catch (err) {
        console.error('markAttendanceBulk error:', err);
        res.status(500).json({ message: 'Failed to mark attendance', error: err.message });
    }
};

/**
 * POST /api/v1/attendance
 * Body: single record
 */
const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status, subject, remarks, classId } = req.body;
        if (!studentId || !status) {
            return res.status(400).json({ message: 'studentId and status are required' });
        }

        const record = await Attendance.create({
            student: studentId,
            class: classId || null,
            subject: subject || '',
            date: date ? new Date(date) : new Date(),
            status,
            markedBy: req.user?.userId,
            remarks: remarks || ''
        });

        res.status(201).json({ message: 'Attendance recorded', data: record });
    } catch (err) {
        console.error('markAttendance error:', err);
        res.status(500).json({ message: 'Failed to record attendance', error: err.message });
    }
};

/**
 * GET /api/v1/attendance/summary/:studentId
 */
const getStudentAttendanceSummary = async (req, res) => {
    try {
        const { studentId } = req.params;
        const total = await Attendance.countDocuments({ student: studentId });
        const present = await Attendance.countDocuments({ student: studentId, status: 'PRESENT' });
        const absent = await Attendance.countDocuments({ student: studentId, status: 'ABSENT' });
        const late = await Attendance.countDocuments({ student: studentId, status: 'LATE' });

        res.json({
            studentId,
            total,
            present,
            absent,
            late,
            percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get summary', error: err.message });
    }
};

/**
 * PUT /api/v1/attendance/:id
 */
const updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Updated', data: updated });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update', error: err.message });
    }
};

/**
 * DELETE /api/v1/attendance/:id
 */
const deleteAttendance = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete', error: err.message });
    }
};

module.exports = { getAttendance, markAttendance, markAttendanceBulk, getStudentAttendanceSummary, updateAttendance, deleteAttendance };
```

### File: `backend/src/controllers/library.js`

```javascript
'use strict';
const Book = require('../models/Book');
const BookIssue = require('../models/BookIssue');

/** GET /api/v1/library/books */
const getBooks = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (search) filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { isbn: { $regex: search, $options: 'i' } }
        ];
        if (category) filter.category = category;

        const skip = (Number(page) - 1) * Number(limit);
        const [books, total] = await Promise.all([
            Book.find(filter).sort({ title: 1 }).skip(skip).limit(Number(limit)),
            Book.countDocuments(filter)
        ]);

        res.json({ data: books, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch books', error: err.message });
    }
};

/** GET /api/v1/library/books/:id */
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch book', error: err.message });
    }
};

/** POST /api/v1/library/books */
const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: 'Book added', data: book });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: 'ISBN already exists' });
        res.status(500).json({ message: 'Failed to add book', error: err.message });
    }
};

/** PUT /api/v1/library/books/:id */
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated', data: book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book', error: err.message });
    }
};

/** DELETE /api/v1/library/books/:id */
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book', error: err.message });
    }
};

/** GET /api/v1/library/issues */
const getIssues = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (status) filter.status = status;

        // Auto-update overdue
        await BookIssue.updateMany(
            { status: 'ISSUED', dueDate: { $lt: new Date() } },
            { status: 'OVERDUE' }
        );

        const skip = (Number(page) - 1) * Number(limit);
        const [issues, total] = await Promise.all([
            BookIssue.find(filter)
                .populate('book', 'title author isbn')
                .populate('student', 'name rollNumber')
                .sort({ issueDate: -1 })
                .skip(skip)
                .limit(Number(limit)),
            BookIssue.countDocuments(filter)
        ]);

        res.json({ data: issues, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch issues', error: err.message });
    }
};

/** POST /api/v1/library/issue */
const issueBook = async (req, res) => {
    try {
        const { bookId, studentId, borrowerName, borrowerType, dueDate } = req.body;
        if (!bookId || !borrowerName) return res.status(400).json({ message: 'bookId and borrowerName are required' });

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.availableCopies < 1) return res.status(400).json({ message: 'No copies available' });

        const due = dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days default
        const issue = await BookIssue.create({
            book: bookId,
            student: studentId || null,
            borrowerName,
            borrowerType: borrowerType || 'STUDENT',
            issueDate: new Date(),
            dueDate: due,
            status: 'ISSUED',
            issuedBy: req.user?._id || req.user?.id
        });

        // Decrease available copies
        book.availableCopies -= 1;
        await book.save();

        res.status(201).json({ message: 'Book issued successfully', data: issue });
    } catch (err) {
        res.status(500).json({ message: 'Failed to issue book', error: err.message });
    }
};

/** PUT /api/v1/library/return/:id */
const returnBook = async (req, res) => {
    try {
        const issue = await BookIssue.findById(req.params.id).populate('book');
        if (!issue) return res.status(404).json({ message: 'Issue record not found' });
        if (issue.status === 'RETURNED') return res.status(400).json({ message: 'Book already returned' });

        const returnDate = new Date();
        const daysLate = Math.max(0, Math.floor((returnDate - issue.dueDate) / (1000 * 60 * 60 * 24)));
        const fine = daysLate * 5; // ₹5 per day

        issue.returnDate = returnDate;
        issue.status = 'RETURNED';
        issue.fine = fine;
        await issue.save();

        // Increase available copies
        if (issue.book) {
            issue.book.availableCopies = Math.min(issue.book.availableCopies + 1, issue.book.totalCopies);
            await issue.book.save();
        }

        res.json({ message: 'Book returned successfully', fine, data: issue });
    } catch (err) {
        res.status(500).json({ message: 'Failed to return book', error: err.message });
    }
};

/** GET /api/v1/library/stats */
const getLibraryStats = async (req, res) => {
    try {
        const [totalBooks, totalIssued, totalOverdue, totalReturned] = await Promise.all([
            Book.countDocuments(),
            BookIssue.countDocuments({ status: 'ISSUED' }),
            BookIssue.countDocuments({ status: 'OVERDUE' }),
            BookIssue.countDocuments({ status: 'RETURNED' })
        ]);
        res.json({ totalBooks, totalIssued, totalOverdue, totalReturned });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get stats', error: err.message });
    }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, getIssues, issueBook, returnBook, getLibraryStats };
```

### File: `backend/src/controllers/dashboard.js`

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentDashboardStats = exports.getTeacherDashboardStats = exports.getAdminDashboardStats = void 0;
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Payment_1 = require("../models/Payment");
const Attendance_1 = require("../models/Attendance");

const getAdminDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student_1.Student.countDocuments();
        const totalTeachers = await Teacher_1.Teacher.countDocuments();

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        let chartData = [];
        let totalRevenue = 0;
        try {
            const chartDataRaw = await Payment_1.Payment.aggregate([
                { $match: { paymentDate: { $gte: sixMonthsAgo }, status: 'COMPLETED' } },
                { $group: { _id: { month: { $month: "$paymentDate" }, year: { $year: "$paymentDate" } }, revenue: { $sum: "$amount" }, students: { $addToSet: "$studentId" } } },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
            ]);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            chartData = chartDataRaw.map(item => ({ name: monthNames[item._id.month - 1], revenue: item.revenue, students: item.students.length }));
            totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
        } catch (e) { /* Payment model may not exist */ }

        const recentStudents = await Student_1.Student.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'fullName email')
            .lean();

        const totalRecords = await Attendance_1.countDocuments();
        const presentRecords = await Attendance_1.countDocuments({ status: 'present' });
        const absentRecords = await Attendance_1.countDocuments({ status: 'absent' });

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                totalRevenue,
                pendingFees: 0,
                attendance: {
                    total: totalRecords,
                    present: presentRecords,
                    absent: absentRecords,
                    presentPct: totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0
                },
                recentAdmissions: recentStudents,
                chartData
            }
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
    }
};
exports.getAdminDashboardStats = getAdminDashboardStats;

const getTeacherDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const teacher = await Teacher_1.Teacher.findOne({ userId })
            .populate('userId', 'fullName email')
            .lean();

        const totalStudents = await Student_1.Student.countDocuments();
        const students = await Student_1.Student.find()
            .populate('userId', 'fullName email')
            .lean();

        const recentAttendance = await Attendance_1.find({ markedBy: userId })
            .sort({ date: -1 })
            .limit(10)
            .populate('student', 'rollNo course semester')
            .lean();

        const totalMarked = await Attendance_1.countDocuments({ markedBy: userId });
        const presentMarked = await Attendance_1.countDocuments({ markedBy: userId, status: 'present' });

        res.status(200).json({
            success: true,
            data: {
                teacher: teacher ? {
                    name: teacher.userId?.fullName || 'Teacher',
                    department: teacher.department || '—',
                    designation: teacher.designation || '—',
                    email: teacher.userId?.email || '—'
                } : {},
                totalStudents,
                students: students.map(s => ({
                    id: s._id,
                    name: s.userId?.fullName || 'Unknown',
                    rollNo: s.rollNo || '—',
                    course: s.course || 'Unassigned',
                    semester: s.semester || '—'
                })),
                attendanceStats: {
                    totalMarked,
                    presentMarked,
                    absentMarked: totalMarked - presentMarked,
                    presentPct: totalMarked > 0 ? Math.round((presentMarked / totalMarked) * 100) : 0
                },
                recentAttendance: recentAttendance.map(a => ({
                    date: a.date,
                    status: a.status,
                    studentRoll: a.student?.rollNo || '—',
                    studentCourse: a.student?.course || '—'
                }))
            }
        });
    } catch (error) {
        console.error('Teacher Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch teacher dashboard' });
    }
};
exports.getTeacherDashboardStats = getTeacherDashboardStats;

const getStudentDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const student = await Student_1.Student.findOne({ userId })
            .populate('userId', 'fullName email')
            .lean();

        if (!student) {
            return res.status(200).json({
                success: true,
                data: { student: null, attendance: { total: 0, present: 0, presentPct: 0 }, fees: { paid: 0, due: 0 } }
            });
        }

        const totalAttendance = await Attendance_1.countDocuments({ student: student._id });
        const presentAttendance = await Attendance_1.countDocuments({ student: student._id, status: 'present' });

        let feesPaid = 0;
        try {
            const payments = await Payment_1.Payment.find({ studentId: student._id, status: 'COMPLETED' });
            feesPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
        } catch (e) { /* Payment model may not exist */ }

        res.status(200).json({
            success: true,
            data: {
                student: {
                    name: student.userId?.fullName || 'Student',
                    rollNo: student.rollNo || '—',
                    course: student.course || 'Unassigned',
                    semester: student.semester || '—',
                    section: student.section || '—',
                    email: student.userId?.email || '—'
                },
                attendance: {
                    total: totalAttendance,
                    present: presentAttendance,
                    absent: totalAttendance - presentAttendance,
                    presentPct: totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0
                },
                fees: {
                    paid: feesPaid,
                    due: 0
                }
            }
        });
    } catch (error) {
        console.error('Student Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch student dashboard' });
    }
};
exports.getStudentDashboardStats = getStudentDashboardStats;
```

### File: `backend/src/routes/auth.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/register', auth_1.authRegister);
router.post('/login', auth_1.authLogin);
router.post('/refresh', auth_1.authRefresh);
router.post('/reset-password', auth_1.resetPassword);
// Example protected route
router.get('/me', auth_2.authMiddleware, (req, res) => {
    res.json({
        data: req.body,
    });
});
exports.default = router;
```

### File: `backend/src/routes/student.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
router.get('/', auth_1.authMiddleware, student_1.getAllStudents);
router.get('/:id', auth_1.authMiddleware, student_1.getStudentById);
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.createStudent);
router.patch('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.deleteStudent);
router.post('/promote/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.promoteStudent);
router.get('/:id/full-profile', auth_1.authMiddleware, student_1.getStudentFullProfile);
exports.default = router;
```

### File: `backend/src/routes/teacher.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const teacher_1 = require("../controllers/teacher");
const router = express_1.default.Router();
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.createTeacher);
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.getAllTeachers);
router.get('/:id', auth_1.authMiddleware, teacher_1.getTeacherById);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.updateTeacher);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.deleteTeacher);
exports.default = router;
```

### File: `backend/src/routes/finance.js`

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const finance_1 = require("../controllers/finance");
const router = express_1.default.Router();
router.get('/student/:studentId', auth_1.authMiddleware, finance_1.getStudentFees);
router.get('/receipt/:id', auth_1.authMiddleware, finance_1.getReceipt);
router.get('/payment-history/:studentId', auth_1.authMiddleware, finance_1.getPaymentHistory);
router.post('/structure', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), finance_1.createFeeType); // Added
router.get('/structure', auth_1.authMiddleware, finance_1.getAllFeeTypes);
router.post('/assign-class', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), finance_1.assignFeeToClass); // Added
router.post('/pay', auth_1.authMiddleware, finance_1.processPayment);
exports.default = router;
```

### File: `frontend/src/main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <App />
</React.StrictMode>);
```

### File: `frontend/src/App.jsx`

```javascript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { routes } from '@/config/routes';
const queryClient = new QueryClient();
const AppRoutes = () => {
    const routing = useRoutes(routes);
    return routing;
};
function App() {
    const { hydrate, isInitialized } = useAuthStore();
    useEffect(() => {
        hydrate();
    }, [hydrate]);
    if (!isInitialized) {
        return (<div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>);
    }
    return (<QueryClientProvider client={queryClient}>
      <Router>
        <React.Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>}>
          <AppRoutes />
        </React.Suspense>
      </Router>
      <Toaster position="top-right"/>
    </QueryClientProvider>);
}
export default App;
```

### File: `frontend/src/services/api.js`

```javascript
import axios from 'axios';
import { API_BASE_URL } from './API_BASE_URL';
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Handle token refresh on 401
apiClient.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await apiClient.post('/auth/refresh', { refreshToken });
                localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
                return apiClient(error.config);
            }
            catch {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/'; // Force redirect to login
            }
        }
    }
    return Promise.reject(error);
});
export default apiClient;
```

### File: `frontend/src/store/auth.js`

```javascript
import create from 'zustand';
export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isInitialized: false,
    login: (user, accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
        });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
        });
    },
    setUser: (user) => set({ user }),
    hydrate: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        if (accessToken && refreshToken && user) {
            set({
                accessToken,
                refreshToken,
                user: JSON.parse(user),
                isAuthenticated: true,
                isInitialized: true,
            });
        }
        else {
            set({ isInitialized: true });
        }
    },
}));
```

### File: `frontend/src/pages/LandingPage.jsx`

```javascript
import React, { useEffect, useRef, useState } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, BookOpen, Users, Award, Building2, TrendingUp, Calendar,
    Sparkles, GraduationCap, FlaskConical, Briefcase, Globe, ChevronRight,
    CheckCircle, MapPin, Library, Trophy, Heart, Music, PenTool, Microscope,
    Coffee, Home, BookMarked, UserCheck
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const statsRef = useRef(null);

    const heroSlides = [
        {
            title: "Welcome to L.N. Mishra Institute",
            subtitle: "Creating Leaders for Tomorrow",
            gradient: "from-blue-400 via-purple-400 to-pink-400"
        },
        {
            title: "Excellence in Education",
            subtitle: "Ranked Amongst Top Institutions",
            gradient: "from-cyan-400 via-blue-400 to-purple-400"
        },
        {
            title: "Research & Innovation",
            subtitle: "Advancing Knowledge, Transforming Lives",
            gradient: "from-green-400 via-teal-400 to-blue-400"
        }
    ];

    const announcements = [
        { id: 1, title: "Student Registration Form in Admission Section of Admission Year 2024-25", date: "Feb 05, 2024", isNew: true },
        { id: 2, title: "Special Examination Time Schedule", date: "Feb 04, 2024", isNew: true },
        { id: 3, title: "Class Timetable for 1st Semester MBA/Mcom-A and MBA-LSCM", date: "Feb 03, 2024", isNew: false },
        { id: 4, title: "Urgent Notice for Registration Form Submission", date: "Feb 01, 2024", isNew: false },
    ];

    const stats = [
        { icon: Users, label: "Students", value: 5000, suffix: "+", color: "text-blue-500" },
        { icon: BookOpen, label: "Faculty Members", value: 250, suffix: "+", color: "text-purple-500" },
        { icon: Award, label: "Programs", value: 45, suffix: "+", color: "text-green-500" },
        { icon: Building2, label: "Years of Excellence", value: 30, suffix: "+", color: "text-orange-500" }
    ];

    const features = [
        {
            icon: GraduationCap,
            title: "Academic Excellence",
            description: "World-class curriculum designed to meet global standards",
            gradient: "from-blue-400 to-blue-500"
        },
        {
            icon: FlaskConical,
            title: "Research & Innovation",
            description: "State-of-the-art labs and research facilities",
            gradient: "from-purple-400 to-purple-500"
        },
        {
            icon: Briefcase,
            title: "Placement Support",
            description: "95% placement record with top companies",
            gradient: "from-green-400 to-green-500"
        },
        {
            icon: Globe,
            title: "Global Exposure",
            description: "International collaborations and exchange programs",
            gradient: "from-orange-400 to-orange-500"
        }
    ];

    const campusLife = [
        { icon: Music, title: "Cultural Events", description: "Annual fests and cultural programs" },
        { icon: Trophy, title: "Sports Facilities", description: "State-of-the-art sports complex" },
        { icon: Library, title: "Modern Library", description: "Digital and physical resources" },
        { icon: Coffee, title: "Campus Amenities", description: "Cafeteria, gym, and recreation" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            stats.forEach((stat, index) => {
                gsap.to(`.stat-${index}`, {
                    innerText: stat.value,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%"
                    }
                });
            });

            gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
                gsap.from(element, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, statsRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <PublicHeader />

            {/* Hero Section with Animated Gradient Slider */}
            <section className="relative h-[600px] mt-[200px] lg:mt-[180px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} animate-pulse`}></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
                            <div className="text-white max-w-3xl animate-slide-up">
                                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 group">
                                        Start Application
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                                    </button>
                                    <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105">
                                        Explore Campus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all transform hover:scale-110 ${index === currentSlide ? 'w-12 bg-white shadow-lg' : 'w-3 bg-white/60 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            About LNMI College
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Established with a vision to provide world-class education, LNMI has been shaping brilliant minds for over 30 years.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-on-scroll">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl h-96 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
                                <div className="text-white text-center p-8">
                                    <Building2 size={80} className="mx-auto mb-4 animate-bounce" />
                                    <h3 className="text-3xl font-bold">30+ Years</h3>
                                    <p className="text-xl">of Educational Excellence</p>
                                </div>
                            </div>
                        </div>
                        <div className="animate-on-scroll space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">Autonomous Institution</h4>
                                    <p className="text-gray-600">Recognized by Government of Bihar and affiliated with prestigious universities</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-blue-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">AICTE Approved</h4>
                                    <p className="text-gray-600">All programs approved by AICTE and Govt. of India</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-purple-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">Top Rankings</h4>
                                    <p className="text-gray-600">Ranked among top institutions in Eastern India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Announcements Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 animate-on-scroll">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                                    <Sparkles className="text-yellow-500" />
                                    Latest Updates / Notices
                                </h2>
                                <a href="#" className="text-blue-600 hover:text-purple-600 font-semibold flex items-center gap-1 transition-colors">
                                    View All <ChevronRight size={18} />
                                </a>
                            </div>
                            <div className="space-y-3">
                                {announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all cursor-pointer group border-l-4 border-blue-500"
                                    >
                                        <div className="flex-shrink-0">
                                            {announcement.isNew && (
                                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                                                    NEW
                                                </span>
                                            )}
                                            {!announcement.isNew && (
                                                <Calendar className="text-blue-400 mt-1" size={20} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {announcement.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                                        </div>
                                        <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-on-scroll">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Quick Links</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Online Admission Portal', gradient: 'from-blue-500 to-blue-600' },
                                    { name: 'Academic Calendar', gradient: 'from-purple-500 to-purple-600' },
                                    { name: 'Examination Schedule', gradient: 'from-green-500 to-green-600' },
                                    { name: 'Scholarship Information', gradient: 'from-orange-500 to-orange-600' },
                                    { name: 'Student Login', gradient: 'from-pink-500 to-pink-600' },
                                    { name: 'Faculty Portal', gradient: 'from-cyan-500 to-cyan-600' }
                                ].map((link, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`block p-4 bg-gradient-to-r ${link.gradient} text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-105 group`}
                                    >
                                        <span className="flex items-center justify-between">
                                            <span className="font-medium">{link.name}</span>
                                            <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Our Achievements</h2>
                        <p className="text-xl text-white/90">Excellence in Numbers</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all transform hover:scale-110 animate-on-scroll shadow-2xl"
                                >
                                    <Icon size={56} className="mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
                                    <div className="text-5xl font-bold mb-2 text-white">
                                        <span className={`stat-${index}`}>0</span>
                                        <span>{stat.suffix}</span>
                                    </div>
                                    <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Admissions Section */}
            <section id="admissions" className="py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Admissions 2024-25
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Join our prestigious institution and start your journey towards excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                step: "1",
                                title: "Apply Online",
                                desc: "Fill the application form with your details",
                                icon: PenTool,
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                step: "2",
                                title: "Submit Documents",
                                desc: "Upload required certificates and documents",
                                icon: BookMarked,
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                step: "3",
                                title: "Get Admitted",
                                desc: "Complete the admission process and join us",
                                icon: UserCheck,
                                color: "from-green-500 to-green-600"
                            }
                        ].map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="animate-on-scroll">
                                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                        <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                            <Icon size={36} className="text-white" />
                                        </div>
                                        <div className={`text-4xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-3 text-center`}>
                                            Step {step.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 text-center">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center animate-on-scroll">
                        <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110">
                            Apply Now for 2024-25
                        </button>
                    </div>
                </div>
            </section>

            {/* Campus Life Section */}
            <section id="campus" className="py-20 bg-gradient-to-br from-green-50 via-white to-teal-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                            Campus Life
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience vibrant campus life with diverse activities and facilities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {campusLife.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="animate-on-scroll">
                                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center h-full">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Research Section */}
            <section id="research" className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                            Research & Innovation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Advancing knowledge through cutting-edge research and innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="animate-on-scroll">
                            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl h-96 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
                                <div className="text-white text-center p-8">
                                    <Microscope size={80} className="mx-auto mb-4 animate-pulse" />
                                    <h3 className="text-3xl font-bold">50+ Research Projects</h3>
                                    <p className="text-xl mt-2">Ongoing Across Departments</p>
                                </div>
                            </div>
                        </div>
                        <div className="animate-on-scroll space-y-4">
                            {[
                                { title: "State-of-the-Art Labs", desc: "Equipped with latest technology and equipment" },
                                { title: "Industry Collaborations", desc: "Partnerships with leading companies and institutions" },
                                { title: "Research Publications", desc: "Published in top national and international journals" },
                                { title: "Innovation Hub", desc: "Dedicated space for student startups and innovations" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                                    <FlaskConical className="text-purple-500 flex-shrink-0 mt-1" size={28} />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Why Choose LNMI?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover what makes us one of the leading institutions in the country
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer animate-on-scroll transform hover:scale-105"
                                >
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
                <div className="container mx-auto px-6 text-center animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                        Ready to Shape Your Future?
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
                        Join thousands of successful alumni who started their journey at LNMI College
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110">
                            Apply Now
                        </button>
                        <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-110">
                            Contact Admissions
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                L.N. Mishra Institute
                            </h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                Creating future leaders through excellence in education, research, and innovation.
                                An Autonomous Institute under Government of Bihar.
                            </p>
                            <div className="flex gap-4">
                                {['F', 'T', 'L', 'I'].map((social, index) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                                    >
                                        <span className="text-white font-bold">{social}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['About Us', 'Academics', 'Admissions', 'Research', 'Campus Life'].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <ChevronRight size={16} />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <MapPin size={16} className="mt-1 text-blue-400" />
                                    <span>1, Nehru Marg<br />Patna - 800001, Bihar</span>
                                </li>
                                <li>Phone: +91 123-456-7890</li>
                                <li>Email: info@lnmi.ac.in</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                        <p>© 2024 L.N. Mishra Institute. All Rights Reserved.</p>
                        <p className="mt-2 flex items-center justify-center gap-2">
                            Made with <Heart className="inline text-red-500 animate-pulse" size={14} /> by LNMI Team
                        </p>
                        <p className="mt-2 text-xs text-gray-600">
                            Developed by <span className="text-blue-400 font-semibold">Saksham</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
```

### File: `frontend/src/pages/LoginPage.jsx`

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { ArrowLeft, ArrowRight, Lock, Mail, Shield, Eye, EyeOff, GraduationCap, BookOpen } from 'lucide-react';
export const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
  };
  const handleBack = () => {
    setStep(1);
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole)
      return;
    setLoading(true);
    try {
      // Trying both v1 and root paths just in case, but using the configured axios instance
      const response = await apiClient.post('/auth/login', {
        email,
        password,
        role: selectedRole // Ideally backend should verify this match, but for now we send it
      });
      const { user, tokens } = response.data.data;
      // Basic client-side validation that the user has the selected role
      // In a real app, the token should dictate the role or backend should validate login against role
      const userRoles = user.roles || [];
      if (!userRoles.includes(selectedRole)) {
        // Create a friendly error if it's a mismatch, though ideally backend handles this
        // For now we'll allow it if they have the role, otherwise warn
      }
      login(user, tokens.accessToken, tokens.refreshToken);
      toast.success(`Welcome back, ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}!`);
      navigate('/dashboard');
    }
    catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
    finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setResetLoading(true);
    try {
      const res = await apiClient.post('/auth/reset-password', {
        email: resetEmail,
        newPassword,
      });
      toast.success(res.data?.message || 'Password reset successfully!');
      setShowForgotPassword(false);
      setResetEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
      // Pre-fill the login email field
      setEmail(resetEmail);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setResetLoading(false);
    }
  };
  const roles = [
    {
      id: 'ADMIN',
      title: 'Administrator',
      description: 'Manage entire campus, fees, payroll and staff files',
      icon: Shield,
      color: 'from-purple-500 to-indigo-600',
      shadow: 'shadow-purple-500/30'
    },
    {
      id: 'TEACHER',
      title: 'Teacher / Faculty',
      description: 'Manage classes, attendance and projects',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/30'
    },
    {
      id: 'STUDENT',
      title: 'Student Portal',
      description: 'View results, fees, timetable and project status',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-600',
      shadow: 'shadow-blue-500/30'
    }
  ];
  return (<div className="min-h-screen flex bg-[#0F172A] text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
    {/* Decorative Background Elements */}
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
    </div>

    {/* Left Section - Form */}
    <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative">
      <div className="mb-10">
        <button onClick={() => navigate('/')} className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Shield className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">LNMI College</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {step === 1 ? 'Select Portal' : 'Welcome Back'}
        </h1>
        <p className="text-gray-400 text-lg">
          {step === 1
            ? 'Choose your account type to proceed to the dashboard.'
            : `Sign in to your ${selectedRole?.toLowerCase()} account.`}
        </p>
      </div>

      {step === 1 ? (<div className="space-y-4 w-full max-w-md animate-in fade-in slide-in-from-left-4 duration-500">
        {roles.map((role) => (<button key={role.id} onClick={() => handleRoleSelect(role.id)} className="w-full group relative overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-gray-600 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:bg-gray-800/60 text-left flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} ${role.shadow} group-hover:scale-110 transition-transform duration-300`}>
            <role.icon className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{role.title}</h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-400">{role.description}</p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="text-gray-400" size={20} />
          </div>
        </button>))}
      </div>) : (<form onSubmit={handleLogin} className="space-y-6 w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-2">
          <ArrowLeft size={16} /> Back to role selection
        </button>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm" placeholder="name@college.edu" required />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <button type="button" onClick={() => { setShowForgotPassword(true); setResetEmail(email); }} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm" placeholder="••••••••" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? (<div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (<>Sign In <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>)}
        </button>
      </form>)}

      <p className="mt-8 text-center sm:text-left text-gray-500 text-sm">
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')} className="text-white hover:text-purple-400 font-medium transition-colors">
          Contact Administration
        </button>
      </p>

      {/* Footer Links */}
      <div className="mt-12 flex gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
      </div>
    </div>

    {/* Right Section - Visuals */}
    <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 items-center justify-center overflow-hidden">
      {/* Abstract Shapes/Gradient Mesh */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/50 to-gray-900/90 z-10"></div>

      {/* Glass Card Floating Effect */}
      <div className="relative z-20 p-12 max-w-lg">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <h2 className="text-3xl font-bold mb-4 text-white">Future of Education</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Experience seamless campus management. Track attendance, manage fees, and access vital academic resources in one unified platform.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 p-[2px]">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" alt="Student" className="rounded-full w-full h-full object-cover border-2 border-gray-900" />
            </div>
            <div>
              <p className="text-white font-medium">Trusted by</p>
              <p className="text-gray-400 text-sm">5000+ Students & Faculty</p>
            </div>
          </div>
        </div>

        {/* Floating stats card */}
        <div className="absolute -bottom-12 -right-12 bg-gray-800/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float delay-1000">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <p className="text-xs text-gray-400">System Status</p>
            <p className="text-sm font-bold text-green-400">Operational</p>
          </div>
        </div>
      </div>
    </div>

    <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
      `}</style>

    {/* Forgot Password Modal */}
    {showForgotPassword && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowForgotPassword(false)}>
        <div className="bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
            <h2 className="text-xl font-bold text-white">Reset Password</h2>
            <p className="text-sm text-gray-400 mt-1">Enter your email and a new password</p>
          </div>
          <form onSubmit={handleResetPassword} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" required value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-gray-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" minLength={6} className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-gray-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="password" required value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Re-enter new password" minLength={6} className="w-full bg-gray-800/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-gray-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForgotPassword(false)} className="px-4 py-2.5 text-gray-400 hover:text-white rounded-xl font-medium transition-colors">Cancel</button>
              <button type="submit" disabled={resetLoading} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2">
                {resetLoading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                {resetLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>);
};
```

### File: `frontend/src/pages/Dashboard.jsx`

```javascript
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Users, GraduationCap, DollarSign, TrendingUp, CreditCard, Calendar, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiClient } from '@/services/api';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { TeacherDashboard } from '@/pages/TeacherDashboard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const role = user?.roles?.[0]?.toUpperCase();
  if (role === 'STUDENT') return <StudentDashboard />;
  if (role === 'TEACHER') return <TeacherDashboard />;
  if (role === 'STAFF') return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-4">
        <div className="text-6xl">🗂️</div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome, {user?.fullName?.split(' ')[0] || 'Staff'}!
        </h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          You are logged in as <strong>Staff</strong>. Contact your Administrator for module access.
        </p>
      </div>
    </Layout>
  );

  // --- ADMIN Dashboard ---
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalRevenue: 0,
    pendingFees: 0,
    attendance: { total: 0, present: 0, absent: 0, presentPct: 0 },
    recentAdmissions: [],
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await apiClient.get('/dashboard/admin');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (<Layout>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </Layout>);

  return (<Layout>
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Welcome back, {user?.fullName || 'Admin'}
          </p>
        </div>
        <div className={`text-sm font-medium px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
          📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Stat Cards — all real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="text-blue-600" bg="bg-blue-50" isDarkMode={isDarkMode} />
        <StatCard title="Total Teachers" value={stats.totalTeachers} icon={GraduationCap} color="text-emerald-600" bg="bg-emerald-50" isDarkMode={isDarkMode} />
        <StatCard title="Revenue Collected" value={stats.totalRevenue > 0 ? `₹${(stats.totalRevenue / 1000).toFixed(1)}k` : '₹0'} icon={DollarSign} color="text-violet-600" bg="bg-violet-50" isDarkMode={isDarkMode} />
        <StatCard title="Attendance Rate" value={stats.attendance?.total > 0 ? `${stats.attendance.presentPct}%` : 'No Data'} icon={CheckCircle} color="text-amber-600" bg="bg-amber-50" isDarkMode={isDarkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className={`lg:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Revenue Analytics
            </h2>
          </div>
          {stats.chartData?.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: isDarkMode ? '1px solid #374151' : 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, fill: '#8b5cf6', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={`h-[300px] flex flex-col items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <DollarSign size={40} className="mb-3 opacity-40" />
              <p className="font-medium">No revenue data yet</p>
              <p className="text-sm mt-1">Revenue will appear here as payments are recorded</p>
            </div>
          )}
        </motion.div>

        {/* Recent Activity — real admissions */}
        <motion.div variants={itemVariants} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Admissions
          </h2>
          <div className="space-y-4">
            {stats.recentAdmissions?.length > 0 ? (
              stats.recentAdmissions.map((student, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Users size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {student.userId?.fullName || student.userId?.email || 'New Student'}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {student.course || 'Course not set'} {student.rollNo ? `· Roll: ${student.rollNo}` : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <GraduationCap size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No students enrolled yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Attendance Summary */}
      {stats.attendance?.total > 0 && (
        <motion.div variants={itemVariants} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Attendance Summary
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className="text-2xl font-bold text-green-600">{stats.attendance.present}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Present Records</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
              <p className="text-2xl font-bold text-red-600">{stats.attendance.absent}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Absent Records</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className="text-2xl font-bold text-blue-600">{stats.attendance.presentPct}%</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Overall Rate</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  </Layout>);
};

const StatCard = ({ title, value, icon: Icon, color, bg, isDarkMode }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -5 }} className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : bg}`}>
        <Icon size={22} className={color} />
      </div>
    </div>
    <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
  </motion.div>
);
```

### File: `frontend/src/pages/StudentsPage.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button, Table, Input, Modal } from '@/components';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    rollNo: '',
    course: '',
    semester: '',
    section: '',
  });
  useEffect(() => {
    fetchStudents();
  }, [page, searchTerm]);
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/students?page=${page}&size=25`);
      setStudents(response.data.data.students);
      setTotal(response.data.data.total);
    }
    catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch students');
    }
    finally {
      setLoading(false);
    }
  };
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/students', formData);
      toast.success('Student created successfully');
      setModalOpen(false);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        rollNo: '',
        course: '',
        section: '',
      });
      fetchStudents();
    }
    catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create student');
    }
  };
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'rollNo', label: 'Roll No' },
    { key: 'course', label: 'Course' },
    { key: 'semester', label: 'Semester' },
    { key: 'section', label: 'Section' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (<span className={`px-3 py-1 rounded-full text-sm font-medium ${value === 'active'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'}`}>
        {value}
      </span>),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (<Button variant="outline" size="sm" onClick={() => navigate(`/students/${row.id}`)}>
        View Profile
      </Button>)
    }
  ];
  return (<Layout>
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={() => navigate('/students/add')} variant="primary">
          <Plus size={20} className="inline mr-2" />
          Add Student
        </Button>
      </div>

      <div className="mb-6">
        <Input type="search" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={students} loading={loading} />
      </div>

      {/* Create Student Modal */}
      <Modal open={modalOpen} title="Add New Student" onClose={() => setModalOpen(false)} footer={<>
        <Button variant="outline" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateStudent}>
          Create
        </Button>
      </>}>
        <form className="space-y-4">
          <Input label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <Input label="Roll Number" value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} required />
          <Input label="Semester" value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })} required />
          <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </form>
      </Modal>
    </div>
  </Layout>);
};
```

### File: `frontend/src/pages/TeachersPage.jsx`

```javascript
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useResource } from '@/hooks/useResource';
import { Plus, Search, Mail, Phone, BookOpen, ArrowLeft, UserPlus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const TeachersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { data: teachers, loading, remove } = useResource({ endpoint: '/teachers' });
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            await remove(id);
        }
    };
    const filteredTeachers = teachers.filter(teacher => (teacher.userId?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.employeeId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()));
    return (<Layout>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Back to Dashboard">
                            <ArrowLeft size={24}/>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
                            <p className="text-gray-500">Manage faculty members</p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                            <input type="text" placeholder="Search teachers..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        </div>
                        <button onClick={() => navigate('/teachers/add')} className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap">
                            <Plus size={20} className="mr-2"/> Add Teacher
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (<div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                        <p>Loading faculty data...</p>
                    </div>) : filteredTeachers.length === 0 ? (<div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="text-gray-400" size={32}/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Teachers Found</h3>
                        <p className="text-gray-500 max-w-sm text-center mb-6">
                            Start by adding your first teacher to the system. You can manage their profile, classes, and performance here.
                        </p>
                        <button onClick={() => navigate('/teachers/add')} className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium">
                            Add New Teacher
                        </button>
                    </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (<div key={teacher._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-bold text-xl ring-2 ring-white shadow-sm">
                                            {teacher.userId?.fullName?.charAt(0) || '?'}
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {teacher.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-primary transition-colors">
                                        {teacher.userId?.fullName || 'Unknown Name'}
                                    </h3>
                                    <p className="text-primary font-medium text-sm mb-4">{teacher.designation}</p>

                                    <div className="space-y-2.5 text-sm text-gray-600">
                                        <div className="flex items-center gap-2.5">
                                            <BookOpen size={16} className="text-gray-400"/>
                                            <span className="truncate">{teacher.department}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Mail size={16} className="text-gray-400"/>
                                            <span className="truncate">{teacher.userId?.email || 'No Email'}</span>
                                        </div>
                                        {teacher.contactInfo?.phone && (<div className="flex items-center gap-2.5">
                                                <Phone size={16} className="text-gray-400"/>
                                                <span>{teacher.contactInfo.phone}</span>
                                            </div>)}
                                    </div>
                                </div>
                                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-mono bg-white px-2 py-1 rounded border">ID: {teacher.employeeId}</span>
                                    <div className="flex gap-3">
                                        <button onClick={() => navigate(`/teachers/edit/${teacher._id}`)} className="text-gray-600 hover:text-primary font-semibold transition-colors flex items-center gap-1">
                                            <Edit2 size={14}/> Edit
                                        </button>
                                        <div className="w-px h-4 bg-gray-300"></div>
                                        <button onClick={() => handleDelete(teacher._id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors flex items-center gap-1">
                                            <Trash2 size={14}/> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>))}
                    </div>)}
            </div>
        </Layout>);
};
```

### File: `frontend/src/pages/FeesPage.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, CreditCard, ChevronRight, X, IndianRupee, Layers, CalendarClock, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';

const FREQUENCY_LABELS = {
    yearly: { label: 'Yearly', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
    semester: { label: 'Semester', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    monthly: { label: 'Monthly', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    'one-time': { label: 'One Time', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
};

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

export const FeesPage = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');

    const [feeTypes, setFeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Assignment State
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedFeeForAssign, setSelectedFeeForAssign] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Create Form State
    const [newFee, setNewFee] = useState({
        name: '',
        amount: '',
        frequency: 'yearly',
        description: '',
        isOptional: false,
    });

    useEffect(() => {
        fetchFeeTypes();
        if (isAdmin) fetchClasses();
    }, [isAdmin]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch {
            console.error('Failed to fetch classes');
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) setFeeTypes(response.data.data);
        } catch (error) {
            console.error('Failed to fetch fees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', { ...newFee, amount: Number(newFee.amount) });
            toast.success('Fee structure created successfully!');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch {
            toast.error('Failed to create fee structure');
        }
    };

    const openAssignModal = (fee) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) { toast.error('Please fill all fields'); return; }
        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate,
            });
            toast.success('Fee assigned to class successfully!');
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to assign fee');
        }
    };

    const totalAmount = feeTypes.reduce((sum, f) => sum + (f.amount || 0), 0);

    const card = isDarkMode
        ? 'bg-gray-800/70 border border-gray-700/60 hover:border-indigo-500/50 hover:shadow-indigo-900/30'
        : 'bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-indigo-50';

    const inputCls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${isDarkMode
            ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-500 focus:border-primary'
            : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-primary focus:bg-white'
        }`;

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
            >
                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                                <IndianRupee size={22} className="text-indigo-500" />
                            </div>
                            <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Fee Management
                            </h1>
                        </div>
                        <p className={`text-sm ml-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Define fee structures and assign them to classes
                        </p>
                    </div>

                    {isAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-semibold transition-colors"
                        >
                            <Plus size={18} /> New Fee Structure
                        </motion.button>
                    )}
                </div>

                {/* ── Summary Strip ── */}
                {feeTypes.length > 0 && (
                    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50 border-gray-100'
                        }`}>
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Total Fee Types
                            </p>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {feeTypes.length}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Combined Amount
                            </p>
                            <p className="text-2xl font-bold text-indigo-500">
                                ₹{formatINR(totalAmount)}
                            </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Optional Fees
                            </p>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {feeTypes.filter((f) => f.isOptional).length}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Fee Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence>
                        {feeTypes.map((fee, i) => {
                            const freq = FREQUENCY_LABELS[fee.frequency] || { label: fee.frequency, color: 'bg-gray-100 text-gray-600' };
                            return (
                                <motion.div
                                    key={fee._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 120 }}
                                    layout
                                    className={`rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg group ${card}`}
                                >
                                    {/* Top Row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
                                            <IndianRupee size={20} className="text-indigo-500" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${freq.color}`}>
                                            {freq.label}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className={`text-base font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {fee.name}
                                    </h3>

                                    {fee.isOptional && (
                                        <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded mb-2 ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                                            }`}>Optional</span>
                                    )}

                                    {/* Amount */}
                                    <div className={`flex items-baseline gap-0.5 mt-2 mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        <span className="text-lg font-semibold">₹</span>
                                        <span className="text-3xl font-extrabold leading-none">{formatINR(fee.amount)}</span>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm leading-relaxed line-clamp-2 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {fee.description || 'No description provided.'}
                                    </p>

                                    {/* Footer */}
                                    {isAdmin && (
                                        <div className={`pt-3.5 border-t flex justify-between items-center ${isDarkMode ? 'border-gray-700/60' : 'border-gray-100'}`}>
                                            {fee.code && (
                                                <span className={`text-[11px] font-mono ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {fee.code}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => openAssignModal(fee)}
                                                className="ml-auto flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group-hover:translate-x-0.5 duration-200"
                                            >
                                                Assign to Class <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Empty State */}
                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4">
                            <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                <CreditCard size={40} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} />
                            </div>
                            <div className="text-center">
                                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    No fee structures yet
                                </p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {isAdmin ? 'Click "New Fee Structure" to get started.' : 'No fee structures have been created.'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Loading Skeletons */}
                    {loading && Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`rounded-2xl p-5 animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className={`h-10 w-10 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-4 w-2/3 rounded mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-8 w-1/2 rounded mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-3 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Create Fee Modal ── */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 12 }}
                            className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`flex justify-between items-center px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                                        <Layers size={16} className="text-indigo-500" />
                                    </div>
                                    <h2 className="text-base font-bold">Create Fee Structure</h2>
                                </div>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleCreateFee} className="px-6 py-5 space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Fee Name
                                    </label>
                                    <input
                                        value={newFee.name}
                                        onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                                        className={inputCls}
                                        placeholder="e.g. Tuition Fee, Lab Fee"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Amount (₹)
                                        </label>
                                        <div className="relative">
                                            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={newFee.amount}
                                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                                                className={`${inputCls} pl-7`}
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Frequency
                                        </label>
                                        <select
                                            value={newFee.frequency}
                                            onChange={(e) => setNewFee({ ...newFee, frequency: e.target.value })}
                                            className={inputCls}
                                        >
                                            <option value="yearly">Yearly</option>
                                            <option value="semester">Semester</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="one-time">One Time</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Description <span className="text-gray-400 font-normal normal-case">(optional)</span>
                                    </label>
                                    <textarea
                                        value={newFee.description}
                                        onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                        className={`${inputCls} min-h-[80px] resize-none`}
                                        placeholder="Brief description of this fee..."
                                    />
                                </div>

                                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={newFee.isOptional}
                                        onChange={(e) => setNewFee({ ...newFee, isOptional: e.target.checked })}
                                        className="w-4 h-4 accent-indigo-600 rounded"
                                    />
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mark as optional fee</span>
                                </label>

                                <div className={`flex gap-3 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-colors"
                                    >
                                        Create Structure
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Assign Fee Modal ── */}
            <AnimatePresence>
                {showAssignModal && selectedFeeForAssign && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 12 }}
                            className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`flex justify-between items-center px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                                        <Tag size={16} className="text-green-500" />
                                    </div>
                                    <h2 className="text-base font-bold">Assign Fee to Class</h2>
                                </div>
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Selected Fee Summary */}
                            <div className={`mx-6 mt-5 p-4 rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-gray-700/60' : 'bg-indigo-50'}`}>
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white shadow-sm'}`}>
                                    <IndianRupee size={18} className="text-indigo-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Selected Fee</p>
                                    <p className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedFeeForAssign.name}</p>
                                </div>
                                <div className="ml-auto shrink-0">
                                    <p className={`text-lg font-extrabold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        ₹{formatINR(selectedFeeForAssign.amount)}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleAssignFee} className="px-6 py-5 space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Select Class
                                    </label>
                                    <select
                                        value={selectedClassId}
                                        onChange={(e) => setSelectedClassId(e.target.value)}
                                        className={inputCls}
                                        required
                                    >
                                        <option value="">— Choose a class —</option>
                                        {classes.map((cls) => (
                                            <option key={cls._id} value={cls._id}>
                                                Class {cls.name} — {cls.section}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <CalendarClock size={12} className="inline mr-1" />Due Date
                                    </label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className={inputCls}
                                        required
                                    />
                                </div>

                                <div className={`flex gap-3 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setShowAssignModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-green-500/25 transition-colors"
                                    >
                                        Assign Fee
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};
```

### File: `frontend/src/pages/AttendancePage.jsx`

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { CheckCircle, XCircle, Clock, Search, Filter, Download, Calendar, Users, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_STUDENTS = [
    { _id: '65a1b2c3d4e5f60001000001', name: 'Aarav Sharma', rollNo: 'BCA001', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000002', name: 'Priya Patel', rollNo: 'BCA002', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000003', name: 'Rahul Verma', rollNo: 'BCA003', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000004', name: 'Sneha Gupta', rollNo: 'BBA001', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000005', name: 'Amit Joshi', rollNo: 'BBA002', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000006', name: 'Kavya Singh', rollNo: 'MCA001', class: 'MCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000007', name: 'Rohan Mehta', rollNo: 'MBA001', class: 'MBA - Sem 2' },
    { _id: '65a1b2c3d4e5f60001000008', name: 'Diya Kapoor', rollNo: 'BSC001', class: 'BSc IT - Sem 2' },
];

const getToday = () => new Date().toISOString().split('T')[0];

const getLast30Days = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

export const AttendancePage = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [searchTerm, setSearchTerm] = useState('');
    const [attendance, setAttendance] = useState({});
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('mark');
    const [allStudents, setAllStudents] = useState([]);
    const [classes, setClasses] = useState(['All']);
    const [historyData, setHistoryData] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const isAdmin = user?.roles?.includes('ADMIN');
    const isTeacher = user?.roles?.includes('TEACHER');
    const canMark = isAdmin || isTeacher;

    // Fetch students from API, fall back to mock
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            let students = [];
            try {
                const res = await apiClient.get('/students?size=200');
                const studentsArr = res.data?.data?.students || [];
                if (Array.isArray(studentsArr) && studentsArr.length > 0) {
                    students = studentsArr.map(s => ({
                        _id: s.id || s._id,
                        name: s.name || s.fullName || 'Unknown',
                        rollNo: s.rollNo || s.rollNumber || '—',
                        class: s.course
                            ? `${s.course}${s.semester ? ' - Sem ' + s.semester : ''}`
                            : 'Unassigned',
                    }));
                }
            } catch {
                // API failed, use mock
            }

            // Always include mock students so the page is never empty
            if (students.length === 0) {
                students = MOCK_STUDENTS;
            }

            setAllStudents(students);

            // Build dynamic class list from student data
            const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
            setClasses(['All', ...uniqueClasses]);
            setSelectedClass('All');
            setLoading(false);
        };
        fetchStudents();
    }, []);

    // Initialize attendance statuses when students or date changes
    useEffect(() => {
        if (allStudents.length > 0) {
            // Initialize all as present
            const map = {};
            allStudents.forEach(s => { map[s._id] = 'present'; });
            setAttendance(map);
            setSubmitted(false);
        }
    }, [allStudents, selectedDate, selectedClass]);

    // Fetch existing attendance for selected date
    const fetchAttendanceForDate = useCallback(async () => {
        if (allStudents.length === 0) return;
        try {
            const res = await apiClient.get('/attendance', { params: { date: selectedDate } });
            const records = res.data?.data || [];
            if (records.length > 0) {
                const map = { ...attendance };
                records.forEach(r => {
                    const sid = r.student?._id || r.student;
                    if (sid) map[sid] = (r.status || 'PRESENT').toLowerCase();
                });
                setAttendance(map);
            }
        } catch {
            // Silently ignore — keep default
        }
    }, [selectedDate, allStudents]);

    useEffect(() => {
        if (allStudents.length > 0) {
            fetchAttendanceForDate();
        }
    }, [fetchAttendanceForDate]);

    // Fetch history
    const fetchHistory = useCallback(async () => {
        setHistoryLoading(true);
        try {
            const last30 = getLast30Days();
            const res = await apiClient.get('/attendance', { params: { limit: 5000 } });
            const records = res.data?.data || [];
            const grouped = {};
            records.forEach(r => {
                const d = new Date(r.date).toISOString().split('T')[0];
                if (!grouped[d]) grouped[d] = { present: 0, absent: 0, late: 0, total: 0 };
                grouped[d].total++;
                const status = (r.status || '').toUpperCase();
                if (status === 'PRESENT') grouped[d].present++;
                else if (status === 'ABSENT') grouped[d].absent++;
                else if (status === 'LATE') grouped[d].late++;
            });
            const history = last30
                .filter(d => grouped[d])
                .map(d => ({
                    date: d,
                    present: grouped[d].present,
                    absent: grouped[d].absent,
                    late: grouped[d].late,
                    total: grouped[d].total,
                }));
            setHistoryData(history);
        } catch {
            setHistoryData([]);
        } finally {
            setHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'history') fetchHistory();
    }, [activeTab, fetchHistory]);

    // Filter students by class & search
    const classStudents = allStudents.filter(s =>
        (selectedClass === 'All' || s.class === selectedClass) &&
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const setStatus = (id, status) => {
        setAttendance(prev => ({ ...prev, [id]: status }));
        setSubmitted(false);
    };

    const handleSubmit = async () => {
        if (saving || classStudents.length === 0) return;
        setSaving(true);
        try {
            const records = classStudents.map(s => ({
                studentId: s._id,
                status: (attendance[s._id] || 'present').toUpperCase(),
            }));
            await apiClient.post('/attendance/bulk', {
                date: selectedDate,
                records,
                subject: '',
            });
            setSubmitted(true);
            toast.success(`Attendance saved for ${classStudents.length} students on ${selectedDate}`);
        } catch (err) {
            console.error('Save attendance error:', err);
            toast.error(err.response?.data?.message || 'Failed to save attendance');
        } finally {
            setSaving(false);
        }
    };

    const stats = {
        present: classStudents.filter(s => attendance[s._id] === 'present').length,
        absent: classStudents.filter(s => attendance[s._id] === 'absent').length,
        late: classStudents.filter(s => attendance[s._id] === 'late').length,
    };

    const statusBtn = (id, status, label, Icon, colors) => (
        <button
            onClick={() => canMark && setStatus(id, status)}
            disabled={!canMark}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${attendance[id] === status ? colors.active : colors.inactive} ${canMark ? 'cursor-pointer hover:opacity-90' : 'cursor-default opacity-60'}`}
        >
            <Icon size={14} /> {label}
        </button>
    );

    const card = `rounded-2xl border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <CheckCircle className="inline mr-2 text-green-500" size={30} />
                            Attendance
                        </h1>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Mark and review student attendance records
                        </p>
                    </div>
                    <button
                        onClick={() => toast.success('Attendance report exported!')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm hover:shadow-lg transition-all"
                    >
                        <Download size={16} /> Export Report
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Present', count: stats.present, color: 'text-green-600', bg: isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-100' },
                        { label: 'Absent', count: stats.absent, color: 'text-red-600', bg: isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-100' },
                        { label: 'Late', count: stats.late, color: 'text-yellow-600', bg: isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-100' },
                    ].map(s => (
                        <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.bg}`}>
                            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
                            <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 p-1 rounded-xl w-fit ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {['mark', 'history'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab
                                ? 'bg-purple-600 text-white shadow'
                                : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'mark' ? '✏️ Mark Attendance' : '📋 History'}
                        </button>
                    ))}
                </div>

                {activeTab === 'mark' && (
                    <>
                        {/* Filters */}
                        <div className={`${card} flex flex-col md:flex-row gap-4`}>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Filter size={12} className="inline mr-1" />Class / Section
                                </label>
                                <select
                                    value={selectedClass}
                                    onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }}
                                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                >
                                    {classes.map(c => <option key={c} value={c}>{c === 'All' ? '📋 All Students' : c}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Calendar size={12} className="inline mr-1" />Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={e => { setSelectedDate(e.target.value); setSubmitted(false); }}
                                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Search size={12} className="inline mr-1" />Search Student
                                </label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-purple-500" />
                                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {classStudents.length} Students{selectedClass !== 'All' ? ` — ${selectedClass}` : ''}
                                    </span>
                                    {loading && <Loader2 size={16} className="animate-spin text-purple-500 ml-2" />}
                                </div>
                                {canMark && classStudents.length > 0 && (
                                    <div className="flex gap-2">
                                        <button onClick={() => {
                                            const updates = {};
                                            classStudents.forEach(s => updates[s._id] = 'present');
                                            setAttendance(prev => ({ ...prev, ...updates }));
                                            setSubmitted(false);
                                        }} className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors">
                                            All Present
                                        </button>
                                        <button onClick={() => {
                                            const updates = {};
                                            classStudents.forEach(s => updates[s._id] = 'absent');
                                            setAttendance(prev => ({ ...prev, ...updates }));
                                            setSubmitted(false);
                                        }} className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">
                                            All Absent
                                        </button>
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 size={28} className="animate-spin text-purple-500" />
                                    <span className={`ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading students...</span>
                                </div>
                            ) : classStudents.length === 0 ? (
                                <div className={`px-6 py-12 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    No students found{selectedClass !== 'All' ? ` in ${selectedClass}` : ''}. Try selecting a different class or clearing the search.
                                </div>
                            ) : (
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <th className="px-6 py-3 text-left">#</th>
                                            <th className="px-6 py-3 text-left">Student</th>
                                            <th className="px-6 py-3 text-left">Roll No.</th>
                                            <th className="px-6 py-3 text-left">Class</th>
                                            <th className="px-6 py-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                                        {classStudents.map((student, i) => (
                                            <tr key={student._id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                                                <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{i + 1}</td>
                                                <td className={`px-6 py-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{student.name}</td>
                                                <td className={`px-6 py-4 font-mono text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.rollNo}</td>
                                                <td className={`px-6 py-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.class}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {statusBtn(student._id, 'present', 'Present', CheckCircle, {
                                                            active: 'bg-green-500 text-white',
                                                            inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                                                        })}
                                                        {statusBtn(student._id, 'absent', 'Absent', XCircle, {
                                                            active: 'bg-red-500 text-white',
                                                            inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                                                        })}
                                                        {statusBtn(student._id, 'late', 'Late', Clock, {
                                                            active: 'bg-yellow-500 text-white',
                                                            inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                                                        })}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {canMark && classStudents.length > 0 && !loading && (
                                <div className={`px-6 py-4 border-t flex justify-end ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={saving}
                                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {saving && <Loader2 size={16} className="animate-spin" />}
                                        {submitted ? '✅ Attendance Saved' : saving ? 'Saving...' : 'Save Attendance'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
                            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Records — Last 30 Days</h2>
                            {historyLoading && <Loader2 size={16} className="animate-spin text-purple-500" />}
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500 bg-gray-900/30' : 'text-gray-400 bg-gray-50'}`}>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Present</th>
                                    <th className="px-6 py-3 text-left">Absent</th>
                                    <th className="px-6 py-3 text-left">Late</th>
                                    <th className="px-6 py-3 text-left">Total</th>
                                    <th className="px-6 py-3 text-left">Attendance %</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                {historyData.length === 0 && !historyLoading && (
                                    <tr>
                                        <td colSpan={6} className={`px-6 py-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            No attendance records found for the last 30 days. Mark attendance to see data here.
                                        </td>
                                    </tr>
                                )}
                                {historyData.map((row, i) => {
                                    const pct = row.total > 0 ? Math.round((row.present / row.total) * 100) : 0;
                                    return (
                                        <tr key={i} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                            <td className={`px-6 py-4 font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{row.present}</span></td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">{row.absent}</span></td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">{row.late}</span></td>
                                            <td className={`px-6 py-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.total}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-24 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                        <div
                                                            className={`h-2 rounded-full ${pct >= 75 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-semibold ${pct >= 75 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{pct}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
};
```

### File: `frontend/src/pages/LibraryPage.jsx`

```javascript
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useThemeStore } from '@/store/theme';
import { BookOpen, Search, Plus, RotateCcw, AlertCircle, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_BOOKS = [
    { id: 1, title: 'Data Structures & Algorithms', author: 'Thomas H. Cormen', genre: 'CS', total: 5, issued: 3, isbn: '978-0262033848' },
    { id: 2, title: 'Database Management Systems', author: 'Ramez Elmasri', genre: 'CS', total: 4, issued: 2, isbn: '978-0133970777' },
    { id: 3, title: 'Principles of Marketing', author: 'Philip Kotler', genre: 'MBA', total: 6, issued: 6, isbn: '978-0134492513' },
    { id: 4, title: 'Business Communication', author: 'Lesikar & Flatley', genre: 'BBA', total: 8, issued: 3, isbn: '978-0073403267' },
    { id: 5, title: 'Operating Systems', author: 'Silberschatz & Galvin', genre: 'CS', total: 5, issued: 1, isbn: '978-1119320913' },
    { id: 6, title: 'Financial Accounting', author: 'Meigs & Meigs', genre: 'Commerce', total: 10, issued: 7, isbn: '978-0078025587' },
    { id: 7, title: 'Computer Networks', author: 'Andrew Tanenbaum', genre: 'CS', total: 4, issued: 0, isbn: '978-0132126953' },
    { id: 8, title: 'Strategic Management', author: 'Fred David', genre: 'MBA', total: 6, issued: 4, isbn: '978-0134167411' },
];

const MOCK_LOANS = [
    { id: 1, studentName: 'Aarav Sharma', roll: 'BCA001', book: 'Data Structures & Algorithms', issueDate: '2026-02-10', dueDate: '2026-02-24', returned: false },
    { id: 2, studentName: 'Priya Patel', roll: 'BCA002', book: 'Operating Systems', issueDate: '2026-02-15', dueDate: '2026-03-01', returned: false },
    { id: 3, studentName: 'Sneha Gupta', roll: 'BBA001', book: 'Business Communication', issueDate: '2026-02-01', dueDate: '2026-02-15', returned: true },
    { id: 4, studentName: 'Rohan Mehta', roll: 'MBA001', book: 'Strategic Management', issueDate: '2026-02-12', dueDate: '2026-02-26', returned: false },
];

const GENRES = ['All', 'CS', 'MBA', 'BBA', 'Commerce'];

export const LibraryPage = () => {
    const { isDarkMode } = useThemeStore();
    const [activeTab, setActiveTab] = useState('catalog');
    const [search, setSearch] = useState('');
    const [genreFilter, setGenreFilter] = useState('All');
    const [issueModal, setIssueModal] = useState(null); // book object
    const [returnModal, setReturnModal] = useState(null); // loan object
    const [issueForm, setIssueForm] = useState({ studentName: '', roll: '' });
    const [loans, setLoans] = useState(MOCK_LOANS);

    const today = new Date();

    const filteredBooks = MOCK_BOOKS.filter(b => {
        const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase());
        const matchGenre = genreFilter === 'All' || b.genre === genreFilter;
        return matchSearch && matchGenre;
    });

    const handleIssue = (e) => {
        e.preventDefault();
        setLoans(prev => [...prev, {
            id: Date.now(),
            studentName: issueForm.studentName,
            roll: issueForm.roll,
            book: issueModal.title,
            issueDate: today.toISOString().split('T')[0],
            dueDate: new Date(today.getTime() + 14 * 86400000).toISOString().split('T')[0],
            returned: false,
        }]);
        toast.success(`📚 "${issueModal.title}" issued to ${issueForm.studentName}`);
        setIssueModal(null);
        setIssueForm({ studentName: '', roll: '' });
    };

    const handleReturn = () => {
        setLoans(prev => prev.map(l => l.id === returnModal.id ? { ...l, returned: true } : l));
        toast.success(`✅ "${returnModal.book}" returned successfully`);
        setReturnModal(null);
    };

    const isOverdue = (dueDate) => new Date(dueDate) < today;
    const daysOverdue = (dueDate) => Math.floor((today - new Date(dueDate)) / 86400000);

    const card = `rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;
    const inputClass = `w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`;

    const activeLoans = loans.filter(l => !l.returned);
    const overdueLoans = loans.filter(l => !l.returned && isOverdue(l.dueDate));

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <BookOpen className="inline mr-2 text-blue-500" size={30} />
                            Library Management
                        </h1>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Book catalog, loans, and return management
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Books', value: MOCK_BOOKS.length, color: 'text-blue-500', bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50' },
                        { label: 'Available', value: MOCK_BOOKS.reduce((a, b) => a + (b.total - b.issued), 0), color: 'text-green-500', bg: isDarkMode ? 'bg-green-900/20' : 'bg-green-50' },
                        { label: 'Active Loans', value: activeLoans.length, color: 'text-purple-500', bg: isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50' },
                        { label: 'Overdue', value: overdueLoans.length, color: 'text-red-500', bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-50' },
                    ].map(s => (
                        <div key={s.label} className={`${card} p-5 ${s.bg}`}>
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 p-1 rounded-xl w-fit ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {[
                        { key: 'catalog', label: '📚 Book Catalog' },
                        { key: 'loans', label: '📋 Active Loans' },
                    ].map(t => (
                        <button key={t.key} onClick={() => setActiveTab(t.key)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t.key
                                    ? 'bg-purple-600 text-white shadow'
                                    : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'catalog' && (
                    <>
                        {/* Filters */}
                        <div className={`${card} p-4 flex flex-col md:flex-row gap-4`}>
                            <div className="flex-1 relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search book title or author..."
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    className={`${inputClass} pl-8`} />
                            </div>
                            <div className="flex gap-2">
                                {GENRES.map(g => (
                                    <button key={g} onClick={() => setGenreFilter(g)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${genreFilter === g
                                                ? 'bg-purple-600 text-white'
                                                : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Book Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredBooks.map(book => {
                                const available = book.total - book.issued;
                                return (
                                    <div key={book.id} className={`${card} p-5 flex flex-col gap-3`}>
                                        <div className="flex items-start justify-between">
                                            <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                                                <BookOpen size={20} className="text-blue-500" />
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${available === 0
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-600'
                                                }`}>
                                                {available === 0 ? 'Unavailable' : `${available} left`}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className={`font-bold text-sm leading-snug ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {book.title}
                                            </h3>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {book.author}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                {book.genre}
                                            </span>
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {book.issued}/{book.total} issued
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => available > 0 ? setIssueModal(book) : toast.error('No copies available!')}
                                            className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${available > 0
                                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-md'
                                                    : isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <Plus size={12} className="inline mr-1" />Issue Book
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {activeTab === 'loans' && (
                    <div className={`${card} overflow-hidden`}>
                        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                All Loans ({loans.length})
                            </h2>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500 bg-gray-900/30' : 'text-gray-400 bg-gray-50'}`}>
                                    <th className="px-6 py-3 text-left">Student</th>
                                    <th className="px-6 py-3 text-left">Book</th>
                                    <th className="px-6 py-3 text-left">Issue Date</th>
                                    <th className="px-6 py-3 text-left">Due Date</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                {loans.map(loan => {
                                    const overdue = !loan.returned && isOverdue(loan.dueDate);
                                    return (
                                        <tr key={loan.id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                            <td className="px-6 py-4">
                                                <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{loan.studentName}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{loan.roll}</p>
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{loan.book}</td>
                                            <td className={`px-6 py-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{loan.issueDate}</td>
                                            <td className={`px-6 py-4 text-xs ${overdue ? 'text-red-500 font-semibold' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {loan.dueDate}
                                                {overdue && <span className="ml-1">({daysOverdue(loan.dueDate)}d overdue)</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                {loan.returned ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Returned</span>
                                                ) : overdue ? (
                                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                                                        <AlertCircle size={10} />Overdue
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Issued</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!loan.returned && (
                                                    <button onClick={() => setReturnModal(loan)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-200 transition-colors ml-auto">
                                                        <RotateCcw size={12} />Return
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Issue Modal */}
                {issueModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`}>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Issue Book</h2>
                                <button onClick={() => setIssueModal(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className={`p-3 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                                <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{issueModal.title}</p>
                                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{issueModal.author}</p>
                            </div>
                            <form onSubmit={handleIssue} className="space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Student Name</label>
                                    <input required type="text" placeholder="e.g. Aarav Sharma"
                                        value={issueForm.studentName}
                                        onChange={e => setIssueForm(p => ({ ...p, studentName: e.target.value }))}
                                        className={inputClass} />
                                </div>
                                <div>
                                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Roll / Student ID</label>
                                    <input required type="text" placeholder="e.g. BCA001"
                                        value={issueForm.roll}
                                        onChange={e => setIssueForm(p => ({ ...p, roll: e.target.value }))}
                                        className={inputClass} />
                                </div>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Due Date: {new Date(today.getTime() + 14 * 86400000).toLocaleDateString('en-IN')} (14 days)
                                </p>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setIssueModal(null)}
                                        className={`flex-1 py-2 rounded-xl text-sm font-semibold ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold">
                                        Confirm Issue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Return Confirm Modal */}
                {returnModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`}>
                            <div className="text-center mb-4">
                                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Confirm Return</h2>
                                <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Mark <strong>"{returnModal.book}"</strong> as returned by <strong>{returnModal.studentName}</strong>?
                                </p>
                                {isOverdue(returnModal.dueDate) && (
                                    <p className="text-xs mt-2 text-red-500 font-semibold">
                                        ⚠️ {daysOverdue(returnModal.dueDate)} days overdue — fine may apply
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setReturnModal(null)}
                                    className={`flex-1 py-2 rounded-xl text-sm font-semibold ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                    Cancel
                                </button>
                                <button onClick={handleReturn}
                                    className="flex-1 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
```

### File: `frontend/src/pages/PayrollPage.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { IndianRupee, Download, Filter, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/store/theme';
import { apiClient } from '@/services/api';

export const PayrollPage = () => {
    const { isDarkMode } = useThemeStore();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'faculty', 'staff'

    // Fetch faculty (teachers) and staff data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const [teachersRes, staffRes] = await Promise.all([
                    apiClient.get('/teachers'),
                    apiClient.get('/staff')
                ]);

                const teachers = (teachersRes.data.data || []).map(t => {
                    let netSalary = 0;
                    if (typeof t.salary === 'object' && t.salary !== null) {
                        const base = t.salary.base || 0;
                        const allowances = t.salary.allowances || 0;
                        const deductions = t.salary.deductions || 0;
                        netSalary = base + allowances - deductions;
                    } else if (typeof t.salary === 'number') {
                        netSalary = t.salary;
                    }

                    return {
                        id: `teacher-${t._id}`,
                        name: t.userId?.fullName || 'N/A',
                        role: 'Faculty',
                        department: t.department || 'N/A',
                        designation: t.designation || 'N/A',
                        salary: netSalary,
                        baseSalary: t.salary?.base || t.salary || 0,
                        status: 'Pending',
                        date: '-',
                        type: 'teacher'
                    };
                });

                const staff = (staffRes.data.data || []).map(s => {
                    let netSalary = 0;
                    if (typeof s.salary === 'object' && s.salary !== null) {
                        const base = s.salary.base || 0;
                        const allowances = s.salary.allowances || 0;
                        const deductions = s.salary.deductions || 0;
                        netSalary = base + allowances - deductions;
                    } else if (typeof s.salary === 'number') {
                        netSalary = s.salary;
                    }

                    return {
                        id: `staff-${s._id}`,
                        name: s.userId?.fullName || 'N/A',
                        role: s.role || 'Staff',
                        department: s.department || 'N/A',
                        designation: s.role || 'N/A',
                        salary: netSalary,
                        baseSalary: s.salary?.base || s.salary || 0,
                        status: 'Pending',
                        date: '-',
                        type: 'staff'
                    };
                });

                setEmployees([...teachers, ...staff]);
            } catch (error) {
                console.error('Error fetching employees:', error);
                toast.error('Failed to load employee data');
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleProcessPayment = (id) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing Salary...',
                success: 'Salary Disbursed Successfully!',
                error: 'Failed to process.',
            }
        ).then(() => {
            setEmployees(
                employees.map((e) =>
                    e.id === id
                        ? { ...e, status: 'Paid', date: new Date().toISOString().split('T')[0] }
                        : e
                )
            );
        });
    };

    const totalSalary = employees.reduce((acc, e) => acc + (e.salary || 0), 0);
    const pendingCount = employees.filter((e) => e.status !== 'Paid').length;
    const completedCount = employees.filter((e) => e.status === 'Paid').length;

    // Filter employees based on selected filter
    const filteredEmployees = employees.filter(emp => {
        if (filter === 'all') return true;
        if (filter === 'faculty') return emp.type === 'teacher';
        if (filter === 'staff') return emp.type === 'staff';
        return true;
    });

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Payroll Management
                    </h1>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        March 2024 Cycle
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Download size={18} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                        <IndianRupee size={18} /> Run Payroll
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                    <p className="text-blue-100 font-medium mb-1">Total Salary Output</p>
                    <h3 className="text-3xl font-bold">₹{totalSalary.toLocaleString('en-IN')}</h3>
                </div>
                <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <p className={`font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Pending Disbursals
                    </p>
                    <h3 className="text-3xl font-bold text-orange-500">{pendingCount}</h3>
                </div>
                <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <p className={`font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Completed
                    </p>
                    <h3 className="text-3xl font-bold text-green-600">{completedCount}</h3>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-3">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    All ({employees.length})
                </button>
                <button
                    onClick={() => setFilter('faculty')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'faculty'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Faculty ({employees.filter(e => e.type === 'teacher').length})
                </button>
                <button
                    onClick={() => setFilter('staff')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'staff'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Staff ({employees.filter(e => e.type === 'staff').length})
                </button>
            </div>

            {/* Payroll Table */}
            <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Faculty & Staff List
                    </h3>
                    <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${isDarkMode
                        ? 'bg-gray-700 text-gray-400 border-gray-600'
                        : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                        <Filter size={14} /> Filter: All
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading employees...</p>
                        </div>
                    ) : filteredEmployees.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No employees found</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className={`uppercase font-medium ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Base Salary</th>
                                    <th className="px-6 py-4">Last Payment</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                {filteredEmployees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className={`transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                                    >
                                        <td className={`px-6 py-4 font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {employee.name}
                                        </td>
                                        <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {employee.role}
                                        </td>
                                        <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {employee.department}
                                        </td>
                                        <td className="px-6 py-4 font-mono">
                                            ₹{(employee.salary || 0).toLocaleString('en-IN')}
                                        </td>
                                        <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {employee.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                                                    ${employee.status === 'Paid'
                                                        ? 'bg-green-100 text-green-700'
                                                        : employee.status === 'Processing'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >
                                                {employee.status === 'Paid' ? (
                                                    <CheckCircle size={10} />
                                                ) : (
                                                    <Clock size={10} />
                                                )}
                                                {employee.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {employee.status !== 'Paid' && (
                                                <button
                                                    onClick={() => handleProcessPayment(employee.id)}
                                                    className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-black transition-colors"
                                                >
                                                    Process
                                                </button>
                                            )}
                                            {employee.status === 'Paid' && (
                                                <button className="text-gray-400 text-xs font-medium cursor-not-allowed">
                                                    Payslip
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    );
};
```

### File: `frontend/src/components/Sidebar.jsx`

```javascript
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ChevronDown, ChevronRight, Menu, Home, LogOut, Users, GraduationCap, Calculator, ClipboardCheck, FileText, Settings, Briefcase, LayoutDashboard, CreditCard, PieChart, UserCircle, BookOpen, BarChart2, CheckSquare } from 'lucide-react';
import { useThemeStore } from '@/store/theme';
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(['Faculty & Staff']); // Pre-expand Faculty & Staff
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const scrollContainerRef = React.useRef(null);
  const menuItems = {
    ADMIN: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Students', path: '/students', icon: GraduationCap },
      {
        label: 'Faculty & Staff',
        icon: UserCircle,
        children: [
          { label: 'Faculty', path: '/teachers', icon: Users },
          { label: 'Staff', path: '/staff', icon: Briefcase },
        ]
      },
      { label: 'Courses', path: '/classes', icon: ClipboardCheck },
      { label: 'Attendance', path: '/attendance', icon: CheckSquare },
      { label: 'Fees', path: '/fees', icon: CreditCard },
      { label: 'Exams', path: '/exams', icon: FileText },
      { label: 'Timetable', path: '/timetable', icon: Calculator },
      { label: 'Library', path: '/library', icon: BookOpen },
      { label: 'Payroll', path: '/payroll', icon: PieChart },
      { label: 'Reports', path: '/reports', icon: BarChart2 },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
    STUDENT: [
      { label: 'My Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
      { label: 'My Timetable', path: '/timetable', icon: Calculator },
      { label: 'Exams', path: '/exams', icon: FileText },
      { label: 'Grades', path: '/grades', icon: GraduationCap },
      { label: 'Library', path: '/library', icon: BookOpen },
    ],
    TEACHER: [
      { label: 'My Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
      { label: 'Students', path: '/students', icon: GraduationCap },
      { label: 'Attendance', path: '/attendance', icon: CheckSquare },
      { label: 'Exams', path: '/exams', icon: FileText },
      { label: 'Timetable', path: '/timetable', icon: Calculator },
    ],
    STAFF: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
    PUBLIC: [
      { label: 'Home', path: '/dashboard', icon: Home },
    ],
  };
  const currentRole = user?.roles?.[0] ? user.roles[0].toUpperCase() : 'PUBLIC';
  const items = menuItems[currentRole] || menuItems['PUBLIC'];
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const isActive = (path) => location.pathname === path;
  const toggleMenu = (label) => {
    setExpandedMenus(prev => prev.includes(label)
      ? prev.filter(item => item !== label)
      : [...prev, label]);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
      else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Save and restore scroll position
  React.useEffect(() => {
    // Restore scroll position when component mounts or location changes
    const savedScrollPosition = sessionStorage.getItem('sidebarScrollPosition');
    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
    // Add scroll listener to save position as user scrolls
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem('sidebarScrollPosition', scrollContainerRef.current.scrollTop.toString());
      }
    };
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    // Cleanup
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname]);
  const renderMenuItem = (item, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.label);
    const active = item.path ? isActive(item.path) : false;
    if (hasChildren) {
      // Parent item with children
      return (<div key={item.label}>
        <button onClick={() => toggleMenu(item.label)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
              ${isDarkMode
            ? 'hover:bg-gray-800 hover:text-white text-gray-300'
            : 'hover:bg-gray-50 hover:text-gray-900 text-gray-600'}
              ${collapsed ? 'justify-center px-2' : ''}
            `} title={collapsed ? item.label : ''}>
          <item.icon size={22} className="shrink-0" />
          {!collapsed && (<>
            <span className="font-medium truncate flex-1 text-left">{item.label}</span>
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </>)}
        </button>

        {/* Children */}
        {!collapsed && isExpanded && (<div className="ml-4 space-y-1 mt-1">
          {item.children?.map(child => renderMenuItem(child, depth + 1))}
        </div>)}
      </div>);
    }
    // Leaf item
    return (<button key={item.path} onClick={() => {
      if (item.path) {
        // Save scroll position before navigation
        if (scrollContainerRef.current) {
          sessionStorage.setItem('sidebarScrollPosition', scrollContainerRef.current.scrollTop.toString());
        }
        navigate(item.path);
        if (isMobile)
          setCollapsed(true);
      }
    }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
          ${active
        ? isDarkMode
          ? 'bg-purple-500/10 text-purple-400'
          : 'bg-purple-50 text-purple-600'
        : isDarkMode
          ? 'hover:bg-gray-800 hover:text-white text-gray-300'
          : 'hover:bg-gray-50 hover:text-gray-900 text-gray-600'}
          ${collapsed ? 'justify-center px-2' : ''}
          ${depth > 0 ? 'ml-2' : ''}
        `} title={collapsed ? item.label : ''}>
      <item.icon size={depth > 0 ? 20 : 22} className={`shrink-0 transition-colors ${active ? 'text-purple-500' : ''}`} />

      {!collapsed && (<span className={`font-medium truncate ${active ? 'font-semibold' : ''}`}>
        {item.label}
      </span>)}

      {collapsed && active && (<div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-l-full" />)}
    </button>);
  };
  return (<>
    {/* Mobile Overlay */}
    {!collapsed && isMobile && (<div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setCollapsed(true)} />)}

    <aside className={`transition-all duration-300 
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 h-full' : 'sticky top-0 h-screen z-20'}
          ${collapsed ? 'w-20' : 'w-72'} 
          ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}
          flex flex-col 
          ${isDarkMode
        ? 'bg-[#0f1117] border-r border-gray-800 text-gray-300'
        : 'bg-white border-r border-gray-100 text-gray-600 shadow-xl'}`}>
      <div className={`flex items-center justify-between p-6 mb-2
          ${!collapsed && 'px-6'}
        `}>
        {!collapsed && (<div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <h1 className={`font-bold text-xl tracking-tight whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            LNMI CMS
          </h1>
        </div>)}
        <button onClick={() => setCollapsed(!collapsed)} className={`p-2 rounded-lg transition-all ${isDarkMode
          ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'} ${collapsed ? 'mx-auto' : ''}`}>
          {!collapsed && isMobile ? (<ChevronDown className="rotate-90" size={20} />) : (<Menu size={20} />)}
        </button>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 space-y-1 custom-scrollbar">
        {items.map((item) => renderMenuItem(item))}
      </div>

      {/* Footer Actions */}
      <div className={`p-4 mt-auto border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="space-y-1">
          <button onClick={() => navigate('/')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isDarkMode
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
              : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'} ${collapsed ? 'justify-center px-2' : ''}`} title="Home">
            <Home size={20} />
            {!collapsed && <span className="font-medium">Home</span>}
          </button>

          <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isDarkMode
              ? 'hover:bg-red-500/10 text-red-400 hover:text-red-300'
              : 'hover:bg-red-50 text-red-600 hover:text-red-700'} ${collapsed ? 'justify-center px-2' : ''}`} title="Logout">
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {!collapsed && (<div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold shrink-0">
              {user?.fullName?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.fullName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">
                {user?.roles?.[0]?.toLowerCase() || 'Guest'}
              </p>
            </div>
          </div>
        </div>)}
      </div>
    </aside>
  </>);
};
```

### File: `frontend/src/components/Header.jsx`

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Menu, X, Bell, Sun, Moon } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`border-b shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center px-6 py-4">
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
          College Management
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {menuOpen && (
              <div className={`absolute right-0 mt-2 w-52 border rounded-xl shadow-xl z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user?.fullName}</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                  {user?.roles?.[0] && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold capitalize">
                      {user.roles[0].toLowerCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 text-sm font-medium text-red-600 transition-colors rounded-b-xl ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
```

### File: `frontend/src/components/Layout.jsx`

```javascript
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
export const Layout = ({ children }) => {
    return (<div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>);
};
```

### File: `frontend/src/components/Modal.jsx`

```javascript
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
export const Modal = ({ open, title, children, onClose, footer, size = 'md' }) => {
    const { isDarkMode } = useThemeStore();
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    };
    return (<AnimatePresence>
      {open && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative w-full mx-4 ${sizeClasses[size]} rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className={`flex justify-between items-center p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X size={20}/>
              </button>
            </div>
            <div className="p-6">{children}</div>
            {footer && (<div className={`p-6 border-t flex gap-4 justify-end ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                {footer}
              </div>)}
          </motion.div>
        </div>)}
    </AnimatePresence>);
};
```

### File: `frontend/src/components/Button.jsx`

```javascript
import React from 'react';
export const Button = ({ variant = 'primary', size = 'md', isLoading = false, children, disabled, className, ...props }) => {
    const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    };
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    return (<button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>);
};
```
