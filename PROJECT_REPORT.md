
# PROJECT REPORT

## COLLEGE MANAGEMENT SYSTEM

---

**Submitted in Partial Fulfillment of the Requirements for the Award of the Degree of**

**Bachelor of Computer Applications (BCA) / Bachelor of Technology (B.Tech)**

---

| | |
|---|---|
| **Project Title** | College Management System |
| **Technology Used** | MERN Stack (MongoDB, Express.js, React.js, Node.js) |
| **Submitted By** | [Student Name] |
| **Roll Number** | [Roll Number] |
| **Department** | Department of Computer Science |
| **Institute** | [Institute Name] |
| **Academic Year** | 2025 – 2026 |
| **Guide** | [Guide Name] |

---

## CERTIFICATE

*This is to certify that the project entitled* **"College Management System"** *is a bonafide work carried out by* **[Student Name]** *in partial fulfillment of the requirements for the award of the degree of Bachelor of Computer Applications. This project has been carried out under my supervision and guidance.*

**Project Guide:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**HOD:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## DECLARATION

*I hereby declare that the project entitled* **"College Management System"** *submitted to [Institute Name] is a record of original work done by me under the guidance of [Guide Name]. The information embodied in this project report has not been submitted earlier for the award of any degree or diploma to any university or institution.*

**Signature:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Name:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## ACKNOWLEDGEMENT

I take this opportunity to express my deep sense of gratitude to all those who have contributed to the successful completion of this project.

I am extremely thankful to my project guide, **[Guide Name]**, for their continuous support, encouragement, and invaluable guidance throughout the course of this project.

I am also grateful to the **HOD, Department of Computer Science**, for providing the necessary resources and infrastructure.

Lastly, I extend my sincere thanks to my family and friends for their moral support and encouragement during this project.

**[Student Name]**  
**[Roll Number]**  
**[Date]**

---

## ABSTRACT

The **College Management System** is a comprehensive, full-stack web application developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The primary objective of this system is to automate and digitize the complete administrative workflow of a college institution — covering student enrollment, teacher and staff administration, fee collection, payroll processing, attendance tracking, library management, exam scheduling, timetable management, and academic reporting.

The system supports **four user roles**: Administrator, Teacher, Student, and Staff — each with dedicated dashboards and role-based access control enforced through **JSON Web Tokens (JWT)**. The backend exposes a **RESTful API** with 40+ endpoints, connected to a **MongoDB Atlas** cloud database with 20 collections. The frontend is built using **React 18** with **Vite** as the build tool, providing a fast, responsive, and modern user interface.

This project replaces traditional paper-based and spreadsheet-driven college operations with a secure, scalable, and centralized digital platform, resulting in improved efficiency, data accuracy, and accessibility for all stakeholders.

---

## TABLE OF CONTENTS

| Chapter | Title | Page |
|---------|-------|------|
| 1 | Introduction | 1 |
| 2 | System Analysis | 2 |
| 3 | System Design | 3 |
| 4 | Database Design | 4 |
| 5 | Implementation | 5 |
| 6 | System Modules | 6 |
| 7 | Testing | 7 |
| 8 | Conclusion & Future Scope | 8 |
| | References | 9 |

---

## CHAPTER 1 — INTRODUCTION

### 1.1 Background

Educational institutions today manage a vast amount of data — student records, teacher profiles, class schedules, fee structures, examination results, attendance logs, and payroll. Managing all of this manually or through disconnected spreadsheets leads to inefficiencies, errors, and data loss.

A **College Management System (CMS)** provides a unified digital platform that automates and streamlines these operations. It eliminates redundant paper work, reduces human errors, and allows authorized users to access accurate and real-time information from anywhere.

### 1.2 Problem Statement

The traditional college management process faces several challenges:

- Manual maintenance of student and staff records is time-consuming and error-prone.
- Fee collection and payroll calculations lack transparency and audit trails.
- Attendance and examination records are scattered and hard to retrieve.
- There is no centralized system for academic scheduling (timetable, exams).
- Different departments cannot share or access each other's data efficiently.

