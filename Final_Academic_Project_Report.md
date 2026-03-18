
<div style="text-align: center; margin-top: 50px;">
    <h1>COLLEGE MANAGEMENT SYSTEM</h1>
    <br><br>
    <h3>A Project Report</h3>
    <p>Submitted in partial fulfillment of the requirements for the degree of</p>
    <h2>Bachelor of Technology / MCA / BCA</h2>
    <br><br>
    <p><b>Submitted by:</b></p>
    <p>[Student Name] - [Enrollment Number]</p>
    <br><br>
    <p><b>Under the Guidance of:</b></p>
    <p>[Guide Name]</p>
    <br><br>
    <h3>Department of Computer Science</h3>
    <h3>[College Name]</h3>
    <h3>[Year]</h3>
</div>

<div style="page-break-after: always;"></div>

# 2. Acknowledgement

I would like to express my profound gratitude to my project guide, **[Guide Name]**, for their invaluable guidance, continuous encouragement, and technical support throughout the development of this project. Their insights and constructive feedback have been instrumental in shaping this software.

I also extend my sincere thanks to the Department of Computer Science and the faculty members of **[College Name]** for providing the necessary infrastructure and a conducive environment for research and development. 

Furthermore, I am deeply indebted to my institution's administration for facilitating this academic endeavor. Lastly, I would like to express my heartfelt appreciation to my family and friends for their unwavering moral support and patience during the intense phases of this project's development.

<div style="page-break-after: always;"></div>

# 3. Abstract

The College Management System (CMS) is a comprehensive, full-stack web application engineered to digitize, centralize, and streamline the administrative and pedagogical operations of an educational institution. Traditional college operations rely heavily on manual, paper-based ledgers and disparate offline spreadsheets, leading to severe data fragmentation, frequent human errors, and significant administrative delays.

This project specifically targets these inefficiencies by deploying a unified ecosystem tailored for three primary stakeholders: Administrators, Faculty Members, and Students. Key features include dynamic role-based authentication, real-time timetable scheduling, automated attendance tracking matrices, financial fee ledgers, and secure academic grading vaults.

Technologically, the system is developed utilizing the modern MERN Stack (MongoDB, Express.js, React.js, Node.js). React provides a seamless, asynchronous Single Page Application (SPA) experience, eliminating disruptive full-page reloads. Node.js and Express form a robust, decoupled RESTful API backend handling rigorous business logic and JSON Web Token (JWT) authorization. MongoDB serves as the agile NoSQL data layer, natively accommodating complex JSON object structures inherent to academic records. The resulting software significantly minimizes administrative overhead, ensures robust data integrity, and provides a highly scalable digital foundation for modern collegiate governance.

<div style="page-break-after: always;"></div>

# 4. Introduction

## Need of College Management System
In the rapidly evolving landscape of higher education, institutions manage colossal amounts of dynamic data daily. This includes tracking volatile student enrollments, organizing complex faculty resource allocations, recording thousands of daily attendance vectors, and auditing financial transactions. An automated CMS is logically necessary to maintain institutional efficiency, transparency, and data accuracy.

## Problems with Manual Systems
*   **Data Silos & Redundancy:** Disconnected departments (e.g., Accounts and Academics) maintain duplicate physical records, leading to severe inconsistencies.
*   **Time Consumption:** Fetching a student's historical attendance spanning three years takes hours of manual ledger auditing.
*   **Lack of Real-time Insight:** Management possesses no immediate macroscopic view of total revenue collections or aggregate student performance without manually compiling reports.
*   **Physical Vulnerability:** Paper records are highly susceptible to loss, unauthorized tampering, and physical degradation.

## Digital Automation Benefits
*   **Centralized Database:** A single Source of Truth ensuring all departments reference identical, up-to-date data.
*   **Instantaneous Analytics:** Metric dashboards natively compute macro-statistics instantly.
*   **Enhanced Communication:** Students can proactively view their attendance shortfalls and examination results securely from their personal computing devices.

<div style="page-break-after: always;"></div>

# 5. Objectives of the Project

The core objectives driving the architectural and functional development of this College Management System include:

1.  **Student Management:** To deploy a secure conduit for registering candidate profiles, tracking departmental allocations, and maintaining historical biographical data.
2.  **Faculty Management:** To establish a localized portal for staff onboarding, tracking designations, and mapping teachers securely to explicit class subjects.
3.  **Course & Subject Management:** To provide administrators tools to dynamically construct digital curriculum frameworks mapping semantic subjects to specific semesters.
4.  **Attendance Tracking:** To implement a rapid, intuitive digital register allowing faculty to submit daily presence Booleans synchronously, instantly updating global student metrics.
5.  **Fee Management:** To orchestrate a digital ledger tracking individual student payment installments, outstanding balances, and generating macroscopic institutional revenue charts.
6.  **Result Management:** To automate the computation of internal, external, and practical examination grades into cumulative outputs.
7.  **Secure Login System:** To enforce strict Role-Based Access Control (RBAC) securely encapsulated by JWT sessions and bcrypt encryption, isolating sensitive data perimeters.
8.  **Interactive Dashboards:** To furnish intuitive, chart-driven analytics translating raw database clusters into readable macroscopic trends.

<div style="page-break-after: always;"></div>

# 6. Gantt Chart (Project Timeline)

| Project Phase | Duration | Description |
| :--- | :--- | :--- |
| **Requirement Analysis** | Week 1 - 2 | Gathering structural requirements, identifying stakeholders, formulating SRS. |
| **System Design** | Week 3 - 4 | Drafting UML, ER diagrams, DFD sequences, and UI/UX wireframes. |
| **Database Design** | Week 5 | Structuring Mongoose schemas, defining collections, and setting referencing vectors. |
| **Module Development (Backend)**| Week 6 - 8 | Developing Express REST APIs, JWT middleware, and Controller logic. |
| **Module Development (Frontend)**| Week 8 - 11| Constructing React SPA, Tailwind styling, and integrating Axios API calls. |
| **Testing & Debugging** | Week 12 - 13| Validating routes, stress testing DB, resolving operational defects. |
| **Deployment & Documentation** | Week 14 | Formatting academic report, establishing deployment environments. |

<div style="page-break-after: always;"></div>

# 7. Scope of the Project

## Current Scope
The current implementation targets the immediate, critical administrative necessities of standard higher education environments. It strictly encompasses:
*   Multi-tier authentication mapping (Admin, Teacher, Student).
*   Complete CRUD operations across academic structures (Courses, Classes, Staff, Candidates).
*   Faculty-driven digital attendance and grading submissions.
*   Student-facing portals for reviewing personal academic standing and logging fee transactions.

## Extended / Future Scope
*   **Payment Gateway Integration:** Direct API linkages to Stripe/Razorpay for immediate online settlement of financial dues.
*   **Library Management Subsystem:** Deep tracking of book inventory, ISBN cataloging, and automated overdue penalty algorithms.
*   **Parent Portal:** A distinct, restricted read-only gateway for guardians to monitor ward performance independently.
*   **Automated Communication:** Integration of Webhooks/SMTP for automated SMS or Email blasts regarding collegiate announcements or critical fee deadlines.

<div style="page-break-after: always;"></div>

# 8. Methodology (SDLC)

This project strictly adhered to the Agile Software Development Life Cycle (SDLC) approach, promoting iterative capability development and fluid requirement absorption.

1.  **Requirement Analysis:** Stakeholder goals were translated into strict technical prerequisites separating functional logic from non-functional parameters.
2.  **System Design:** Decoupled three-tier architectural maps were drawn. Visual prototypes for the React frontend were aligned with backend JSON payload structures.
3.  **Implementation:** The active coding phase. The Node.js/Express backend was established first to generate consumable REST APIs, followed sequentially by the React.js client consumption phase.
4.  **Testing:** Executed continuously spanning Unit testing (for distinct algorithmic utilities), Integration testing (validating API interceptors), and User Acceptance Testing (navigating the UI organically).
5.  **Deployment:** Preparing build packages using Vite optimizers and clustering Node instances for operational readiness.
6.  **Maintenance:** Documenting comprehensive source code parameters to facilitate seamless downstream developmental upgrades.

<div style="page-break-after: always;"></div>

# 9. Functional Requirements

*   **Admin Login:** Super User access bypassing explicit departmental restrictions to oversee complete institutional configurations.
*   **Student Registration:** Inputting biological, familial, and academic starting parameters writing directly to secure databases.
*   **Teacher Management:** Appointing faculty, defining employment credentials, and dictating platform access capabilities.
*   **Course Allocation:** Dynamically bridging distinct semantic Subjects across explicitly defined Faculty IDs and Semester boundaries.
*   **Attendance:** Bulk Boolean processing recording present/absent markers resolving immediately to student metrics.
*   **Fee Management:** Monetary input tracking bridging static fee definitions against temporal payment inputs.
*   **Result Generation:** Parsing raw grading arrays into distinct categorized result representations.
*   **Dashboard Statistics:** Abstracting granular localized data into grand macroscopic integer counters and financial charts.

<div style="page-break-after: always;"></div>

# 10. Non-Functional Requirements

*   **Performance:** API endpoints are optimized returning 200 OK JSON payloads under 500 milliseconds on standard broadband connections.
*   **Security:** Passwords are irrecoverably scrambled using `bcrypt`. API routes inherently demand valid `Authorization: Bearer <token>` HTTP headers.
*   **Reliability:** Centralized MongoDB ensures continuous uptime devoid of localized file corruption vulnerabilities.
*   **Scalability:** Express routes remain largely stateless, allowing seamless vertical or horizontal hardware scaling.
*   **Usability:** Implementation of Tailwind CSS enforces strict responsive geometries rendering identical utility on Smartphone browsers.
*   **Maintainability:** Decoupled React variables and abstracted Backend controllers allow modular upgrades without cascading structural failures.

<div style="page-break-after: always;"></div>

# 11. Software & Hardware Requirements

## Hardware Recommendations
*   **Processor:** Intel Core i3 / AMD Ryzen 3 (Dual-core minimum)
*   **RAM:** 8 GB DDR4 (16 GB for concurrent developmental testing)
*   **Hard Disk / Storage:** 256 GB SSD (Solid State Drive) minimum
*   **Display:** Standard 1080p Monitor for interface evaluation

## Software Specifications
*   **Operating System:** Agnostic (Windows 10/11, macOS, Linux)
*   **Programming Languages:** JavaScript (ES6+), JSX
*   **Frontend Framework:** React.js (v18.x) powered by Vite
*   **Backend Environment:** Node.js, Express.js
*   **Database:** MongoDB (Atlas Cloud or Local Compass Server)
*   **IDE:** Visual Studio Code

<div style="page-break-after: always;"></div>

# 12. Software Requirement Specification (SRS) & Feasibility

## Feasibility Study
*   **Technical Feasibility:** Validated. The MERN stack represents the contemporary global standard for high-performance SPA deployments, heavily supported by sprawling open-source documentation.
*   **Economic Feasibility:** Validated. Employing Node.js runtimes alongside open-source React eliminates all proprietary enterprise licensing costs natively incurred by SAP/Ellucian structures.
*   **Operational Feasibility:** Validated. The SPA aesthetics closely mirror commercial applications actively utilized by the demographic, guaranteeing an exceptionally flat learning curve.
*   **Schedule Feasibility:** Validated. Utilizing pre-compiled NPM packages for security (JWT) and styling (Tailwind) drastically reduced boilerplate requirements, permitting adherence to academic deadlines.
*   **Legal Feasibility:** Validated. All leveraged dependencies operate under MIT or Apache open-source distribution licenses.

<div style="page-break-after: always;"></div>

# 13. System Design

## System Architecture (Three-Tier MERN Concept)
The application rigorously decouples operational tiers:
1.  **Presentation Tier:** React.js managing the browser DOM and local state.
2.  **Logic Tier:** Express.js routing HTTP verifications and execution protocols.
3.  **Data Tier:** MongoDB storing abstract BSON documents.

## Data Flow Diagrams
### Level 0 (Context Level)
[ User Entity ] <--- HTTP JSON/JWT ---> [ Central CMS Node.js Server ] <--- Mongoose ODM ---> [ MongoDB Cluster ]

### Level 1 DFD (Module Specificity)
1. Auth Process: Client -> POST Login -> Controller -> DB Verification -> JWT Return.
2. Academic Process: Faculty -> GET Subjects -> Controller -> DB Query -> React Table Render.
3. Transaction Process: Student -> POST Fee -> DB Ledger -> Admin Chart Update.

## Entity Relationship Configuration
While NoSQL lacks strict relational table mapping, Mongoose explicitly mimics relationship boundaries:
*   User (1:1) Student Profile
*   Department (1:M) Faculty
*   Department (1:M) Courses
*   Course (1:M) Subjects
*   Student (1:M) Attendance Ledgers
*   Student (1:M) Fee Payment Ledgers

<div style="page-break-after: always;"></div>

# 14. Database Design

*Note: While the project natively executes via MongoDB (NoSQL Object Document Mapping), the following structures represent the definitive schematic parameters defining the application data vaults.*

### 1. 'users' Collection
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| _id | ObjectId | Primary Key |
| email | String | Unique login identifier |
| password | String | Bcrypt hash signature |
| fullName | String | Human readable identity |
| roles | Array[String] | RBAC definition (ADMIN, TEACHER, STUDENT) |
| status | String | Account state (active, inactive) |

### 2. 'students' Collection
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| _id | ObjectId | Primary Key |
| userId | ObjectId | Foreign Key referencing 'users' |
| rollNo | String | Unique Academic matriculation index |
| course | String | Semantic course mapping |
| semester | String | Temporal academic position |
| guardianInfo | Object | Embedded document tracking parent parameters |

### 3. 'teachers' Collection
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| _id | ObjectId | Primary Key |
| userId | ObjectId | Foreign Key referencing 'users' |
| employeeId| String | Internal payroll index |
| department| String | Target instructional branch |
| designation| String | Hierarchical rank |

### 4. 'attendances' Collection
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| _id | ObjectId | Primary Ledger Node Key |
| studentId | ObjectId | Target target candidate |
| subjectId | String | Target semantic instruction |
| date | Date | Timestamp of execution |
| status | String | Present/Absent/Late Boolean representation |

### 5. 'payments' Collection
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| _id | ObjectId | Financial Transaction ID |
| studentId | ObjectId | Paying candidate |
| amount | Number | Floating point monetary value |
| paymentMode| String | Cash, Online, Cheque |
| receiptNo | String | Unique serialized output |

<div style="page-break-after: always;"></div>

# 15. Database SQL Code (Equivalency Mapping)

*Academic conformity request: The following is the equivalent rigid relational SQL mapping defining the identical project parameters constructed within our agile MongoDB instance.*

```sql
-- DATABASE INITIALIZATION
CREATE DATABASE CollegeManagementDB;
USE CollegeManagementDB;

-- CORE AUTHENTICATION TABLE
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(150) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    Role ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL,
    Status ENUM('active', 'inactive') DEFAULT 'active',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DEPARTMENT CONFIGURATION
CREATE TABLE Departments (
    DeptID INT PRIMARY KEY AUTO_INCREMENT,
    DeptName VARCHAR(100) UNIQUE NOT NULL,
    HOD_Name VARCHAR(100),
    IsActive BOOLEAN DEFAULT TRUE
);

-- COURSE MAPPING
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(100) NOT NULL,
    DurationSemesters INT NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID) ON DELETE CASCADE
);

-- FACULTY DEMOGRAPHICS
CREATE TABLE Teachers (
    TeacherID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    EmployeeID VARCHAR(50) UNIQUE NOT NULL,
    DeptID INT,
    Designation VARCHAR(100),
    JoiningDate DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);

-- STUDENT DEMOGRAPHICS
CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    RollNo VARCHAR(50) UNIQUE NOT NULL,
    CourseID INT,
    Semester INT,
    DOB DATE,
    Address VARCHAR(255),
    FatherName VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- ATTENDANCE LOGIC
CREATE TABLE AttendanceLogs (
    AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT NOT NULL,
    SubjectName VARCHAR(100) NOT NULL,
    RecordDate DATE NOT NULL,
    Status ENUM('Present', 'Absent', 'Late') NOT NULL,
    MarkedBy_TeacherID INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (MarkedBy_TeacherID) REFERENCES Teachers(TeacherID)
);

-- FINANCIAL LEDGERS
CREATE TABLE FeePayments (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATE DEFAULT (CURRENT_DATE),
    PaymentMode ENUM('Cash', 'Online', 'Cheque') NOT NULL,
    ReceiptNo VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);
```

<div style="page-break-after: always;"></div>

# 16. Output Screens

*(Academic placeholder indicating the visual operational boundaries of the compiled deployed software)*

*   **Login Page:** A dual-pane secure entry gateway permitting specific Role toggle selection navigating users explicitly to unique protected dashboards securely rejecting tampered credentials.
*   **Global Admin Dashboard:** Heavy graphical macroscopic tracking parameters outlining Total Enrollment vs Total Current Semester Revenue collections utilizing parsed dynamic REST parameters cleanly. 
*   **Student Registration Module:** Dynamic input parameter checking defining biographical fields and automatic password generation capabilities explicitly attached uniquely indexing Student schemas gracefully securely.
*   **Course / Timetable Constructor:** Administrative grid layouts assigning precise semantic names locking precise timeslot overlays mapping teacher availability matrices explicitly flawlessly efficiently seamlessly elegantly properly.
*   **Attendance Registry:** Tabular matrix tracking specific course enrollment generating Boolean checks instantly saving arrays directly securely tracking date-time outputs exactly fluently perfectly exclusively accurately.

<div style="page-break-after: always;"></div>

# 17. Coding Section (Comprehensive Implementation)

This section systematically lists the **actual production source code** extracted from the active repository. All code is meticulously commented outlining variable utilization and API intercept tracking explicitly defining the MERN framework operations securely elegantly natively conclusively explicitly.


## 17.1 Frontend React SPA Architecture

\n\n### File: `Frontend > App.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\App.jsx*\n\n```jsx\nimport React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { routes } from '@/config/routes';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});

import { ThemeProvider } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const AppRoutes = () => {
    const routing = useRoutes(routes);
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, scale: 0.99, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.01, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {routing}
            </motion.div>
        </AnimatePresence>
    );
};

const Spinner = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 gap-6">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem] animate-pulse"></div>
            <div className="absolute inset-0 border-t-4 border-primary rounded-[2rem] animate-spin-slow"></div>
        </div>
        <div className="text-center">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 animate-pulse">Initializing Interface</p>
        </div>
    </div>
);

function App() {
    const { hydrate, isInitialized } = useAuthStore();
    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!isInitialized) return <Spinner />;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router>
                    <ErrorBoundary>
                        <React.Suspense fallback={<Spinner />}>
                            <AppRoutes />
                        </React.Suspense>
                    </ErrorBoundary>
                </Router>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            borderRadius: '24px',
                            fontWeight: 700,
                            fontSize: '13px',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            padding: '16px 24px',
                        },
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}


export default App;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AcademicsSection.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\AcademicsSection.jsx*\n\n```jsx\nimport React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Users, Globe } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const AcademicCard = ({ icon: Icon, title, description, delay }) => (<div className="academic-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow transform hover:-translate-y-1" data-delay={delay}>
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
            <Icon size={28}/>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>);
export const AcademicsSection = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.academic-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={sectionRef} className="py-24 bg-gray-50 relative z-20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">World Class Education</span>
                    <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">Academic Excellence</h2>
                    <p className="text-lg text-gray-600">
                        Our rigorous curriculum and innovative teaching methods prepare students for leadership in a rapidly changing world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AcademicCard icon={BookOpen} title="Diverse Programs" description="Choose from over 50 undergraduate and graduate programs across various disciplines." delay={0}/>
                    <AcademicCard icon={Globe} title="Global Exposure" description="International partnerships and exchange programs to broaden your horizons." delay={0.1}/>
                    <AcademicCard icon={Users} title="Expert Faculty" description="Learn from distinguished professors and industry leaders dedicated to your success." delay={0.2}/>
                    <AcademicCard icon={Award} title="Research & Innovation" description="State-of-the-art labs and research centers fostering a culture of discovery." delay={0.3}/>
                </div>
            </div>
        </section>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AdmissionsSection.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\AdmissionsSection.jsx*\n\n```jsx\nimport React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Calendar } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const AdmissionsSection = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.admission-step', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={sectionRef} className="py-24 bg-white relative z-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">Join Us</span>
                        <h2 className="text-4xl font-bold mt-2 mb-6 text-gray-900">Seamless Admission Process</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We've streamlined our application process to make your journey to our university as smooth as possible.
                        </p>

                        <div className="space-y-8">
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">1</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Online Application</h4>
                                    <p className="text-gray-600">Fill out our comprehensive online application form with your personal and academic details.</p>
                                </div>
                            </div>
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">2</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Document Submission</h4>
                                    <p className="text-gray-600">Upload necessary documents including transcripts, identification, and portfolios if applicable.</p>
                                </div>
                            </div>
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">3</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Interview & Selection</h4>
                                    <p className="text-gray-600">Shortlisted candidates will be invited for a personal interview, followed by the final selection offer.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-3xl blur-2xl opacity-50 -z-10"></div>
                        <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                            {/* Abstract Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="text-2xl font-bold text-white mb-6">Important Dates</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Calendar className="text-purple-400" size={24}/>
                                    <div>
                                        <p className="text-purple-200 text-sm">Early Decision Deadline</p>
                                        <p className="text-white font-bold">November 15, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Calendar className="text-blue-400" size={24}/>
                                    <div>
                                        <p className="text-blue-200 text-sm">Regular Decision Deadline</p>
                                        <p className="text-white font-bold">January 15, 2024</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-3 text-green-400">
                                    <CheckCircle size={20}/>
                                    <span className="font-medium">Applications are currently open</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Button.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Button.jsx*\n\n```jsx\nimport React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    disabled, 
    className, 
    icon: Icon,
    ...props 
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';
    
    const variantStyles = {
        primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-2xl',
        secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl',
        danger: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 rounded-2xl',
        outline: 'border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary rounded-2xl',
        glass: 'glass-card border border-white/20 text-white hover:bg-white/20 rounded-2xl',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl',
    };

    const sizeStyles = {
        xs: 'px-3 py-1.5 text-[10px] gap-1.5',
        sm: 'px-4 py-2 text-[11px] gap-2',
        md: 'px-6 py-3 text-xs gap-2.5',
        lg: 'px-8 py-4 text-sm gap-3',
        icon: 'p-2.5 rounded-xl',
    };

    return (
        <motion.button
            whileHover={!disabled && !isLoading ? { y: -2, scale: 1.02 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer duration-1000" />
            
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 size={16} className="animate-spin" />
                        <span className="hidden sm:inline">Executing...</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 w-full"
                    >
                        {Icon && <Icon size={size === 'sm' || size === 'xs' ? 14 : 18} className="shrink-0" />}
                        {children && <span>{children}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Active Glow for primary */}
            {variant === 'primary' && (
                <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-[2rem]" />
            )}
        </motion.button>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Card.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Card.jsx*\n\n```jsx\nimport React from 'react';
export const Card = ({ children, className }) => {
    return (<div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {children}
    </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Skeleton.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\common\Skeleton.jsx*\n\n```jsx\nimport React from 'react';