### 1.3 Proposed System

The proposed **College Management System** addresses all the above problems by providing:

- A centralized, cloud-hosted web application accessible from any modern browser.
- Separate portals for Admin, Teacher, Student, and Staff roles.
- Real-time dashboards with key statistics and alerts.
- Secure, encrypted user authentication using JWT tokens.
- Complete CRUD operations for all major entities.

### 1.4 Objectives

1. Digitize and automate all major college administrative tasks.
2. Provide a centralized database for all college information.
3. Implement role-based access control for data security.
4. Generate reports for attendance, finance, and academic performance.
5. Build a scalable system that can grow with the college's needs.

### 1.5 Scope

The system covers the following domains:
- User Authentication & Role Management
- Student, Teacher, and Staff Records
- Fee Collection & Payment Processing
- Payroll Calculation & Disbursement
- Attendance Tracking
- Library Management
- Exam Scheduling & Grade Management
- Timetable Management
- Project Tracking
- Administrative Reports & Analytics

---

## CHAPTER 2 — SYSTEM ANALYSIS

### 2.1 Existing System

In most colleges, administrative tasks are handled through:
- Physical files and folders for student records
- Excel spreadsheets for fee and payroll calculations
- Manual attendance registers
- Notice boards and printed timetables

**Limitations of the Existing System:**
- Data is scattered and not centralized
- Retrieval of student/staff records is slow
- No real-time access to reports or statistics
- High risk of data loss due to physical storage
- No role-based access — any staff can access any file
- No automated fee reminders or payroll reports

### 2.2 Proposed System

The proposed web-based College Management System offers:
- **Centralized Database** — All data stored in MongoDB Atlas (cloud)
- **Role-Based Dashboards** — Four distinct user roles with specific access
- **Real-Time Data** — All changes reflect immediately across users
- **Automated Reports** — Financial, attendance, and academic reports generated on demand
- **Secure Access** — JWT authentication with bcryptjs password hashing

### 2.3 Feasibility Study

#### 2.3.1 Technical Feasibility
The system is built using widely adopted, open-source technologies:
- Node.js and Express.js for the backend server
- MongoDB Atlas as the cloud database (free tier available)
- React 18 for the frontend UI
- Deployable on Render.com (free tier)

All technologies are mature, well-documented, and supported by large communities.

#### 2.3.2 Economic Feasibility
- All technologies used are **free and open-source** (zero licensing cost)
- Deployment on Render.com free tier costs **₹0/month**
- MongoDB Atlas free tier provides **512 MB** storage (sufficient for a mid-size college)
- Development cost is the only significant investment

#### 2.3.3 Operational Feasibility
- The system uses a web browser — no special software installation required
- Users need only an internet connection and login credentials
- The intuitive UI minimizes training requirements
- Admin can manage all users and data without technical knowledge

### 2.4 Functional Requirements

| # | Requirement |
|---|-------------|
| FR1 | Users must be able to register and log in with email and password |
| FR2 | System must support 4 roles: Admin, Teacher, Student, Staff |
| FR3 | Admin must be able to add, edit, view, and delete student records |
| FR4 | Admin must be able to manage teacher and staff records |
| FR5 | System must support fee payment and receipt generation |
| FR6 | System must process payroll for teachers and staff |
| FR7 | Teachers must be able to mark and view attendance |
| FR8 | System must support creating and viewing exam schedules |
| FR9 | System must support grade entry and result publishing |
| FR10 | System must display a timetable per class |
| FR11 | Admin dashboard must show real-time statistics |
| FR12 | System must support library book issue and return |

### 2.5 Non-Functional Requirements