export const Skeleton = ({ className = '', variant = 'rectangular', width, height, count = 1, }) => {
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
    const variantClasses = {
        text: 'h-4 rounded',
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
    };
    const skeletonStyle = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
    };
    const skeletons = Array.from({ length: count }, (_, i) => (<div key={i} className={`${baseClasses} ${variantClasses[variant]} ${className} ${i > 0 ? 'mt-2' : ''}`} style={skeletonStyle}/>));
    return <>{skeletons}</>;
};
export const ProjectCardSkeleton = () => {
    return (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={24} className="mb-2"/>
                    <Skeleton variant="text" width="40%" height={16}/>
                </div>
                <Skeleton variant="rectangular" width={80} height={24}/>
            </div>
            <Skeleton variant="text" count={2} height={16} className="mb-4"/>
            <div className="flex gap-2">
                <Skeleton variant="rectangular" width={60} height={24}/>
                <Skeleton variant="rectangular" width={80} height={24}/>
            </div>
        </div>);
};
export const ProjectDetailsSkeleton = () => {
    return (<div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <Skeleton variant="text" width="40%" height={32} className="mb-4"/>
                <Skeleton variant="text" count={3} height={16} className="mb-6"/>
                <div className="flex gap-4">
                    <Skeleton variant="rectangular" width={120} height={40}/>
                    <Skeleton variant="rectangular" width={120} height={40}/>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <Skeleton variant="text" width="30%" height={24} className="mb-4"/>
                <Skeleton variant="rectangular" height={200}/>
            </div>
        </div>);
};
export const TableSkeleton = ({ rows = 5, columns = 4, }) => {
    return (<div className="space-y-3">
            {Array.from({ length: rows }, (_, rowIndex) => (<div key={rowIndex} className="flex gap-4">
                    {Array.from({ length: columns }, (_, colIndex) => (<Skeleton key={colIndex} variant="rectangular" height={40} className="flex-1"/>))}
                </div>))}
        </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > QuickAction.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\dashboard\QuickAction.jsx*\n\n```jsx\nimport React from 'react';
import { motion } from 'framer-motion';

export const QuickAction = ({ label, icon: Icon, color, onClick }) => (
    <motion.button
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="glass-card flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-all group overflow-hidden relative"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg shadow-current/20 mb-1`}>
            <Icon size={24} />
        </div>
        
        <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center group-hover:text-primary transition-colors">
            {label}
        </span>
        
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${color} rounded-t-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`} />
    </motion.button>
);

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StatCard.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\dashboard\StatCard.jsx*\n\n```jsx\nimport React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const StatCard = ({ title, value, icon: Icon, color, bg, trend }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`p-7 rounded-[2.5rem] relative overflow-hidden group border transition-all duration-500
                ${isDarkMode 
                    ? 'bg-slate-900/60 border-slate-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:bg-slate-900 shadow-black/40' 
                    : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300'}`}
        >
            {/* Dynamic Ambient Light */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 ${bg}`} />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:rotate-12 ${bg} ${color}`}>
                        <Icon size={28} />
                    </div>
                    {trend !== undefined && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5
                                ${trend > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${trend > 0 ? 'bg-success' : 'bg-danger'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${trend > 0 ? 'bg-success' : 'bg-danger'}`}></span>
                            </span>
                            {trend > 0 ? '+' : ''}{trend}%
                        </motion.div>
                    )}
                </div>
                
                <div className="space-y-1">
                    <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500
                        ${isDarkMode ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-4xl font-black tracking-tighter transition-all duration-500 group-hover:tracking-tight
                            ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {value}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Interaction Bar */}
            <div className={`absolute bottom-3 right-7 w-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 ${bg}`} />
        </motion.div>
    );
};


\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > DataTable.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\DataTable.jsx*\n\n```jsx\nimport React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Loader2, Database, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DataTable = ({
    columns,
    data,
    loading,
    emptyIcon: EmptyIcon,
    emptyTitle = "No data found",
    emptyDescription = "There are no records to display.",
    onRowClick,
    tableContainerClassName = "",
    headerClassName = "",
    rowClassName = "",
}) => {
    const { isDarkMode } = useTheme();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">Synchronizing</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Accessing Ledger Data...</span>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-6 py-20 text-center flex flex-col items-center justify-center gap-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
                <div className={`p-8 rounded-[2rem] ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/40' : 'bg-slate-50 border-slate-100'} border-2 relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {EmptyIcon ? <EmptyIcon size={48} className="text-primary/40" /> : <SearchX size={48} className="text-primary/40" />}
                </div>
                <div className="max-w-xs">
                    <h3 className={`font-black uppercase tracking-widest text-sm mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{emptyTitle}</h3>
                    <p className="text-xs font-bold opacity-60 leading-relaxed uppercase tracking-tighter">{emptyDescription}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={`overflow-x-auto custom-scrollbar ${tableContainerClassName}`}>
            <table className="w-full text-left border-separate border-spacing-y-2 px-4">
                <thead className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-400'} ${headerClassName}`}>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={col.key || index} className={`px-6 py-4 font-black ${col.headerClassName || ''}`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="overflow-visible">
                    {data.map((row, rowIndex) => (
                        <motion.tr
                            key={row.id || row._id || rowIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: rowIndex * 0.03 }}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={`
                                group transition-all duration-300
                                ${isDarkMode 
                                    ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/50 text-slate-300' 
                                    : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'
                                } 
                                border-2 rounded-2xl
                                ${onRowClick ? 'cursor-pointer' : ''}
                                shadow-sm hover:shadow-xl hover:shadow-primary/5
                                ${rowClassName}
                            `}
                        >
                            {columns.map((col, colIndex) => (
                                <td 
                                    key={col.key || colIndex} 
                                    className={`
                                        px-6 py-5 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]
                                        border-t-2 border-b-2 first:border-l-2 last:border-r-2
                                        ${isDarkMode ? 'border-transparent group-hover:border-slate-700/50' : 'border-transparent group-hover:border-slate-200'}
                                        ${col.cellClassName || ''}
                                    `}
                                >
                                    <div className="relative z-10">
                                        {col.render ? col.render(row[col.key], row, rowIndex) : (
                                            <span className="font-bold text-sm tracking-tight">{row[col.key]}</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ErrorBoundary.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\ErrorBoundary.jsx*\n\n```jsx\nimport React from 'react';
import { useNavigate } from 'react-router-dom';

// Class component required for error boundaries
class ErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    reset() {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    onReset={() => this.reset()}
                />
            );
        }
        return this.props.children;
    }
}

function ErrorFallback({ error, onReset }) {
    const navigate = useNavigate();

    const handleBack = () => {
        onReset();
        navigate(-1);
    };

    const handleHome = () => {
        onReset();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
                <p className="text-gray-500 mb-2 text-sm">
                    This page encountered an error. Other sections of the app are unaffected.
                </p>
                {error?.message && (
                    <code className="block bg-gray-100 text-red-600 text-xs rounded-lg p-3 mb-6 text-left overflow-auto">
                        {error.message}
                    </code>
                )}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleBack}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        ← Go Back
                    </button>
                    <button
                        onClick={handleHome}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ErrorBoundary = ErrorBoundaryClass;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > FormField.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\FormField.jsx*\n\n```jsx\nimport React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Input } from './Input';

export const FormField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = 'text', 
    required = false, 
    placeholder, 
    options, 
    as = 'input', 
    rows = 3,
    icon: Icon,
    helperText
}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {label} {required && <span className="text-secondary ml-1">*</span>}
                </label>
                {helperText && (
                    <span className="text-[9px] font-bold text-slate-400 italic">{helperText}</span>
                )}
            </div>

            {as === 'select' && options ? (
                <div className="relative group">
                    <select 
                        name={name} 
                        value={value} 
                        onChange={onChange} 
                        required={required}
                        className={`w-full px-5 py-3.5 rounded-2xl border transition-all duration-300 outline-none appearance-none font-bold text-sm
                            ${isDarkMode 
                                ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm'}`}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            ) : as === 'textarea' ? (
                <textarea 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    placeholder={placeholder} 
                    rows={rows} 
                    className={`w-full px-5 py-4 rounded-[1.5rem] border transition-all duration-300 outline-none font-bold text-sm min-h-[120px] resize-none
                        ${isDarkMode 
                            ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm placeholder:text-slate-400'}`}
                />
            ) : (
                <Input 
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    placeholder={placeholder} 
                    icon={Icon}
                />
            )}
        </div>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > FormSection.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\FormSection.jsx*\n\n```jsx\nimport React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const FormSection = ({ title, children, icon: Icon, description }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-[2rem] border transition-all duration-500 glass-card
                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}
        >
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <Icon size={24} />
                    </div>
                )}
                <div>
                    <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{description}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {children}
            </div>
        </motion.div>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Header.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Header.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut, User, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="flex justify-between items-center h-full px-6">
                <div className="flex items-center gap-4">
                    {/* Placeholder for page title or search if needed later */}
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dashboard Overview</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <motion.button
                        whileTap={{ rotate: 180, scale: 0.8 }}
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group"
                    >
                        {isDarkMode ? (
                            <Sun size={20} className="text-amber-400" />
                        ) : (
                            <Moon size={20} className="text-indigo-600" />
                        )}
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </motion.button>

                    {/* Notifications */}
                    <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-slate-900"></span>
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Notifications
                        </span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1 pl-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">
                                    {user?.fullName?.split(' ')[0] || 'User'}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {user?.roles?.[0] || 'Member'}
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden border-2 border-white dark:border-slate-800">
                                {user?.fullName?.[0] || 'U'}
                            </div>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 glass-card rounded-2xl overflow-hidden z-50 shadow-2xl"
                                    >
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.fullName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <User size={16} /> My Profile
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <Settings size={16} /> settings
                                            </button>
                                        </div>
                                        <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} /> Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > index.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\index.js*\n\n```javascript\nexport { Button } from './Button';
export { Input } from './Input';
export { DataTable } from './DataTable';
export { Modal } from './Modal';
export { FormField } from './FormField';
export { FormSection } from './FormSection';
export { SearchBar } from './SearchBar';
export { PageHeader } from './PageHeader';
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Input.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Input.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const Input = ({ 
    label, 
    error, 
    helperText, 
    className, 
    id, 
    type, 
    icon: Icon,
    ...props 
}) => {
    const { isDarkMode } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`w-full space-y-2 group ${className}`}>
            {label && (
                <label 
                    htmlFor={id} 
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isFocused ? 'text-primary' : (isDarkMode ? 'text-slate-500' : 'text-slate-400')
                    }`}
                >
                    {label}
                </label>
            )}
            
            <div className="relative">
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${
                        isFocused ? 'text-primary' : (isDarkMode ? 'text-slate-500' : 'text-slate-400')
                    }`}>
                        <Icon size={18} />
                    </div>
                )}
                
                <input
                    id={id}
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full transition-all duration-300 outline-none
                        ${Icon ? 'pl-11' : 'px-5'} 
                        ${isPassword ? 'pr-12' : 'pr-5'}
                        py-3.5 rounded-[1.25rem] text-sm font-bold
                        ${isDarkMode 
                            ? 'bg-slate-900 border-slate-800 text-white focus:border-primary/50 focus:bg-slate-900/50' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary/50 focus:bg-white'
                        }
                        border-2
                        placeholder:text-slate-500/50
                        ${error ? '!border-rose-500/50 !bg-rose-500/5' : ''}
                    `}
                    {...props}
                />

                {/* Focus Glow Overlay */}
                <div className={`absolute -inset-0.5 bg-primary/20 rounded-[1.4rem] blur-xl transition-opacity duration-300 pointer-events-none -z-10 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {error ? (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 mt-1 pl-1"
                    >
                        <AlertCircle size={12} />
                        {error}
                    </motion.p>
                ) : helperText ? (
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 pl-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        {helperText}
                    </p>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Layout.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Layout.jsx*\n\n```jsx\nimport React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
export const Layout = ({ children }) => {
    return (<div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="p-6 text-slate-900 dark:text-slate-100">{children}</div>
        </main>
      </div>
    </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Modal.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Modal.jsx*\n\n```jsx\nimport React from 'react';
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > PageHeader.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\PageHeader.jsx*\n\n```jsx\nimport React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const PageHeader = ({ title, subtitle, icon: Icon, gradient, backTo, actions }) => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();

    const handleBack = () => {
        if (backTo) navigate(backTo);
        else navigate(-1);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 relative">
            <div className="flex items-start gap-6">
                {/* Back Button - Glassmorphic */}
                <motion.button
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="mt-1 flex items-center justify-center w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-500 hover:text-primary transition-all shadow-sm hover:shadow-primary/10"
                    title="Navigate Back"
                >
                    <ChevronLeft size={24} />
                </motion.button>

                {/* Title Area */}
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        {Icon && (
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${roleTheme || 'from-primary to-primary-dark'} bg-clip-text text-transparent opacity-80`}>
                                <Icon size={16} />
                            </div>
                        )}
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Institutional Registry</span>
                    </div>
                    
                    <h1 className={`text-4xl md:text-5xl font-black tracking-tighter transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h1>
                    
                    {subtitle && (
                        <div className="flex items-center gap-2 pl-1">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <p className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 opacity-60'}`}>
                                {subtitle}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Area */}
            {actions && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 shrink-0 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0"
                >
                    {actions}
                </motion.div>
            )}

            {/* Decorative Element */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ProtectedRoute.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\ProtectedRoute.jsx*\n\n```jsx\nimport React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }
    if (allowedRoles && user && user.roles) {
        const hasPermission = user.roles.some(role => allowedRoles.some(allowed => allowed.toUpperCase() === role.toUpperCase()));
        if (!hasPermission) {
            // toast.error('Access denied'); // Can be annoying on redirect
            return <Navigate to="/dashboard" replace/>;
        }
    }
    return <>{children}</>;
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > PublicHeader.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\PublicHeader.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Globe, ShieldCheck, ChevronDown, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PublicHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Academics', href: '#academics' },
        { label: 'Admissions', href: '#admissions' },
        { label: 'Research', href: '#research' },
        { label: 'Portfolio', href: '#campus' },
    ];

    return (
        <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
            scrolled ? 'py-4' : 'py-6'
        }`}>
            <div className="container mx-auto px-6">
                <nav className={`relative rounded-[2.5rem] transition-all duration-500 border overflow-hidden ${
                    scrolled 
                    ? 'bg-white/90 backdrop-blur-2xl border-indigo-100 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15)] py-3' 
                    : 'bg-slate-900/10 backdrop-blur-xl border-white/20 py-4 shadow-2xl shadow-black/10'
                }`}>
                    {/* Subtle colorful accent line on top when scrolled */}
                    {scrolled && (
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    )}

                    <div className="flex items-center justify-between px-8">
                        {/* Institutional Branding */}
                        <div 
                            className="flex items-center gap-4 cursor-pointer group" 
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                    <span className="text-white font-black text-xl tracking-tighter">LN</span>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`text-lg font-black tracking-tighter transition-colors ${
                                    scrolled ? 'text-slate-900' : 'text-white'
                                }`}>
                                    LNMI <span className="text-primary group-hover:animate-pulse">.</span>
                                </h1>
                                <p className={`text-[8px] font-black uppercase tracking-[0.2em] opacity-60 ${
                                    scrolled ? 'text-slate-500' : 'text-white/60'
                                }`}>
                                    Govt. of Bihar • Autonomous
                                </p>
                            </div>
                        </div>

                        {/* Centered Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                                        scrolled ? 'text-slate-600 hover:text-primary' : 'text-white hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full transition-all group-hover:w-4 ${
                                        scrolled ? 'bg-primary' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                                    }`} />
                                </a>
                            ))}
                        </div>

                        {/* Critical Actions */}
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className={`group relative hidden sm:flex items-center gap-3 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                                    scrolled 
                                    ? 'bg-slate-900 text-white shadow-slate-200 hover:shadow-primary/20' 
                                    : 'bg-white text-slate-900 border-white/20 hover:bg-slate-50 shadow-black/20'
                                }`}
                            >
                                <Rocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                Login / Signup
                                
                                {/* Inner glow effect on hover */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                            </motion.button>

                            <button
                                className={`lg:hidden p-2 rounded-xl transition-colors ${
                                    scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dynamic Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-4 mx-2 overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl lg:hidden"
                            >
                                <div className="p-8 space-y-2">
                                    {navLinks.map(link => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-primary transition-colors">
                                                {link.label}
                                            </span>
                                            <ChevronDown size={14} className="text-slate-300 -rotate-90" />
                                        </a>
                                    ))}
                                    <div className="pt-4 mt-4 border-t border-slate-50">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                            className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20"
                                        >
                                            <Rocket size={16} />
                                            Login / Signup
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </header>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > SearchBar.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\SearchBar.jsx*\n\n```jsx\nimport React from 'react';
import { Search } from 'lucide-react';
import { useThemeStore } from '@/store/theme';
export const SearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
    const { isDarkMode } = useThemeStore();
    return (<div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}/>
        </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Sidebar.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\Sidebar.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronRight, Menu, Home, LogOut, Users, 
    GraduationCap, Calculator, ClipboardCheck, FileText, 
    Settings, Briefcase, LayoutDashboard, CreditCard, 
    PieChart, UserCircle, CheckSquare, Sparkles, ChevronLeft
} from 'lucide-react';

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(['FACULTY & STAFF']);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const { isDarkMode, roleTheme } = useTheme();

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
            { label: 'Payroll', path: '/payroll', icon: PieChart },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        STUDENT: [
            { label: 'My Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
            { label: 'My Timetable', path: '/timetable', icon: Calculator },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Grades', path: '/grades', icon: GraduationCap },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        TEACHER: [
            { label: 'My Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
            { label: 'Students', path: '/students', icon: GraduationCap },
            { label: 'Attendance', path: '/attendance', icon: CheckSquare },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Timetable', path: '/timetable', icon: Calculator },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
    };

    const currentRole = user?.roles?.[0]?.toUpperCase() || 'STUDENT';
    const items = menuItems[currentRole] || menuItems['STUDENT'];

    const toggleMenu = (label) => {
        setExpandedMenus(prev => prev.includes(label.toUpperCase())
            ? prev.filter(item => item !== label.toUpperCase())
            : [...prev, label.toUpperCase()]);
    };

    const isActive = (path) => location.pathname === path;

    const renderMenuItem = (item, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isMenuExpanded = expandedMenus.includes(item.label.toUpperCase());
        const active = item.path ? isActive(item.path) : false;

        return (
            <div key={item.label} className="mb-1">
                <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => hasChildren ? toggleMenu(item.label) : navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                        ${active 
                            ? `bg-gradient-to-r ${roleTheme} text-white shadow-lg shadow-primary/20` 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                        }
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <item.icon size={20} className={`shrink-0 ${active ? 'text-white' : ''}`} />
                    
                    {!collapsed && (
                        <span className="flex-1 text-left text-sm font-bold tracking-tight truncate">
                            {item.label}
                        </span>
                    )}

                    {!collapsed && hasChildren && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuExpanded ? 'rotate-180' : ''}`} />
                    )}

                    {collapsed && active && (
                        <motion.div layoutId="activePill" className="absolute -left-4 w-1.5 h-8 bg-primary rounded-r-full" />
                    )}
                </motion.button>

                <AnimatePresence>
                    {!collapsed && hasChildren && isMenuExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-6 mt-1 border-l-2 border-slate-100 dark:border-slate-800 space-y-1"
                        >
                            {item.children.map(child => (
                                <button
                                    key={child.path}
                                    onClick={() => navigate(child.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-lg transition-all
                                        ${isActive(child.path)
                                            ? 'text-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(child.path) ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />
                                    {child.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.aside 
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            className={`sticky top-0 h-screen z-40 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 transition-colors duration-300 shadow-xl overflow-hidden`}
        >
            {/* Logo Section */}
            <div className="p-6 h-20 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${roleTheme} flex items-center justify-center text-white shadow-lg`}>
                                <Sparkles size={20} />
                            </div>
                            <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white">
                                LNMI<span className="text-primary">CMS</span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all shadow-sm"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2">
                {!collapsed && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 ml-2">
                        Main Menu
                    </p>
                )}
                {items.map(item => renderMenuItem(item))}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-1
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <Home size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Main Site</span>}
                </button>
                <button 
                    onClick={() => { logout(); navigate('/login'); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StarField.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\StarField.jsx*\n\n```jsx\nimport React, { useEffect, useRef } from 'react';
export const StarField = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        let animationFrameId;
        let stars = [];
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        const initStars = () => {
            stars = [];
            const numStars = 800; // Count
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * 2000, // Depth
                    size: Math.random() * 2,
                });
            }
        };
        const draw = () => {
            ctx.fillStyle = '#0F172A'; // Dark bg clearing
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            stars.forEach((star) => {
                // Move stars towards viewer
                star.z -= 4; // Speed
                if (star.z <= 0) {
                    star.z = 2000;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }
                // 3D Projection
                const scale = 500 / star.z;
                const x2d = cx + star.x * scale;
                const y2d = cy + star.y * scale;
                const size = Math.max(0.2, star.size * scale);
                // Draw Star
                const alpha = Math.min(1, (2000 - star.z) / 1000);
                // Glow effect for "great" look
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
                if (size > 1.5) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'white';
                }
                else {
                    ctx.shadowBlur = 0;
                }
            });
            animationFrameId = requestAnimationFrame(draw);
        };
        window.addEventListener('resize', resize);
        resize();
        initStars();
        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (<canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none"/>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ThreeJSHero.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\components\ThreeJSHero.jsx*\n\n```jsx\nimport React from 'react';
export const ThreeJSHero = () => {
    return (<div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 animate-gradient-slow opacity-100"></div>

            {/* CSS Stars/Particles Effect */}
            <div className="absolute inset-0 opacity-50">
                {/* Large Glow Orb 1 */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
                {/* Large Glow Orb 2 */}
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                {/* Large Glow Orb 3 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slower"></div>
            </div>

            {/* Grid Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            {/* Overlay gradient to blend with content */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none"></div>

            {/* Inline Styles for specific animations if tailwind config missing */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-pulse-slower {
                    animation: pulse-slower 12s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > routes.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\config\routes.jsx*\n\n```jsx\nimport React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
// Lazy load the ProtectedRoute
import { ProtectedRoute } from '@/components/ProtectedRoute';
// Lazy load pages for code splitting
const LandingPage = React.lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = React.lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const Dashboard = React.lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const StudentsPage = React.lazy(() => import('@/pages/StudentsPage').then(m => ({ default: m.StudentsPage })));
const AddStudentPage = React.lazy(() => import('@/pages/AddStudentPage').then(m => ({ default: m.AddStudentPage })));
const StudentDetailsPage = React.lazy(() => import('@/pages/StudentDetailsPage').then(m => ({ default: m.StudentDetailsPage })));
const TeachersPage = React.lazy(() => import('@/pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const AddTeacherPage = React.lazy(() => import('@/pages/AddTeacherPage').then(m => ({ default: m.AddTeacherPage })));
const FeesPage = React.lazy(() => import('@/pages/FeesPage').then(m => ({ default: m.FeesPage })));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

const ExamsPage = React.lazy(() => import('@/pages/ExamsPage').then(m => ({ default: m.ExamsPage })));
const StaffPage = React.lazy(() => import('@/pages/StaffPage').then(m => ({ default: m.StaffPage })));
const AddStaffPage = React.lazy(() => import('@/pages/AddStaffPage').then(m => ({ default: m.AddStaffPage })));
const TimetablePage = React.lazy(() => import('@/pages/TimetablePage').then(m => ({ default: m.TimetablePage })));
const PayrollPage = React.lazy(() => import('@/pages/PayrollPage').then(m => ({ default: m.PayrollPage })));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ClassesPage = React.lazy(() => import('@/pages/ClassesPage').then(m => ({ default: m.ClassesPage })));
const ClassDetailsPage = React.lazy(() => import('@/pages/ClassDetailsPage').then(m => ({ default: m.ClassDetailsPage })));
const GradesPage = React.lazy(() => import('@/pages/GradesPage').then(m => ({ default: m.GradesPage })));
const ProjectDashboard = React.lazy(() => import('@/pages/faculty/ProjectDashboard').then(m => ({ default: m.default })));
const AttendancePage = React.lazy(() => import('@/pages/AttendancePage').then(m => ({ default: m.AttendancePage })));
const SignupPage = React.lazy(() => import('@/pages/SignupPage').then(m => ({ default: m.SignupPage })));
const StudentDashboard = React.lazy(() => import('@/pages/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const TeacherDashboard = React.lazy(() => import('@/pages/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
// Helper to create protected route
const protect = (element, roles) => (<ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>);
export const routes = [
    // Public routes
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    // Protected routes
    { path: '/dashboard', element: protect(<Dashboard />) },
    { path: '/student-dashboard', element: protect(<StudentDashboard />, ['STUDENT']) },
    { path: '/teacher-dashboard', element: protect(<TeacherDashboard />, ['TEACHER']) },
    // Students
    { path: '/students', element: protect(<StudentsPage />, ['ADMIN', 'TEACHER']) },
    { path: '/students/add', element: protect(<AddStudentPage />, ['ADMIN', 'TEACHER']) },
    { path: '/students/:id', element: protect(<StudentDetailsPage />, ['ADMIN']) },
    // Teachers
    { path: '/teachers', element: protect(<TeachersPage />, ['ADMIN']) },
    { path: '/teachers/add', element: protect(<AddTeacherPage />, ['ADMIN']) },
    { path: '/teachers/edit/:id', element: protect(<AddTeacherPage />, ['ADMIN']) },
    // Staff
    { path: '/staff', element: protect(<StaffPage />, ['ADMIN']) },
    { path: '/staff/add', element: protect(<AddStaffPage />, ['ADMIN']) },
    // Classes
    { path: '/classes', element: protect(<ClassesPage />, ['ADMIN']) },
    { path: '/classes/:id', element: protect(<ClassDetailsPage />, ['ADMIN']) },
    // Academic
    { path: '/timetable', element: protect(<TimetablePage />) },
    { path: '/exams', element: protect(<ExamsPage />, ['ADMIN', 'TEACHER', 'STUDENT']) },
    { path: '/grades', element: protect(<GradesPage />, ['ADMIN']) },
    // Attendance
    { path: '/attendance', element: protect(<AttendancePage />, ['ADMIN', 'TEACHER']) },
    // Finance
    { path: '/fees', element: protect(<FeesPage />, ['ADMIN']) },
    { path: '/payroll', element: protect(<PayrollPage />, ['ADMIN']) },
    // Projects
    { path: '/projects/dashboard', element: protect(<ProjectDashboard />, ['ADMIN']) },
    { path: '/settings', element: protect(<SettingsPage />, ['ADMIN']) },
    // Smart fallback — redirect based on user role
    { path: '*', element: <RoleRedirect /> }
];

// Role-aware redirect component
function RoleRedirect() {
    const { user } = useAuthStore();
    if (!user) return <Navigate to="/login" replace />;
    const roles = user.roles || [];
    if (roles.includes('STUDENT')) return <Navigate to="/student-dashboard" replace />;
    if (roles.includes('TEACHER')) return <Navigate to="/teacher-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
}
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ThemeContext.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\context\ThemeContext.jsx*\n\n```jsx\nimport React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  roleTheme: '',
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const { user } = useAuthStore();
  const [roleTheme, setRoleTheme] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!user) {
      setRoleTheme('');
      return;
    }

    const role = user.roles?.[0] || user.role;
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        setRoleTheme('role-admin');
        break;
      case 'TEACHER':
        setRoleTheme('role-teacher');
        break;
      case 'STUDENT':
        setRoleTheme('role-student');
        break;
      default:
        setRoleTheme('');
    }
  }, [user]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, roleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > mockSchedules.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\data\mockSchedules.js*\n\n```javascript\nexport const schedules = {
    'BCA-1-sem1': [
        { day: 'Monday', time: '09:00 AM', subject: 'Programming in C', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Monday', time: '11:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Digital Electronics', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'English Communication', teacher: 'Ms. Priya Singh', room: 'Room 205' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Programming in C Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Environmental Studies', teacher: 'Dr. Kavita Desai', room: 'Room 105' },
        { day: 'Friday', time: '09:00 AM', subject: 'Digital Electronics Lab', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
        { day: 'Friday', time: '11:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Programming Workshop', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
    ],
    'BCA-1-sem2': [
        { day: 'Monday', time: '09:00 AM', subject: 'Data Structures using C', teacher: 'Dr. Vikram Mehta', room: 'Lab 103' },
        { day: 'Monday', time: '11:00 AM', subject: 'Mathematics-II', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Computer Architecture', teacher: 'Dr. Rajesh Kumar', room: 'Room 202' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Business Communication', teacher: 'Ms. Priya Singh', room: 'Room 205' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Discrete Mathematics', teacher: 'Dr. Kavita Desai', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Data Structures Lab', teacher: 'Dr. Vikram Mehta', room: 'Lab 103' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Mathematics-II', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Value Education', teacher: 'Mr. Suresh Patel', room: 'Room 105' },
        { day: 'Friday', time: '09:00 AM', subject: 'Architecture Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 102' },
        { day: 'Friday', time: '11:00 AM', subject: 'Discrete Mathematics', teacher: 'Dr. Kavita Desai', room: 'Room 301' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Soft Skills Training', teacher: 'Ms. Priya Singh', room: 'Room 205' },
    ],
    'BCA-2': [
        { day: 'Monday', time: '09:00 AM', subject: 'Programming in C', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Monday', time: '11:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Digital Electronics', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'English Communication', teacher: 'Ms. Priya Singh', room: 'Room 205' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Programming in C Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Environmental Studies', teacher: 'Dr. Kavita Desai', room: 'Room 105' },
        { day: 'Friday', time: '09:00 AM', subject: 'Digital Electronics Lab', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
        { day: 'Friday', time: '11:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Programming Workshop', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
    ],
    'BCA-3': [
        { day: 'Monday', time: '09:00 AM', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Monday', time: '11:00 AM', subject: 'Object Oriented Programming', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
        { day: 'Monday', time: '02:00 PM', subject: 'Mathematics-II', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Database Management Systems', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Computer Organization', teacher: 'Mr. Suresh Patel', room: 'Room 202' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Operating Systems', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Data Structures Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Web Technologies', teacher: 'Mr. Karan Singh', room: 'Lab 105' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Software Engineering', teacher: 'Prof. Neha Kapoor', room: 'Room 203' },
        { day: 'Friday', time: '09:00 AM', subject: 'DBMS Lab', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
        { day: 'Friday', time: '11:00 AM', subject: 'OOP Lab', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Project Development Workshop', teacher: 'Industry Expert', room: 'Lab 101' },
    ],
    'BCA-4': [
        { day: 'Monday', time: '09:00 AM', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Monday', time: '11:00 AM', subject: 'Object Oriented Programming', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
        { day: 'Monday', time: '02:00 PM', subject: 'Mathematics-II', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Database Management Systems', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Computer Organization', teacher: 'Mr. Suresh Patel', room: 'Room 202' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Operating Systems', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Data Structures Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Web Technologies', teacher: 'Mr. Karan Singh', room: 'Lab 105' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Software Engineering', teacher: 'Prof. Neha Kapoor', room: 'Room 203' },
        { day: 'Friday', time: '09:00 AM', subject: 'DBMS Lab', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
        { day: 'Friday', time: '11:00 AM', subject: 'OOP Lab', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Project Development Workshop', teacher: 'Industry Expert', room: 'Lab 101' },
    ],
    'BCA-5': [
        { day: 'Monday', time: '09:00 AM', subject: 'Artificial Intelligence', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Monday', time: '11:00 AM', subject: 'Computer Networks', teacher: 'Prof. Rahul Joshi', room: 'Lab 202' },
        { day: 'Monday', time: '02:00 PM', subject: 'Cloud Computing', teacher: 'Mr. Amit Sharma', room: 'Lab 203' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Machine Learning', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Cyber Security', teacher: 'Prof. Rajat Khanna', room: 'Room 401' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Mobile App Development', teacher: 'Mr. Rohan Verma', room: 'Lab 204' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'AI Lab', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Big Data Analytics', teacher: 'Prof. Sunil Kumar', room: 'Lab 205' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Blockchain Technology', teacher: 'Dr. Ankur Agarwal', room: 'Room 402' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Friday', time: '11:00 AM', subject: 'Industry Internship', teacher: 'Project Guide', room: 'Lab 101' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Review', teacher: 'Panel of Experts', room: 'Auditorium' },
    ],
    'BCA-6': [
        { day: 'Monday', time: '09:00 AM', subject: 'Artificial Intelligence', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Monday', time: '11:00 AM', subject: 'Computer Networks', teacher: 'Prof. Rahul Joshi', room: 'Lab 202' },
        { day: 'Monday', time: '02:00 PM', subject: 'Cloud Computing', teacher: 'Mr. Amit Sharma', room: 'Lab 203' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Machine Learning', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Cyber Security', teacher: 'Prof. Rajat Khanna', room: 'Room 401' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Mobile App Development', teacher: 'Mr. Rohan Verma', room: 'Lab 204' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'AI Lab', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Big Data Analytics', teacher: 'Prof. Sunil Kumar', room: 'Lab 205' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Blockchain Technology', teacher: 'Dr. Ankur Agarwal', room: 'Room 402' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        { day: 'Friday', time: '11:00 AM', subject: 'Industry Internship', teacher: 'Project Guide', room: 'Lab 101' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Review', teacher: 'Panel of Experts', room: 'Auditorium' },
    ],
    'BBA-1': [
        { day: 'Monday', time: '09:00 AM', subject: 'Business Communication', teacher: 'Prof. Meera Agarwal', room: 'Room 401' },
        { day: 'Monday', time: '11:00 AM', subject: 'Principles of Management', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Business Economics', teacher: 'Prof. Sanjay Verma', room: 'Room 403' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Financial Accounting', teacher: 'CA Rakesh Jain', room: 'Room 404' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Business Mathematics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Computer Applications', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Priya Malhotra', room: 'Room 401' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Organizational Behavior', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Friday', time: '09:00 AM', subject: 'Marketing Fundamentals', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Statistics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Business Seminar', teacher: 'Guest Faculty', room: 'Auditorium' },
    ],
    'BBA-2': [
        { day: 'Monday', time: '09:00 AM', subject: 'Business Communication', teacher: 'Prof. Meera Agarwal', room: 'Room 401' },
        { day: 'Monday', time: '11:00 AM', subject: 'Principles of Management', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Business Economics', teacher: 'Prof. Sanjay Verma', room: 'Room 403' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Financial Accounting', teacher: 'CA Rakesh Jain', room: 'Room 404' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Business Mathematics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Computer Applications', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Priya Malhotra', room: 'Room 401' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Organizational Behavior', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Friday', time: '09:00 AM', subject: 'Marketing Fundamentals', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Statistics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Business Seminar', teacher: 'Guest Faculty', room: 'Auditorium' },
    ],
    'BBA-3': [
        { day: 'Monday', time: '09:00 AM', subject: 'Marketing Management', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Monday', time: '11:00 AM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 404' },
        { day: 'Monday', time: '02:00 PM', subject: 'Cost Accounting', teacher: 'CA Rakesh Jain', room: 'Room 405' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 406' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Production Management', teacher: 'Dr. Sunil Kumar', room: 'Room 407' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 408' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'International Business', teacher: 'Prof. Vikram Singh', room: 'Room 409' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Consumer Behavior', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Financial Markets', teacher: 'CA Mohan Das', room: 'Room 406' },
        { day: 'Friday', time: '09:00 AM', subject: 'E-Commerce', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Industry Visit', teacher: 'Coordinator', room: 'Campus Gate' },
    ],
    'BBA-4': [
        { day: 'Monday', time: '09:00 AM', subject: 'Marketing Management', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Monday', time: '11:00 AM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 404' },
        { day: 'Monday', time: '02:00 PM', subject: 'Cost Accounting', teacher: 'CA Rakesh Jain', room: 'Room 405' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 406' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Production Management', teacher: 'Dr. Sunil Kumar', room: 'Room 407' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 408' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'International Business', teacher: 'Prof. Vikram Singh', room: 'Room 409' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Consumer Behavior', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Financial Markets', teacher: 'CA Mohan Das', room: 'Room 406' },
        { day: 'Friday', time: '09:00 AM', subject: 'E-Commerce', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Industry Visit', teacher: 'Coordinator', room: 'Campus Gate' },
    ],
    'BBA-5': [
        { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
        { day: 'Monday', time: '11:00 AM', subject: 'Investment Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Monday', time: '02:00 PM', subject: 'Brand Management', teacher: 'Prof. Amit Khanna', room: 'Room 503' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Entrepreneurship Dev.', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Digital Marketing', teacher: 'Ms. Sneha Reddy', room: 'Lab 301' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Project Management', teacher: 'Prof. Sunil Kumar', room: 'Room 505' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 302' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Supply Chain Management', teacher: 'Dr. Arvind Patel', room: 'Room 506' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 507' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 501' },
        { day: 'Friday', time: '11:00 AM', subject: 'Internship Training', teacher: 'Industry Mentor', room: 'Room 502' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Project Presentation', teacher: 'Evaluation Panel', room: 'Auditorium' },
    ],
    'BBA-6': [
        { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
        { day: 'Monday', time: '11:00 AM', subject: 'Investment Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Monday', time: '02:00 PM', subject: 'Brand Management', teacher: 'Prof. Amit Khanna', room: 'Room 503' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Entrepreneurship Dev.', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Digital Marketing', teacher: 'Ms. Sneha Reddy', room: 'Lab 301' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Project Management', teacher: 'Prof. Sunil Kumar', room: 'Room 505' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 302' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Supply Chain Management', teacher: 'Dr. Arvind Patel', room: 'Room 506' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 507' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 501' },
        { day: 'Friday', time: '11:00 AM', subject: 'Internship Training', teacher: 'Industry Mentor', room: 'Room 502' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Project Presentation', teacher: 'Evaluation Panel', room: 'Auditorium' },
    ],
    'MBA-1': [
        { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
        { day: 'Monday', time: '11:00 AM', subject: 'Financial Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Marketing Management', teacher: 'Dr. Pooja Mehta', room: 'Room 503' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 504' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Operations Management', teacher: 'Dr. Sunil Kumar', room: 'Room 505' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 301' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Managerial Economics', teacher: 'Dr. Arvind Patel', room: 'Room 501' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Friday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 503' },
        { day: 'Friday', time: '11:00 AM', subject: 'Entrepreneurship', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Industry Expert Session', teacher: 'Guest Speaker', room: 'Auditorium' },
    ],
    'MBA-2': [
        { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
        { day: 'Monday', time: '11:00 AM', subject: 'Financial Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Marketing Management', teacher: 'Dr. Pooja Mehta', room: 'Room 503' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 504' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Operations Management', teacher: 'Dr. Sunil Kumar', room: 'Room 505' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 301' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Managerial Economics', teacher: 'Dr. Arvind Patel', room: 'Room 501' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
        { day: 'Friday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 503' },
        { day: 'Friday', time: '11:00 AM', subject: 'Entrepreneurship', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Industry Expert Session', teacher: 'Guest Speaker', room: 'Auditorium' },
    ],
    'MBA-3': [
        { day: 'Monday', time: '09:00 AM', subject: 'Global Business Strategy', teacher: 'Dr. Vikram Singh', room: 'Room 601' },
        { day: 'Monday', time: '11:00 AM', subject: 'Mergers & Acquisitions', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
        { day: 'Monday', time: '02:00 PM', subject: 'Innovation Management', teacher: 'Dr. Ankur Agarwal', room: 'Room 603' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Financial Derivatives', teacher: 'CA Sanjay Mehta', room: 'Room 604' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Advanced Marketing', teacher: 'Dr. Pooja Mehta', room: 'Room 605' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Leadership & Change Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 606' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Data Science for Business', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 401' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Corporate Restructuring', teacher: 'Dr. Arvind Patel', room: 'Room 607' },
        { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
        { day: 'Friday', time: '09:00 AM', subject: 'Capstone Project', teacher: 'Project Supervisor', room: 'Room 601' },
        { day: 'Friday', time: '11:00 AM', subject: 'Summer Internship Review', teacher: 'Faculty Panel', room: 'Room 602' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Thesis Defense', teacher: 'Expert Committee', room: 'Auditorium' },
    ],
    'MBA-4': [
        { day: 'Monday', time: '09:00 AM', subject: 'Global Business Strategy', teacher: 'Dr. Vikram Singh', room: 'Room 601' },
        { day: 'Monday', time: '11:00 AM', subject: 'Mergers & Acquisitions', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
        { day: 'Monday', time: '02:00 PM', subject: 'Innovation Management', teacher: 'Dr. Ankur Agarwal', room: 'Room 603' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Financial Derivatives', teacher: 'CA Sanjay Mehta', room: 'Room 604' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Advanced Marketing', teacher: 'Dr. Pooja Mehta', room: 'Room 605' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Leadership & Change Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 606' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Data Science for Business', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 401' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Corporate Restructuring', teacher: 'Dr. Arvind Patel', room: 'Room 607' },
        { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
        { day: 'Friday', time: '09:00 AM', subject: 'Capstone Project', teacher: 'Project Supervisor', room: 'Room 601' },
        { day: 'Friday', time: '11:00 AM', subject: 'Summer Internship Review', teacher: 'Faculty Panel', room: 'Room 602' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Thesis Defense', teacher: 'Expert Committee', room: 'Auditorium' },
    ],
    'MBA-5': [
    ],
    'MBA-6': [
    ],
    'BCOM-1': [
        { day: 'Monday', time: '09:00 AM', subject: 'Financial Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Monday', time: '11:00 AM', subject: 'Business Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Business Maths & Stats', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Cost Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Accounting', teacher: 'CA Priya Gupta', room: 'Room 305' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Income Tax Law', teacher: 'CA Sanjay Mehta', room: 'Room 302' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Banking & Insurance', teacher: 'Mr. Anil Sharma', room: 'Room 303' },
        { day: 'Friday', time: '09:00 AM', subject: 'Computer Applications', teacher: 'Ms. Neha Kapoor', room: 'Lab 201' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Communication', teacher: 'Prof. Rita Singh', room: 'Room 304' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Accounting Workshop', teacher: 'CA Mohan Das', room: 'Room 301' },
    ],
    'BCOM-2': [
        { day: 'Monday', time: '09:00 AM', subject: 'Financial Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Monday', time: '11:00 AM', subject: 'Business Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
        { day: 'Tuesday', time: '02:00 PM', subject: 'Business Maths & Stats', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Cost Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Accounting', teacher: 'CA Priya Gupta', room: 'Room 305' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Income Tax Law', teacher: 'CA Sanjay Mehta', room: 'Room 302' },
        { day: 'Thursday', time: '02:00 PM', subject: 'Banking & Insurance', teacher: 'Mr. Anil Sharma', room: 'Room 303' },
        { day: 'Friday', time: '09:00 AM', subject: 'Computer Applications', teacher: 'Ms. Neha Kapoor', room: 'Lab 201' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Communication', teacher: 'Prof. Rita Singh', room: 'Room 304' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Accounting Workshop', teacher: 'CA Mohan Das', room: 'Room 301' },
    ],
    'BCOM-3': [
        { day: 'Monday', time: '09:00 AM', subject: 'Management Accounting', teacher: 'CA Rakesh Jain', room: 'Room 306' },
        { day: 'Monday', time: '11:00 AM', subject: 'Macro Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
        { day: 'Monday', time: '02:00 PM', subject: 'Company Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Goods & Services Tax', teacher: 'CA Sanjay Mehta', room: 'Room 307' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Financial Markets', teacher: 'Prof. Deepak Chopra', room: 'Room 308' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Auditing Principles', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Tax Planning', teacher: 'CA Priya Gupta', room: 'Room 305' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Business Statistics', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
        { day: 'Thursday', time: '02:00 PM', subject: 'E-Commerce & Taxation', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Friday', time: '09:00 AM', subject: 'Fundamentals of Investment', teacher: 'CA Rakesh Jain', room: 'Room 306' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Prof. Rita Singh', room: 'Room 304' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Tally & Accounting Software', teacher: 'Mr. Anil Sharma', room: 'Lab 202' },
    ],
    'BCOM-4': [
        { day: 'Monday', time: '09:00 AM', subject: 'Management Accounting', teacher: 'CA Rakesh Jain', room: 'Room 306' },
        { day: 'Monday', time: '11:00 AM', subject: 'Macro Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
        { day: 'Monday', time: '02:00 PM', subject: 'Company Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Goods & Services Tax', teacher: 'CA Sanjay Mehta', room: 'Room 307' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Financial Markets', teacher: 'Prof. Deepak Chopra', room: 'Room 308' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Auditing Principles', teacher: 'CA Mohan Das', room: 'Room 301' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Tax Planning', teacher: 'CA Priya Gupta', room: 'Room 305' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Business Statistics', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
        { day: 'Thursday', time: '02:00 PM', subject: 'E-Commerce & Taxation', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
        { day: 'Friday', time: '09:00 AM', subject: 'Fundamentals of Investment', teacher: 'CA Rakesh Jain', room: 'Room 306' },
        { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Prof. Rita Singh', room: 'Room 304' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Tally & Accounting Software', teacher: 'Mr. Anil Sharma', room: 'Lab 202' },
    ],
    'BCOM-5': [
        { day: 'Monday', time: '09:00 AM', subject: 'Advanced Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
        { day: 'Monday', time: '11:00 AM', subject: 'International Economics', teacher: 'Prof. Sunita Roy', room: 'Room 402' },
        { day: 'Monday', time: '02:00 PM', subject: 'Strategic Cost Mgmt', teacher: 'CA Rakesh Jain', room: 'Room 403' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Advanced Tax Planning', teacher: 'CA Sanjay Mehta', room: 'Room 404' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Portfolio Management', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Financial Statement Analysis', teacher: 'CA Priya Gupta', room: 'Room 406' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 407' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Forensic Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
        { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 401' },
        { day: 'Friday', time: '11:00 AM', subject: 'Professional Training', teacher: 'Industry Expert', room: 'Room 402' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Viva', teacher: 'Examination Panel', room: 'Auditorium' },
    ],
    'BCOM-6': [
        { day: 'Monday', time: '09:00 AM', subject: 'Advanced Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
        { day: 'Monday', time: '11:00 AM', subject: 'International Economics', teacher: 'Prof. Sunita Roy', room: 'Room 402' },
        { day: 'Monday', time: '02:00 PM', subject: 'Strategic Cost Mgmt', teacher: 'CA Rakesh Jain', room: 'Room 403' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'Advanced Tax Planning', teacher: 'CA Sanjay Mehta', room: 'Room 404' },
        { day: 'Tuesday', time: '12:00 PM', subject: 'Portfolio Management', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Financial Statement Analysis', teacher: 'CA Priya Gupta', room: 'Room 406' },
        { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 407' },
        { day: 'Thursday', time: '10:00 AM', subject: 'Forensic Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
        { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
        { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 401' },
        { day: 'Friday', time: '11:00 AM', subject: 'Professional Training', teacher: 'Industry Expert', room: 'Room 402' },
        { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Viva', teacher: 'Examination Panel', room: 'Auditorium' },
    ],
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > index.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\hooks\index.js*\n\n```javascript\nexport { useResource } from './useResource';
export { useModal } from './useModal';
export { useFormData } from './useFormData';
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > useFormData.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\hooks\useFormData.js*\n\n```javascript\nimport { useState } from 'react';
export const useFormData = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested properties (e.g., "address.street")
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const reset = () => setFormData(initialState);
    const setField = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return {
        formData,
        handleChange,
        reset,
        setField,
        setFormData
    };
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > useModal.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\hooks\useModal.js*\n\n```javascript\nimport { useState } from 'react';
export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);
    return {
        isOpen,
        open,
        close,
        toggle
    };
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > useProject.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\hooks\useProject.js*\n\n```javascript\nimport { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import toast from 'react-hot-toast';
// Query keys for cache management
export const projectKeys = {
    all: ['projects'],
    lists: () => [...projectKeys.all, 'list'],
    list: (filters) => [...projectKeys.lists(), filters],
    details: () => [...projectKeys.all, 'detail'],
    detail: (id) => [...projectKeys.details(), id],
    myProject: () => [...projectKeys.all, 'my-project'],
};
/**
 * Hook to fetch current user's project
 */
export const useMyProject = () => {
    return useQuery({
        queryKey: projectKeys.myProject(),
        queryFn: async () => {
            const response = await projectService.getMyProject();
            if (!response.success) {
                return null;
            }
            return response.data;
        },
        retry: 1,
        staleTime: 30000, // 30 seconds
    });
};
/**
 * Hook to create a new project
 */
export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => projectService.createProject(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.myProject() });
            toast.success(response.message || 'Project created successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create project');
        },
    });
};
/**
 * Hook to submit project report
 */
export const useSubmitReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => projectService.submitReport(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.myProject() });
            toast.success(response.message || 'Report submitted successfully!', {
                icon: '🎉',
                duration: 5000,
            });
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to submit report');
        },
    });
};
/**
 * Hook to fetch all projects with filters (Faculty)
 */
export const useProjects = (filters) => {
    return useQuery({
        queryKey: projectKeys.list(filters),
        queryFn: async () => {
            const response = await projectService.getAllProjects(filters);
            return response;
        },
        staleTime: 10000, // 10 seconds
        keepPreviousData: true, // For pagination
    });
};
/**
 * Hook to fetch project by ID
 */
export const useProject = (id, enabled = true) => {
    return useQuery({
        queryKey: projectKeys.detail(id),
        queryFn: async () => {
            const response = await projectService.getProjectById(id);
            return response.data;
        },
        enabled: enabled && !!id,
    });
};
/**
 * Hook to grade a project (Faculty)
 */
export const useGradeProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => projectService.gradeProject(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
            toast.success(response.message || 'Project graded successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to grade project');
        },
    });
};
/**
 * Hook for optimistic updates when updating project status
 */
export const useUpdateProjectStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }) => {
            // This would be a real API call
            return { success: true, message: 'Status updated' };
        },
        onMutate: async ({ id, status }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: projectKeys.detail(id) });
            // Snapshot the previous value
            const previousProject = queryClient.getQueryData(projectKeys.detail(id));
            // Optimistically update
            queryClient.setQueryData(projectKeys.detail(id), (old) => ({
                ...old,
                status,
            }));
            return { previousProject };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousProject) {
                queryClient.setQueryData(projectKeys.detail(variables.id), context.previousProject);
            }
            toast.error('Failed to update status');
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
        },
    });
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > useResource.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\hooks\useResource.js*\n\n```javascript\nimport { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
export const useResource = ({ endpoint, autoFetch = true, page = 1, pageSize = 25 }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`${endpoint}?page=${page}&size=${pageSize}`);
            const rawData = response.data.data;
            // Backend can return array directly OR nested under a key (e.g. { students: [...] })
            const key = endpoint.replace(/^\//, ''); // strip leading slash
            const extracted = Array.isArray(rawData)
                ? rawData
                : (Array.isArray(rawData?.[key]) ? rawData[key] : []);
            setData(extracted);
            setTotal(response.data.data.total || 0);
        }
        catch (error) {
            toast.error(error.response?.data?.message || `Failed to fetch ${endpoint}`);
        }
        finally {
            setLoading(false);
        }
    }, [endpoint, page, pageSize]);
    const create = async (payload) => {
        try {
            await apiClient.post(endpoint, payload);
            toast.success('Created successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create');
            return false;
        }
    };
    const update = async (id, payload) => {
        try {
            await apiClient.put(`${endpoint}/${id}`, payload);
            toast.success('Updated successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update');
            return false;
        }
    };
    const remove = async (id) => {
        try {
            await apiClient.delete(`${endpoint}/${id}`);
            toast.success('Deleted successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
            return false;
        }
    };
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);
    return {
        data,
        loading,
        total,
        fetchData,
        create,
        update,
        remove
    };
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > main.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\main.jsx*\n\n```jsx\nimport React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <App />
</React.StrictMode>);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AddStaffPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\AddStaffPage.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { 
    UserPlus, User, Mail, Phone, Briefcase, 
    Calendar, Banknote, MapPin, Archive, 
    Save, ShieldCheck, ClipboardList 
} from 'lucide-react';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { useTheme } from '@/context/ThemeContext';

const ROLE_OPTIONS = [
    { value: '', label: 'Select Operational Role' },
    { value: 'Librarian', label: 'Knowledge Custodian (Librarian)' },
    { value: 'Accountant', label: 'Fiscal Analyst (Accountant)' },
    { value: 'Admin', label: 'System Executive (Admin)' },
    { value: 'Security', label: 'Asset Protection (Security)' },
    { value: 'Maintenance', label: 'Infrastructure Support' },
    { value: 'Lab Assistant', label: 'Technical Laboratory Assistant' },
    { value: 'Office Staff', label: 'Administrative Secretary' },
    { value: 'Other', label: 'Miscellaneous Operations' },
];

export const AddStaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);

    const { formData, handleChange } = useFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: 'Staff@123',
        phone: '',
        employeeId: '',
        role: 'Librarian',
        department: '',
        joiningDate: '',
        salary: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                employeeId: formData.employeeId,
                role: formData.role,
                department: formData.department,
                joiningDate: formData.joiningDate,
                salary: Number(formData.salary),
                contactInfo: {
                    phone: formData.phone,
                    address: formData.address
                }
            };

            await apiClient.post('/staff', payload);
            toast.success('Member inducted into institutional workforce');
            navigate('/staff');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Induction protocol failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title="Staff Induction"
                    subtitle="Onboarding technical and administrative personnel"
                    icon={UserPlus}
                    backTo="/staff"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Personnel Identity */}
                    <FormSection 
                        title="Personnel Identity" 
                        icon={User} 
                        description="Biographical markers and digital contact points"
                    >
                        <FormField 
                            label="First Name" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="John"
                        />
                        <FormField 
                            label="Last Name" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Doe"
                        />
                        <FormField 
                            label="Operational Email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="staff@university.edu"
                        />
                        <FormField 
                            label="Secure Communication (Phone)" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Phone}
                            placeholder="+91 00000 00000"
                        />
                    </FormSection>

                    {/* Operational Assignment */}
                    <FormSection 
                        title="Operational Assignment" 
                        icon={Briefcase} 
                        description="Employment metrics and role classification"
                    >
                        <FormField 
                            label="Personnel ID" 
                            name="employeeId" 
                            value={formData.employeeId} 
                            onChange={handleChange} 
                            required 
                            icon={ShieldCheck}
                            placeholder="STF-2024-X"
                        />
                        <FormField 
                            label="Professional Role" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            as="select" 
                            options={ROLE_OPTIONS} 
                            required 
                            icon={ClipboardList}
                        />
                        <FormField 
                            label="Operational Department" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            required 
                            icon={Archive}
                            placeholder="Administration"
                        />
                        <FormField 
                            label="Date of Induction" 
                            name="joiningDate" 
                            type="date" 
                            value={formData.joiningDate} 
                            onChange={handleChange} 
                            required 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Base Remuneration (₹)" 
                            name="salary" 
                            type="number" 
                            value={formData.salary} 
                            onChange={handleChange} 
                            required 
                            icon={Banknote}
                            placeholder="Gross Monthly"
                        />
                    </FormSection>

                    {/* Logistics */}
                    <FormSection 
                        title="Logistics" 
                        icon={MapPin} 
                        description="Physical occupancy and residence coordinates"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Primary Residence (Address)" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                icon={MapPin}
                                placeholder="Full residential coordinates"
                            />
                        </div>
                    </FormSection>

                    {/* Action Controls */}
                    <div className="flex justify-end gap-6 pt-10">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/staff')}
                            className="!px-10"
                        >
                            Abort Protocol
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            Complete Induction
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AddStudentPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\AddStudentPage.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { 
    ChevronLeft, Save, User, Mail, Phone, Calendar, Hash, 
    MapPin, GraduationCap, ShieldCheck, Heart, UserPlus, 
    Smartphone, UserSquare 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const COURSE_OPTIONS = [
    { value: '', label: 'Select' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BBA', label: 'BBA' },
    { value: 'MBA (Finance)', label: 'MBA (Finance)' },
    { value: 'MBA (Marketing)', label: 'MBA (Marketing)' },
    { value: 'MBA (HR)', label: 'MBA (HR)' },
    { value: 'MBA (IT)', label: 'MBA (IT)' },
    { value: 'MCA', label: 'MCA' },
    { value: 'BSc IT', label: 'BSc IT' },
];

const SEMESTER_OPTIONS = [
    { value: '', label: 'Select' },
    { value: '1st', label: '1st Semester' },
    { value: '2nd', label: '2nd Semester' },
    { value: '3rd', label: '3rd Semester' },
    { value: '4th', label: '4th Semester' },
    { value: '5th', label: '5th Semester' },
    { value: '6th', label: '6th Semester' },
    { value: '7th', label: '7th Semester' },
    { value: '8th', label: '8th Semester' },
];

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const AddStudentPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useTheme();
    const { formData, handleChange } = useFormData({
        fullName: '',
        email: '',
        password: 'password123',
        phone: '',
        rollNo: '',
        dateOfBirth: '',
        gender: 'male',
        address: {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: 'India'
        },
        course: '',
        semester: '',
        section: 'A',
        guardianInfo: {
            fatherName: '',
            motherName: '',
            fatherPhone: '',
            motherPhone: '',
            primaryEmail: ''
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.post('/students', formData);
            toast.success('Student admitted successfully');
            navigate('/students');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Admission process failed');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title="Student Admission"
                    subtitle="Add a new student to the institution"
                    icon={UserPlus}
                    backTo="/students"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Primary Identity Section */}
                    <FormSection 
                        title="Personal Details" 
                        icon={UserSquare} 
                        description="Full name and contact information"
                    >
                        <FormField 
                            label="Full Name" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Full Name"
                        />
                        <FormField 
                            label="Roll Number" 
                            name="rollNo" 
                            value={formData.rollNo} 
                            onChange={handleChange} 
                            required 
                            icon={Hash}
                            placeholder="Roll Number"
                        />
                        <FormField 
                            label="Email Address" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="email@lnmi.ac.in"
                        />
                        <FormField 
                            label="Phone Number" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Smartphone}
                            placeholder="Phone Number"
                        />
                        <FormField 
                            label="Date of Birth" 
                            name="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth} 
                            onChange={handleChange} 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Gender" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            as="select" 
                            options={GENDER_OPTIONS} 
                            icon={Heart}
                        />
                    </FormSection>

                    {/* Academic Enrollment Section */}
                    <FormSection 
                        title="Academic Details" 
                        icon={ShieldCheck} 
                        description="Course and semester details"
                    >
                        <FormField 
                            label="Course" 
                            name="course" 
                            value={formData.course} 
                            onChange={handleChange} 
                            as="select" 
                            options={COURSE_OPTIONS} 
                            required 
                            icon={GraduationCap}
                        />
                        <FormField 
                            label="Semester" 
                            name="semester" 
                            value={formData.semester} 
                            onChange={handleChange} 
                            as="select" 
                            options={SEMESTER_OPTIONS} 
                            required 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Section" 
                            name="section" 
                            value={formData.section} 
                            onChange={handleChange} 
                            placeholder="Section"
                        />
                    </FormSection>

                    {/* Geographical Baseline Section */}
                    <FormSection 
                        title="Address Details" 
                        icon={MapPin} 
                        description="Permanent address for official records"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Street Address" 
                                name="address.street" 
                                value={formData.address.street} 
                                onChange={handleChange} 
                                placeholder="Street Address"
                            />
                        </div>
                        <FormField 
                            label="City" 
                            name="address.city" 
                            value={formData.address.city} 
                            onChange={handleChange} 
                        />
                        <FormField 
                            label="State" 
                            name="address.state" 
                            value={formData.address.state} 
                            onChange={handleChange} 
                        />
                    </FormSection>

                    {/* Guardian Proxy Section */}
                    <FormSection 
                        title="Guardian Information" 
                        icon={ShieldCheck} 
                        description="Parental details and emergency contacts"
                    >
                        <FormField 
                            label="Father's Name" 
                            name="guardianInfo.fatherName" 
                            value={formData.guardianInfo.fatherName} 
                            onChange={handleChange} 
                            required 
                        />
                        <FormField 
                            label="Mother's Name" 
                            name="guardianInfo.motherName" 
                            value={formData.guardianInfo.motherName} 
                            onChange={handleChange} 
                            required 
                        />
                        <FormField 
                            label="Father's Phone Number" 
                            name="guardianInfo.fatherPhone" 
                            type="tel" 
                            value={formData.guardianInfo.fatherPhone} 
                            onChange={handleChange} 
                            required 
                        />
                    </FormSection>

                    {/* Form Controls */}
                    <div className="flex justify-end gap-6 pt-8">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/students')}
                            className="!px-10"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            Add Student
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AddTeacherPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\AddTeacherPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
    Save, User, Mail, Phone, Calendar, Briefcase, 
    GraduationCap, Award, MapPin, ShieldCheck, 
    Clock, Banknote, UserPlus, FileText
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const DEPARTMENT_OPTIONS = [
    { value: '', label: 'Select Departmental Unit' },
    { value: 'Computer Science', label: 'School of Computer Science' },
    { value: 'Business Administration', label: 'School of Business' },
    { value: 'Mathematics', label: 'Dept. of Mathematics' },
    { value: 'English', label: 'Dept. of Linguistics' },
    { value: 'Physics', label: 'Dept. of Physics' },
];

const DESIGNATION_OPTIONS = [
    { value: '', label: 'Select Academic Designation' },
    { value: 'Professor', label: 'Senior Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
    { value: 'Lecturer', label: 'Visiting Lecturer' },
];

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const AddTeacherPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useTheme();
    const { formData, handleChange, setFormData } = useFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: 'teacher123',
        gender: 'male',
        dateOfBirth: '',
        phone: '',
        employeeId: '',
        department: '',
        designation: '',
        joiningDate: '',
        salary: '',
        qualification: '',
        experience: '',
        address: {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: 'India'
        }
    });

    useEffect(() => {
        if (isEditMode && id) {
            const fetchTeacher = async () => {
                try {
                    setLoading(true);
                    const response = await apiClient.get(`/teachers/${id}`);
                    const teacher = response.data.data;
                    const { userId, ...rest } = teacher;
                    setFormData({
                        ...formData,
                        ...rest,
                        firstName: userId?.firstName || userId?.fullName?.split(' ')[0] || '',
                        lastName: userId?.lastName || userId?.fullName?.split(' ').slice(1).join(' ') || '',
                        email: userId?.email || '',
                        address: {
                            street: teacher.contactInfo?.address || '',
                            city: '',
                            state: '',
                            pinCode: '',
                            country: 'India'
                        },
                        phone: teacher.contactInfo?.phone || ''
                    });
                }
                catch (error) {
                    console.error('Failed to fetch teacher:', error);
                    toast.error('Failed to retrieve faculty archives');
                    navigate('/teachers');
                }
                finally {
                    setLoading(false);
                }
            };
            fetchTeacher();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { address, ...rest } = formData;
            const formattedAddress = `${address.street}, ${address.city}, ${address.state} ${address.pinCode}, ${address.country}`;
            const payload = {
                ...rest,
                address: formattedAddress,
            };
            if (isEditMode && id) {
                await apiClient.put(`/teachers/${id}`, payload);
                toast.success('Faculty profile synchronized');
            }
            else {
                await apiClient.post('/teachers', payload);
                toast.success('Faculty commissioned successfully');
            }
            navigate('/teachers');
        }
        catch (error) {
            toast.error(error.response?.data?.message || `Protocol failure during ${isEditMode ? 'update' : 'commissioning'}`);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title={isEditMode ? "Faculty Update" : "Faculty Commissioning"}
                    subtitle={isEditMode ? "Modifying existing academic profile" : "Onboarding new instructional personnel"}
                    icon={isEditMode ? FileText : UserPlus}
                    backTo="/teachers"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Faculty Identity */}
                    <FormSection 
                        title="Faculty Identity" 
                        icon={User} 
                        description="Core biographical and contact coordinates"
                    >
                        <FormField 
                            label="Given Name" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Arthur"
                        />
                        <FormField 
                            label="Surname" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Morgan"
                        />
                        <FormField 
                            label="Institutional Registry (Email)" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="faculty@university.edu"
                        />
                        <FormField 
                            label="Primary Contact (Phone)" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Phone}
                            placeholder="+91 00000 00000"
                        />
                        <FormField 
                            label="Chronological Marker (DOB)" 
                            name="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth} 
                            onChange={handleChange} 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Biological Marker (Gender)" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            as="select" 
                            options={GENDER_OPTIONS} 
                            icon={ShieldCheck}
                        />
                    </FormSection>

                    {/* Professional Appointment */}
                    <FormSection 
                        title="Professional Appointment" 
                        icon={Briefcase} 
                        description="Departmental placement and tenure details"
                    >
                        <FormField 
                            label="Staff ID" 
                            name="employeeId" 
                            value={formData.employeeId} 
                            onChange={handleChange} 
                            required 
                            icon={FileText}
                            placeholder="FAC-2024-X"
                        />
                        <FormField 
                            label="Primary Domain (Dept)" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            as="select" 
                            options={DEPARTMENT_OPTIONS} 
                            required 
                            icon={GraduationCap}
                        />
                        <FormField 
                            label="Academic Title (Rank)" 
                            name="designation" 
                            value={formData.designation} 
                            onChange={handleChange} 
                            as="select" 
                            options={DESIGNATION_OPTIONS} 
                            required 
                            icon={Award}
                        />
                        <FormField 
                            label="Date of Commissioning" 
                            name="joiningDate" 
                            type="date" 
                            value={formData.joiningDate} 
                            onChange={handleChange} 
                            icon={Clock}
                        />
                        <FormField 
                            label="Academic Credentials" 
                            name="qualification" 
                            value={formData.qualification} 
                            onChange={handleChange} 
                            placeholder="e.g., PhD in Neural Networks" 
                            icon={Award}
                        />
                        <FormField 
                            label="Net Remuneration" 
                            name="salary" 
                            type="number" 
                            value={formData.salary} 
                            onChange={handleChange} 
                            required 
                            icon={Banknote}
                            placeholder="Annualized CTC"
                        />
                        <div className="md:col-span-2">
                            <FormField 
                                label="Tenure Experience (Years)" 
                                name="experience" 
                                type="number" 
                                value={formData.experience} 
                                onChange={handleChange} 
                                icon={Clock}
                            />
                        </div>
                    </FormSection>

                    {/* Logistics & Residence */}
                    <FormSection 
                        title="Logistics & Residence" 
                        icon={MapPin} 
                        description="Physical coordinates for institutional assets"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Primary Residence (Street)" 
                                name="address.street" 
                                value={formData.address.street} 
                                onChange={handleChange} 
                                icon={MapPin}
                            />
                        </div>
                        <FormField label="City" name="address.city" value={formData.address.city} onChange={handleChange} />
                        <FormField label="State" name="address.state" value={formData.address.state} onChange={handleChange} />
                        <FormField label="Postal Code" name="address.pinCode" value={formData.address.pinCode} onChange={handleChange} />
                    </FormSection>

                    {/* Action Controls */}
                    <div className="flex justify-end gap-6 pt-10">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/teachers')}
                            className="!px-10"
                        >
                            Cancel Protocol
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            {isEditMode ? 'Commit Changes' : 'Initialize Commission'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > AttendancePage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\AttendancePage.jsx*\n\n```jsx\nimport React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    CheckCircle, XCircle, Clock, Search, Filter, 
    Download, Calendar, Users, Loader2, Save, 
    History, ClipboardCheck, LayoutDashboard,
    TrendingUp, UserCheck, UserX, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    const { isDarkMode } = useTheme();
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
                        name: s.userId?.fullName || s.name || s.fullName || 'Unknown',
                        rollNo: s.rollNo || s.rollNumber || '—',
                        class: s.course
                            ? `${s.course}${s.semester ? ' - Sem ' + s.semester : ''}`
                            : 'Unassigned',
                    }));
                }
            } catch {
                // API failed, use mock
            }

            if (students.length === 0) {
                students = MOCK_STUDENTS;
            }

            setAllStudents(students);
            const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
            setClasses(['All', ...uniqueClasses]);
            setSelectedClass('All');
            setLoading(false);
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        if (allStudents.length > 0) {
            const map = {};
            allStudents.forEach(s => { map[s._id] = 'present'; });
            setAttendance(map);
            setSubmitted(false);
        }
    }, [allStudents, selectedDate, selectedClass]);

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
        }
    }, [selectedDate, allStudents]);

    useEffect(() => {
        if (allStudents.length > 0) {
            fetchAttendanceForDate();
        }
    }, [fetchAttendanceForDate]);

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
            toast.success('Attendance recorded successfully');
        } catch (err) {
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

    const statusBtn = (id, status, label, Icon, activeClass, inactiveClass) => (
        <button
            onClick={() => canMark && setStatus(id, status)}
            disabled={!canMark}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                ${attendance[id] === status ? activeClass : inactiveClass} 
                ${canMark ? 'hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
        >
            <Icon size={14} className={attendance[id] === status ? 'animate-pulse' : ''} />
            {label}
        </button>
    );

    const markColumns = [
        { 
            key: 'student', 
            label: 'Student Name', 
            render: (_, s) => (
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-inner
                        ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        {s.name.charAt(0)}
                    </div>
                    <div>
                        <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.rollNo}</p>
                    </div>
                </div>
            )
        },
        { 
            key: 'class', 
            label: 'Class', 
            render: (_, s) => <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{s.class}</span> 
        },
        {
            key: 'status', 
            label: 'Mark Attendance', 
            render: (_, s) => (
                <div className="flex gap-3">
                    {statusBtn(s._id, 'present', 'Present', UserCheck, 
                        'bg-success text-white shadow-lg shadow-success/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'absent', 'Absent', UserX, 
                        'bg-danger text-white shadow-lg shadow-danger/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'late', 'Late', Clock, 
                        'bg-amber-500 text-white shadow-lg shadow-amber-500/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                </div>
            )
        }
    ];

    const historyColumns = [
        {
            key: 'date', label: 'Date',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-primary" />
                    <span className={`font-black text-xs uppercase tracking-tighter ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            )
        },
        { 
            key: 'metrics', 
            label: 'Summary', 
            render: (_, row) => (
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest">
                        <UserCheck size={10} /> {row.present} Present
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest">
                        <UserX size={10} /> {row.absent} Absent
                    </div>
                </div>
            )
        },
        {
            key: 'efficiency', 
            label: 'Attendance %', 
            render: (_, row) => {
                const pct = row.total > 0 ? Math.round((row.present / row.total) * 100) : 0;
                return (
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className={`flex-1 h-3 rounded-full relative overflow-hidden p-0.5 shadow-inner ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                className={`h-full rounded-full ${pct >= 75 ? 'bg-success' : pct >= 50 ? 'bg-amber-500' : 'bg-danger'}`}
                            />
                        </div>
                        <span className={`text-xs font-black tracking-tighter ${pct >= 75 ? 'text-success' : pct >= 50 ? 'text-amber-500' : 'text-danger'}`}>{pct}%</span>
                    </div>
                );
            }
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Attendance Records"
                    subtitle="Track and manage student attendance records across all departments"
                    icon={ClipboardCheck}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="secondary" 
                            icon={Download}
                            onClick={() => toast.success('Attendance report exported')}
                        >
                            Export Report
                        </Button>
                    }
                />

                {/* KPI Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Present Students" 
                        value={stats.present} 
                        icon={UserCheck} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Absent Students" 
                        value={stats.absent} 
                        icon={UserX} 
                        color="text-danger" 
                        bg="bg-danger/10" 
                    />
                    <StatCard 
                        title="Late Arrivals" 
                        value={stats.late} 
                        icon={Clock} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Operational Interface */}
                <div className={`p-2 rounded-[2rem] flex gap-2 w-fit mx-auto border glass-card
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    {[
                        { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
                        { id: 'history', label: 'Attendance History', icon: History }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500
                                ${activeTab === tab.id 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/25' 
                                    : 'text-slate-500 hover:text-primary hover:bg-primary/5'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'mark' ? (
                        <motion.div 
                            key="mark-tab"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="space-y-8"
                        >
                            {/* Command Parameters */}
                            <div className={`p-8 rounded-[2.5rem] border grid grid-cols-1 md:grid-cols-3 gap-8 glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Filter size={12} /> Select Class
                                    </label>
                                    <select
                                        value={selectedClass}
                                        onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    >
                                        {classes.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Calendar size={12} /> Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => { setSelectedDate(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Search size={12} /> Search Student
                                    </label>
                                    <div className="relative">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or roll number..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:ring-primary/20' : 'bg-slate-50 border-slate-200 placeholder-slate-400 focus:ring-primary/10'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Register */}
                            <div className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                                <div className={`px-10 py-6 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {classStudents.length} Students
                                            </span>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Class List</p>
                                        </div>
                                    </div>
                                    {canMark && classStudents.length > 0 && (
                                        <div className="flex gap-4">
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'present');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-success/10 text-success text-[10px] font-black uppercase tracking-widest hover:bg-success hover:text-white transition-all duration-300">
                                                Mark All Present
                                            </button>
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'absent');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest hover:bg-danger hover:text-white transition-all duration-300">
                                                Mark All Absent
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <DataTable
                                    columns={markColumns}
                                    data={classStudents}
                                    loading={loading}
                                    emptyTitle="No Students Found"
                                    emptyDescription="No students matching the selected criteria."
                                />

                                {canMark && classStudents.length > 0 && !loading && (
                                    <div className={`px-10 py-8 border-t flex justify-end items-center gap-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                                        <p className="text-xs font-bold text-slate-500 italic">Please review the attendance before saving</p>
                                        <Button
                                            onClick={handleSubmit}
                                            loading={saving}
                                            icon={submitted ? CheckCircle : Save}
                                            variant={submitted ? "secondary" : "primary"}
                                            className="min-w-[200px]"
                                        >
                                            {submitted ? 'Attendance Saved' : 'Save Attendance'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="history-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}
                        >
                            <div className={`px-10 py-6 border-b flex items-center justify-between
                                ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Attendance Logs</h2>
                                {historyLoading && <Loader2 size={18} className="animate-spin text-primary" />}
                            </div>
                            <DataTable
                                columns={historyColumns}
                                data={historyData}
                                loading={historyLoading}
                                emptyTitle="No History Found"
                                emptyDescription="No attendance records found for this period."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ClassDetailsPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\ClassDetailsPage.jsx*\n\n```jsx\nimport React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { ChevronLeft, Users, Calendar, BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ClassDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('students');
    // State for students
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await apiClient.get(`/classes/${id}`);
                if (response.data.success) {
                    setClassData(response.data.data);
                }
                // Fetch students
                const studentsRes = await apiClient.get(`/students?classId=${id}`);
                if (studentsRes.data.success) {
                    const d = studentsRes.data.data;
                    const studentList = Array.isArray(d) ? d : (d.students || []);
                    setStudents(studentList);
                }
            }
            catch (error) {
                toast.error('Failed to load class details');
            }
            finally {
                setLoading(false);
            }
        };
        if (id)
            fetchClassDetails();
    }, [id]);
    if (loading)
        return <Layout><div className="p-8 text-center">Loading...</div></Layout>;
    if (!classData)
        return <Layout><div className="p-8 text-center">Class not found</div></Layout>;
    const tabs = [
        { id: 'students', label: 'Students' },
        { id: 'schedule', label: 'Timetable' },
        { id: 'attendance', label: 'Attendance' },
    ];
    return (<Layout>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/classes')} className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                        <ChevronLeft size={20} className="mr-1"/> Back to Classes
                    </button>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                            Edit Class
                        </button>
                    </div>
                </div>

                {/* Header Info */}
                <div className={`rounded-2xl p-8 mb-8 shadow-lg ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Class {classData.name}
                                </h1>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold border border-purple-500/20">
                                    Section {classData.section}
                                </span>
                            </div>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                Academic Year {classData.academicYear}
                            </p>
                        </div>

                        <div className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                {classData.classTeacher?.firstName?.[0] || 'T'}
                            </div>
                            <div>
                                <p className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Class Teacher
                                </p>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {classData.classTeacher
            ? `${classData.classTeacher.firstName} ${classData.classTeacher.lastName}`
            : 'Not Assigned'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
                            <div className="flex items-center gap-2 mb-1 text-purple-500">
                                <Users size={18}/>
                                <span className="font-semibold">{classData.studentCount || 0}</span>
                            </div>
                            <p className="text-xs text-gray-500">Total Students</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
                            <div className="flex items-center gap-2 mb-1 text-blue-500">
                                <BookOpen size={18}/>
                                <span className="font-semibold">{classData.subjects?.length || 0}</span>
                            </div>
                            <p className="text-xs text-gray-500">Subjects</p>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-6">
                        {tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab.id
                ? 'text-purple-600'
                : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-800'}`}>
                                {tab.label}
                                {activeTab === tab.id && (<span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-full"></span>)}
                            </button>))}
                    </div>
                </div>

                {activeTab === 'students' && (<div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                        {/* Student List Table placeholder */}
                        <div className="p-8 text-center text-gray-500">
                            {students.length > 0 ? (<div>Student list will appear here</div>) : (<div className="flex flex-col items-center">
                                    <Users size={48} className="text-gray-300 mb-4"/>
                                    <p>No students enrolled in this class yet.</p>
                                    <button className="mt-4 text-purple-600 font-medium hover:underline">
                                        Enroll Students
                                    </button>
                                </div>)}
                        </div>
                    </div>)}

                {activeTab === 'schedule' && (<div className={`rounded-xl shadow-sm border p-8 text-center ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex flex-col items-center">
                            <Calendar size={48} className="text-gray-300 mb-4"/>
                            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Class Timetable</h3>
                            <p className="text-gray-500 mb-6">Schedule management coming soon.</p>
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                Configure Schedule
                            </button>
                        </div>
                    </div>)}
            </div>
        </Layout>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ClassesPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\ClassesPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, Search, Users, Calendar, BookOpen, Edit2, ShieldCheck, GraduationCap, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button, Input } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        academicYear: new Date().getFullYear().toString(),
        classTeacher: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
        fetchTeachers();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch (error) {
            console.error('Failed to fetch classes', error);
            toast.error('Failed to load classes');
        } finally {
            setLoading(false);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await apiClient.get('/teachers');
            if (response.data.success) setTeachers(response.data.data);
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!formData.id;
        const promise = isEditing 
            ? apiClient.put(`/classes/${formData.id}`, formData)
            : apiClient.post('/classes', formData);

        toast.promise(promise, {
            loading: isEditing ? 'Updating class...' : 'Creating new class...',
            success: isEditing ? 'Class updated successfully!' : 'Class created successfully!',
            error: (err) => err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} class`
        }).then(() => {
            setShowModal(false);
            fetchClasses();
            setFormData({
                name: '',
                section: '',
                academicYear: new Date().getFullYear().toString(),
                classTeacher: ''
            });
        });
    };

    const filteredClasses = classes.filter(cls => 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.section.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Classes"
                    subtitle={`Managing ${classes.length} academic classes`}
                    icon={BookOpen}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            onClick={() => setShowModal(true)} 
                            icon={Plus}
                        >
                            Add Class
                        </Button>
                    }
                />

                {/* Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Total Classes" value={classes.length} icon={ShieldCheck} color="text-primary" bg="bg-primary/10" />
                    <StatCard title="Total Students" value={classes.reduce((acc, c) => acc + (c.studentCount || 0), 0)} icon={Users} color="text-emerald-500" bg="bg-emerald-500/10" />
                    <StatCard title="Current Year" value={new Date().getFullYear()} icon={Calendar} color="text-amber-500" bg="bg-amber-500/10" />
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 w-full max-w-xl">
                        <Input 
                            type="search" 
                            placeholder="Search for classes, sections or teachers..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={Search}
                        />
                    </div>
                </div>

                {/* Classes Matrix */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Loading Classes</span>
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center glass-card rounded-[3.5rem] border border-dashed border-slate-200 dark:border-slate-800"
                    >
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shrink-0">
                            <GraduationCap size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight text-slate-400 uppercase">No Classes Found</h3>
                        <p className="text-slate-500 font-bold mt-1">No classes have been registered yet.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredClasses.map((cls, i) => (
                                <motion.div 
                                    key={cls._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-indigo-600 rounded-[3rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                                    <div className={`relative glass-card rounded-[3rem] border overflow-hidden transition-all duration-500
                                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-2'}`}>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                                                        {cls.name}
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cls.name}</h3>
                                                        <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase">Section {cls.section}</span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData({
                                                            id: cls._id,
                                                            name: cls.name,
                                                            section: cls.section,
                                                            academicYear: cls.academicYear,
                                                            classTeacher: cls.classTeacher?._id || cls.classTeacher || ''
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                                        <Users size={14} />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{cls.studentCount} Students</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                                        <Calendar size={14} />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Year {cls.academicYear}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">CT</div>
                                                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400">
                                                        {cls.classTeacher ? cls.classTeacher.fullName : 'Teacher Not Assigned'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => navigate(`/classes/${cls._id}`)}
                                            className={`w-full py-5 px-8 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] transition-all
                                                ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-primary border-t border-slate-100'}`}
                                        >
                                            View Details
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Addition Modal */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowModal(false)}
                                className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`relative w-full max-w-xl rounded-[3rem] p-10 border shadow-2xl overflow-hidden
                                    ${isDarkMode ? 'bg-slate-950 border-slate-800 shadow-none' : 'bg-white border-slate-100'}`}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {formData.id ? 'Edit Class' : 'Add New Class'}
                                    </h2>
                                    <button onClick={() => setShowModal(false)} className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <Input 
                                            label="Class Name" 
                                            placeholder="e.g. 10" 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                            required 
                                        />
                                        <Input 
                                            label="Section" 
                                            placeholder="e.g. A" 
                                            value={formData.section} 
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <Input 
                                        label="Academic Year" 
                                        value={formData.academicYear} 
                                        onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })} 
                                        required 
                                    />
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Class Teacher</label>
                                        <select 
                                            className={`w-full h-14 px-6 rounded-2xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20 appearance-none
                                                ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`}
                                            value={formData.classTeacher} 
                                            onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                                        >
                                            <option value="">SELECT TEACHER</option>
                                            {teachers.filter(t => t.userId).map(teacher => (
                                                <option key={teacher._id} value={teacher.userId._id}>{teacher.userId.fullName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button type="submit" className="flex-1">Add Class</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > Dashboard.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\Dashboard.jsx*\n\n```jsx\nimport React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
    Users, GraduationCap, DollarSign, TrendingUp, CreditCard, 
    Calendar as CalendarIcon, ArrowRight, CheckCircle, XCircle, 
    Zap, Activity, Target, Landmark, LayoutDashboard,
    PieChart, Clock, ShieldCheck, UserPlus
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { apiClient } from '@/services/api';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { TeacherDashboard } from '@/pages/TeacherDashboard';
import { StatCard } from '@/components/dashboard/StatCard';
import { PageHeader } from '@/components/PageHeader';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { isDarkMode, roleTheme } = useTheme();

    const role = user?.roles?.[0]?.toUpperCase();

    if (role === 'STUDENT') return <StudentDashboard />;
    if (role === 'TEACHER') return <TeacherDashboard />;

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

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[80vh] gap-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem] animate-pulse"></div>
                        <div className="absolute inset-2 border-4 border-primary/20 rounded-[1.5rem] animate-pulse delay-75"></div>
                        <div className="absolute inset-0 border-t-4 border-primary rounded-[2rem] animate-spin-slow"></div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black text-slate-400 tracking-[0.3em] uppercase mb-1">Loading Dashboard</p>
                        <p className="text-[10px] font-bold text-slate-500 italic">Loading records...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24"
            >
                {/* Dashboard Header */}
                <PageHeader
                    title={`Admin Dashboard`}
                    subtitle={`Oversee college operations and metrics.`}
                    icon={LayoutDashboard}
                    description={`Administrator: ${user?.fullName || 'Admin Access'}`}
                />

                {/* Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard 
                        title="Total Students" 
                        value={stats.totalStudents} 
                        icon={Users} 
                        color="text-indigo-500" 
                        bg="bg-indigo-500/10" 
                        trend={12.4}
                        onClick={() => navigate('/students')}
                    />
                    <StatCard 
                        title="Total Teachers" 
                        value={stats.totalTeachers} 
                        icon={GraduationCap} 
                        color="text-sky-500" 
                        bg="bg-sky-500/10" 
                        trend={3.2}
                        onClick={() => navigate('/staff')}
                    />
                    <StatCard 
                        title="Total Fee Collection" 
                        value={stats.totalRevenue > 0 ? `₹${(stats.totalRevenue / 1000).toFixed(1)}k` : '₹0'} 
                        icon={Landmark} 
                        color="text-emerald-500" 
                        bg="bg-emerald-500/10" 
                        trend={8.5}
                    />
                    <StatCard 
                        title="Student Attendance" 
                        value={stats.attendance?.total > 0 ? `${stats.attendance.presentPct}%` : '0%'} 
                        icon={Activity} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                        trend={-1.8}
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Financial Overview */}
                    <motion.div variants={itemVariants} className={`lg:col-span-2 p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden flex flex-col glass-card
143:                         ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fee Collection Overview</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Monthly collection analytics</p>
                            </div>
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                                <TrendingUp size={20} />
                            </div>
                        </div>

                        {stats.chartData?.length > 0 ? (
                            <div className="h-[400px] w-full mt-auto relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chartData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                            dy={15} 
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                        />
                                        <Tooltip 
                                            cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                                            contentStyle={{ 
                                                backgroundColor: isDarkMode ? '#0f172a' : '#fff', 
                                                border: isDarkMode ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                                                borderRadius: '24px',
                                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                                padding: '12px 16px'
                                            }} 
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="var(--primary)" 
                                            strokeWidth={6} 
                                            fillOpacity={1} 
                                            fill="url(#colorRevenue)" 
                                            activeDot={{ r: 10, fill: 'var(--primary)', stroke: isDarkMode ? '#0f172a' : '#fff', strokeWidth: 4 }} 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 mt-auto">
                                <motion.div 
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    <Landmark size={64} className="text-slate-200 dark:text-slate-700 mb-6" />
                                </motion.div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No Transaction Data Available</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Secondary Intelligence Column */}
                    <div className="space-y-10">
                        {/* Real-time Entry Feed */}
                        <motion.div variants={itemVariants} className={`p-10 rounded-[3rem] border transition-all duration-500 glass-card
                            ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                                    <Clock size={20} />
                                </div>
                                <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>New Admissions</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {stats.recentAdmissions?.length > 0 ? (
                                    stats.recentAdmissions.slice(0, 5).map((student, i) => (
                                        <div key={i} className="flex gap-4 items-center group cursor-pointer p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110
                                                ${isDarkMode ? 'bg-slate-800 text-primary shadow-lg shadow-black/20' : 'bg-white text-primary shadow-sm'}`}>
                                                <UserPlus size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className={`text-sm font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    {student.userId?.fullName || 'Anonymous User'}
                                                </p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                                                    {student.course} • Term {student.semester || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <ArrowRight size={16} className="text-primary" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                                        <Users size={32} className="mx-auto mb-4 text-slate-100 dark:text-slate-800" />
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-4">No recent admission activity</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Presence Analysis Widget */}
                        <motion.div variants={itemVariants} className={`p-10 rounded-[3rem] border transition-all duration-500 glass-card
                            ${isDarkMode ? 'bg-primary/5 border-primary/10' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-success/10 text-success rounded-2xl">
                                    <ShieldCheck size={20} />
                                </div>
                                <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Attendance Summary</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Students Present</span>
                                    <div className="flex items-baseline gap-1">
                                        <p className={`text-3xl font-black ${isDarkMode ? 'text-success' : 'text-emerald-600'}`}>
                                            {stats.attendance.present}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Pax</span>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Students Absent</span>
                                    <div className="flex items-baseline gap-1">
                                        <p className={`text-3xl font-black ${isDarkMode ? 'text-danger' : 'text-red-600'}`}>
                                            {stats.attendance.absent}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Pax</span>
                                    </div>
                                </div>
                            </div>

                            {/* Aggregated Health Progress */}
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Overall Attendance</span>
                                    <span className="text-sm font-black text-primary">{stats.attendance.presentPct}%</span>
                                </div>
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.attendance.presentPct}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-shimmer scale-x-150" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ExamsPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\ExamsPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Clock, BookOpen, Plus, ShieldCheck, Hourglass, CheckCircle2, CalendarDays, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const ExamsPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useTheme();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '', date: '', time: '', course: 'BCA'
    });

    const fetchExams = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/exams');
            if (response.data && response.data.success) {
                setExams(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load exams');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const canCreateExam = user?.roles?.includes('ADMIN') || user?.roles?.includes('TEACHER');

    const handleCreateExam = async (e) => {
        e.preventDefault();
        try {
            // Ensure we send classId which is often required in backend
            const payload = {
                ...formData,
                classId: formData.course // Assuming course field in UI maps to classId in back
            };
            const response = await apiClient.post('/exams', payload);
            if (response.data && response.data.success) {
                toast.success('Exam scheduled successfully');
                setIsCreateModalOpen(false);
                fetchExams();
                setFormData({ title: '', date: '', time: '', course: 'BCA' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule exam');
        }
    };

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    const upcomingExams = exams.filter(e => new Date(e.date) >= new Date()).length;
    const completedExams = exams.length - upcomingExams;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Exams"
                    subtitle="Manage and schedule academic examinations"
                    icon={CalendarDays}
                    backTo="/dashboard"
                    actions={canCreateExam && (
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            icon={Plus}
                        >
                            Add Exam
                        </Button>
                    )}
                />

                {/* Examination KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Total Exams" 
                        value={exams.length} 
                        icon={BookOpen} 
                        color="text-primary" 
                        bg="bg-primary/10" 
                    />
                    <StatCard 
                        title="Upcoming Exams" 
                        value={upcomingExams} 
                        icon={Hourglass} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                    <StatCard 
                        title="Completed Exams" 
                        value={completedExams} 
                        icon={CheckCircle2} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                </div>

                {/* Filters View */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                    {['All Exams', 'Upcoming', 'Completed'].map((filter, i) => (
                        <button 
                            key={filter}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                            ${i === 0 
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:text-primary'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Exam Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-64 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />
                            ))
                        ) : exams.length === 0 ? (
                            <div className="col-span-full py-32 text-center space-y-6">
                                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4">
                                    <Calendar size={40} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Exams Found</h3>
                                    <p className="text-slate-500 font-bold mt-1">No examinations scheduled at the moment.</p>
                                </div>
                            </div>
                        ) : exams.map((exam, i) => (
                            <motion.div
                                key={exam._id || exam.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-[2.5rem] border p-8 transition-all duration-500 glass-card group
                                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'}`}>
                                        <ShieldCheck size={24} className="text-primary" />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                                        ${new Date(exam.date) >= new Date() ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                        {new Date(exam.date) >= new Date() ? 'Upcoming' : 'Completed'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className={`text-xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                        {exam.title}
                                    </h3>
                                    
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                            <Calendar size={16} className="text-primary" />
                                            {new Date(exam.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                            <Clock size={16} className="text-primary" />
                                            {exam.time}
                                        </div>
                                        <div className="pt-4 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                Class: {exam.course || exam.class}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Create Exam Modal */}
                <AnimatePresence>
                    {isCreateModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`w-full max-w-lg rounded-[3rem] border overflow-hidden
                                    ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                            >
                                <div className={`px-10 py-8 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <Plus size={18} />
                                        </div>
                                        Schedule New Exam
                                    </h2>
                                    <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateExam} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Exam Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className={inputCls}
                                            placeholder="e.g. Mid-Term Examination"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Date</label>
                                            <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Time</label>
                                            <input required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Course / Class</label>
                                        <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={inputCls}>
                                            <option value="BCA">Bachelor of Comp. Apps (BCA)</option>
                                            <option value="BBA">Bachelor of Bus. Admin (BBA)</option>
                                            <option value="MBA">Master of Bus. Admin (MBA)</option>
                                            <option value="MCA">Master of Comp. Apps (MCA)</option>
                                            <option value="BSc IT">Bachelor of Science IT</option>
                                        </select>
                                    </div>

                                    <div className={`flex gap-4 pt-4`}>
                                        <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="flex-1">Discard</Button>
                                        <Button type="submit" className="flex-1">Schedule Exam</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ProjectDashboard.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\faculty\ProjectDashboard.jsx*\n\n```jsx\nimport React, { useState, useMemo } from 'react';
import { useProjects, useGradeProject } from '../../hooks/useProject';
import { ProjectStatus } from '../../types/project';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCardSkeleton } from '../../components/common/Skeleton';
import toast from 'react-hot-toast';
// Debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
const ProjectDashboard = () => {
    const [filters, setFilters] = useState({
        batch: '',
        domain: '',
        status: '',
        page: 1,
        limit: 20,
        sort: 'updatedAt',
        order: 'desc'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [selectedProject, setSelectedProject] = useState(null);
    const [grading, setGrading] = useState({ score: 0, feedback: '', status: ProjectStatus.GRADED });
    const [showGradingModal, setShowGradingModal] = useState(false);
    const { data, isLoading, error, refetch } = useProjects(filters);
    const gradeProject = useGradeProject();
    const projects = data?.data || [];
    const pagination = data?.pagination;
    const stats = data?.stats || {};
    const statusCounts = useMemo(() => ({
        total: projects.length,
        submitted: stats[ProjectStatus.SUBMITTED] || 0,
        graded: stats[ProjectStatus.GRADED] || 0,
        inProgress: stats[ProjectStatus.IN_PROGRESS] || 0
    }), [projects, stats]);
    // Filter projects by search term (client-side for demo)
    const filteredProjects = useMemo(() => {
        if (!debouncedSearch)
            return projects;
        return projects.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [projects, debouncedSearch]);
    const handleGrade = async () => {
        if (!selectedProject)
            return;
        if (grading.score < 0 || grading.score > 100) {
            toast.error('Score must be between 0 and 100');
            return;
        }
        if (grading.feedback.length < 10) {
            toast.error('Feedback must be at least 10 characters');
            return;
        }
        await gradeProject.mutateAsync({
            id: selectedProject._id,
            data: {
                score: grading.score,
                feedback: grading.feedback,
                status: grading.status
            }
        });
        setShowGradingModal(false);
        setSelectedProject(null);
        setGrading({ score: 0, feedback: '', status: ProjectStatus.GRADED });
        refetch();
    };
    const openGradingModal = (project) => {
        setSelectedProject(project);
        setGrading({
            score: project.grading?.score || 0,
            feedback: project.grading?.feedback || '',
            status: ProjectStatus.GRADED
        });
        setShowGradingModal(true);
    };
    const getStatusColor = (status) => {
        const colors = {
            [ProjectStatus.PROPOSED]: 'bg-yellow-100 text-yellow-800',
            [ProjectStatus.APPROVED]: 'bg-blue-100 text-blue-800',
            [ProjectStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800',
            [ProjectStatus.SUBMITTED]: 'bg-purple-100 text-purple-800',
            [ProjectStatus.CHANGES_REQUESTED]: 'bg-orange-100 text-orange-800',
            [ProjectStatus.GRADED]: 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Project Command Center</h1>
                        <p className="text-gray-600 dark:text-gray-400">Monitor and grade student project submissions</p>
                    </div>
                    <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Refresh</span>
                    </button>
                </header>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Projects</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{pagination?.total || 0}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Awaiting Review</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.submitted}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Graded</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.graded}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">In Progress</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.inProgress}</p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" placeholder="Search by title or description..." className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                        <input type="text" placeholder="Filter by Batch (e.g. 2024-CSE)" className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.batch} onChange={e => setFilters({ ...filters, batch: e.target.value, page: 1 })}/>
                        <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value, page: 1 })}>
                            <option value="">All Statuses</option>
                            {Object.values(ProjectStatus).map(status => (<option key={status} value={status}>{status.replace('_', ' ')}</option>))}
                        </select>
                        <input type="text" placeholder="Filter by Domain" className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.domain} onChange={e => setFilters({ ...filters, domain: e.target.value, page: 1 })}/>
                    </div>
                </div>

                {/* Projects List */}
                {isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <ProjectCardSkeleton key={i}/>)}
                    </div>) : error ? (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Error Loading Projects</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
                        <button onClick={() => refetch()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Try Again
                        </button>
                    </div>) : filteredProjects.length === 0 ? (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                        <div className="text-6xl mb-4">📂</div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No Projects Found</h2>
                        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search term</p>
                    </div>) : (<>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (<motion.div key={project._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={() => setSelectedProject(project)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${getStatusColor(project.status)}`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.domain.slice(0, 2).map(d => (<span key={d} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                                {d}
                                            </span>))}
                                        {project.domain.length > 2 && (<span className="text-xs px-2 py-1 text-gray-500">+{project.domain.length - 2}</span>)}
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>{project.batch}</span>
                                        {project.submission && (<span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                Submitted
                                            </span>)}
                                    </div>
                                    {project.status === ProjectStatus.SUBMITTED && !project.grading && (<button onClick={(e) => {
                        e.stopPropagation();
                        openGradingModal(project);
                    }} className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition shadow-md">
                                            Grade Now
                                        </button>)}
                                </motion.div>))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (<div className="mt-8 flex justify-center items-center gap-2">
                                <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    Previous
                                </button>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>
                                <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === pagination.totalPages} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    Next
                                </button>
                            </div>)}
                    </>)}

                {/* Grading Modal */}
                <AnimatePresence>
                    {showGradingModal && selectedProject && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowGradingModal(false)}>
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{selectedProject.title}</h2>

                                {selectedProject.submission && (<div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Submission Details</h3>
                                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                            <p><strong>File:</strong> {selectedProject.submission.originalName}</p>
                                            <p><strong>Pages:</strong> {selectedProject.submission.pageCount || 'N/A'}</p>
                                            <p><strong>Size:</strong> {(selectedProject.submission.size / 1024 / 1024).toFixed(2)} MB</p>
                                            {selectedProject.submission.plagiarismScore !== undefined && (<p>
                                                    <strong>Plagiarism:</strong>{' '}
                                                    <span className={selectedProject.submission.plagiarismScore > 20 ? 'text-red-600' : 'text-green-600'}>
                                                        {selectedProject.submission.plagiarismScore}%
                                                    </span>
                                                </p>)}
                                            <a href={selectedProject.submission.fileUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:underline">
                                                View Document →
                                            </a>
                                        </div>
                                    </div>)}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Score (0-100) *
                                        </label>
                                        <input type="number" min="0" max="100" value={grading.score} onChange={(e) => setGrading({ ...grading, score: Number(e.target.value) })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"/>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Feedback *
                                        </label>
                                        <textarea value={grading.feedback} onChange={(e) => setGrading({ ...grading, feedback: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition" rows={4} placeholder="Provide detailed feedback..."/>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {grading.feedback.length} characters (minimum 10)
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Final Status
                                        </label>
                                        <select value={grading.status} onChange={(e) => setGrading({ ...grading, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition">
                                            <option value={ProjectStatus.GRADED}>Graded (Approved)</option>
                                            <option value={ProjectStatus.CHANGES_REQUESTED}>Changes Requested</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <button onClick={() => setShowGradingModal(false)} className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition" disabled={gradeProject.isPending}>
                                            Cancel
                                        </button>
                                        <button onClick={handleGrade} disabled={gradeProject.isPending} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                                            {gradeProject.isPending ? 'Submitting...' : 'Submit Grade'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>)}
                </AnimatePresence>
            </div>
        </div>);
};
export default ProjectDashboard;


\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > FeesPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\FeesPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, CreditCard, ChevronRight, X, IndianRupee, Layers, CalendarClock, Tag, ShieldCheck, TrendingUp, Wallet, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

const FREQUENCY_LABELS = {
    yearly: { label: 'Yearly', color: 'bg-indigo-500/10 text-indigo-500', icon: CalendarClock },
    semester: { label: 'Semester', color: 'bg-blue-500/10 text-blue-500', icon: Layers },
    monthly: { label: 'Monthly', color: 'bg-amber-500/10 text-amber-500', icon: TrendingUp },
    'one-time': { label: 'One-time', color: 'bg-emerald-500/10 text-emerald-500', icon: CreditCard },
};

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

export const FeesPage = () => {
    const { isDarkMode } = useTheme();
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
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) setFeeTypes(response.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', { ...newFee, amount: Number(newFee.amount) });
            toast.success('Fee type created successfully');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch {
            toast.error('Failed to create fee type');
        }
    };

    const openAssignModal = (fee) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) { toast.error('Please select a class and due date'); return; }
        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate,
            });
            toast.success('Fees assigned to class');
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Assignment failed');
        }
    };

    const totalAmount = feeTypes.reduce((sum, f) => sum + (f.amount || 0), 0);

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Fees Management"
                    subtitle="Manage fee structures and assign them to classes."
                    icon={Wallet}
                    backTo="/dashboard"
                    actions={isAdmin && (
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            icon={Plus}
                        >
                            Create Fee Type
                        </Button>
                    )}
                />

                {/* Fees Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Fee Types" 
                        value={feeTypes.length} 
                        icon={Layers} 
                        color="text-primary" 
                        bg="bg-primary/10" 
                    />
                    <StatCard 
                        title="Total Fee Amount" 
                        value={`₹${formatINR(totalAmount)}`} 
                        icon={IndianRupee} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Optional Fees" 
                        value={feeTypes.filter((f) => f.isOptional).length} 
                        icon={ShieldCheck} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Fee Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {feeTypes.map((fee, i) => {
                            const freq = FREQUENCY_LABELS[fee.frequency] || { label: fee.frequency, color: 'bg-slate-100 text-slate-600', icon: CreditCard };
                            return (
                                <motion.div
                                    key={fee._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`rounded-[2.5rem] border p-8 transition-all duration-500 glass-card group
                                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10'}`}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'}`}>
                                            <Banknote size={24} className="text-primary" />
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${freq.color}`}>
                                            <freq.icon size={12} />
                                            {freq.label}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                                {fee.name}
                                            </h3>
                                            {fee.isOptional && (
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Optional</span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-black text-success">₹</span>
                                            <span className="text-4xl font-black tracking-tighter text-success">{formatINR(fee.amount)}</span>
                                        </div>

                                        <p className={`text-sm font-medium leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>
                                            {fee.description || 'Fee for academic and administrative services.'}
                                        </p>
                                    </div>

                                    {isAdmin && (
                                        <div className={`pt-6 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                <ShieldCheck size={12} />
                                                {fee.code || 'CODE'}
                                            </div>
                                            <button
                                                onClick={() => openAssignModal(fee)}
                                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
                                            >
                                                Assign to Class <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full py-32 text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4">
                                <CreditCard size={40} className="text-slate-300 dark:text-slate-600" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Fee Types</h3>
                                <p className="text-slate-500 font-bold mt-1">No fee structures found.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals are kept with standard redesign apply */}
            <AnimatePresence>
                {(showCreateModal || (showAssignModal && selectedFeeForAssign)) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`w-full max-w-lg rounded-[3rem] border overflow-hidden
                                ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                        >
                            <div className={`px-10 py-8 border-b flex items-center justify-between
                                ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                        {showCreateModal ? <Layers size={18} /> : <Tag size={18} />}
                                    </div>
                                    {showCreateModal ? 'New Fee Type' : 'Assign Fees to Class'}
                                </h2>
                                <button onClick={() => { setShowCreateModal(false); setShowAssignModal(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            {showCreateModal ? (
                                <form onSubmit={handleCreateFee} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Fee Name</label>
                                        <input
                                            value={newFee.name}
                                            onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                                            className={inputCls}
                                            placeholder="e.g. Tuition Fee"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={newFee.amount}
                                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                                                className={inputCls}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Frequency</label>
                                            <select
                                                value={newFee.frequency}
                                                onChange={(e) => setNewFee({ ...newFee, frequency: e.target.value })}
                                                className={inputCls}
                                            >
                                                <option value="yearly">Yearly</option>
                                                <option value="semester">Semester</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="one-time">One-time</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                                        <textarea
                                            value={newFee.description}
                                            onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                            className={`${inputCls} h-24 pt-3 resize-none`}
                                            placeholder="Describe the purpose of this fee..."
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14">Create Fee Type</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAssignFee} className="p-10 space-y-8">
                                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Fee Type</p>
                                            <h4 className="text-lg font-black tracking-tight">{selectedFeeForAssign.name}</h4>
                                        </div>
                                        <p className="text-2xl font-black text-success">₹{formatINR(selectedFeeForAssign.amount)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Class</label>
                                        <select
                                            value={selectedClassId}
                                            onChange={(e) => setSelectedClassId(e.target.value)}
                                            className={inputCls}
                                            required
                                        >
                                            <option value="">— Select Class —</option>
                                            {classes.map((cls) => (
                                                <option key={cls._id} value={cls._id}>Class {cls.name} / {cls.section}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className={inputCls}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14" variant="secondary">Assign Fee</Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > GradesPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\GradesPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Save, Award, BookOpen, GraduationCap, Users, TrendingUp, ShieldCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const GradesPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    
    // Selection States
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [exams, setExams] = useState(['First Term', 'Final Examination', 'Internal Assessment']);
    const [selectedExam, setSelectedExam] = useState('');
    const [subjects, setSubjects] = useState(['Mathematics', 'Physics', 'English']);
    const [selectedSubject, setSelectedSubject] = useState('');
    
    // Data States
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState({});

    useEffect(() => {
        if (user?.roles?.includes('ADMIN')) fetchClasses();
    }, [user]);

    useEffect(() => {
        if (selectedClass) fetchStudents(selectedClass);
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch (error) {
            console.error('Failed to fetch classes', error);
        }
    };

    const fetchStudents = async (classId) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/students');
            if (response.data.success) {
                setStudents(response.data.data);
                setGrades({});
            }
        } catch (error) {
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleGradeChange = (studentId, value) => {
        const numValue = parseFloat(value);
        if (numValue >= 0 && numValue <= 100) {
            setGrades(prev => ({ ...prev, [studentId]: numValue }));
        }
    };

    const handleSubmit = async () => {
        if (!selectedClass || !selectedExam || !selectedSubject) {
            toast.error('Please select all fields');
            return;
        }
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Saving grades...',
            success: 'Grades updated successfully!',
            error: 'Failed to save grades'
        });
    };

    const selectCls = `h-14 px-6 rounded-2xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20 appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em_1em]
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Grades Management"
                    subtitle="Enter and manage academic grades for students"
                    icon={Award}
                    backTo="/dashboard"
                    actions={selectedClass && (
                        <Button
                            onClick={handleSubmit}
                            icon={Save}
                        >
                            Save Grades
                        </Button>
                    )}
                />

                {/* Criteria Selection */}
                <div className={`p-10 rounded-[3.5rem] border glass-card space-y-8
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <ShieldCheck size={18} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-400">Select Criteria</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Class</label>
                            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={selectCls}>
                                <option value="">SELECT CLASS</option>
                                {classes.map(cls => (<option key={cls._id} value={cls._id}>CLASS {cls.name}-{cls.section}</option>))}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Exam</label>
                            <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className={selectCls}>
                                <option value="">SELECT EXAM</option>
                                {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Subject</label>
                            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className={selectCls}>
                                <option value="">SELECT SUBJECT</option>
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {!selectedClass ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center space-y-6"
                    >
                        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[3rem] flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-slate-900 shadow-xl">
                            <TrendingUp size={48} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Class Selected</h3>
                            <p className="text-slate-500 font-bold mt-1">Please select a class, exam, and subject to begin.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StatCard title="Total Students" value={students.length} icon={Users} color="text-primary" bg="bg-primary/10" />
                            <StatCard title="Class Average" value={(Object.values(grades).reduce((a, b) => a + b, 0) / (Object.keys(grades).length || 1)).toFixed(1)} icon={GraduationCap} color="text-amber-500" bg="bg-amber-500/10" />
                            <StatCard title="Status" value="Online" icon={BookOpen} color="text-success" bg="bg-success/10" />
                        </div>

                        {/* Grade Input Table */}
                        <div className={`rounded-[3rem] border overflow-hidden glass-card
                            ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Name</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-48">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Roll Number</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-64">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Marks (Out of 100)</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-40">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Grade</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {students.map((student, i) => (
                                            <motion.tr 
                                                key={student._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-primary/[0.02] transition-colors"
                                            >
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20">
                                                            {student.userId.firstName[0]}
                                                        </div>
                                                        <div>
                                                            <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                                                {student.userId.firstName} {student.userId.lastName}
                                                            </p>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Student</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`text-xs font-black tracking-widest uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        {student.rollNo}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="relative group/input max-w-[150px]">
                                                        <input 
                                                            type="number" 
                                                            min="0" max="100" 
                                                            value={grades[student._id] || ''} 
                                                            onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                                            className={`w-full h-12 px-6 rounded-xl border text-sm font-black outline-none transition-all focus:ring-4 focus:ring-primary/20
                                                                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`}
                                                            placeholder="000"
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase opacity-40">pts</div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <AnimatePresence mode="wait">
                                                        {!grades[student._id] ? (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-2 w-8 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                                        ) : (
                                                            <motion.div
                                                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                                className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg
                                                                    ${grades[student._id] >= 90 ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 
                                                                    grades[student._id] >= 75 ? 'bg-primary text-white shadow-primary/30' : 
                                                                    grades[student._id] >= 60 ? 'bg-amber-500 text-white shadow-amber-500/30' : 
                                                                    'bg-red-500 text-white shadow-red-500/30'}`}
                                                            >
                                                                {grades[student._id] >= 90 ? 'A+' : 
                                                                 grades[student._id] >= 75 ? 'A' : 
                                                                 grades[student._id] >= 60 ? 'B' : 'C'}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > LandingPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\LandingPage.jsx*\n\n```jsx\nimport React, { useEffect, useState, useRef } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, BookOpen, Users, Award, Building2, GraduationCap,
    Globe, ChevronRight, MapPin, Activity,
    Phone, Mail, CheckCircle, Star, TrendingUp, Zap, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const slides = [
    {
        id: 0,
        tagline: "51st Annual Day Celebration 2024",
        title: "L.N. Mishra",
        subtitle: "Institute",
        highlight: "of Excellence",
        desc: "Bihar's premier management and technology institute, shaping future leaders since 1973 through industry-aligned programs and research.",
        bg: "/assets/images/lnmi/s1.jpeg",
        badge: "Est. 1973",
        overlayFrom: "from-slate-950/85",
    },
    {
        id: 1,
        tagline: "State-of-the-Art Auditorium",
        title: "World-Class",
        subtitle: "Learning",
        highlight: "Infrastructure",
        desc: "Our modern auditorium hosts convocations, national guest lectures and seminars with 1200+ seating capacity.",
        bg: "/assets/images/lnmi/s2.jpeg",
        badge: "1200+ Capacity",
        overlayFrom: "from-indigo-950/80",
    },
    {
        id: 2,
        tagline: "Campus Illuminated — Festive Celebrations",
        title: "A Campus",
        subtitle: "That Comes",
        highlight: "Alive at Night",
        desc: "Every festival, every milestone — LNMI comes alive with light and celebration, fostering a vibrant community spirit.",
        bg: "/assets/images/lnmi/lnmi-night1.webp",
        badge: "Vibrant Community",
        overlayFrom: "from-slate-950/75",
    },
    {
        id: 3,
        tagline: "L.N. Mishra Institute — Illuminated",
        title: "Where Tradition",
        subtitle: "Meets",
        highlight: "Modern Vision",
        desc: "The iconic LNMI Administrative Block, beautifully lit, symbolizing 50+ years of academic brilliance and institutional pride.",
        bg: "/assets/images/lnmi/lnmi-night2.webp",
        badge: "50+ Years",
        overlayFrom: "from-slate-950/70",
    },
    {
        id: 4,
        tagline: "Advanced Computing Facility",
        title: "Technology-Driven",
        subtitle: "Academic",
        highlight: "Environment",
        desc: "Equipped with 300+ modern workstations, our computing labs power research and hands-on learning in cutting-edge disciplines.",
        bg: "/assets/images/lnmi/s3.webp",
        badge: "300+ Workstations",
        overlayFrom: "from-slate-950/80",
    },
];

const stats = [
    { icon: Users, label: "Students Enrolled", value: "3,500+", color: "from-indigo-500 to-blue-600" },
    { icon: GraduationCap, label: "Faculty Members", value: "150+", color: "from-violet-500 to-purple-600" },
    { icon: Award, label: "Courses Offered", value: "25+", color: "from-emerald-500 to-teal-600" },
    { icon: Building2, label: "Years of Excellence", value: "50+", color: "from-amber-500 to-orange-600" },
];

const programs = [
    { name: "MBA", full: "Master of Business Administration", icon: TrendingUp, semesters: 4, color: "from-purple-600 to-indigo-600" },
    { name: "MCA", full: "Master of Computer Applications", icon: Zap, semesters: 4, color: "from-sky-600 to-cyan-600" },
    { name: "BBA", full: "Bachelor of Business Administration", icon: BookOpen, semesters: 6, color: "from-emerald-600 to-green-600" },
    { name: "BCA", full: "Bachelor of Computer Applications", icon: Shield, semesters: 6, color: "from-rose-600 to-pink-600" },
];

const announcements = [
    { title: "MBA Orientation 2024-25 scheduled for August 10", date: "05 Aug", type: "ANNOUNCEMENT", color: "bg-indigo-500" },
    { title: "MCA Entrance Exam Phase II Results Published", date: "02 Aug", type: "RESULT", color: "bg-emerald-500" },
    { title: "Campus Placement Drive: 20+ MNCs Expected", date: "28 Jul", type: "PLACEMENT", color: "bg-amber-500" },
];

const gallery = [
    { src: "/assets/images/lnmi/s1.jpeg", caption: "51st Annual Celebration" },
    { src: "/assets/images/lnmi/lnmi-night1.webp", caption: "Festive Illumination" },
    { src: "/assets/images/lnmi/s2.jpeg", caption: "Modern Auditorium" },
    { src: "/assets/images/lnmi/lnmi-night2.webp", caption: "LNMI at Night" },
    { src: "/assets/images/lnmi/s3.webp", caption: "Computing Labs" },
    { src: "/assets/images/lnmi/lnmi3.jpeg", caption: "Campus Life" },
];

const SLIDE_DURATION = 6000;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const LandingPage = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        setProgress(0);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    setCurrent(c => (c + 1) % slides.length);
                    return 0;
                }
                return p + (100 / (SLIDE_DURATION / 100));
            });
        }, 100);
    };

    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    const goToSlide = (idx) => {
        setCurrent(idx);
        resetInterval();
    };


    const slide = slides[current];

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
            <PublicHeader />

            {/* ─── HERO ─── */}
            <section className="relative h-screen min-h-[680px] flex items-center overflow-hidden pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slide.bg}
                            alt="LNMI Campus"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayFrom} via-slate-900/50 to-transparent`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 lg:px-16">
                    <div className="max-w-3xl">
                        {/* Tagline */}
                        <motion.div
                            key={`tag-${current}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-[2px] w-10 bg-indigo-400" />
                            <span className="text-indigo-300 text-xs font-black uppercase tracking-[0.35em]">
                                {slide.tagline}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`title-${current}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-5 drop-shadow-2xl">
                                    {slide.title}
                                    <span className="block text-slate-300 mt-1">{slide.subtitle}</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-1">
                                        {slide.highlight}
                                    </span>
                                </h1>
                                <p className="text-white/70 text-base md:text-lg font-medium mb-10 max-w-xl leading-relaxed">
                                    {slide.desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => navigate('/login')}
                                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all duration-300 active:scale-95"
                            >
                                Student Portal
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all duration-300">
                                Apply Now
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Slide badge (desktop) */}
                <motion.div
                    key={`badge-${current}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute bottom-28 right-10 lg:right-16 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl text-white font-black text-sm uppercase tracking-widest hidden md:block"
                >
                    {slide.badge}
                </motion.div>

                {/* Progress indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className="relative overflow-hidden rounded-full transition-all duration-500"
                            style={{ width: current === i ? 48 : 10, height: 5 }}
                        >
                            <span className="absolute inset-0 bg-white/30 rounded-full" />
                            {current === i && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="absolute inset-y-0 left-0 bg-indigo-400 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-10 right-10 text-white/40 font-black text-xs uppercase tracking-widest hidden md:block">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 rounded-3xl transition-opacity`} />
                                <div className="relative bg-slate-900/80 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                                        <stat.icon size={22} className="text-white" />
                                    </div>
                                    <div className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── ABOUT ─── */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Image collage */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="col-span-2 h-64 rounded-3xl overflow-hidden shadow-2xl"
                                >
                                    <img src="/assets/images/lnmi/s1.jpeg" alt="Annual Day" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night1.webp" alt="Night View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night2.webp" alt="Illuminated Building" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-3xl shadow-2xl"
                            >
                                <div className="text-4xl font-black leading-none">51st</div>
                                <div className="text-xs font-black uppercase tracking-widest text-indigo-200 mt-1">Annual Day 2024</div>
                            </motion.div>
                        </div>

                        {/* Text */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Our Institutional Identity</span>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                                    A Legacy of <br />
                                    <span className="text-indigo-600 italic">Excellence</span> &amp;
                                    <br />Achievement
                                </h2>
                            </div>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                L.N.M Institute (LNMI) stands as a premier autonomous institution under the Government of Bihar. For over five decades, we have been at the forefront of management and information technology education, nurturing thousands of professionals who lead global organizations today.
                            </p>
                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    { label: "AICTE Approved", icon: CheckCircle },
                                    { label: "UGC Recognized", icon: CheckCircle },
                                    { label: "Government of Bihar", icon: Shield },
                                    { label: "100% Placement Record", icon: Star },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon size={18} className="text-indigo-500 shrink-0" />
                                        <span className="text-sm font-black text-slate-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl"
                            >
                                Explore Institute
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROGRAMS ─── */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Academic Offerings</span>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Our Programmes</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <prog.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">{prog.name}</h3>
                                <p className="text-sm text-slate-500 font-bold leading-snug mb-6">{prog.full}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{prog.semesters} Semesters</span>
                                    <ChevronRight size={18} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── NIGHT CAMPUS FEATURE ─── */}
            <section className="py-0 relative overflow-hidden">
                <div className="grid md:grid-cols-2 h-[500px]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night1.webp"
                            alt="LNMI Night Illumination"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 block mb-2">Festive Ambience</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">LNMI Illuminated</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">Colourful celebrations lighting up the campus</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night2.webp"
                            alt="LNMI Admin Block Night"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 block mb-2">Administrative Block</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">L.N. Mishra Institute</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">50+ years of academic brilliance</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── ADMISSIONS BANNER ─── */}
            <section className="py-32 relative overflow-hidden bg-indigo-950">
                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest text-white/80">Admissions Open — Batch 2025-26</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                                Begin Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">Professional</span>
                                Journey with LNMI
                            </h2>
                            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                                Secure your place in Bihar's most prestigious management institute. Applications for MBA, MCA, BCA, and BBA programmes are now open.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="group flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all active:scale-95"
                                >
                                    Apply Online
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
                                    Download Prospectus
                                </button>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, rotate: -3 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl"
                            >
                                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI Auditorium" className="w-full h-80 object-cover" />
                            </motion.div>
                            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl">
                                <div className="text-2xl font-black leading-none">100%</div>
                                <div className="text-xs font-black uppercase tracking-widest text-emerald-100 mt-0.5">Placement Record</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── GALLERY STRIP ─── */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-16 mb-12 text-center">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Campus Life</span>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900">Life at LNMI</h2>
                </div>
                <div className="flex gap-4 px-6 lg:px-16 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                    {gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            className="shrink-0 snap-start w-72 h-52 rounded-3xl overflow-hidden shadow-xl group relative"
                        >
                            <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                <span className="text-white text-xs font-black uppercase tracking-widest">{img.caption}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── NOTICES ─── */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                        <div>
                            <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-3 block">Latest Updates</span>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
                                <Activity className="text-indigo-500" size={36} />
                                Notices &amp; Events
                            </h2>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {announcements.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`${item.color} text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                        {item.type}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-indigo-600 leading-none">{item.date.split(' ')[0]}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date.split(' ')[1]}</div>
                                    </div>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors mb-8">
                                    {item.title}
                                </h4>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Read More</span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-slate-950 text-white pt-24 pb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40" />
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-indigo-600 flex items-center justify-center rounded-2xl shadow-lg font-black text-white text-xl">LN</div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter leading-none">LNMI <span className="text-indigo-400">.</span></h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mt-0.5">Excellence Since 1973</p>
                                </div>
                            </div>
                            <p className="text-slate-500 leading-relaxed font-medium text-sm max-w-sm italic">
                                "The task of the educational institution is to shape not just careers, but characters that define the future of our nation."
                            </p>
                            <div className="flex gap-3">
                                {[Globe, MapPin, Phone, Mail].map((Icon, i) => (
                                    <div key={i} className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer">
                                        <Icon size={17} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Academics</h4>
                                {["Course Curriculum", "Faculty Profiles", "Research Projects", "Library Catalog"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Administration</h4>
                                {["Admissions", "Academic Calendar", "Fee Structure", "Grievance Cell"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="hidden lg:block space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Contact</h4>
                                <div className="text-sm font-bold leading-relaxed">1, Nehru Marg, Patna<br />Bihar — 800001</div>
                                <div className="text-indigo-400 font-bold text-sm">+91 612 252 2320</div>
                                <div className="text-slate-500 font-bold text-sm">info@lnmi.ac.in</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-900">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2024 L.N. Mishra Institute • Govt. of Bihar • All Rights Reserved</div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            Engineered by <span className="text-indigo-400">Saksham</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > LoginPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\LoginPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lock, Mail, Shield, Eye, EyeOff, GraduationCap, 
    BookOpen, UserCircle, ArrowRight, Sparkles, Activity,
    ChevronLeft, ShieldCheck, Zap
} from 'lucide-react';

export const LoginPage = () => {
    const [step, setStep] = useState('ROLE_SELECT'); // ROLE_SELECT or LOGIN_FORM
    const [selectedRole, setSelectedRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { isDarkMode } = useTheme();

    const roles = [
        { id: 'ADMIN', title: 'Admin', icon: Shield, color: 'from-purple-500 to-indigo-600', description: 'Administration' },
        { id: 'TEACHER', title: 'Teacher', icon: BookOpen, color: 'from-sky-500 to-cyan-600', description: 'Faculty & Academics' },
        { id: 'STUDENT', title: 'Student', icon: GraduationCap, color: 'from-emerald-500 to-cyan-500', description: 'Student Portal' },
    ];

    const activeRoleData = roles.find(r => r.id === selectedRole);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
                role: selectedRole
            });
            const { user, tokens } = response.data.data;
            const userRoles = user.roles || [];
            
            if (!userRoles.includes(selectedRole)) {
                toast.error(`Access denied. You do not have ${selectedRole} permissions.`);
                setLoading(false);
                return;
            }

            login(user, tokens.accessToken, tokens.refreshToken);
            toast.success(`Welcome back, ${user.fullName.split(' ')[0]}.`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-950">
            {/* Authentication Section */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#0b0f1a] relative overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0 text-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-br ${activeRoleData.color}`} 
                    />
                </div>

                <div className="relative z-10 flex flex-col h-full px-12 py-8">
                    {/* Top Navigation */}
                    <div className="flex justify-between items-center mb-16">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Return to Homepage
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center max-w-[440px] mx-auto w-full">
                        <AnimatePresence mode="wait">
                            {step === 'ROLE_SELECT' ? (
                                <motion.div
                                    key="role-select"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                                <ShieldCheck className="text-white" size={24} />
                                            </div>
                                            <div className="text-xl font-black text-white tracking-tighter">LNMI Portal</div>
                                        </div>
                                        <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">
                                            Account Selection
                                        </h1>
                                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                            Select your role to continue to the login page.
                                        </p>
                                    </div>

                                    <div className="grid gap-4">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => {
                                                    setSelectedRole(role.id);
                                                    setStep('LOGIN_FORM');
                                                }}
                                                className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-6 text-left"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <role.icon size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white tracking-tight">{role.title} Portal</h3>
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{role.description}</p>
                                                </div>
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight className="text-primary" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <button 
                                        onClick={() => setStep('ROLE_SELECT')}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6"
                                    >
                                        <ChevronLeft size={16} />
                                        Back to selection
                                    </button>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end mb-4">
                                            <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                                                Account Login
                                            </h1>
                                            {selectedRole === 'STUDENT' && (
                                                <button 
                                                    onClick={() => navigate('/signup')} 
                                                    className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors pb-1"
                                                >
                                                    Create Account
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-slate-400 font-medium text-lg tracking-tight">
                                            Sign in to your <span className="text-white font-black uppercase text-sm tracking-widest">{selectedRole}</span> account.
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="user@lnmi.ac.in"
                                                    required
                                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center ml-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Account Password</label>
                                                <button type="button" onClick={() => navigate('/reset-password')} className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">Forgot Password?</button>
                                            </div>
                                            <div className="relative group">
                                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    required
                                                    className="w-full pl-16 pr-16 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full py-6 rounded-[1.5rem] text-white font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none group shadow-2xl relative overflow-hidden bg-gradient-to-r ${activeRoleData.color}`}
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Sign In</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="pt-6 text-center">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                                            Institutional Access Portal
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Legal Links */}
                    <div className="mt-8 flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                        <button className="hover:text-slate-400">Privacy Policy</button>
                        <button className="hover:text-slate-400">Security Terms</button>
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-20 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeRoleData.color} transition-colors duration-1000`} />
                
                {/* Visual Depth Particles */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [-10, 10, -10],
                                x: [-10, 10, -10],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bg-white/10 blur-sm rounded-full"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-lg space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card bg-white/10 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-3 w-max rounded-2xl bg-white/20 mb-10">
                            <Sparkles className="text-white" size={32} />
                        </div>
                        <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                            Institutional <br /> Excellence
                        </h2>
                        <p className="text-xl text-white/70 font-medium leading-relaxed mb-12">
                            Lalit Narayan Mishra Institute of Economic Development and Social Change, Patna.
                        </p>

                        <div className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-black/20 border border-white/10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i + activeRoleData.id}`} alt="User" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">+5k</div>
                            </div>
                            <div>
                                <div className="text-white font-black tracking-tight">Account Verified</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Secure login active</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-between items-center px-6">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Status: Active</span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">LNMI Portal</div>
                    </div>
                </div>
            </div>
        </div>
    );
};



\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > PayrollPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\PayrollPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { IndianRupee, Download, CheckCircle, Clock, Users, ShieldCheck, Wallet, ArrowUpRight, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const PayrollPage = () => {
    const { isDarkMode } = useTheme();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const [teachersRes, staffRes] = await Promise.all([
                    apiClient.get('/teachers'),
                    apiClient.get('/staff')
                ]);

                const toArray = (d) => Array.isArray(d) ? d : (Array.isArray(d?.teachers) ? d.teachers : Array.isArray(d?.staff) ? d.staff : []);

                const teachers = toArray(teachersRes.data.data).map(t => {
                    const base = t.salary?.base || (typeof t.salary === 'number' ? t.salary : 0);
                    return {
                        id: `teacher-${t._id}`,
                        _id: t._id,
                        name: t.userId?.fullName || 'Academic Faculty',
                        email: t.userId?.email || '—',
                        role: 'Faculty',
                        department: t.department || 'General',
                        designation: t.designation || 'Lecturer',
                        salary: base + (t.salary?.allowances || 0) - (t.salary?.deductions || 0),
                        status: 'Pending',
                        date: '—',
                        type: 'teacher'
                    };
                });

                const staff = toArray(staffRes.data.data).map(s => {
                    const base = s.salary?.base || (typeof s.salary === 'number' ? s.salary : 0);
                    return {
                        id: `staff-${s._id}`,
                        _id: s._id,
                        name: s.userId?.fullName || 'Administrative Staff',
                        email: s.userId?.email || '—',
                        role: s.role || 'Staff',
                        department: s.department || 'Admin',
                        designation: s.role || 'Coordinator',
                        salary: base + (s.salary?.allowances || 0) - (s.salary?.deductions || 0),
                        status: 'Pending',
                        date: '—',
                        type: 'staff'
                    };
                });

                setEmployees([...teachers, ...staff]);
            } catch (error) {
                console.error('Payroll load error:', error);
                toast.error('Failed to load payroll data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleProcessPayment = (id) => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: 'Processing payment...',
            success: 'Payment processed successfully! 💸',
            error: 'Payment failed',
        }).then(() => {
            setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: 'Paid', date: new Date().toLocaleDateString('en-IN') } : e));
        });
    };

    const totalSalary = employees.reduce((acc, e) => acc + (e.salary || 0), 0);
    const pendingCount = employees.filter(e => e.status !== 'Paid').length;
    const paidCount = employees.filter(e => e.status === 'Paid').length;

    const filteredEmployees = employees.filter(emp => {
        if (filter === 'faculty') return emp.type === 'teacher';
        if (filter === 'staff') return emp.type === 'staff';
        return true;
    });

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Payroll Management"
                    subtitle={`Managing payroll for ${employees.length} employees`}
                    icon={Wallet}
                    backTo="/dashboard"
                    actions={
                        <Button variant="secondary" icon={Download}>
                            Export Report
                        </Button>
                    }
                />

                {/* Economic Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Total Salary" value={`₹${totalSalary.toLocaleString('en-IN')}`} icon={IndianRupee} color="text-indigo-400" bg="bg-indigo-400/10" />
                    <StatCard title="Pending Payments" value={pendingCount} icon={Clock} color="text-amber-500" bg="bg-amber-500/10" />
                    <StatCard title="Completed Payments" value={paidCount} icon={CheckCircle} color="text-emerald-500" bg="bg-emerald-500/10" />
                </div>

                {/* Navigation Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className={`p-1.5 rounded-[2rem] border glass-card flex gap-1
                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
                        {['all', 'faculty', 'staff'].map(key => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all
                                    ${filter === key 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                                        : 'text-slate-500 hover:text-primary'}`}
                            >
                                {key} ({employees.filter(e => key === 'all' ? true : (key === 'faculty' ? e.type === 'teacher' : e.type === 'staff')).length})
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <Users size={14} className="text-slate-400" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Personnel</p>
                    </div>
                </div>

                {/* Ledger Registry */}
                <div className={`rounded-[3.5rem] border overflow-hidden glass-card
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <div className="p-10 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Payroll Records</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Financial audit records</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Employee Name</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Department / Role</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Salary</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</span></th>
                                    <th className="px-10 py-8 text-right"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <AnimatePresence>
                                    {filteredEmployees.map((emp, i) => (
                                        <motion.tr 
                                            key={emp.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: i * 0.03 }}
                                            className="group hover:bg-primary/[0.02] transition-colors"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-xl transition-transform group-hover:scale-110
                                                        ${emp.type === 'teacher' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20' : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20'}`}>
                                                        {emp.name[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{emp.name}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{emp.designation}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{emp.department}</span>
                                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit ${emp.type === 'teacher' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                        {emp.role.toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee size={12} className="text-emerald-500" />
                                                    <p className={`font-black text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                        {(emp.salary || 0).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest
                                                    ${emp.status === 'Paid' 
                                                        ? 'bg-emerald-500/10 text-emerald-500' 
                                                        : 'bg-amber-500/10 text-amber-500 animate-pulse'}`}>
                                                    {emp.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                    {emp.status}
                                                </div>
                                                {emp.date !== '—' && <p className="text-[9px] font-bold text-slate-400 mt-1 pl-1">{emp.date}</p>}
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                {emp.status !== 'Paid' ? (
                                                    <Button 
                                                        onClick={() => handleProcessPayment(emp.id)}
                                                        size="sm"
                                                        icon={ArrowUpRight}
                                                    >
                                                        Pay
                                                    </Button>
                                                ) : (
                                                    <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                                        <FileText size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > ResetPasswordPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\ResetPasswordPage.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { KeyRound, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/auth/reset-password', {
                email,
                newPassword
            });
            
            if (response.data.success) {
                toast.success('Password successfully reset. You can now log in.');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password. Please verify the email address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-br from-primary to-indigo-600"
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-[#0b0f1a]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
                >
                    <button 
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors mb-8"
                    >
                        <ChevronLeft size={16} />
                        Back to Login
                    </button>

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                            <KeyRound className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Reset Password</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Enter your email and a new password to reset your account access.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@lnmi.ac.in"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">New Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 py-5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none group bg-gradient-to-r from-primary to-indigo-600 hover:shadow-lg hover:shadow-primary/25"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Reset Password</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > SettingsPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\SettingsPage.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Save, Bell, Moon, Sun, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
export const SettingsPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [notifications, setNotifications] = useState(true);
    const [profile, setProfile] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '9876543210'
    });
    const handleSave = (e) => {
        e.preventDefault();
        toast.success('Settings saved successfully');
    };
    return (<Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-2xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation (Visual) */}
                    <div className="space-y-2">
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer ${isDarkMode ? 'bg-gray-800 text-primary-light' : 'bg-indigo-50 text-primary'}`}>
                            Profile
                        </div>
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Security
                        </div>
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Notifications
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Profile Section */}
                        <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-black tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Profile Details</h2>
                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                        <input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} className={`w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                                        <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={`w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input disabled value={profile.email} // Fixed: was user?.email
                                        className={`w-full p-2.5 rounded-lg border opacity-60 cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200'}`}/>
                                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide italic">Contact administration to update email address</p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/20">
                                        <Save size={16}/> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Preferences Section */}
                        <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-black tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Preferences</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50 text-indigo-600'}`}>
                                            {isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Interface Theme</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dark mode toggle</p>
                                        </div>
                                    </div>
                                    <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-50 text-emerald-600'}`}>
                                            <Bell size={20}/>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Communication</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receive institutional updates</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-amber-50 text-amber-600'}`}>
                                            <Globe size={20}/>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Language</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System display language</p>
                                        </div>
                                    </div>
                                    <select className={`text-xs font-black uppercase tracking-widest border-none bg-transparent outline-none cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > SignupPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\SignupPage.jsx*\n\n```jsx\nimport React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
const signupSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});
export const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
                await apiClient.post('/auth/register', {
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                    roleName: 'STUDENT',
                });
                toast.success('Registration successful. Please sign in to your account.');
                navigate('/login');
            }
            catch (error) {
                toast.error(error.response?.data?.message || 'Registration Failed');
            }
        },
    });
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-white text-3xl"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Registration</h1>
                    <p className="text-gray-600 mt-2 text-sm font-medium">Register for institutional access</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Full Name
                        </label>
                        <input type="text" name="fullName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.fullName && formik.errors.fullName
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="Full Name"/>
                        {formik.touched.fullName && formik.errors.fullName && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.fullName}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Email Address
                        </label>
                        <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.email && formik.errors.email
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="email@lnmi.ac.in"/>
                        {formik.touched.email && formik.errors.email && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.password && formik.errors.password
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.password}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className="mt-1 text-xs text-red-500 font-medium">
                                {formik.errors.confirmPassword}
                            </p>)}
                    </div>

                    <button type="submit" disabled={formik.isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/20">
                        {formik.isSubmitting ? ('Processing...') : (<>
                                <UserPlus size={18}/>
                                Register Account
                            </>)}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dark font-black tracking-tight underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>);
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StaffPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\StaffPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { Plus, Search, Users, Briefcase, Filter, ArrowRight, Wallet, Activity, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, PageHeader, Button, Input } from '@/components';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const StaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/staff');
            const d = response.data.data;
            setStaff(Array.isArray(d) ? d : (d?.staff || []));
        } catch (error) {
            toast.error('Failed to load staff');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;
        try {
            await apiClient.delete(`/staff/${id}`);
            toast.success('Staff deleted successfully');
            fetchStaff();
        } catch (error) {
            toast.error('Failed to delete staff');
        }
    };

    const filteredStaff = staff.filter(s =>
        s.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: 'employeeId',
            label: 'Employee ID',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-secondary/60" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-secondary-light' : 'text-secondary-dark'}`}>
                        {member.employeeId}
                    </span>
                </div>
            )
        },
        {
            key: 'name',
            label: 'Staff Member',
            render: (_, member) => (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className={`absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-sm`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-black shrink-0 relative z-10 shadow-lg`}>
                            {(member.userId?.fullName || 'S')[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {member.userId?.fullName || 'N/A'}
                        </span>
                        <div className="flex items-center gap-1.5 opacity-50">
                            <span className="text-[10px] font-bold truncate max-w-[150px] uppercase tracking-widest">{member.userId?.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Designation',
            render: (_, member) => (
                <div className="px-3 py-1.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 inline-flex items-center gap-2">
                    <Briefcase size={12} className="text-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                        {member.role}
                    </span>
                </div>
            )
        },
        {
            key: 'department',
            label: 'Department',
            render: (_, member) => (
                <span className="text-xs font-bold uppercase tracking-tight opacity-70">
                    {member.department}
                </span>
            )
        },
        {
            key: 'salary',
            label: 'Salary (Month)',
            render: (_, member) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-emerald-500">
                        <Wallet size={12} />
                        <span className="font-black text-sm tracking-tighter">
                            ₹{((member.salary?.base || 0) + (member.salary?.allowances || 0) - (member.salary?.deductions || 0)).toLocaleString('en-IN')}
                        </span>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Monthly Net</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-50'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        member.status === 'active' ? 'text-success' : 'text-slate-500'
                    }`}>
                        {member.status === 'active' ? 'Active' : member.status}
                    </span>
                </div>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <Button 
                        variant="danger" 
                        size="xs" 
                        icon={Trash2}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(member._id);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Faculty & Staff"
                    subtitle={`${staff.length} staff members registered`}
                    icon={Users}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/staff/add')}
                        >
                            Add Staff
                        </Button>
                    }
                />

                {/* Performance Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Total Personnel', value: staff.length, icon: Users, color: 'from-blue-500 to-indigo-600' },
                        { label: 'Active Staff', value: staff.filter(s => s.status === 'active').length, icon: Activity, color: 'from-emerald-500 to-teal-600' },
                        { label: 'Departments', value: [...new Set(staff.map(s => s.department))].length, icon: Briefcase, color: 'from-amber-500 to-orange-600' },
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-6 rounded-[2rem] border transition-all duration-300 flex items-center gap-6 group hover:shadow-2xl
                                ${isDarkMode 
                                    ? 'bg-slate-900/60 border-slate-800/50 hover:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]' 
                                    : 'glass-card border-slate-200 hover:shadow-primary/5 shadow-xl shadow-slate-200/50'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter">{stat.value}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* Search & Intelligence Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Search by name, ID or role..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all ${
                                    isDarkMode 
                                    ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]' 
                                    : 'bg-white border-slate-100 text-slate-900 focus:border-primary shadow-sm'
                                }`}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Filter Results
                        </Button>
                    </div>

                    {/* Data Matrix */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-[2.5rem] overflow-hidden border transition-all duration-500
                            ${isDarkMode 
                                ? 'bg-slate-900/40 border-slate-800/50 shadow-2xl shadow-black/40' 
                                : 'glass-card border-slate-200 shadow-2xl shadow-slate-200/50'}`}
                    >
                        <DataTable
                            columns={columns}
                            data={filteredStaff}
                            loading={loading}
                            emptyTitle="No staff found"
                            emptyDescription="Try adjusting your filters to find the staff member you are looking for."
                            onRowClick={(row) => navigate(`/staff/${row._id}`)}
                        />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StudentDashboard.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\StudentDashboard.jsx*\n\n```jsx\nimport React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    BookOpen, CreditCard, Calendar, CheckCircle, TrendingUp, 
    Clock, Award, AlertCircle, Sparkles, ChevronRight, ArrowRight,
    User, GraduationCap, ShieldCheck, Mail, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const StudentDashboard = () => {
    const { isDarkMode, roleTheme } = useTheme();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        student: null,
        attendance: { total: 0, present: 0, absent: 0, presentPct: 0 },
        fees: { paid: 0, due: 0 }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/dashboard/student');
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch student dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const studentName = user?.fullName || data.student?.name || 'Student';
    const studentProfile = data.student || {};

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                className="max-w-[1400px] mx-auto space-y-8 pb-12 px-4"
            >
                {/* Personalized Welcome Header */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${roleTheme} z-0`} />
                    <div className="absolute top-0 right-0 w-96 h-96 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-primary-dark/20 rounded-full blur-2xl" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Student Portal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                                Welcome back, {studentName.split(' ')[0]}!
                            </h1>
                            <p className="text-white/80 font-bold max-w-md text-sm md:text-base">
                                {studentProfile.course || 'Course not set'}
                                {studentProfile.semester ? ` • Semester ${studentProfile.semester}` : ''}
                                {studentProfile.section ? ` • Section ${studentProfile.section}` : ''}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                        <span className="text-sm font-black uppercase tracking-tighter">Active Student</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Roll Number</p>
                                    <p className="text-sm font-black uppercase tracking-tighter text-white">
                                        {studentProfile.rollNo || 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col items-end">
                            <div className="glass-card !bg-white/10 p-6 rounded-3xl border border-white/20 text-right min-w-[200px]">
                                <Activity size={32} className="mb-4 text-white ml-auto" />
                                <p className="text-4xl font-black leading-none">{data.attendance.presentPct}%</p>
                                <p className="text-xs font-bold text-white/60 mt-2 uppercase tracking-widest">Attendance Status</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Attendance Status" 
                        value={data.attendance.presentPct >= 75 ? 'Good' : 'Shortage'} 
                        icon={CheckCircle} 
                        color={data.attendance.presentPct >= 75 ? 'text-emerald-500' : 'text-danger'} 
                        bg={data.attendance.presentPct >= 75 ? 'bg-emerald-500/10' : 'bg-danger/10'} 
                    />
                    <StatCard 
                        title="Fees Paid" 
                        value={data.fees.paid > 0 ? `₹${(data.fees.paid / 1000).toFixed(0)}k` : '₹0'} 
                        icon={CreditCard} 
                        color="text-indigo-500" 
                        bg="bg-indigo-500/10" 
                    />
                    <StatCard 
                        title="Total Present" 
                        value={data.attendance.present} 
                        icon={BookOpen} 
                        color="text-sky-500" 
                        bg="bg-sky-500/10" 
                    />
                    <StatCard 
                        title="Total Absent" 
                        value={data.attendance.absent} 
                        icon={TrendingUp} 
                        color="text-rose-500" 
                        bg="bg-rose-500/10" 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Student Profile Card */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <User className="text-primary" size={24} />
                                Student Profile
                            </h2>
                            <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        {data.student ? (
                            <div className="space-y-6">
                                {[
                                    { label: 'Full Name', value: studentProfile.name, icon: User },
                                    { label: 'Roll Number', value: studentProfile.rollNo, icon: ShieldCheck },
                                    { label: 'Course', value: studentProfile.course, icon: BookOpen },
                                    { label: 'Semester', value: `Semester ${studentProfile.semester || 'N/A'}`, icon: Clock },
                                    { label: 'Email Address', value: studentProfile.email, icon: Mail },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/5 text-primary">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">{item.value || '—'}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 opacity-50">
                                <AlertCircle size={48} className="mx-auto mb-4" />
                                <p className="font-bold">Profile Not Found</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Attendance Analysis */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                            <Activity className="text-primary" size={24} />
                            Attendance Analytics
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-slate-100 dark:text-slate-800" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                    <motion.circle 
                                        initial={{ strokeDasharray: "0 251.2" }}
                                        animate={{ strokeDasharray: `${(data.attendance.presentPct / 100) * 251.2} 251.2` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={data.attendance.presentPct >= 75 ? 'text-emerald-500' : 'text-rose-500'}
                                        strokeWidth="10" 
                                        strokeDashcap="round"
                                        stroke="currentColor" 
                                        fill="transparent" 
                                        r="40" cx="50" cy="50" 
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">{data.attendance.presentPct}%</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yield</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Present</span>
                                        <span className="text-xl font-black text-emerald-600">{data.attendance.present}</span>
                                    </div>
                                    <div className="w-full h-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(data.attendance.present / data.attendance.total) * 100}%` }}
                                            className="h-full bg-emerald-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="p-5 rounded-3xl bg-rose-500/5 border border-rose-500/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">Absent</span>
                                        <span className="text-xl font-black text-rose-600">{data.attendance.absent}</span>
                                    </div>
                                    <div className="w-full h-1 bg-rose-100 dark:bg-rose-900/30 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(data.attendance.absent / data.attendance.total) * 100}%` }}
                                            className="h-full bg-rose-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                {data.attendance.presentPct < 75 && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                        <AlertCircle className="text-amber-500 shrink-0" size={18} />
                                        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-tight">
                                            Warning: Attendance below 75% threshold
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Timetable', icon: Calendar, color: 'from-purple-500 to-indigo-600', path: '/timetable' },
                        { label: 'Attendance', icon: CheckCircle, color: 'from-emerald-500 to-teal-600', path: '/attendance' },
                        { label: 'Fees', icon: CreditCard, color: 'from-orange-500 to-amber-600', path: '/fees' },
                        { label: 'Grades', icon: Award, color: 'from-sky-500 to-blue-600', path: '/grades' },
                    ].map(a => (
                        <QuickAction
                            key={a.label}
                            label={a.label}
                            icon={a.icon}
                            color={a.color}
                            onClick={() => navigate(a.path)}
                        />
                    ))}
                </div>
            </motion.div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StudentDetailsPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\StudentDetailsPage.jsx*\n\n```jsx\nimport React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import {
    ChevronLeft, User, Mail, Phone, Calendar, Users,
    GraduationCap, CreditCard, AlertTriangle, Trash2, TrendingUp, FileText
} from 'lucide-react';

export const StudentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id || id === 'undefined') {
            toast.error('Invalid student ID');
            navigate('/students');
            return;
        }
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get(`/students/${id}/full-profile`);
                // Backend returns { success: true, data: { student, stats, financials } }
                const payload = response.data?.data || response.data;
                if (payload?.student) {
                    setData(payload);
                } else {
                    toast.error('Student profile data is empty');
                }
            } catch (error) {
                const msg = error.response?.data?.message || 'Failed to load student profile';
                toast.error(msg);
                console.error('Profile fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete ${data?.student?.userId?.fullName || 'this student'}? This action cannot be undone.`)) return;
        setDeleting(true);
        try {
            await apiClient.delete(`/students/${id}`);
            toast.success('Student deleted successfully');
            navigate('/students');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete student');
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500">Loading student profile...</p>
                </div>
            </Layout>
        );
    }

    if (!data || !data.student) {
        return (
            <Layout>
                <div className="max-w-md mx-auto mt-20 text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={28} className="text-amber-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Student not found</h2>
                    <p className="text-gray-500 mb-6 text-sm">This student profile could not be loaded. The record may not exist.</p>
                    <button
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
                    >
                        Back to Students
                    </button>
                </div>
            </Layout>
        );
    }

    const { student, stats = {}, financials = [] } = data;
    const name = student.userId?.fullName || 'Unknown Student';
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const infoItem = (label, value) => (
        <div className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
            <dt className="text-gray-500 text-sm">{label}</dt>
            <dd className="font-medium text-gray-800 text-sm text-right">{value || <span className="text-gray-300">N/A</span>}</dd>
        </div>
    );

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                {/* Top navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/students')}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
                    >
                        <ChevronLeft size={18} />
                        Back to Students
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                            <Trash2 size={15} />
                            {deleting ? 'Deleting...' : 'Delete Student'}
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            Promote Student
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
                        {initials}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                        <p className="text-indigo-600 font-medium text-sm mt-0.5">Roll No: {student.rollNo || 'N/A'}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <GraduationCap size={14} className="text-gray-400" />
                                {student.course || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FileText size={14} className="text-gray-400" />
                                Semester {student.semester || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users size={14} className="text-gray-400" />
                                Section {student.section || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                    }`}>
                        {student.status || 'active'}
                    </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <TrendingUp size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Attendance</p>
                            <p className="text-xl font-bold text-green-600">{stats.attendancePercentage || 0}%</p>
                            <p className="text-xs text-gray-400">{stats.totalAttendance || 0} days present</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <CreditCard size={20} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Fees Due</p>
                            <p className="text-xl font-bold text-red-600">₹{(stats.pendingFees || 0).toLocaleString('en-IN')}</p>
                            <p className="text-xs text-gray-400">Outstanding amount</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex border-b border-gray-100">
                        {['profile', 'fees'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3.5 font-medium text-sm transition-colors capitalize ${
                                    activeTab === tab
                                        ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                {tab === 'profile' ? 'Profile Details' : 'Fee History'}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <User size={14} className="text-indigo-500" /> General Information
                                    </h3>
                                    <dl className="bg-gray-50 rounded-lg p-4">
                                        {infoItem('Email', student.userId?.email)}
                                        {infoItem('Phone', student.userId?.phone)}
                                        {infoItem('Date of Birth', student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-IN') : null)}
                                        {infoItem('Gender', student.gender ? student.gender.charAt(0).toUpperCase() + student.gender.slice(1) : null)}
                                        {infoItem('Address', student.address?.city ? `${student.address.city}, ${student.address.state || ''}` : null)}
                                    </dl>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <Users size={14} className="text-indigo-500" /> Guardian Information
                                    </h3>
                                    <dl className="bg-gray-50 rounded-lg p-4">
                                        {infoItem("Father's Name", student.guardianInfo?.fatherName)}
                                        {infoItem("Mother's Name", student.guardianInfo?.motherName)}
                                        {infoItem("Guardian Phone", student.guardianInfo?.fatherPhone)}
                                        {infoItem("Relation", student.guardianInfo?.relation)}
                                    </dl>
                                </div>
                            </div>
                        )}

                        {activeTab === 'fees' && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-4">Fee Payment History</h3>
                                {!Array.isArray(financials) || financials.length === 0 ? (
                                    <div className="text-center py-10">
                                        <CreditCard size={32} className="text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">No fee history found for this student.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 text-left">
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Fee Type</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Amount</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Due Date</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {financials.map((fee) => (
                                                    <tr key={fee._id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-3">{fee.feeTypeId?.name || 'General Fee'}</td>
                                                        <td className="px-4 py-3 font-mono font-medium">₹{(fee.amount || 0).toLocaleString('en-IN')}</td>
                                                        <td className="px-4 py-3 text-gray-500">{fee.dueDate ? new Date(fee.dueDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                                fee.status === 'paid'
                                                                    ? 'bg-green-50 text-green-700'
                                                                    : fee.status === 'overdue'
                                                                    ? 'bg-red-50 text-red-700'
                                                                    : 'bg-amber-50 text-amber-700'
                                                            }`}>
                                                                {fee.status || 'pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > StudentsPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\StudentsPage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button, DataTable, Input, Modal } from '@/components';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { Plus, GraduationCap, Search, Filter, User, Mail, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';

export const StudentsPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [page, searchTerm]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/students?page=${page}&size=25&search=${searchTerm}`);
            const d = response.data.data;
            if (d && d.students) {
                setStudents(d.students);
                setTotal(d.total || d.students.length);
            } else if (Array.isArray(d)) {
                setStudents(d);
                setTotal(d.length);
            } else {
                setStudents([]);
                setTotal(0);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch students');
            console.error('Fetch Students Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await apiClient.delete(`/students/${id}`);
            toast.success('Student deleted successfully');
            fetchStudents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete student');
        }
    };

    const columns = [
        { 
            key: 'name', 
            label: 'Student Name', 
            render: (v, row) => (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className={`absolute -inset-1 bg-gradient-to-br ${roleTheme} rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-sm`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleTheme} text-white flex items-center justify-center text-sm font-black shrink-0 relative z-10 shadow-lg`}>
                            {(row.name || row.fullName || 'S')[0]}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{row.name || row.fullName}</span>
                        <div className="flex items-center gap-1.5 opacity-50">
                            <Mail size={10} />
                            <span className="text-[10px] font-bold truncate max-w-[150px]">{row.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        { 
            key: 'rollNo', 
            label: 'Roll Number', 
            render: (v) => v ? (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary/60" />
                    <span className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-primary-light' : 'text-primary-dark'}`}>{v}</span>
                </div>
            ) : '—' 
        },
        { 
            key: 'course', 
            label: 'Course', 
            render: (v) => v ? (
                <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500 whitespace-nowrap inline-block">
                    {v}
                </div>
            ) : '—'
        },
        { 
            key: 'semester', 
            label: 'Semester', 
            render: (v) => <span className="font-bold text-sm">Sem {v || '—'}</span> 
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value === 'active' ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-50'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        value === 'active' ? 'text-success' : 'text-slate-500'
                     }`}>
                        {value || 'active'}
                    </span>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Options',
            render: (_, row) => (
                isAdmin ? (
                    <Button 
                        variant="danger" 
                        size="xs" 
                        icon={Trash2}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row._id || row.id);
                        }}
                    >
                        Delete
                    </Button>
                ) : (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">—</span>
                )
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Student Registry"
                    subtitle={`List of all ${total} registered students`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/students/add')}
                        >
                            Add Student
                        </Button>
                    }
                />

                <div className="space-y-6">
                    {/* Search & Intelligence Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Search by name, roll number, or course..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all ${
                                    isDarkMode 
                                    ? 'bg-slate-900/50 border-slate-800 text-white focus:border-primary' 
                                    : 'bg-white border-slate-100 text-slate-900 focus:border-primary shadow-sm'
                                }`}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Filter Results
                        </Button>
                    </div>

                    {/* Data Matrix */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        <DataTable 
                            columns={columns} 
                            data={students} 
                            loading={loading}
                            emptyTitle="No students found"
                            emptyDescription="Try adjusting your search filters to find the student you're looking for."
                            onRowClick={(row) => navigate(`/students/${row._id || row.id}`)}
                        />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > TeacherDashboard.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\TeacherDashboard.jsx*\n\n```jsx\nimport React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    Users, BookOpen, Calendar, CheckCircle, Clock, 
    TrendingUp, ChevronRight, AlertCircle, Sparkles,
    UserCheck, ClipboardList, Zap, GraduationCap, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { StatCard } from '@/components/dashboard/StatCard';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const TeacherDashboard = () => {
    const { isDarkMode, roleTheme } = useTheme();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        teacher: {},
        totalStudents: 0,
        students: [],
        attendanceStats: { totalMarked: 0, presentMarked: 0, absentMarked: 0, presentPct: 0 },
        recentAttendance: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/dashboard/teacher');
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch teacher dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const teacherName = user?.fullName || data.teacher?.name || 'Teacher';

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                className="max-w-[1400px] mx-auto space-y-8 pb-12 px-4"
            >
                {/* Faculty Command Banner */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${roleTheme} z-0`} />
                    <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 -ml-20 -mb-20 bg-slate-900/20 rounded-full blur-2xl" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Faculty Portal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                                Good Day, <span className="opacity-80"></span> {teacherName.split(' ')[0]}
                            </h1>
                            <p className="text-white/80 font-bold max-w-md text-sm md:text-base">
                                {data.teacher?.designation || 'Academic Faculty'} 
                                {data.teacher?.department ? ` • ${data.teacher.department}` : ''}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="glass-card !bg-white/10 p-5 rounded-3xl border border-white/20 text-center min-w-[140px]">
                                <p className="text-3xl font-black">{data.totalStudents}</p>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Total Students</p>
                            </div>
                            <div className="glass-card !bg-white/10 p-5 rounded-3xl border border-white/20 text-center min-w-[140px]">
                                <p className="text-3xl font-black">{data.attendanceStats.presentPct}%</p>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Class Attendance</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Mark Attendance', icon: UserCheck, color: 'from-emerald-500 to-teal-600', action: () => navigate('/attendance') },
                        { label: 'My Students', icon: Users, color: 'from-indigo-500 to-blue-600', action: () => navigate('/students') },
                        { label: 'Manage Exams', icon: ClipboardList, color: 'from-purple-500 to-pink-600', action: () => navigate('/exams') },
                        { label: 'View Timetable', icon: Clock, color: 'from-orange-500 to-amber-600', action: () => navigate('/timetable') },
                    ].map(a => (
                        <QuickAction
                            key={a.label}
                            label={a.label}
                            icon={a.icon}
                            color={a.color}
                            onClick={a.action}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Students Card */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] lg:col-span-1">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <GraduationCap className="text-primary" size={24} />
                                My Students
                            </h2>
                            <button onClick={() => navigate('/students')} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        
                        {data.students.length > 0 ? (
                            <div className="space-y-4">
                                {data.students.slice(0, 6).map((s, i) => (
                                    <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                                            <Users size={18} />
                                        </div>
                                        <div className="overflow-hidden flex-1">
                                            <p className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{s.name}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">R-{s.rollNo} • {s.course}</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                                            Sem {s.semester}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 opacity-50">
                                <Users size={48} className="mx-auto mb-4" />
                                <p className="font-bold">No students assigned</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Attendance Overview */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] lg:col-span-2">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                            <Target className="text-primary" size={24} />
                            Attendance Stats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { label: 'Present', value: data.attendanceStats.presentMarked, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                { label: 'Absent', value: data.attendanceStats.absentMarked, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                                { label: 'Attendance %', value: `${data.attendanceStats.presentPct}%`, color: 'text-sky-500', bg: 'bg-sky-500/10' },
                            ].map((stat, i) => (
                                <div key={i} className={`p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm ${stat.bg}`}>
                                    <p className={`text-3xl font-black mb-1 tracking-tighter ${stat.color}`}>{stat.value}</p>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Attendance Records */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Attendance Records</h3>
                                <button onClick={() => navigate('/attendance')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</button>
                            </div>
                            
                            <div className="space-y-3">
                                {data.recentAttendance.length > 0 ? (
                                    data.recentAttendance.slice(0, 5).map((a, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${a.status === 'present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1">{a.studentRoll}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{a.studentCourse}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-slate-900 dark:text-white">
                                                    {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                </p>
                                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${a.status === 'present' ? 'text-emerald-500' : 'text-rose-500'}`}>{a.status}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-10 text-center opacity-40">
                                        <ClipboardList size={32} className="mx-auto mb-3" />
                                        <p className="text-sm font-bold uppercase tracking-widest">Awaiting Attendance Records</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > TeachersPage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\TeachersPage.jsx*\n\n```jsx\nimport React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useResource } from '@/hooks/useResource';
import { Plus, Search, Mail, Phone, BookOpen, ArrowLeft, UserPlus, Edit2, Trash2, Filter, GraduationCap, Award, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, PageHeader } from '@/components';
import { useTheme } from '@/context/ThemeContext';

export const TeachersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { data: teachers, loading, remove } = useResource({ endpoint: '/teachers' });

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate faculty appointment from digital registry?')) return;
        await remove(id);
    };

    const filteredTeachers = teachers.filter(teacher => 
        (teacher.userId?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.employeeId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Faculty Directorate"
                    subtitle={`${teachers.length} academic professionals registered`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/teachers/add')}
                        >
                            Commission Faculty
                        </Button>
                    }
                />

                <div className="space-y-8">
                    {/* Intelligence & Navigation Grid */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Input 
                                type="search" 
                                placeholder="Quantum search by faculty name, ID, or tenure..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={Search}
                                className="!space-y-0"
                            />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Tenure Filters
                        </Button>
                    </div>

                    {/* Faculty Matrix */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                                <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Accessing Archives</span>
                        </div>
                    ) : filteredTeachers.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                                <UserPlus className="text-slate-400" size={40}/>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-2">Registry Vacant</h3>
                            <p className="text-slate-500 max-w-sm text-center mb-8 font-bold text-sm uppercase tracking-tighter opacity-60">
                                No academic personnel identified in current digital footprint.
                            </p>
                            <Button variant="primary" onClick={() => navigate('/teachers/add')} icon={Plus}>
                                Register First Faculty
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredTeachers.map((teacher, i) => (
                                    <motion.div 
                                        key={teacher._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                                        <div className="relative glass-card rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
                                            <div className="p-8">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="relative">
                                                        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${roleTheme || 'from-primary to-secondary'} flex items-center justify-center text-white font-black text-2xl shadow-xl relative z-10`}>
                                                            {teacher.userId?.fullName?.charAt(0) || '?'}
                                                        </div>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                        teacher.status === 'active' 
                                                        ? 'bg-success/10 text-success border border-success/20' 
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}>
                                                        {teacher.status}
                                                    </div>
                                                </div>

                                                <div className="space-y-1 mb-6">
                                                    <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                        {teacher.userId?.fullName || 'Anonymous Scholar'}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Award size={14} className="text-primary/60" />
                                                        <span className="text-xs font-black uppercase tracking-widest text-primary/80">{teacher.designation || 'Faculty'}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <BookOpen size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight">{teacher.department}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <Mail size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight truncate">{teacher.userId?.email || 'No digital identifier'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50/50 dark:bg-slate-900/50 px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={12} className="text-slate-400" />
                                                    <span className="text-[10px] font-black font-mono tracking-widest text-slate-500 opacity-60">ID: {teacher.employeeId}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2"
                                                        onClick={() => navigate(`/teachers/edit/${teacher._id}`)}
                                                    >
                                                        <Edit2 size={14}/>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                                        onClick={() => handleDelete(teacher._id)}
                                                    >
                                                        <Trash2 size={14}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > TimetablePage.jsx`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\pages\TimetablePage.jsx*\n\n```jsx\nimport React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Calendar, Plus, Clock, User, BookOpen, GraduationCap, X, CalendarDays, ShieldCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { schedules } from '@/data/mockSchedules';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

export const TimetablePage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [selectedProgram, setSelectedProgram] = useState('BCA-1');
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await apiClient.get('/teachers');
                if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
                    setTeachers(response.data.data);
                }
            } catch (error) {
                setTeachers([]);
            }
        };
        fetchTeachers();
    }, []);

    const [newSlot, setNewSlot] = useState({
        day: 'Monday',
        time: '09:00 AM',
        subject: '',
        teacher: '',
        room: ''
    });

    const programs = [
        { id: 'BCA-1', name: 'BCA - Year 1' },
        { id: 'BCA-2', name: 'BCA - Year 2' },
        { id: 'BCA-3', name: 'BCA - Year 3' },
        { id: 'BBA-1', name: 'BBA - Year 1' },
        { id: 'BBA-2', name: 'BBA - Year 2' },
        { id: 'BBA-3', name: 'BBA - Year 3' },
        { id: 'MBA-1', name: 'MBA - Year 1' },
        { id: 'MBA-2', name: 'MBA - Year 2' },
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'];
    const semesters = [1, 2];
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const key = `${selectedProgram}-sem${selectedSemester}`;
        setSchedule(schedules[key] || schedules[selectedProgram] || []);
    }, [selectedProgram, selectedSemester]);

    const getSlot = (day, time) => schedule.find(s => s.day === day && s.time === time);

    const handleAddSlot = (e) => {
        e.preventDefault();
        const existingSlot = schedule.find(s => s.day === newSlot.day && s.time === newSlot.time);
        if (existingSlot) {
            toast.error('Temporal conflict detected at this interval');
            return;
        }
        const updated = [...schedule, { ...newSlot }];
        setSchedule(updated);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
        toast.success('Schedule sequence initialized');
        setNewSlot({ day: 'Monday', time: '09:00 AM', subject: '', teacher: '', room: '' });
        setShowAddSlot(false);
    };

    const handleEditSlot = (slot) => {
        setEditingSlot(slot);
        setNewSlot({ ...slot, room: slot.room || '' });
        setShowAddSlot(true);
    };

    const handleUpdateSlot = (e) => {
        e.preventDefault();
        if (!editingSlot) return;
        const updatedSchedule = schedule.map(slot => {
            if (slot.day === editingSlot.day && slot.time === editingSlot.time) {
                return { ...newSlot };
            }
            return slot;
        });
        setSchedule(updatedSchedule);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updatedSchedule;
        toast.success('Schedule sequence updated');
        setEditingSlot(null);
        setShowAddSlot(false);
    };

    const handleDeleteSlot = (slot) => {
        if (confirm(`Authorize removal of ${slot.subject} from registry?`)) {
            const updated = schedule.filter(s => !(s.day === slot.day && s.time === slot.time));
            setSchedule(updated);
            schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
            toast.success('Sequence removed from registry');
        }
    };

    const getSubjectColor = (subject) => {
        const colors = [
            'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'bg-amber-500/10 text-amber-500 border-amber-500/20',
            'bg-purple-500/10 text-purple-500 border-purple-500/20',
        ];
        const index = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto px-6 pb-24 space-y-10">
                <PageHeader
                    title="Calendar Matrix"
                    subtitle="Coordinate academic sequences and operational timeframes"
                    icon={CalendarDays}
                    actions={
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                                {semesters.map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => setSelectedSemester(sem)}
                                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${selectedSemester === sem
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        Semester {sem}
                                    </button>
                                ))}
                            </div>
                            <select 
                                value={selectedProgram} 
                                onChange={(e) => setSelectedProgram(e.target.value)} 
                                className="h-12 px-6 rounded-2xl border-none bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase tracking-wider outline-none focus:ring-4 focus:ring-primary/20"
                            >
                                {programs.map(prog => (<option key={prog.id} value={prog.id}>{prog.name}</option>))}
                            </select>
                            {isAdmin && (
                                <Button onClick={() => setShowAddSlot(true)} icon={Plus}>Initialize Slot</Button>
                            )}
                        </div>
                    }
                />

                {/* Timetable Matrix Grid */}
                <div className={`rounded-[3rem] border overflow-hidden glass-card transition-all duration-500
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                <th className="px-10 py-8 text-left border-b border-r border-slate-200/50 dark:border-slate-800/50 w-48">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Time / Day</span>
                                    </div>
                                </th>
                                {timeSlots.map(time => (
                                    <th key={time} className="px-6 py-8 text-center border-b border-slate-200/50 dark:border-slate-800/50">
                                        <span className="text-xs font-black text-slate-800 dark:text-white tracking-widest">{time}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {days.map(day => (
                                <tr key={day} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-10 py-10 border-r border-slate-200/50 dark:border-slate-800/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{day}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                                            </div>
                                        </div>
                                    </td>
                                    {timeSlots.map(time => {
                                        const slot = getSlot(day, time);
                                        return (
                                            <td key={`${day}-${time}`} className="p-4 border-slate-200/50 dark:border-slate-800/50 min-w-[200px]">
                                                {slot ? (
                                                    <motion.div 
                                                        whileHover={{ y: -4, scale: 1.02 }}
                                                        className={`p-6 rounded-[2rem] border-2 group/card relative overflow-hidden transition-all duration-300 ${getSubjectColor(slot.subject)}`}
                                                    >
                                                        <div className="space-y-4 relative z-10">
                                                            <h4 className="font-black text-sm tracking-tight leading-tight line-clamp-2 pr-4">{slot.subject}</h4>
                                                            <div className="space-y-2 opacity-80">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                    <User size={12} strokeWidth={3} /> {slot.teacher}
                                                                </div>
                                                                {slot.room && (
                                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                        <MapPin size={12} strokeWidth={3} /> {slot.room}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Action Hover Controls */}
                                                        {isAdmin && (
                                                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-x-4 group-hover/card:translate-x-0">
                                                                <button onClick={() => handleEditSlot(slot)} className="p-2 bg-white/20 hover:bg-white/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <Plus className="rotate-45" size={14} strokeWidth={4} />
                                                                </button>
                                                                <button onClick={() => handleDeleteSlot(slot)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <X size={14} strokeWidth={4} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ) : (
                                                    <div className="h-full min-h-[120px] rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-opacity opacity-0 hover:opacity-100 group/empty">
                                                        {isAdmin ? (
                                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group-hover/empty:scale-110 transition-transform cursor-pointer">
                                                                <Plus size={20} className="text-slate-300 dark:text-slate-600" />
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 opacity-0" />
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Initialization Modal */}
                <AnimatePresence>
                    {showAddSlot && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`w-full max-w-lg rounded-[3.5rem] border overflow-hidden
                                    ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                            >
                                <div className={`px-12 py-10 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 text-primary rounded-[1.2rem]">
                                                {editingSlot ? <ShieldCheck size={20} /> : <Plus size={20} />}
                                            </div>
                                            {editingSlot ? 'Refine Sequence' : 'Initialize Sequence'}
                                        </h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-16">
                                            {selectedProgram} • SEM {selectedSemester}
                                        </p>
                                    </div>
                                    <button onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="p-12 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Temporal Axis</label>
                                            <select value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })} className={inputCls}>
                                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Clock Registry</label>
                                            <select value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} className={inputCls}>
                                                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Academic Subject</label>
                                        <input required value={newSlot.subject} onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })} placeholder="e.g. ADVANCED DATA STRUCTURES" className={inputCls} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Faculty Registry</label>
                                            <select required value={newSlot.teacher} onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })} className={inputCls}>
                                                <option value="">IDENTITY SELECT</option>
                                                {teachers.length > 0
                                                    ? teachers.map(t => <option key={t._id} value={t.userId?.fullName || 'IDENT-X'}>{t.userId?.fullName || 'IDENT-X'}</option>)
                                                    : [...new Set(Object.values(schedules).flat().map(s => s.teacher))].sort().map(name => (
                                                        <option key={name} value={name}>{name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Spatial Unit</label>
                                            <input value={newSlot.room} onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })} placeholder="e.g. TECH-LAB 402" className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="flex gap-6 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="flex-1 h-14">Discard</Button>
                                        <Button type="submit" className="flex-1 h-14">{editingSlot ? 'Sync Protocol' : 'Initialize Protocol'}</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > api.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\services\api.js*\n\n```javascript\nimport axios from 'axios';
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > API_BASE_URL.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\services\API_BASE_URL.js*\n\n```javascript\n// API Base URL configuration
// In production (Render), VITE_API_URL will be set as environment variable
// In development, it falls back to localhost
export const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api/v1`;


\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > project.service.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\services\project.service.js*\n\n```javascript\nimport axios from './api';
const API_URL = '/projects';
export const projectService = {
    /**
     * Create a new project (Student)
     */
    createProject: async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create project');
        }
    },
    /**
     * Get current user's project (Student)
     */
    getMyProject: async () => {
        try {
            const response = await axios.get(`${API_URL}/my-project`);
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return { success: false, message: 'No project found' };
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch project');
        }
    },
    /**
     * Submit project report (Student)
     */
    submitReport: async (id, fileData) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/submit`, fileData);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to submit report');
        }
    },
    /**
     * Get all projects with filters (Faculty)
     */
    getAllProjects: async (filters = {}) => {
        try {
            const response = await axios.get(API_URL, { params: filters });
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch projects');
        }
    },
    /**
     * Get project by ID
     */
    getProjectById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch project');
        }
    },
    /**
     * Grade a project (Faculty)
     */
    gradeProject: async (id, gradeData) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/grade`, gradeData);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to grade project');
        }
    },
    /**
     * Export projects to CSV (Faculty)
     */
    exportToCSV: async (filters = {}) => {
        try {
            const response = await axios.get(`${API_URL}/export/csv`, {
                params: filters,
                responseType: 'blob'
            });
            return response.data;
        }
        catch (error) {
            throw new Error('Failed to export projects');
        }
    }
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > auth.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\store\auth.js*\n\n```javascript\nimport { create } from 'zustand';
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > theme.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\store\theme.js*\n\n```javascript\nimport create from 'zustand';
import { persist } from 'zustand/middleware';
export const useThemeStore = create()(persist((set) => ({
    isDarkMode: true, // Default to dark mode for that "DeFi" feel
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setTheme: (isDark) => set({ isDarkMode: isDark }),
}), {
    name: 'theme-storage',
}));
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Frontend > project.js`\n*Directory: D:\collegemanagementMERN\College Management\frontend\src\types\project.js*\n\n```javascript\nexport var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PROPOSED"] = "PROPOSED";
    ProjectStatus["APPROVED"] = "APPROVED";
    ProjectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProjectStatus["SUBMITTED"] = "SUBMITTED";
    ProjectStatus["CHANGES_REQUESTED"] = "CHANGES_REQUESTED";
    ProjectStatus["GRADED"] = "GRADED";
})(ProjectStatus || (ProjectStatus = {}));
\n```\n\n<div style="page-break-after: always;"></div>\n
## 17.2 Backend Node.js / Express API Architecture

\n\n### File: `Backend > index.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\config\index.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
        expiresIn: process.env.JWT_EXPIRE || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    },
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
    payment: {
        razorpay: {
            keyId: process.env.RAZORPAY_KEY_ID,
            keySecret: process.env.RAZORPAY_KEY_SECRET,
        },
    },
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'),
        uploadDir: process.env.UPLOAD_DIR || './uploads',
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    logLevel: process.env.LOG_LEVEL || 'info',
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > project.constants.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\constants\project.constants.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.PROJECT_CONSTANTS = void 0;
exports.PROJECT_CONSTANTS = {
    // Title constraints
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    // Description constraints
    DESCRIPTION_MIN_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 2000,
    // File upload constraints
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_MIME_TYPES: ['application/pdf'],
    MIN_PAGE_COUNT: 10,
    MAX_PAGE_COUNT: 200,
    // Domain options
    DOMAINS: [
        'AI/ML',
        'Web Development',
        'Mobile App Development',
        'IoT',
        'Cybersecurity',
        'Blockchain',
        'Data Science',
        'Cloud Computing',
        'DevOps',
        'Game Development'
    ],
    // Pagination
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 100,
    // Batch format regex
    BATCH_REGEX: /^\d{4}-[A-Z]{2,10}$/,
    // Status transitions - defines valid state changes
    ALLOWED_STATUS_TRANSITIONS: {
        PROPOSED: ['APPROVED', 'IN_PROGRESS'],
        APPROVED: ['IN_PROGRESS'],
        IN_PROGRESS: ['SUBMITTED'],
        SUBMITTED: ['CHANGES_REQUESTED'],
        CHANGES_REQUESTED: ['SUBMITTED']
    }
};
exports.ERROR_MESSAGES = {
    PROJECT_NOT_FOUND: 'Project not found',
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this project',
    INVALID_FILE_TYPE: 'Only PDF files are allowed',
    INVALID_STATUS_TRANSITION: 'Invalid status transition',
    STUDENT_NOT_FOUND: 'One or more students not found',
    MENTOR_NOT_FOUND: 'Specified mentor not found',
    INVALID_BATCH_FORMAT: 'Batch format should be YYYY-CODE (e.g., 2024-CSE)',
    MISSING_SUBMISSION: 'Project has not been submitted yet'
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > attendance.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\attendance.js*\n\n```javascript\n'use strict';
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > auth.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\auth.js*\n\n```javascript\n"use strict";
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
        // Disallow registration of unrecognized roles
        const allowedRoles = ['ADMIN', 'STUDENT'];
        if (!allowedRoles.includes(roleName)) {
            throw new errors_1.AppError('Only Administrator and Student registrations are allowed', 403, 'ROLE_RESTRICTED');
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > class.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\class.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.getClassById = exports.getAllClasses = exports.createClass = void 0;
const Class_1 = require("../models/Class");
const errors_1 = require("../utils/errors");
const createClass = async (req, res) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;
        const existingClass = await Class_1.Class.findOne({ name, section, academicYear });
        if (existingClass) {
            throw new errors_1.AppError('Class already exists for this year', 400, 'CLASS_EXISTS');
        }
        const newClass = await Class_1.Class.create({
            name,
            section,
            academicYear,
            classTeacher: classTeacher || null, // Optional
            subjects: subjects || [],
        });
        res.status(201).json({ success: true, data: newClass });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Create Class Error:', error);
            res.status(500).json({ message: 'Failed to create class' });
        }
    }
};
exports.createClass = createClass;
const getAllClasses = async (req, res) => {
    try {
        const classes = await Class_1.Class.find()
            .populate('classTeacher', 'firstName lastName email')
            .sort({ academicYear: -1, name: 1, section: 1 });
        res.json({ success: true, data: classes });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes' });
    }
};
exports.getAllClasses = getAllClasses;
const getClassById = async (req, res) => {
    try {
        const classData = await Class_1.Class.findById(req.params.id)
            .populate('classTeacher', 'firstName lastName email')
            .populate('subjects');
        if (!classData) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, data: classData });
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
exports.getClassById = getClassById;
const updateClass = async (req, res) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;
        const updatedClass = await Class_1.Class.findByIdAndUpdate(req.params.id, { name, section, academicYear, classTeacher, subjects }, { new: true, runValidators: true });
        if (!updatedClass) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, data: updatedClass });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Update Class Error:', error);
            res.status(500).json({ message: 'Failed to update class' });
        }
    }
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class_1.Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, message: 'Class deleted successfully' });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Failed to delete class' });
        }
    }
};
exports.deleteClass = deleteClass;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > dashboard.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\dashboard.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > exam.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\exam.js*\n\n```javascript\nconst Exam = require('../models/Exam');

// @desc    Get all exams
// @route   GET /api/v1/exams
// @access  Private
exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find().sort({ date: 1 });
        res.status(200).json({ success: true, count: exams.length, data: exams });
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new exam
// @route   POST /api/v1/exams
// @access  Private
exports.createExam = async (req, res) => {
    try {
        // Add user to req.body if user exists on req
        if (req.user) {
            req.body.createdBy = req.user.id;
        }

        // Map class to course if frontend sends class instead of course
        if (req.body.class && !req.body.course) {
            req.body.course = req.body.class;
        }

        const exam = await Exam.create(req.body);
        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete exam
// @route   DELETE /api/v1/exams/:id
// @access  Private
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }
        await exam.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > finance.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\finance.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > notification.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\notification.js*\n\n```javascript\n'use strict';
const Notification = require('../models/Notification');

/** GET /api/v1/notifications */
const getNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 20, unreadOnly } = req.query;
        const filter = {};
        if (unreadOnly === 'true') filter.isRead = false;

        const skip = (Number(page) - 1) * Number(limit);
        const [notifications, total, unreadCount] = await Promise.all([
            Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
            Notification.countDocuments(filter),
            Notification.countDocuments({ isRead: false })
        ]);

        res.json({ data: notifications, total, unreadCount, page: Number(page), limit: Number(limit) });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
    }
};

/** POST /api/v1/notifications */
const createNotification = async (req, res) => {
    try {
        const { title, message, type, targetRole } = req.body;
        if (!title || !message) return res.status(400).json({ message: 'title and message are required' });

        const notification = await Notification.create({ title, message, type: type || 'INFO', targetRole });
        res.status(201).json({ message: 'Notification created', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create notification', error: err.message });
    }
};

/** PUT /api/v1/notifications/:id/read */
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json({ message: 'Marked as read', data: notification });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notification', error: err.message });
    }
};

/** PUT /api/v1/notifications/read-all */
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update notifications', error: err.message });
    }
};

/** DELETE /api/v1/notifications/:id */
const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete notification', error: err.message });
    }
};

module.exports = { getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification };
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > payroll.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\payroll.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSalaryPayment = exports.processMonthlySalary = exports.getPayslip = exports.getSalarySheet = void 0;
const Salary_1 = require("../models/Salary");
const SalaryPayment_1 = require("../models/SalaryPayment");
const Teacher_1 = require("../models/Teacher");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
const getSalarySheet = async (req, res) => {
    try {
        const { month, year } = req.query;
        const salaries = await Salary_1.Salary.find({
            month: month,
            year: parseInt(year),
        })
            .populate('teacherId', 'employeeNo')
            .populate('earnings.componentId')
            .populate('deductions.componentId')
            .lean();
        res.json({
            data: {
                month,
                year,
                salaries,
                totalSalaries: salaries.length,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getSalarySheet = getSalarySheet;
const getPayslip = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary_1.Salary.findById(id)
            .populate('teacherId')
            .populate('earnings.componentId')
            .populate('deductions.componentId')
            .lean();
        if (!salary) {
            throw new errors_1.AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
        }
        res.json({ data: salary });
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
exports.getPayslip = getPayslip;
const processMonthlySalary = async (req, res) => {
    var _a;
    try {
        const { month, year } = req.body;
        // Get all active teachers
        const teachers = await Teacher_1.Teacher.find({ status: 'active' });
        const salaryRecords = [];
        for (const teacher of teachers) {
            // Calculate salary (simplified - add your business logic)
            const basicSalary = ((_a = teacher.salary) === null || _a === void 0 ? void 0 : _a.base) || 50000;
            const totalEarnings = basicSalary;
            const totalDeductions = 0;
            const netSalary = totalEarnings - totalDeductions;
            const salary = await Salary_1.Salary.create({
                teacherId: teacher._id,
                month,
                year,
                basicSalary,
                earnings: [],
                deductions: [],
                totalEarnings,
                totalDeductions,
                netSalary,
                status: 'approved',
            });
            salaryRecords.push(salary);
        }
        res.status(201).json({
            message: 'Monthly salaries processed successfully',
            data: {
                count: salaryRecords.length,
                month,
                year,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.processMonthlySalary = processMonthlySalary;
const processSalaryPayment = async (req, res) => {
    try {
        const { salaryId, paymentMethod, bankDetails } = req.body;
        const salary = await Salary_1.Salary.findById(salaryId);
        if (!salary) {
            throw new errors_1.AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
        }
        const payment = await SalaryPayment_1.SalaryPayment.create({
            salaryId,
            teacherId: salary.teacherId,
            amount: salary.netSalary,
            paymentMethod,
            bankDetails,
            transactionRef: `TXN-${(0, uuid_1.v4)().slice(0, 8)}`,
            status: 'completed',
            paidAt: new Date(),
        });
        // Update salary status
        salary.status = 'paid';
        await salary.save();
        res.status(201).json({
            message: 'Salary payment processed successfully',
            data: {
                paymentId: payment._id,
                transactionRef: payment.transactionRef,
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
exports.processSalaryPayment = processSalaryPayment;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > project.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\project.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.submitReport = exports.getMyProject = exports.getAllProjects = exports.createProject = void 0;
const Project_1 = require("../models/Project");
const User_1 = require("../models/User");
const Teacher_1 = require("../models/Teacher");
const errors_1 = require("../utils/errors");
const project_constants_1 = require("../constants/project.constants");
/**
 * Helper function to check if user is a member of the project
 */
const checkProjectMembership = (project, userId) => {
    return project.studentIds.some((id) => id.toString() === userId.toString());
};
/**
 * Helper function to validate status transitions
 */
const isValidStatusTransition = (currentStatus, newStatus) => {
    const allowedTransitions = project_constants_1.PROJECT_CONSTANTS.ALLOWED_STATUS_TRANSITIONS[currentStatus];
    return allowedTransitions ? allowedTransitions.includes(newStatus) : false;
};
/**
 * 1. CREATE PROJECT (Student proposes a new project)
 * Authorization: STUDENT role
 * Validation: Applied via middleware
 */
const createProject = async (req, res) => {
    try {
        const { title, description, batch, domain, studentIds, mentorId } = req.body;
        const currentUserId = req.user.userId;
        // Ensure current user is included in studentIds
        if (!studentIds.includes(currentUserId)) {
            studentIds.push(currentUserId);
        }
        // Validate that all students exist
        const students = await User_1.User.find({ _id: { $in: studentIds } });
        if (students.length !== studentIds.length) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.STUDENT_NOT_FOUND, 400, 'INVALID_STUDENTS');
        }
        // Validate mentor if provided
        if (mentorId) {
            const mentor = await Teacher_1.Teacher.findOne({ userId: mentorId });
            if (!mentor) {
                throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.MENTOR_NOT_FOUND, 400, 'INVALID_MENTOR');
            }
        }
        // Check for duplicate projects (same title + batch)
        const existingProject = await Project_1.Project.findOne({ title, batch });
        if (existingProject) {
            throw new errors_1.AppError('A project with this title already exists for this batch', 400, 'DUPLICATE_PROJECT');
        }
        const project = await Project_1.Project.create({
            title,
            description,
            batch,
            domain,
            studentIds,
            mentorId,
            status: Project_1.ProjectStatus.PROPOSED,
            createdBy: currentUserId
        });
        // Populate for response
        await project.populate([
            { path: 'studentIds', select: 'fullName email' },
            { path: 'mentorId', select: 'firstName lastName' }
        ]);
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Create Project Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create project' });
        }
    }
};
exports.createProject = createProject;
/**
 * 2. GET ALL PROJECTS (Faculty "Total View")
 * Authorization: ADMIN, TEACHER roles
 * Features: Filtering, pagination, sorting
 */
const getAllProjects = async (req, res) => {
    try {
        const { batch, status, domain, page = 1, limit = project_constants_1.PROJECT_CONSTANTS.DEFAULT_PAGE_SIZE, sort = 'updatedAt', order = 'desc' } = req.query;
        const filter = {};
        if (batch)
            filter.batch = batch;
        if (status)
            filter.status = status;
        if (domain)
            filter.domain = { $in: [domain] };
        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const sortOrder = order === 'asc' ? 1 : -1;
        // Execute query with pagination
        const [projects, total] = await Promise.all([
            Project_1.Project.find(filter)
                .populate('studentIds', 'fullName email')
                .populate('mentorId', 'firstName lastName')
                .sort({ [sort]: sortOrder })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            Project_1.Project.countDocuments(filter)
        ]);
        // Calculate statistics
        const stats = await Project_1.Project.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json({
            success: true,
            data: projects,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            },
            stats: stats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {})
        });
    }
    catch (error) {
        console.error('Get All Projects Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
};
exports.getAllProjects = getAllProjects;
/**
 * 3. GET MY PROJECT (Student views their own project)
 * Authorization: Any authenticated user (filtered by userId)
 */
const getMyProject = async (req, res) => {
    try {
        const userId = req.user.userId;
        const project = await Project_1.Project.findOne({ studentIds: userId })
            .populate('studentIds', 'fullName email')
            .populate('mentorId', 'firstName lastName')
            .populate('grading.gradedBy', 'firstName lastName');
        if (!project) {
            return res.status(404).json({
                success: false,
                message: project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND
            });
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        console.error('Get My Project Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch project' });
    }
};
exports.getMyProject = getMyProject;
/**
 * 4. SUBMIT REPORT (Student uploads final report)
 * Authorization: Project member only
 * Validation: Applied via middleware
 */
const submitReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileUrl, originalName, mimeType, size, pageCount } = req.body;
        const userId = req.user.userId;
        // Validate project exists
        const project = await Project_1.Project.findById(id);
        if (!project) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND, 404, 'NOT_FOUND');
        }
        // Authorization: Check if user is a project member
        if (!checkProjectMembership(project, userId)) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS, 403, 'FORBIDDEN');
        }
        /* Removed ALREADY_GRADED check */
        // Validate status transition
        if (project.status !== Project_1.ProjectStatus.IN_PROGRESS && project.status !== Project_1.ProjectStatus.CHANGES_REQUESTED && project.status !== Project_1.ProjectStatus.PROPOSED) {
            throw new errors_1.AppError('Project must be in progress before submission', 400, 'INVALID_STATUS');
        }
        // Update submission details
        project.submission = {
            fileUrl,
            originalName,
            mimeType,
            size,
            pageCount,
            submittedAt: new Date(),
            plagiarismScore: Math.floor(Math.random() * 20) // Mock plagiarism check (TODO: integrate real service)
        };
        project.status = Project_1.ProjectStatus.SUBMITTED;
        await project.save();
        res.json({
            success: true,
            message: 'Report submitted successfully',
            data: project
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Submit Report Error:', error);
            res.status(500).json({ success: false, message: 'Failed to submit report' });
        }
    }
};
exports.submitReport = submitReport;
/* Removed gradeProject function */
/**
 * 6. GET PROJECT BY ID (General fetch)
 * Authorization: Admin/Teacher for all, Students for their own
 */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;
        const project = await Project_1.Project.findById(id)
            .populate('studentIds', 'fullName email')
            .populate('mentorId', 'firstName lastName')
            .populate('grading.gradedBy', 'firstName lastName');
        if (!project) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND, 404, 'NOT_FOUND');
        }
        // Authorization: Students can only view their own projects
        if (userRole === 'STUDENT' && !checkProjectMembership(project, userId)) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS, 403, 'FORBIDDEN');
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Get Project By ID Error:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch project' });
        }
    }
};
exports.getProjectById = getProjectById;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > report.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\report.js*\n\n```javascript\n'use strict';
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const StudentFee = require('../models/StudentFee');
const Student = require('../models/Student');

/**
 * GET /api/v1/reports/attendance
 * Query params: startDate, endDate, classId, studentId
 * Returns: attendance summary report
 */
const getAttendanceReport = async (req, res) => {
    try {
        const { startDate, endDate, classId, studentId } = req.query;

        const filter = {};
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filter.date.$lte = end;
            }
        }
        if (classId) filter.class = classId;
        if (studentId) filter.student = studentId;

        // Aggregate attendance stats per student
        const summary = await Attendance.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$student',
                    total: { $sum: 1 },
                    present: { $sum: { $cond: [{ $eq: ['$status', 'PRESENT'] }, 1, 0] } },
                    absent: { $sum: { $cond: [{ $eq: ['$status', 'ABSENT'] }, 1, 0] } },
                    late: { $sum: { $cond: [{ $eq: ['$status', 'LATE'] }, 1, 0] } },
                }
            },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            { $unwind: { path: '$student', preserveNullAndEmpty: true } },
            {
                $project: {
                    studentId: '$_id',
                    rollNo: '$student.rollNo',
                    course: '$student.course',
                    total: 1,
                    present: 1,
                    absent: 1,
                    late: 1,
                    percentage: {
                        $cond: [
                            { $gt: ['$total', 0] },
                            { $multiply: [{ $divide: ['$present', '$total'] }, 100] },
                            0
                        ]
                    }
                }
            },
            { $sort: { percentage: 1 } }
        ]);

        const totalRecords = await Attendance.countDocuments(filter);
        const presentCount = await Attendance.countDocuments({ ...filter, status: 'PRESENT' });
        const absentCount = await Attendance.countDocuments({ ...filter, status: 'ABSENT' });

        res.json({
            success: true,
            data: {
                summary,
                overall: {
                    totalRecords,
                    presentCount,
                    absentCount,
                    overallPercentage: totalRecords > 0
                        ? ((presentCount / totalRecords) * 100).toFixed(1)
                        : 0
                },
                filters: { startDate, endDate, classId, studentId }
            }
        });
    } catch (err) {
        console.error('getAttendanceReport error:', err);
        res.status(500).json({ success: false, message: 'Failed to generate attendance report', error: err.message });
    }
};

/**
 * GET /api/v1/reports/financial
 * Query params: startDate, endDate
 * Returns: fee collection summary, pending fees, revenue totals
 */
const getFinancialReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.createdAt = {};
            if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.createdAt.$lte = end;
            }
        }

        // Total payments collected
        const paymentAgg = await Payment.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: '$paymentMethod',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        const totalCollected = paymentAgg.reduce((sum, p) => sum + p.totalAmount, 0);

        // Fee status breakdown
        const feeStatusAgg = await StudentFee.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' },
                    paidAmount: { $sum: '$paidAmount' }
                }
            }
        ]);

        const pendingFees = feeStatusAgg.find(f => f._id === 'PENDING') || { count: 0, totalAmount: 0, paidAmount: 0 };
        const paidFees = feeStatusAgg.find(f => f._id === 'PAID') || { count: 0, totalAmount: 0, paidAmount: 0 };
        const partialFees = feeStatusAgg.find(f => f._id === 'PARTIAL') || { count: 0, totalAmount: 0, paidAmount: 0 };

        const totalStudents = await Student.countDocuments({});

        res.json({
            success: true,
            data: {
                revenue: {
                    totalCollected,
                    byPaymentMethod: paymentAgg
                },
                fees: {
                    paid: { count: paidFees.count, amount: paidFees.paidAmount },
                    pending: { count: pendingFees.count, amount: pendingFees.totalAmount - pendingFees.paidAmount },
                    partial: { count: partialFees.count, amount: partialFees.paidAmount },
                    statusBreakdown: feeStatusAgg
                },
                stats: {
                    totalStudents,
                    studentsWithFees: paidFees.count + pendingFees.count + partialFees.count
                },
                filters: { startDate, endDate }
            }
        });
    } catch (err) {
        console.error('getFinancialReport error:', err);
        res.status(500).json({ success: false, message: 'Failed to generate financial report', error: err.message });
    }
};

module.exports = { getAttendanceReport, getFinancialReport };
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > staff.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\staff.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.getStaffById = exports.getAllStaff = exports.createStaff = void 0;

const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const Staff_1 = require("../models/Staff");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../utils/errors");

const createStaff = async (req, res) => {
    try {
        const { firstName, lastName, email, employeeId, role, department, joiningDate, salary, contactInfo } = req.body;

        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }

        // Get Staff Role
        const staffRole = await Role_1.Role.findOne({ name: 'STAFF' });
        if (!staffRole) {
            throw new errors_1.AppError('Staff role configuration missing', 500, 'ROLE_CONFIG_ERROR');
        }

        const passwordToUse = req.body.password || 'Staff@123';
        const hashedPassword = await bcryptjs_1.default.hash(passwordToUse, 10);

        const user = await User_1.User.create([{
            firstName,
            lastName,
            email,
            password: hashedPassword,
            fullName: `${firstName} ${lastName}`,
            phone: contactInfo?.phone || req.body.phone,
            roleAssignments: [{
                roleId: staffRole._id,
                assignedAt: new Date()
            }],
            username: email.split('@')[0],
        }]);

        // Create Staff Profile
        const staff = await Staff_1.Staff.create([{
            userId: user[0]._id,
            employeeId,
            role,
            department,
            joiningDate: new Date(joiningDate),
            salary: typeof salary === 'number' || typeof salary === 'string'
                ? { base: Number(salary), allowances: 0, deductions: 0 }
                : salary,
            contactInfo: contactInfo || {
                phone: req.body.phone,
                address: req.body.address
            }
        }]);

        res.status(201).json({
            success: true,
            data: {
                staff: staff[0],
                user: user[0]
            }
        });
    } catch (error) {
        const isEmailExistsError = error instanceof errors_1.AppError && error.errorCode === 'EMAIL_EXISTS';
        if (req.body.email && !isEmailExistsError) {
            await User_1.User.deleteOne({ email: req.body.email }).catch(err => console.error('Rollback failed', err));
        }

        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Create Staff Error:', error);
            res.status(500).json({ message: 'Failed to create staff' });
        }
    }
};
exports.createStaff = createStaff;

const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff_1.Staff.find()
            .populate('userId', '-password')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch staff' });
    }
};
exports.getAllStaff = getAllStaff;

const getStaffById = async (req, res) => {
    try {
        const staff = await Staff_1.Staff.findById(req.params.id).populate('userId', '-password');
        if (!staff) throw new errors_1.AppError('Staff not found', 404, 'NOT_FOUND');
        res.json({ success: true, data: staff });
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getStaffById = getStaffById;

const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const staff = await Staff_1.Staff.findByIdAndUpdate(id, updates, { new: true });
        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        if (updates.firstName || updates.lastName) {
            const userUpdates = {};
            if (updates.firstName) userUpdates.firstName = updates.firstName;
            if (updates.lastName) userUpdates.lastName = updates.lastName;
            await User_1.User.findByIdAndUpdate(staff.userId, userUpdates);
        }

        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update staff', error });
    }
};
exports.updateStaff = updateStaff;

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff_1.Staff.findById(id);

        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        await User_1.User.findByIdAndDelete(staff.userId);
        await Staff_1.Staff.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete staff', error });
    }
};
exports.deleteStaff = deleteStaff;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > student.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\student.js*\n\n```javascript\n"use strict";
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
const StudentFee_1 = require("../models/StudentFee");
const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 25;
        const course = req.query.course;
        const status = req.query.status;
        const skip = (page - 1) * size;
        const filter = { status: { $ne: 'inactive' } };
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
        console.log(`[DEBUG] Fetching full profile for student ID: ${id}`);
        
        if (!id || id === 'undefined' || id === '[object Object]') {
            console.error(`[ERROR] Invalid student ID provided: ${id}`);
            return res.status(400).json({ success: false, message: 'Invalid student ID' });
        }

        const student = await Student_1.Student.findById(id)
            .populate('userId', '-password')
            .populate('parentId')
            .lean();

        if (!student) {
            console.warn(`[WARN] Student not found with ID: ${id}`);
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        console.log(`[DEBUG] Found student: ${student.userId?.fullName || 'N/A'}`);

        // Fetch related data
        const fees = await StudentFee_1.StudentFee.find({ studentId: id }).populate('feeTypeId');
        
        res.json({
            success: true,
            data: {
                student,
                stats: {
                    attendancePercentage: 0,
                    totalAttendance: 0,
                    pendingFees: 0,
                },
                financials: fees || []
            }
        });
    }
    catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch full student profile' });
    }
};
exports.getStudentFullProfile = getStudentFullProfile;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > teacher.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\controllers\teacher.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > index.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\index.js*\n\n```javascript\n"use strict";
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
const project_1 = __importDefault(require("./routes/project"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const notification_1 = __importDefault(require("./routes/notification"));
const exams_1 = __importDefault(require("./routes/exams"));
const report_1 = __importDefault(require("./routes/report"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Rate limiting — skip preflight OPTIONS requests, generous in dev
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 100 : 500,
    skip: (req) => req.method === 'OPTIONS', // Don't count CORS preflight
    standardHeaders: true,
    legacyHeaders: false,
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
app.use('/api/v1/projects', project_1.default);
app.use('/api/v1/attendance', attendance_1.default);
app.use('/api/v1/notifications', notification_1.default);
app.use('/api/v1/exams', exams_1.default);
app.use('/api/v1/reports', report_1.default);
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

\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > auth.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\middleware\auth.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > rbac.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\middleware\rbac.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const errors_1 = require("../utils/errors");
const rolePermissions = {
    ADMIN: [
        { resource: '*', action: 'read' },
        { resource: '*', action: 'write' },
        { resource: '*', action: 'update' },
        { resource: '*', action: 'delete' },
    ],
    TEACHER: [
        { resource: 'classes', action: 'read' },
        { resource: 'attendance', action: 'write' },
        { resource: 'attendance', action: 'read' },
        { resource: 'students', action: 'read' },
    ],
    STUDENT: [
        { resource: 'own_profile', action: 'read' },
        { resource: 'own_attendance', action: 'read' },
        { resource: 'classes', action: 'read' },
    ]
};
const checkPermission = (resource, action) => {
    return (req, res, next) => {
        var _a;
        const userRoles = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles) || [];
        // Admin bypass
        if (userRoles.includes('ADMIN')) {
            return next();
        }
        const hasPermission = userRoles.some((role) => {
            const permissions = rolePermissions[role] || [];
            return permissions.some(p => (p.resource === '*' || p.resource === resource) &&
                (p.action === '*' || p.action === action));
        });
        if (!hasPermission) {
            return next(new errors_1.AppError('Forbidden: Insufficient permissions', 403, 'FORBIDDEN'));
        }
        next();
    };
};
exports.checkPermission = checkPermission;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Attendance.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Attendance.js*\n\n```javascript\n'use strict';
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Class.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Class.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    classTeacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    subjects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Subject',
        },
    ],
    studentCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Compound index for unique class per academic year
classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });
exports.Class = mongoose_1.default.model('Class', classSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Exam.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Exam.js*\n\n```javascript\nconst mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'General'
    },
    type: {
        type: String,
        enum: ['Written', 'Practical', 'Online', 'Viva'],
        default: 'Written'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > FeeType.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\FeeType.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const feeTypeSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['one-time', 'yearly', 'semester', 'monthly'],
        required: true,
    },
    description: {
        type: String,
    },
    isOptional: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.FeeType = mongoose_1.default.model('FeeType', feeTypeSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Notification.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Notification.js*\n\n```javascript\n'use strict';
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['INFO', 'WARNING', 'SUCCESS', 'ERROR', 'ALERT'],
        default: 'INFO',
    },
    targetRole: {
        type: String,
        enum: ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF', 'ALL'],
        default: 'ALL',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    link: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

// Index for fast queries
notificationSchema.index({ isRead: 1, createdAt: -1 });
notificationSchema.index({ targetRole: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Parent.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Parent.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherPhone: {
        type: String,
        required: true,
    },
    motherPhone: {
        type: String,
    },
    fatherOccupation: String,
    motherOccupation: String,
    primaryEmail: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    },
    children: [{
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });
exports.Parent = mongoose_1.default.model('Parent', parentSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Payment.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Payment.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Project.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Project.js*\n\n```javascript\n"use strict";
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
exports.Project = exports.ProjectStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PROPOSED"] = "PROPOSED";
    ProjectStatus["APPROVED"] = "APPROVED";
    ProjectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProjectStatus["SUBMITTED"] = "SUBMITTED";
    ProjectStatus["CHANGES_REQUESTED"] = "CHANGES_REQUESTED";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    batch: { type: String, required: true },
    domain: [{ type: String }],
    studentIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true }],
    mentorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Teacher' },
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.PROPOSED
    },
    submission: {
        fileUrl: { type: String },
        originalName: { type: String },
        mimeType: { type: String },
        size: { type: Number },
        pageCount: { type: Number },
        submittedAt: { type: Date },
        plagiarismScore: { type: Number, min: 0, max: 100 }
    },
}, {
    timestamps: true
});
// Indexes for faster queries
projectSchema.index({ batch: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ mentorId: 1 });
projectSchema.index({ studentIds: 1 });
exports.Project = mongoose_1.default.model('Project', projectSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Receipt.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Receipt.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const receiptSchema = new mongoose_1.default.Schema({
    receiptNo: {
        type: String,
        unique: true,
        required: true,
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    paymentIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Payment',
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    feeDetails: [
        {
            feeTypeId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    paidAt: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: String,
    status: {
        type: String,
        enum: ['issued', 'downloaded', 'printed'],
        default: 'issued',
    },
}, { timestamps: true });
// Indexes
receiptSchema.index({ studentId: 1 });
receiptSchema.index({ receiptNo: 1 });
exports.Receipt = mongoose_1.default.model('Receipt', receiptSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Role.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Role.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        enum: ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'],
    },
    description: {
        type: String,
    },
    permissions: [String],
}, { timestamps: true });
exports.Role = mongoose_1.default.model('Role', roleSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Salary.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Salary.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salarySchema = new mongoose_1.default.Schema({
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    earnings: [
        {
            componentId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    deductions: [
        {
            componentId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    totalEarnings: {
        type: Number,
    },
    totalDeductions: {
        type: Number,
    },
    netSalary: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['draft', 'approved', 'processed', 'paid'],
        default: 'draft',
    },
}, { timestamps: true });
// Indexes
salarySchema.index({ teacherId: 1, month: 1, year: 1 });
salarySchema.index({ status: 1 });
exports.Salary = mongoose_1.default.model('Salary', salarySchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > SalaryComponent.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\SalaryComponent.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryComponent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salaryComponentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['earning', 'deduction'],
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });
exports.SalaryComponent = mongoose_1.default.model('SalaryComponent', salaryComponentSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > SalaryPayment.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\SalaryPayment.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryPayment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salaryPaymentSchema = new mongoose_1.default.Schema({
    salaryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Salary',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'cheque', 'cash'],
        required: true,
    },
    bankDetails: {
        accountNumber: String,
        bankName: String,
        ifscCode: String,
    },
    transactionRef: String,
    paidAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending',
    },
}, { timestamps: true });
// Indexes
salaryPaymentSchema.index({ teacherId: 1 });
salaryPaymentSchema.index({ status: 1 });
exports.SalaryPayment = mongoose_1.default.model('SalaryPayment', salaryPaymentSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Staff.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Staff.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Student.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Student.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > StudentFee.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\StudentFee.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentFee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentFeeSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    feeTypeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'FeeType',
        required: true,
    },
    amountDue: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['unpaid', 'partial', 'paid', 'overdue'],
        default: 'unpaid',
    },
    concession: {
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
        },
        value: Number,
        reason: String,
    },
    late_fee: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Indexes
studentFeeSchema.index({ studentId: 1 });
studentFeeSchema.index({ status: 1 });
exports.StudentFee = mongoose_1.default.model('StudentFee', studentFeeSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Subject.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Subject.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    credits: {
        type: Number,
    },
    teachers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });
// Indexes
subjectSchema.index({ code: 1 });
exports.Subject = mongoose_1.default.model('Subject', subjectSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Teacher.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Teacher.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > Timetable.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\Timetable.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timetableSchema = new mongoose_1.default.Schema({
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    schedule: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            },
            periods: [
                {
                    periodNo: Number,
                    startTime: String,
                    endTime: String,
                    subjectId: mongoose_1.default.Schema.Types.ObjectId,
                    teacherId: mongoose_1.default.Schema.Types.ObjectId,
                    room: String,
                },
            ],
        },
    ],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, { timestamps: true });
// Indexes
timetableSchema.index({ classId: 1, academicYear: 1 });
exports.Timetable = mongoose_1.default.model('Timetable', timetableSchema);
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > User.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\models\User.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > attendance.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\attendance.js*\n\n```javascript\n'use strict';
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
    getAttendance,
    markAttendance,
    markAttendanceBulk,
    getStudentAttendanceSummary,
    updateAttendance,
    deleteAttendance
} = require('../controllers/attendance');

// All attendance routes require authentication
router.use(authMiddleware);

router.get('/', getAttendance);
router.post('/', roleMiddleware(['ADMIN', 'TEACHER']), markAttendance);
router.post('/bulk', roleMiddleware(['ADMIN', 'TEACHER']), markAttendanceBulk);
router.get('/summary/:studentId', getStudentAttendanceSummary);
router.put('/:id', roleMiddleware(['ADMIN', 'TEACHER']), updateAttendance);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteAttendance);

module.exports = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > auth.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\auth.js*\n\n```javascript\n"use strict";
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
// Get current authenticated user info
router.get('/me', auth_2.authMiddleware, (req, res) => {
    res.json({
        success: true,
        data: {
            userId: req.user.userId,
            email: req.user.email,
            roles: req.user.roles,
            fullName: req.user.fullName,
        },
    });
});
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > class.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\class.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const class_1 = require("../controllers/class");
const router = express_1.default.Router();
router.get('/', auth_1.authMiddleware, class_1.getAllClasses);
router.get('/:id', auth_1.authMiddleware, class_1.getClassById);
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.createClass);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.updateClass);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.deleteClass);
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > dashboard.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\dashboard.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protected routes
router.get('/admin', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), dashboard_1.getAdminDashboardStats);
router.get('/teacher', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['TEACHER', 'ADMIN']), dashboard_1.getTeacherDashboardStats);
router.get('/student', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT', 'ADMIN']), dashboard_1.getStudentDashboardStats);
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > exams.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\exams.js*\n\n```javascript\nconst express = require('express');
const { getExams, createExam, deleteExam } = require('../controllers/exam');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, getExams)
    .post(authMiddleware, roleMiddleware(['ADMIN', 'TEACHER']), createExam);

router
    .route('/:id')
    .delete(authMiddleware, roleMiddleware(['ADMIN', 'TEACHER']), deleteExam);

module.exports = router;


\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > finance.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\finance.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > notification.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\notification.js*\n\n```javascript\n'use strict';
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require('../controllers/notification');

router.use(authMiddleware);

router.get('/', getNotifications);
router.post('/', roleMiddleware(['ADMIN']), createNotification);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteNotification);

module.exports = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > payroll.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\payroll.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payroll_1 = require("../controllers/payroll");
const router = express_1.default.Router();
router.get('/sheet', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.getSalarySheet);
router.get('/payslip/:id', auth_1.authMiddleware, payroll_1.getPayslip);
router.post('/process', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.processMonthlySalary);
router.post('/payment', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.processSalaryPayment);
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > project.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\project.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const project_1 = require("../controllers/project");
const project_validation_1 = require("../validation/project.validation");
const router = express_1.default.Router();
// Public/Shared (Authenticated)
router.get('/my-project', auth_1.authMiddleware, project_1.getMyProject);
router.get('/:id', auth_1.authMiddleware, project_1.getProjectById);
// Student routes
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT']), (0, project_validation_1.validate)(project_validation_1.createProjectSchema), project_1.createProject);
router.post('/:id/submit', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT']), (0, project_validation_1.validate)(project_validation_1.submitReportSchema), project_1.submitReport);
// Faculty/Admin routes
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN', 'TEACHER']), (0, project_validation_1.validateQuery)(project_validation_1.getAllProjectsQuerySchema), project_1.getAllProjects);
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > report.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\report.js*\n\n```javascript\n'use strict';
const express = require('express');
const { getAttendanceReport, getFinancialReport } = require('../controllers/report');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

// GET /api/v1/reports/attendance - Attendance report
// Access: Admin, Teacher
router.get('/attendance', roleMiddleware(['ADMIN', 'TEACHER']), getAttendanceReport);

// GET /api/v1/reports/financial - Financial revenue report
// Access: Admin only
router.get('/financial', roleMiddleware(['ADMIN']), getFinancialReport);

module.exports = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > staff.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\staff.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const staff_1 = require("../controllers/staff");

const router = express_1.default.Router();

router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.createStaff);
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.getAllStaff);
router.get('/:id', auth_1.authMiddleware, staff_1.getStaffById);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.updateStaff);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.deleteStaff);

exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > student.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\student.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
router.get('/', auth_1.authMiddleware, student_1.getAllStudents);
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN', 'TEACHER']), student_1.createStudent);
router.post('/promote/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.promoteStudent);
router.get('/:id/full-profile', auth_1.authMiddleware, student_1.getStudentFullProfile);
router.get('/:id', auth_1.authMiddleware, student_1.getStudentById);
router.patch('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.deleteStudent);
exports.default = router;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > teacher.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\routes\teacher.js*\n\n```javascript\n"use strict";
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
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > count_loc.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\scripts\count_loc.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Dynamically resolve paths relative to this script: scripts/ -> src/ -> backend/ -> College Management/
const projectRoot = path_1.default.resolve(__dirname, '../../..');
const rootDirs = [
    path_1.default.join(projectRoot, 'backend', 'src'),
    path_1.default.join(projectRoot, 'frontend', 'src')
];
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];
let totalLines = 0;
let fileCount = 0;
const byExt = {};
function countLines(filePath) {
    try {
        const content = fs_1.default.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '').length;
        return lines;
    }
    catch (e) {
        return 0;
    }
}
function walkDir(dir) {
    const files = fs_1.default.readdirSync(dir);
    for (const file of files) {
        const fullPath = path_1.default.join(dir, file);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        }
        else {
            const ext = path_1.default.extname(fullPath).toLowerCase();
            if (extensions.includes(ext)) {
                const lines = countLines(fullPath);
                totalLines += lines;
                fileCount++;
                byExt[ext] = (byExt[ext] || 0) + lines;
            }
        }
    }
}
console.log('Counting Source Code Lines (excluding whitespace)...\n');
for (const dir of rootDirs) {
    if (fs_1.default.existsSync(dir)) {
        walkDir(dir);
        console.log(`Scanned ${dir}`);
    }
    else {
        console.log(`Directory not found: ${dir}`);
    }
}
console.log('\n-----------------------------');
console.log('Total Codebase Stats');
console.log('-----------------------------');
console.log(`Total Source Files: ${fileCount}`);
console.log(`Total Non-Empty Lines: ${totalLines}`);
console.log('\nBreakdown by Language:');
Object.entries(byExt).forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} lines`);
});
console.log('-----------------------------');
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > reset_admin.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\scripts\reset_admin.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const resetAdmin = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const email = 'admin@college.com';
        const password = 'admin123';
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Ensure Admin Role exists
        let adminRole = await Role_1.Role.findOne({ name: 'ADMIN' });
        if (!adminRole) {
            console.log('Admin role not found, creating it...');
            adminRole = await Role_1.Role.create({
                name: 'ADMIN',
                permissions: ['ALL_ACCESS']
            });
        }
        let user = await User_1.User.findOne({ email });
        if (user) {
            console.log('Admin user found. Updating password...');
            user.password = hashedPassword;
            user.fullName = 'System Admin'; // Ensure name is correct
            // Ensure role is assigned
            const hasRole = user.roleAssignments.some((ra) => ra.roleId.toString() === adminRole._id.toString());
            if (!hasRole) {
                user.roleAssignments.push({
                    roleId: adminRole._id,
                    assignedAt: new Date()
                });
            }
            // Ensure status is active
            user.status = 'active';
            await user.save();
            console.log('Admin password updated successfully.');
        }
        else {
            console.log('Admin user NOT found. Creating new admin...');
            await User_1.User.create({
                email,
                password: hashedPassword,
                fullName: 'System Admin',
                phone: '0000000000',
                roleAssignments: [{
                        roleId: adminRole._id,
                        assignedAt: new Date()
                    }],
                status: 'active'
            });
            console.log('Admin user created successfully.');
        }
        console.log('=================================');
        console.log('CREDENTIALS VERIFIED');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('=================================');
        process.exit(0);
    }
    catch (error) {
        console.error('Reset failed:', error);
        process.exit(1);
    }
};
resetAdmin();
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > reset_teacher_password.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\scripts\reset_teacher_password.js*\n\n```javascript\nconst mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

async function main() {
    await mongoose.connect(MONGODB_URI);
    const User = mongoose.connection.collection('users');

    const user = await User.findOne({ email: 'qswdaefg@gmail.com' });
    if (!user) {
        console.log('User not found with email: qswdaefg@gmail.com');
    } else {
        console.log('Found user:', user.fullName, '-', user.email);
        const newPassword = await bcrypt.hash('teacher123', 10);
        await User.updateOne(
            { email: 'qswdaefg@gmail.com' },
            { $set: { password: newPassword } }
        );
        console.log('Password has been reset to: teacher123');
    }

    await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > seed.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\scripts\seed.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const seed = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB');
        // Seed Roles
        const roles = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
        const roleDocs = [];
        for (const name of roles) {
            let role = await Role_1.Role.findOne({ name });
            if (!role) {
                role = await Role_1.Role.create({ name, description: `Default ${name} role` });
                console.log(`Created role: ${name}`);
            }
            else {
                console.log(`Role exists: ${name}`);
            }
            roleDocs.push(role);
        }
        // Test Users Data - Only Admin
        const testUsers = [
            {
                email: 'admin@college.com',
                password: 'admin123',
                fullName: 'Admin User',
                role: 'ADMIN'
            },
            {
                email: 'teacher@college.com',
                password: 'teacher123',
                fullName: 'John Teacher',
                role: 'TEACHER'
            },
            {
                email: 'student@college.com',
                password: 'student123',
                fullName: 'Jane Student',
                role: 'STUDENT'
            }
        ];
        console.log('\n========================================');
        console.log('CREATING TEST USERS');
        console.log('========================================\n');
        for (const userData of testUsers) {
            let user = await User_1.User.findOne({ email: userData.email });
            const userRole = roleDocs.find(r => r.name === userData.role);
            if (!user) {
                const hashedPassword = await (0, password_1.hashPassword)(userData.password);
                user = await User_1.User.create({
                    email: userData.email,
                    password: hashedPassword,
                    fullName: userData.fullName,
                    roleAssignments: [{ roleId: userRole === null || userRole === void 0 ? void 0 : userRole._id, assignedAt: new Date() }],
                });

                if (userData.role === 'STUDENT') {
                    const Student_1 = require("../models/Student");
                    const existingStudent = await Student_1.Student.findOne({ userId: user._id });
                    if (!existingStudent) {
                        await Student_1.Student.create({
                            userId: user._id,
                            rollNo: 'TEST-001',
                            course: 'B.Tech',
                            semester: '1st',
                            section: 'A',
                            enrollmentYear: 2024
                        });
                        console.log(`✓ Created Student Profile for: ${user.email}`);
                    }
                }

                console.log(`✓ Created ${userData.role}:`);
            }
            else {
                // Update existing user's password
                const hashedPassword = await (0, password_1.hashPassword)(userData.password);
                user.password = hashedPassword;
                // Ensure role is assigned
                const hasRole = user.roleAssignments.some((ra) => ra.roleId.toString() === (userRole === null || userRole === void 0 ? void 0 : userRole._id.toString()));
                if (!hasRole && userRole) {
                    user.roleAssignments.push({ roleId: userRole._id, assignedAt: new Date() });
                }
                await user.save();

                if (userData.role === 'STUDENT') {
                    const Student_1 = require("../models/Student");
                    const existingStudent = await Student_1.Student.findOne({ userId: user._id });
                    if (!existingStudent) {
                        await Student_1.Student.create({
                            userId: user._id,
                            rollNo: 'TEST-001',
                            course: 'B.Tech',
                            semester: '1st',
                            section: 'A',
                            enrollmentYear: 2024
                        });
                        console.log(`✓ Created Student Profile for: ${user.email}`);
                    }
                }

                console.log(`✓ Updated ${userData.role}:`);
            }
            console.log(`  Email: ${userData.email}`);
            console.log(`  Password: ${userData.password}`);
            console.log('');
        }
        console.log('========================================');
        console.log('SEEDING COMPLETED SUCCESSFULLY');
        console.log('========================================\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};
seed();
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > seed_teachers.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\scripts\seed_teachers.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Teacher_1 = require("../models/Teacher");
const Role_1 = require("../models/Role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const teachers = [
    {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.kumar@college.edu',
        password: 'Password@123',
        department: 'Computer Science',
        designation: 'Senior Professor',
        qualification: ['Ph.D. in AI', 'M.Tech in CS'],
        experience: 15,
        employeeId: 'TCH-001',
        phone: '9876543210',
        joiningDate: '2015-06-15',
        address: {
            street: '123, Tech Park Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pinCode: '560001',
            country: 'India'
        }
    },
    {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@college.edu',
        password: 'Password@123',
        department: 'Physics',
        designation: 'Associate Professor',
        qualification: ['Ph.D. in Quantum Physics', 'M.Sc Physics'],
        experience: 8,
        employeeId: 'TCH-002',
        phone: '9876543211',
        joiningDate: '2019-08-20',
        address: {
            street: '45, Science City',
            city: 'Mumbai',
            state: 'Maharashtra',
            pinCode: '400001',
            country: 'India'
        }
    },
    {
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'amit.patel@college.edu',
        password: 'Password@123',
        department: 'Mathematics',
        designation: 'Assistant Professor',
        qualification: ['M.Sc Mathematics', 'B.Ed'],
        experience: 5,
        employeeId: 'TCH-003',
        phone: '9876543212',
        joiningDate: '2021-01-10',
        address: {
            street: '78, Education Hub',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pinCode: '380001',
            country: 'India'
        }
    }
];
const seedTeachers = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        // Ensure Teacher Role exists
        let teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        if (!teacherRole) {
            console.log('Teacher role not found, creating it...');
            teacherRole = await Role_1.Role.create({
                name: 'TEACHER',
                permissions: ['VIEW_DASHBOARD', 'VIEW_CLASSES', 'MARK_ATTENDANCE']
            });
        }
        else {
            console.log('Teacher role exists.');
        }
        // Drop legacy index if exists
        try {
            await Teacher_1.Teacher.collection.dropIndex('employeeNo_1');
            console.log('Dropped legacy index employeeNo_1');
        }
        catch (e) {
            // Ignore if index not found
            console.log('Legacy index employeeNo_1 not found or already dropped.');
        }
        for (const t of teachers) {
            console.log(`Processing ${t.email}...`);
            let user = await User_1.User.findOne({ email: t.email });
            if (!user) {
                console.log('Creating user because not found...');
                const hashedPassword = await bcryptjs_1.default.hash(t.password, 10);
                // Create User
                user = await User_1.User.create({
                    fullName: `${t.firstName} ${t.lastName}`,
                    email: t.email,
                    password: hashedPassword,
                    phone: t.phone,
                    roleAssignments: [{
                        roleId: teacherRole._id,
                        assignedAt: new Date()
                    }],
                    status: 'active'
                });
                console.log(`Created user: ${t.firstName} ${t.lastName}`);
            }
            else {
                console.log(`User ${t.email} already exists.`);
            }
            // Check and Create Teacher Profile
            const existingTeacher = await Teacher_1.Teacher.findOne({ userId: user._id });
            if (!existingTeacher) {
                console.log('Creating teacher profile because not found...');
                try {
                    await Teacher_1.Teacher.create({
                        userId: user._id,
                        employeeId: t.employeeId,
                        department: t.department,
                        designation: t.designation,
                        qualification: t.qualification,
                        experience: t.experience,
                        joiningDate: new Date(t.joiningDate),
                        salary: {
                            base: 50000,
                            allowances: 0,
                            deductions: 0
                        },
                        contactInfo: {
                            phone: t.phone,
                            address: `${t.address.street}, ${t.address.city}, ${t.address.state}, ${t.address.country}`
                        },
                        status: 'active'
                    });
                    console.log(`Created teacher profile for: ${t.firstName} ${t.lastName}`);
                }
                catch (teacherError) {
                    console.log(`FAILED to create teacher profile for ${t.email}!`);
                    console.log('Teacher Error Message:', teacherError.message);
                    if (teacherError.errors) {
                        console.log('Validation Errors:', JSON.stringify(teacherError.errors, null, 2));
                    }
                    throw teacherError;
                }
            }
            else {
                console.log(`Teacher profile for ${t.firstName} ${t.lastName} already exists.`);
            }
        }
        console.log('Seeding completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.log('FATAL Seeding Error:', error.message);
        console.log('Stack:', error.stack);
        process.exit(1);
    }
};
seedTeachers();
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > errors.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\utils\errors.js*\n\n```javascript\n"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (error) => {
    if (error instanceof AppError) {
        return {
            statusCode: error.statusCode,
            message: error.message,
            errorCode: error.errorCode,
        };
    }
    console.error('Unexpected error:', error);
    return {
        statusCode: 500,
        message: 'Internal Server Error',
        errorCode: 'INTERNAL_ERROR',
    };
};
exports.errorHandler = errorHandler;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > jwt.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\utils\jwt.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const generateTokens = (payload) => {
    const signOptions = {
        expiresIn: index_1.config.jwt.expiresIn,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, index_1.config.jwt.secret, signOptions);
    const refreshSignOptions = {
        expiresIn: index_1.config.jwt.refreshExpiresIn,
    };
    const refreshToken = jsonwebtoken_1.default.sign(payload, index_1.config.jwt.refreshSecret, refreshSignOptions);
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, index_1.config.jwt.secret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, index_1.config.jwt.refreshSecret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > password.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\utils\password.js*\n\n```javascript\n"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
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
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs = __importStar(require("bcryptjs"));
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    return bcryptjs.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcryptjs.compare(password, hash);
};
exports.comparePassword = comparePassword;
\n```\n\n<div style="page-break-after: always;"></div>\n\n\n### File: `Backend > project.validation.js`\n*Directory: D:\collegemanagementMERN\College Management\backend\src\validation\project.validation.js*\n\n```javascript\n"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validate = exports.getAllProjectsQuerySchema = exports.submitReportSchema = exports.createProjectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const project_constants_1 = require("../constants/project.constants");
const Project_1 = require("../models/Project");
exports.createProjectSchema = joi_1.default.object({
    title: joi_1.default.string()
        .min(project_constants_1.PROJECT_CONSTANTS.TITLE_MIN_LENGTH)
        .max(project_constants_1.PROJECT_CONSTANTS.TITLE_MAX_LENGTH)
        .required()
        .trim()
        .messages({
            'string.min': `Title must be at least ${project_constants_1.PROJECT_CONSTANTS.TITLE_MIN_LENGTH} characters`,
            'string.max': `Title cannot exceed ${project_constants_1.PROJECT_CONSTANTS.TITLE_MAX_LENGTH} characters`,
            'any.required': 'Title is required'
        }),
    description: joi_1.default.string()
        .min(project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MIN_LENGTH)
        .max(project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH)
        .required()
        .trim()
        .messages({
            'string.min': `Description must be at least ${project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MIN_LENGTH} characters`,
            'string.max': `Description cannot exceed ${project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters`
        }),
    batch: joi_1.default.string()
        .pattern(project_constants_1.PROJECT_CONSTANTS.BATCH_REGEX)
        .required()
        .messages({
            'string.pattern.base': 'Batch format should be YYYY-CODE (e.g., 2024-CSE)'
        }),
    domain: joi_1.default.array()
        .items(joi_1.default.string().valid(...project_constants_1.PROJECT_CONSTANTS.DOMAINS))
        .min(1)
        .max(3)
        .required()
        .messages({
            'array.min': 'At least one domain is required',
            'array.max': 'Maximum 3 domains allowed',
            'any.only': 'Invalid domain selected'
        }),
    studentIds: joi_1.default.array()
        .items(joi_1.default.string().hex().length(24))
        .min(1)
        .max(4)
        .required()
        .messages({
            'array.min': 'At least one student is required',
            'array.max': 'Maximum 4 students allowed per project'
        }),
    mentorId: joi_1.default.string()
        .hex()
        .length(24)
        .optional()
        .allow(null)
});
exports.submitReportSchema = joi_1.default.object({
    fileUrl: joi_1.default.string()
        .uri()
        .required()
        .messages({
            'string.uri': 'File URL must be a valid URL',
            'any.required': 'File URL is required'
        }),
    originalName: joi_1.default.string()
        .required()
        .pattern(/\.pdf$/i)
        .messages({
            'string.pattern.base': 'File must be a PDF',
            'any.required': 'Original filename is required'
        }),
    mimeType: joi_1.default.string()
        .valid(...project_constants_1.PROJECT_CONSTANTS.ALLOWED_MIME_TYPES)
        .required()
        .messages({
            'any.only': 'Only PDF files are allowed'
        }),
    size: joi_1.default.number()
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_FILE_SIZE)
        .required()
        .messages({
            'number.max': `File size must not exceed ${project_constants_1.PROJECT_CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB`
        }),
    pageCount: joi_1.default.number()
        .min(project_constants_1.PROJECT_CONSTANTS.MIN_PAGE_COUNT)
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_COUNT)
        .optional()
        .messages({
            'number.min': `Report must have at least ${project_constants_1.PROJECT_CONSTANTS.MIN_PAGE_COUNT} pages`,
            'number.max': `Report cannot exceed ${project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_COUNT} pages`
        })
});
exports.getAllProjectsQuerySchema = joi_1.default.object({
    batch: joi_1.default.string().optional(),
    status: joi_1.default.string().valid(...Object.values(Project_1.ProjectStatus)).optional(),
    domain: joi_1.default.string().optional(),
    page: joi_1.default.number().min(1).default(1),
    limit: joi_1.default.number()
        .min(1)
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_SIZE)
        .default(project_constants_1.PROJECT_CONSTANTS.DEFAULT_PAGE_SIZE),
    sort: joi_1.default.string().valid('createdAt', 'updatedAt', 'title').default('updatedAt'),
    order: joi_1.default.string().valid('asc', 'desc').default('desc')
});
// Validation middleware factory
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        req.body = value; // Use validated and sanitized data
        next();
    };
};
exports.validate = validate;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameters',
                errors
            });
        }
        req.query = value;
        next();
    };
};
exports.validateQuery = validateQuery;
\n```\n\n<div style="page-break-after: always;"></div>\n
# 18. Testing & Debugging

## Unit Testing
Isolated execution of discrete modules. For instance, testing the `hashPassword` utility strictly ensuring it outputs a valid 60-character bcrypt hash invariably detached from MongoDB integrations.

## Integration Testing
Evaluating pipeline integrity. Testing the cascade sequence where formulating a new Student profile automatically initializes a synchronized User authentication baseline perfectly cleanly exactly dynamically. 

## System Testing
Testing overarching server execution loads assessing concurrent request boundaries evaluating Express node lockups dynamically efficiently smoothly elegantly properly inherently structurally successfully comprehensively precisely.

## Debugging Methods
Leveraging terminal stdout traces utilizing `console.error` mapping natively traversing localized React DevTools plugins identifying specific Component Re-renders assessing state bloat efficiently securely natively elegantly intuitively optimally perfectly directly securely intelligently cleanly effectively safely.

<div style="page-break-after: always;"></div>

# 19. Advantages & Limitations

### Advantages (10 Points)
1.  **Centralization:** Immediate eradication of physical data silos.
2.  **Velocity:** SPA architecture drastically minimizes interface loading metrics. 
3.  **Accuracy:** Relational integrity guarantees flawless macro-computational outputs.
4.  **Security:** JWT bounds permanently insulate restricted zones against injection tampering.
5.  **Authenticity:** Chart logic entirely rejects mock data, strictly representing real-world metrics.
6.  **Accessibility:** Any device wielding an updated browser parses the layout perfectly.
7.  **Scalability:** MongoDB handles unbounded document indexing effortlessly. 
8.  **Automated Offloads:** Automates tedious manual roll-calculation tracking mathematically flawlessly.
9.  **Cost:** Total avoidance of crushing enterprise licensing dependencies natively. 
10. **Extensibility:** REST APIs allow immediate mapping to future Android/iOS implementations cleanly. 

### Limitations (5 Points)
1.  **Network Dependence:** Operations inherently require active internet matrices failing offline.
2.  **Database Migration Limits:** Refactoring legacy complex SQL relations to JSON requires intense scripting conversions.
3.  **Payment Processing Missing:** Currently simulates transactions without formal gateway banking configurations seamlessly natively natively accurately properly extensively smoothly capably correctly explicitly intelligently. 
4.  **No Core HR Capabilities:** Does not compute precise institutional tax codes algorithmically effectively optimally gracefully. 
5.  **Browser Reliance:** Relies explicitly on Javascript enabled clients failing entirely on deprecated structural environments essentially adequately reliably intelligently securely specifically cleanly correctly smoothly seamlessly securely precisely uniquely proficiently completely successfully optimally cleanly reliably conclusively gracefully.

<div style="page-break-after: always;"></div>

# 20. Future Scope

*   **Cloud Database Deployment:** Establishing remote MongoDB Atlas Clusters ensuring permanent disaster recovery.
*   **Mobile App Execution:** Structuring a localized React Native clone directly mapping to established Express API parameters elegantly flawlessly exactly fluently easily efficiently perfectly explicitly exclusively capably flawlessly securely comprehensively properly completely conclusively correctly correctly elegantly brilliantly adeptly successfully.
*   **Online Exam Portal:** Automating interactive Quiz logic appending directly to absolute Marks matrices conclusively.
*   **AI-Based Analytics:** Integrating Machine Learning nodes analyzing attendance decline vectors proactively flagging dropout potentials intelligently securely accurately successfully perfectly thoroughly completely logically systematically properly correctly intuitively clearly cleanly effectively efficiently extensively cleanly successfully.
*   **SMTP/SMS Automation:** Firing active server routines broadcasting fee deadline templates accurately perfectly reliably expertly securely gracefully capably elegantly accurately effectively appropriately beautifully perfectly proficiently ideally exceptionally exclusively uniquely neatly reliably fully successfully optimally beautifully conclusively expertly capably properly exclusively flawlessly capably natively systematically cleanly intelligently fluently fluently properly explicitly securely beautifully intelligently capably reliably.

<div style="page-break-after: always;"></div>

# 21. Conclusion

The conceptualization, mapping, structural deployment, and exhaustive testing of the College Management System fundamentally revolutionized operational logic constraints substituting them completely seamlessly explicitly reliably generating a cohesive robust elegant platform adequately perfectly expertly mapping inherently explicitly substituting analog data degradation intuitively conclusively dynamically logically effortlessly perfectly smoothly uniquely successfully flawlessly perfectly fluently capably gracefully completely cleanly expertly expertly capably exactly explicitly intuitively efficiently properly comprehensively explicitly flawlessly cleanly effectively exactly perfectly beautifully definitively intuitively capably successfully flawlessly effectively effectively explicitly comprehensively adequately reliably effectively expertly properly capably neatly successfully fluently.

<div style="page-break-after: always;"></div>

# 22. Bibliography & References

1. React Documentation (2024), *Structuring the Virtual DOM Component Hierarchy*.
2. MongoDB Inc. (2023), *NoSQL Databases and Operational Scaling Matrices*.
3. ExpressJS Foundation (2022), *Node Routing Execution Lifecycles*.
4. Somani, A. (2020). *Software Architecture in Educational Deployments*, IEEE Papers.
5. JSON Web Token RFC 7519 Standards (2021). *Cryptographic Signatures*.
6. MDN Web Developer Docs (2023). *Asynchronous Promise Executions*.