| # | Requirement |
|---|-------------|
| NFR1 | System should respond within 2 seconds for all API requests |
| NFR2 | System should support at least 100 concurrent users |
| NFR3 | All passwords must be hashed (bcryptjs) |
| NFR4 | All API routes must require valid JWT token (except login) |
| NFR5 | System must work on Chrome, Firefox, and Edge browsers |
| NFR6 | The UI must be responsive and work on mobile devices |
| NFR7 | The system must have 99% uptime during college working hours |

---

## CHAPTER 3 — SYSTEM DESIGN

### 3.1 System Architecture

The College Management System follows a **3-tier Client-Server Architecture**:

```
┌──────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (Tier 1)             │
│         React 18 + Vite + Tailwind CSS               │
│   Browser-based UI — 19 Pages, 18 Components        │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP / REST API (JSON)
                        │ Axios + JWT Token
┌───────────────────────▼──────────────────────────────┐
│               BUSINESS LOGIC LAYER (Tier 2)          │
│         Node.js + Express.js (Port 5000)             │
│   Controllers │ Routes │ Middleware │ Utils          │
│   JWT Auth │ bcrypt │ Joi Validation │ Rate Limit    │
└───────────────────────┬──────────────────────────────┘
                        │ Mongoose ODM
┌───────────────────────▼──────────────────────────────┐
│                 DATA LAYER (Tier 3)                  │
│              MongoDB Atlas (Cloud)                   │
│     20 Collections │ Indexes │ Relationships         │
└──────────────────────────────────────────────────────┘
```

### 3.2 Technology Stack

#### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | 16+ |
| Framework | Express.js | 4.18+ |
| Database | MongoDB (Atlas) | Cloud |
| ODM | Mongoose | 7.5+ |
| Authentication | JWT (jsonwebtoken) | — |
| Password Hashing | bcryptjs | — |
| Security | Helmet | — |
| Rate Limiting | express-rate-limit | 100 req/15 min |
| Validation | Joi | — |
| Language | JavaScript (CommonJS) | ES6+ |

#### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Library | React | 18.2+ |
| Build Tool | Vite | — |
| Routing | React Router | 6+ |
| State Management | Zustand | — |
| HTTP Client | Axios | — |
| Styling | Tailwind CSS | 3.3+ |
| Animation | Three.js + CSS | — |
| Icons | Lucide React | — |
| Notifications | react-hot-toast | — |
| Charts | Recharts | — |

### 3.3 Data Flow Diagram (DFD)

#### Level 0 — Context Diagram
```
           Login Credentials
User ─────────────────────────► College Management System
     ◄─────────────────────────
           Dashboard / Reports
```

#### Level 1 — DFD
```
                    ┌─────────────────┐
User ──[Login]────► │  Auth Module    │──► JWT Token
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │ Student Mgmt │  │  Fee Module  │  │  Payroll Mgmt│
   │  (Add/Edit/  │  │ (Pay/Receipt)│  │(Salary/Sheet)│
   │   Delete)    │  └──────┬───────┘  └──────┬───────┘
   └──────┬───────┘         │                 │
          │         ┌───────┴──────────────────┘
          ▼         ▼
      ┌──────────────────┐
      │  MongoDB Atlas   │
      │  (20 Collections)│
      └──────────────────┘
```

### 3.4 Use Case Diagram

| Actor | Use Cases |
|-------|-----------|
| **Admin** | Login, Manage Students, Manage Teachers, Manage Staff, Manage Classes, Collect Fees, Process Payroll, Generate Reports, Configure Timetable, Manage Library |
| **Teacher** | Login, View Students, Mark Attendance, Enter Grades, View Timetable, View Payslip |
| **Student** | Login, View Profile, View Attendance, View Grades, View Timetable, Pay Fees, View Library |
| **Staff** | Login, View Profile, View Payslip, View Timetable |

---

## CHAPTER 4 — DATABASE DESIGN

### 4.1 Entity-Relationship Overview

The database contains **20 collections** in MongoDB with the following key relationships:

- **User** has one-to-one with **Student**, **Teacher**, or **Staff**
- **Student** belongs to one **Class**
- **Class** has many **Subjects** and one **Teacher**
- **Student** has many **Payments** and **Fees**
- **Teacher/Staff** has many **SalaryPayments**
- **ExamSession** produces many **ExamResults** per **Student**
- **Timetable** links **Class**, **Subject**, and **Teacher**

### 4.2 Database Tables (Collections)

#### 4.2.1 Users Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `email` | String (unique) | Login email |
| `password` | String (hashed) | bcryptjs hash |
| `fullName` | String | Full name |
| `phone` | String | Contact number |
| `status` | String | active / inactive / suspended |
| `avatar` | String | Profile picture URL |
| `lastLogin` | Date | Last login timestamp |
| `roleAssignments` | Array | Roles assigned to user |
| `teacherProfileId` | ObjectId → Teacher | Teacher profile link |
| `studentProfileId` | ObjectId → Student | Student profile link |
| `createdAt` | Date | Auto timestamp |

#### 4.2.2 Students Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId → User | Linked user account |
| `parentId` | ObjectId → Parent | Guardian link |
| `rollNo` | String (unique) | Roll number |
| `enrollmentYear` | Number | Year of joining |
| `course` | String | BCA / B.Tech / etc. |
| `semester` | String | Current semester |
| `section` | String | Section A/B/C |
| `dateOfBirth` | Date | Date of birth |
| `guardianInfo` | Object | Father/Mother name & phone |
| `address` | Object | Street, City, State, PIN |
| `status` | String | active / graduated / suspended |
| `createdAt` | Date | Auto timestamp |

#### 4.2.3 Teachers Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId → User | Linked user account |
| `employeeNo` | String (unique) | Employee number |
| `department` | String | Department name |
| `qualification` | String | Academic qualification |
| `specialization` | String | Subject specialization |
| `joiningDate` | Date | Date of joining |
| `salary` | Number | Monthly salary (₹) |
| `status` | String | active / inactive |

#### 4.2.4 Staff Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `userId` | ObjectId → User | Linked user account |
| `employeeNo` | String (unique) | Employee number |
| `designation` | String | Job title |
| `department` | String | Department |
| `joiningDate` | Date | Date of joining |
| `salary` | Number | Monthly salary (₹) |
| `status` | String | active / inactive |

#### 4.2.5 Payments Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `studentId` | ObjectId → Student | Paying student |
| `feeTypeId` | ObjectId → FeeType | Type of fee |
| `amount` | Number | Amount paid (₹) |
| `paymentDate` | Date | Date of payment |
| `method` | String | Cash / UPI / Bank Transfer |
| `transactionRef` | String | Transaction reference ID |
| `receiptNo` | String | Receipt number |
| `status` | String | paid / pending / failed |

#### 4.2.6 SalaryPayments Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `recipientId` | ObjectId | Teacher or Staff ID |
| `recipientType` | String | teacher / staff |
| `month` | String | Pay month (e.g., Feb 2026) |
| `basicSalary` | Number | Basic pay (₹) |
| `deductions` | Number | Total deductions (₹) |
| `netSalary` | Number | Net amount (₹) |
| `paidOn` | Date | Payment date |
| `status` | String | processed / pending |

#### 4.2.7 Attendance Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `studentId` | ObjectId → Student | Student attended |
| `classId` | ObjectId → Class | Class |
| `date` | Date | Attendance date |
| `status` | String | present / absent / late |
| `markedBy` | ObjectId → Teacher | Teacher who marked |

#### 4.2.8 Timetable Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `classId` | ObjectId → Class | Target class |
| `day` | String | Monday – Saturday |
| `period` | Number | Period number (1–8) |
| `subjectId` | ObjectId → Subject | Subject for this slot |
| `teacherId` | ObjectId → Teacher | Assigned teacher |
| `startTime` | String | e.g., 09:00 |
| `endTime` | String | e.g., 10:00 |

#### 4.2.9 Books Collection (Library)
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `title` | String | Book title |
| `author` | String | Author name |
| `isbn` | String (unique) | ISBN number |
| `category` | String | Subject category |
| `totalCopies` | Number | Total stock |
| `availableCopies` | Number | Currently available |
| `shelfLocation` | String | Physical location |

#### 4.2.10 ExamResults Collection
| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Primary key |
| `examSessionId` | ObjectId | Exam session |
| `studentId` | ObjectId → Student | Student |
| `subjectId` | ObjectId → Subject | Subject |
| `marksObtained` | Number | Marks scored |
| `totalMarks` | Number | Maximum marks |
| `grade` | String | A+ / A / B / C / F |
| `isPublished` | Boolean | Result visible to student |

### 4.3 Complete List of 20 Collections

| # | Collection | Purpose |
|---|------------|---------|
| 1 | User | Login accounts for all roles |
| 2 | Role | Role definitions (Admin, Teacher, Student, Staff) |
| 3 | Student | Student academic profiles |
| 4 | Teacher | Teacher professional profiles |
| 5 | Staff | Non-teaching staff profiles |
| 6 | Parent | Student guardian information |
| 7 | Class | Class groups (e.g., BCA-1A) |
| 8 | Subject | Course subjects per class |
| 9 | FeeType | Types of fees (tuition, exam, etc.) |
| 10 | StudentFee | Fee records assigned to students |
| 11 | Payment | Fee payment transactions |
| 12 | Receipt | Payment receipts issued |
| 13 | Salary | Employee salary structures |
| 14 | SalaryComponent | Earnings and deduction components |
| 15 | SalaryPayment | Monthly payroll transactions |
| 16 | ExamSession | Exam scheduling records |
| 17 | ExamResult | Student marks and grades |
| 18 | Timetable | Class period scheduling |
| 19 | Project | Student project submissions |
| 20 | Notification | System notifications and alerts |

---

## CHAPTER 5 — IMPLEMENTATION

### 5.1 Development Environment

| Tool | Value |
|------|-------|
| Operating System | Windows 11 |
| Code Editor | Visual Studio Code |
| Node.js Version | 18.x LTS |
| Package Manager | npm |
| Version Control | Git + GitHub |
| Database | MongoDB Atlas (Cloud) |
| API Testing | Postman |
| Browser | Google Chrome |

### 5.2 Project Structure

```
College Management/
├── backend/
│   └── src/
│       ├── config/           # DB connection, app config
│       ├── controllers/      # 13 controller files
│       ├── middleware/       # auth.js, error.js
│       ├── models/           # 20 Mongoose schema files
│       ├── routes/           # 13 route group files
│       ├── utils/            # jwt.js, errors.js, logger.js
│       ├── validation/       # Joi schema validators
│       └── index.js          # Server entry point
│
└── frontend/
    └── src/
        ├── components/       # 18 reusable components
        ├── pages/            # 24 page components
        ├── hooks/            # 4 custom hooks
        ├── services/         # Axios API service layer
        ├── store/            # Zustand auth store
        ├── App.jsx           # Routing configuration
        ├── main.jsx          # App entry point
        └── index.css         # Global styles
```

### 5.3 Key Code Snippets

#### 5.3.1 User Login (Backend — auth.js controller)
```javascript
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate('roleAssignments.roleId');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user._id, email: user.email, role: user.roleAssignments[0].roleId.name } });
};
```

#### 5.3.2 Authentication Middleware
```javascript
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId).select('-password');
  next();
};
```

#### 5.3.3 Student Registration (Frontend)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await api.post('/students', formData);
  if (res.status === 201) {
    toast.success('Student added successfully!');
    navigate('/students');
  }
};
```

#### 5.3.4 Fee Payment Processing
```javascript
const payFee = async (req, res) => {
  const { studentId, feeTypeId, amount, method, transactionRef } = req.body;
  const payment = await Payment.create({
    studentId, feeTypeId, amount, method, transactionRef,
    receiptNo: `RCP-${Date.now()}`,
    status: 'paid',
  });
  res.status(201).json({ message: 'Payment recorded', payment });
};
```

### 5.4 API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user profile |

#### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (paginated) |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

#### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers` | Get all teachers |
| GET | `/api/teachers/:id` | Get one teacher |
| POST | `/api/teachers` | Create teacher |
| PUT | `/api/teachers/:id` | Update teacher |
| DELETE | `/api/teachers/:id` | Delete teacher |

#### Finance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/finance/student/:id` | Get student fee details |
| POST | `/api/finance/pay` | Process fee payment |
| GET | `/api/finance/receipt/:id` | Get payment receipt |
| GET | `/api/finance/payment-history/:id` | Get payment history |

#### Payroll
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payroll/sheet` | Get full payroll sheet |
| GET | `/api/payroll/payslip/:id` | Get individual payslip |
| POST | `/api/payroll/process` | Process monthly payroll |
| POST | `/api/payroll/payment` | Record salary payment |

#### Other Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Admin dashboard statistics |
| POST | `/api/attendance/mark` | Mark student attendance |
| GET | `/api/attendance/report` | Get attendance report |
| GET | `/api/library/books` | Get all books |
| POST | `/api/library/issue` | Issue book to student |
| GET | `/api/reports/financial` | Financial summary report |
| GET | `/api/reports/attendance` | Attendance report |

**Total: 40+ REST API Endpoints**

---

## CHAPTER 6 — SYSTEM MODULES

### 6.1 Authentication Module

The authentication module handles user registration, login, and session management.

**Features:**
- Email and password-based login
- JWT access token (expires: 24 hours)
- JWT refresh token (expires: 7 days)
- Password hashing using bcryptjs (10 salt rounds)
- Role-based access via middleware

**Roles Available:**
| Role | Access Level |
|------|-------------|
| Admin | Full system access |
| Teacher | Classes, attendance, grades, own payslip |
| Student | Own profile, fees, grades, timetable |
| Staff | Own profile, payslip, timetable |

**Login Credentials (Test):**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@college.com | admin123 |
| Teacher | teacher@college.com | teacher123 |
| Student | student@college.com | student123 |

### 6.2 Student Management Module

Manages the complete lifecycle of a student from admission to graduation.

**Operations Supported:**
- Add new student with full profile (personal, academic, guardian, address)
- View students list with search and filter
- Edit student details
- Delete student record
- View detailed student profile page
- Track student status: active / graduated / suspended

**Student Fields Captured:**
Roll No, Name, Course, Semester, Section, Date of Birth, Guardian Info (Father/Mother Name & Phone), Address, Enrollment Year, Status

### 6.3 Teacher Management Module

**Operations Supported:**
- Add teacher with employee number, department, qualification, and salary
- View all teachers with search
- Edit teacher information
- Delete teacher record
- Assign teacher to classes and subjects

### 6.4 Staff Management Module

**Operations Supported:**
- Add non-teaching staff with designation and department
- Full CRUD for staff records
- Integrated with payroll system

### 6.5 Fee Management Module

**Operations Supported:**
- Configure fee types (Tuition, Exam, Library, etc.)
- Assign fees to students
- Accept payment (Cash, UPI, Bank Transfer)
- Generate receipt with unique receipt number
- View payment history per student
- Financial summary dashboard

### 6.6 Payroll Management Module

**Operations Supported:**
- View payroll sheet for all teachers and staff
- Filter by: All / Faculty Only / Staff Only
- Calculate net salary = Basic Pay + Allowances – Deductions
- Process monthly payroll
- Generate individual payslips
- Track payment status (Processed / Pending)
- All amounts in Indian Rupees (₹)

### 6.7 Attendance Management Module

**Operations Supported:**
- Mark daily attendance (Present / Absent / Late)
- Class-wise attendance view
- Date-range attendance reports
- Student attendance percentage calculation

### 6.8 Library Management Module

**Operations Supported:**
- Add and manage book catalogue (Title, Author, ISBN, Category)
- Issue books to students
- Track return dates and fines
- View available vs issued books
- Student-wise borrowing history

### 6.9 Exam & Grades Module

**Operations Supported:**
- Create exam sessions with date, time, subject
- Enter marks for each student
- Auto-calculate grades
- Publish/unpublish results per exam
- Student-wise grade report

### 6.10 Timetable Module

**Operations Supported:**
- Visual timetable builder (Monday–Saturday, Periods 1–8)
- Assign subject and teacher per period
- Class-wise timetable view
- Teacher-wise timetable view

### 6.11 Dashboard & Reports Module

**Admin Dashboard Statistics:**
- Total Students enrolled
- Total Teachers on staff
- Total Non-Teaching Staff
- Total Classes running
- Revenue Collected (₹) this month
- Pending Fee Payments
- Attendance Rate (%)
- Recent Activity Feed

**Reports Available:**
- Attendance Report (class-wise, date-range)
- Financial Report (fee collection summary)
- Payroll Report (monthly salary disbursements)
- Student Progress Report

### 6.12 Notification Module

- System-generated notifications for fee dues
- Grade publication alerts
- Timetable change notifications
- Stored in Notification collection and displayed in UI

---

## CHAPTER 7 — TESTING

### 7.1 Testing Approach

The system was tested using the following approaches:
- **Unit Testing** — Individual functions and controllers
- **Integration Testing** — API endpoint testing using Postman
- **User Acceptance Testing** — End-to-end workflows per role

### 7.2 Test Cases

#### 7.2.1 Authentication Module Test Cases

| TC# | Test Case | Input | Expected Output | Status |
|-----|-----------|-------|-----------------|--------|
| TC01 | Valid login | admin@college.com / admin123 | JWT token returned, redirect to dashboard | ✅ Pass |
| TC02 | Invalid password | admin@college.com / wrongpass | "Invalid credentials" error | ✅ Pass |
| TC03 | Non-existent user | nouser@x.com / pass | "Invalid credentials" error | ✅ Pass |
| TC04 | Access protected route without token | No header | 401 Unauthorized | ✅ Pass |
| TC05 | Access protected route with valid token | Bearer [token] | 200 OK with data | ✅ Pass |

#### 7.2.2 Student Management Test Cases

| TC# | Test Case | Input | Expected Output | Status |
|-----|-----------|-------|-----------------|--------|
| TC06 | Add new student | Valid student data | Student created, 201 response | ✅ Pass |
| TC07 | Add student with duplicate roll no | Existing rollNo | "Roll number already exists" | ✅ Pass |
| TC08 | Get all students | GET /api/students | Paginated list of students | ✅ Pass |
| TC09 | Get student by ID | Valid ObjectId | Student details returned | ✅ Pass |
| TC10 | Get student with invalid ID | Random string | 404 Not Found | ✅ Pass |
| TC11 | Update student | PUT with valid data | Student updated, 200 response | ✅ Pass |
| TC12 | Delete student | DELETE student | Student removed, 200 response | ✅ Pass |

#### 7.2.3 Fee Management Test Cases

| TC# | Test Case | Input | Expected Output | Status |
|-----|-----------|-------|-----------------|--------|
| TC13 | Process fee payment | Student ID + amount + method | Payment recorded, receipt generated | ✅ Pass |
| TC14 | View payment history | Student ID | List of all past payments | ✅ Pass |
| TC15 | Generate receipt | Receipt ID | Receipt details with receipt number | ✅ Pass |

#### 7.2.4 Payroll Test Cases

| TC# | Test Case | Input | Expected Output | Status |
|-----|-----------|-------|-----------------|--------|
| TC16 | Get payroll sheet | GET /api/payroll/sheet | All teacher + staff salary records | ✅ Pass |
| TC17 | Process monthly payroll | Month + year input | Salary payments created for all | ✅ Pass |
| TC18 | Get payslip | Teacher/Staff ID | Individual payslip returned | ✅ Pass |

#### 7.2.5 Security Test Cases

| TC# | Test Case | Expected Output | Status |
|-----|-----------|-----------------|--------|
| TC19 | SQL/NoSQL Injection attempt | Input sanitized, no data leak | ✅ Pass |
| TC20 | Rate limit exceeded (100+ requests) | 429 Too Many Requests | ✅ Pass |
| TC21 | Student accessing admin route | 403 Forbidden | ✅ Pass |
| TC22 | Password stored in plain text? | bcrypt hash verified in DB | ✅ Pass |

### 7.3 Test Results Summary

| Module | Total TCs | Passed | Failed | Pass Rate |
|--------|-----------|--------|--------|-----------|
| Authentication | 5 | 5 | 0 | 100% |
| Student Management | 7 | 7 | 0 | 100% |
| Fee Management | 3 | 3 | 0 | 100% |
| Payroll | 3 | 3 | 0 | 100% |
| Security | 4 | 4 | 0 | 100% |
| **Total** | **22** | **22** | **0** | **100%** |

---

## CHAPTER 8 — CONCLUSION & FUTURE SCOPE

### 8.1 Conclusion

The **College Management System** has been successfully designed, developed, and tested. The system achieves all the objectives set out in the initial requirements:

- ✅ All major college operations are digitized and centralized
- ✅ Four user roles (Admin, Teacher, Student, Staff) with role-based access
- ✅ Complete CRUD operations for Students, Teachers, Staff, Classes
- ✅ Financial module with fee collection, receipts, and payment history
- ✅ Payroll module with payslip generation in Indian Rupees
- ✅ Attendance, Library, Exam, and Timetable modules implemented
- ✅ Real-time dashboard with key statistics
- ✅ Secure authentication with JWT and bcryptjs
- ✅ RESTful API with 40+ endpoints
- ✅ Responsive web interface accessible from any device

The system demonstrates how a carefully architected MERN stack application can effectively replace manual, paper-based college administration processes with an efficient, secure, and scalable digital solution.

### 8.2 Future Scope

The following enhancements are planned for future versions:

1. **Email & SMS Notifications** — Automated alerts for fee dues, exam results, attendance shortfall
2. **Mobile Application** — React Native app for iOS and Android
3. **Bulk CSV Import/Export** — Import multiple students/teachers from Excel
4. **Advanced Analytics** — AI-powered grade prediction and attendance trend analysis
5. **Online Payment Gateway** — Razorpay/Paytm integration for digital fee payments
6. **Parent Portal** — Dedicated login for parents to track ward's progress
7. **Video Conferencing** — Online class integration (Zoom/Google Meet API)
8. **Multi-Language Support** — Hindi and regional language interfaces
9. **Biometric Integration** — Hardware attendance via fingerprint scanner API
10. **Audit Logs** — Complete trail of all admin actions for compliance

---

## REFERENCES

1. MongoDB Documentation. *MongoDB Manual*. https://www.mongodb.com/docs/
2. Express.js Documentation. *Express 4.x API Reference*. https://expressjs.com/en/4x/api.html
3. React Documentation. *React 18 Official Docs*. https://react.dev/
4. Node.js Documentation. *Node.js v18 API*. https://nodejs.org/en/docs/
5. Mongoose Documentation. *Mongoose ODM Guide*. https://mongoosejs.com/docs/
6. JWT.io. *JSON Web Tokens Introduction*. https://jwt.io/introduction
7. Vite Documentation. *Vite Guide*. https://vitejs.dev/guide/
8. Tailwind CSS. *Tailwind CSS Documentation*. https://tailwindcss.com/docs/
9. Zustand. *State Management for React*. https://github.com/pmndrs/zustand
10. Render.com. *Deployment Documentation*. https://render.com/docs
11. Pressman, R.S. (2014). *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill.
12. Silberschatz, A., Galvin, P.B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley.

---

*© 2026 College Management System — MERN Stack Project*  
*Department of Computer Science | [Institute Name] | Academic Year 2025–2026*
