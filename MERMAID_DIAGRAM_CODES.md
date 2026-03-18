# Mermaid Diagram Codes - College Management System

All diagrams have been generated using Mermaid.js markup language. Use these codes to regenerate diagrams, export them, or modify them as needed.

---

## 1. GANTT CHART - Project Timeline

**File**: `01_gantt_chart.png`

```mermaid
gantt
    title College Management System - Project Timeline
    dateFormat YYYY-MM-DD
    axisFormat Week %V

    section Phases
    Requirements & Analysis           :req, 2026-01-06, 14d
    System Design                     :des, 2026-01-20, 21d
    Backend Development               :backend, 2026-02-10, 28d
    Frontend Development              :frontend, 2026-02-10, 28d
    Testing & QA                      :test, 2026-03-10, 21d
    Deployment & Documentation        :deploy, 2026-03-31, 10d

    section Milestones
    Project Kickoff                   :crit, m1, 2026-01-06, 1d
    Design Review                     :crit, m2, 2026-02-09, 1d
    Core Features Ready               :crit, m3, 2026-03-09, 1d
    Testing Complete                  :crit, m4, 2026-03-30, 1d
    Launch                            :crit, m5, 2026-04-10, 1d
```

---

## 2. DATA FLOW DIAGRAM - Level 0 (Context Diagram)

**File**: `02_dfd_level0.png`

```mermaid
graph TB
    Admin["👤 Admin<br/>(External Entity)"]
    Student["👤 Students<br/>(External Entity)"]
    Teacher["👤 Teachers<br/>(External Entity)"]
    
    CMS["🔄 College Management<br/>System<br/>(Main Process)"]
    
    DB["💾 MongoDB<br/>Database"]
    
    Admin -->|Login Credentials<br/>System Config| CMS
    CMS -->|Reports & Analytics| Admin
    
    Student -->|Course Info, Attendance<br/>Fee Details| CMS
    CMS -->|Grades, Timetable<br/>Project Submission| Student
    
    Teacher -->|Class Schedule<br/>Attendance Data| CMS
    CMS -->|Student Records<br/>Performance Reports| Teacher
    
    CMS -->|Read/Write Data| DB
    DB -->|Query Results| CMS
    
    style CMS fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#fff
    style DB fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    style Admin fill:#FFB347,stroke:#CC8833,stroke-width:2px
    style Student fill:#FFB347,stroke:#CC8833,stroke-width:2px
    style Teacher fill:#FFB347,stroke:#CC8833,stroke-width:2px
```

---

## 3. DATA FLOW DIAGRAM - Level 1 (Detailed Modules)

**File**: `03_dfd_level1.png`

```mermaid
graph TB
    User["👥 Users<br/>"]
    
    Auth["🔐 Authentication<br/>Module"]
    StudentMgmt["👨‍🎓 Student<br/>Management"]
    Attendance["📋 Attendance<br/>Module"]
    Fee["💰 Fee<br/>Management"]
    Project["📚 Project<br/>Module"]
    Exam["📝 Exam<br/>Module"]
    Dashboard["📊 Dashboard<br/>Module"]
    
    DB["💾 MongoDB<br/>Database"]
    
    User -->|Login| Auth
    Auth -->|Token| User
    
    User -->|Student Info| StudentMgmt
    StudentMgmt -->|Enrolled Courses| User
    
    User -->|Mark Attendance| Attendance
    Attendance -->|Report| User
    
    User -->|Fee Payment| Fee
    Fee -->|Receipt| User
    
    User -->|Submit Project| Project
    Project -->|Feedback| User
    
    User -->|Exam Schedule| Exam
    Exam -->|Marks| User
    
    User -->|View Stats| Dashboard
    Dashboard -->|Analytics| User
    
    Auth -->|User Data| DB
    StudentMgmt -->|Student Records| DB
    Attendance -->|Attendance Records| DB
    Fee -->|Payment Data| DB
    Project -->|Project Records| DB
    Exam -->|Exam Data| DB
    Dashboard -->|Query Data| DB
    
    DB -->|Return Data| Auth
    DB -->|Return Data| StudentMgmt
    DB -->|Return Data| Attendance
    DB -->|Return Data| Fee
    DB -->|Return Data| Project
    DB -->|Return Data| Exam
    DB -->|Return Data| Dashboard
    
    style Auth fill:#FF6B6B,stroke:#CC0000,stroke-width:2px,color:#fff
    style StudentMgmt fill:#4ECDC4,stroke:#0B9A9A,stroke-width:2px,color:#fff
    style Attendance fill:#45B7D1,stroke:#0084B0,stroke-width:2px,color:#fff
    style Fee fill:#96CEB4,stroke:#5FA081,stroke-width:2px,color:#fff
    style Project fill:#FFEAA7,stroke:#CCAA00,stroke-width:2px
    style Exam fill:#DDA15E,stroke:#AA6633,stroke-width:2px,color:#fff
    style Dashboard fill:#BC6C25,stroke:#8B3E00,stroke-width:2px,color:#fff
    style DB fill:#50C878,stroke:#2E7D4E,stroke-width:3px,color:#fff
    style User fill:#FFB347,stroke:#CC8833,stroke-width:2px
```

---

## 4. ENTITY RELATIONSHIP DIAGRAM (ER Diagram)

**File**: `04_er_diagram.png`

```mermaid
erDiagram
    USER ||--o{ STUDENT : "becomes"
    USER ||--o{ TEACHER : "becomes"
    USER ||--o{ STAFF : "becomes"
    USER ||--o{ ADMIN : "becomes"
    
    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ PAYMENT : "makes"
    STUDENT ||--o{ STUDENTFEE : "owes"
    STUDENT ||--o{ PROJECT : "submits"
    STUDENT ||--o{ COURSE : "enrolls_in"
    STUDENT }o--|| PARENT : "has"
    
    TEACHER ||--o{ COURSE : "teaches"
    TEACHER ||--o{ SUBJECT : "specializes_in"
    TEACHER ||--o{ EXAM : "conducts"
    TEACHER ||--o{ SALARY : "earns"
    
    COURSE ||--o{ SUBJECT : "contains"
    COURSE ||--o{ TIMETABLE : "has"
    COURSE ||--o{ ATTENDANCE : "takes"
    
    EXAM ||--o{ SUBJECT : "for_subject"
    EXAM ||--o{ PROJECT : "part_of"
    
    SUBJECT ||--o{ STUDENTFEE : "charged_for"
    
    PAYMENT ||--o{ RECEIPT : "generates"
    STUDENTFEE ||--o{ RECEIPT : "paid_by"
    
    STAFF ||--o{ SALARY : "earns"
    SALARY ||--o{ SALARYCOMPONENT : "includes"
    SALARY ||--o{ SALARYPAYMENT : "records"
    
    ROLE ||--o{ USER : "assigned_to"
    NOTIFICATION ||--o{ USER : "sent_to"
    
    USER {
        ObjectId _id PK
        string email UK
        string password
        string name
        enum role
        timestamp createdAt
    }
    
    STUDENT {
        ObjectId _id PK
        ObjectId userId FK
        string rollNumber UK
        string section
        float cgpa
        timestamp enrollmentDate
    }
    
    TEACHER {
        ObjectId _id PK
        ObjectId userId FK
        string employeeId UK
        string department
        string specialization
        timestamp joinDate
    }
    
    COURSE {
        ObjectId _id PK
        string className UK
        int capacity
        ObjectId teacherId FK
        string section
    }
    
    SUBJECT {
        ObjectId _id PK
        string subjectName UK
        int credits
        string code UK
    }
    
    ATTENDANCE {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId courseId FK
        date date
        enum status
    }
    
    EXAM {
        ObjectId _id PK
        ObjectId subjectId FK
        ObjectId teacherId FK
        date examDate
        string type
    }
    
    PROJECT {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId examId FK
        string title
        string status
        date submissionDate
    }
    
    PAYMENT {
        ObjectId _id PK
        ObjectId studentId FK
        float amount
        date paymentDate
        enum status
    }
    
    RECEIPT {
        ObjectId _id PK
        ObjectId paymentId FK
        ObjectId studentFeeId FK
        string receiptNumber UK
        date issueDate
    }
    
    PARENT {
        ObjectId _id PK
        ObjectId studentId FK
        string name
        string phone
        string relation
    }
    
    STAFF {
        ObjectId _id PK
        ObjectId userId FK
        string employeeId UK
        string department
        string designation
    }
    
    SALARY {
        ObjectId _id PK
        ObjectId staffId FK
        ObjectId teacherId FK
        float baseSalary
        date salaryMonth
    }
    
    SALARYCOMPONENT {
        ObjectId _id PK
        ObjectId salaryId FK
        string component
        float amount
    }
    
    SALARYPAYMENT {
        ObjectId _id PK
        ObjectId salaryId FK
        float paidAmount
        date paymentDate
        enum status
    }
    
    STUDENTFEE {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId subjectId FK
        float feeAmount
        enum status
    }
    
    TIMETABLE {
        ObjectId _id PK
        ObjectId courseId FK
        string day
        string time
        ObjectId subjectId FK
    }
    
    ROLE {
        ObjectId _id PK
        string roleName UK
        string permissions
    }
    
    NOTIFICATION {
        ObjectId _id PK
        ObjectId userId FK
        string title
        string message
        timestamp createdAt
    }
```

---

## 5. MONGODB COLLECTIONS SCHEMA & RELATIONSHIPS

**File**: `05_schema_diagram.png`

```mermaid
graph LR
    User["<b>USER Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>email: String<br/>password: String<br/>name: String<br/>role: String<br/>createdAt: Date"]
    
    Student["<b>STUDENT Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>userId: FK<br/>rollNumber: String<br/>section: String<br/>cgpa: Number<br/>enrollmentDate: Date"]
    
    Teacher["<b>TEACHER Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>userId: FK<br/>employeeId: String<br/>department: String<br/>specialization: String"]
    
    Class["<b>CLASS Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>className: String<br/>capacity: Number<br/>teacherId: FK<br/>section: String"]
    
    Subject["<b>SUBJECT Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>subjectName: String<br/>credits: Number<br/>code: String"]
    
    Attendance["<b>ATTENDANCE Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>studentId: FK<br/>classId: FK<br/>date: Date<br/>status: String"]
    
    Exam["<b>EXAM Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>subjectId: FK<br/>teacherId: FK<br/>examDate: Date<br/>type: String"]
    
    Project["<b>PROJECT Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>studentId: FK<br/>examId: FK<br/>title: String<br/>status: String"]
    
    Payment["<b>PAYMENT Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>studentId: FK<br/>amount: Number<br/>paymentDate: Date<br/>status: String"]
    
    Receipt["<b>RECEIPT Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>paymentId: FK<br/>receiptNumber: String<br/>issueDate: Date"]
    
    Salary["<b>SALARY Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>staffId: FK<br/>baseSalary: Number<br/>salaryMonth: Date"]
    
    Timetable["<b>TIMETABLE Collection</b><br/>━━━━━━━━━━━<br/>_id: ObjectId<br/>classId: FK<br/>day: String<br/>time: String<br/>subjectId: FK"]
    
    User -->|1| Student
    User -->|1| Teacher
    Student -->|M| Attendance
    Student -->|M| Payment
    Student -->|M| Project
    Teacher -->|1| Class
    Teacher -->|M| Exam
    Class -->|M| Subject
    Class -->|M| Attendance
    Class -->|M| Timetable
    Subject -->|M| Exam
    Subject -->|M| Timetable
    Exam -->|1| Project
    Payment -->|1| Receipt
    Salary -->|1| Receipt
    
    style User fill:#FF6B6B,stroke:#CC0000,color:#fff,stroke-width:2px
    style Student fill:#4ECDC4,stroke:#0B9A9A,color:#fff,stroke-width:2px
    style Teacher fill:#45B7D1,stroke:#0084B0,color:#fff,stroke-width:2px
    style Class fill:#96CEB4,stroke:#5FA081,color:#fff,stroke-width:2px
    style Subject fill:#FFEAA7,stroke:#CCAA00,stroke-width:2px
    style Attendance fill:#DDA15E,stroke:#AA6633,color:#fff,stroke-width:2px
    style Exam fill:#BC6C25,stroke:#8B3E00,color:#fff,stroke-width:2px
    style Project fill:#E8B4B8,stroke:#AA6666,stroke-width:2px
    style Payment fill:#A8D8EA,stroke:#5FA6C8,color:#fff,stroke-width:2px
    style Receipt fill:#AA96DA,stroke:#6666AA,color:#fff,stroke-width:2px
    style Salary fill:#FCBAD3,stroke:#AA6699,stroke-width:2px
    style Timetable fill:#FFFACD,stroke:#CCCC00,stroke-width:2px
```

---

## 6. SYSTEM ARCHITECTURE - Three-Tier MERN Stack

**File**: `06_architecture.png`

```mermaid
graph TB
    Client["🌐 Client Layer<br/>React.js Frontend<br/>(Vite + Tailwind CSS)"]
    
    API["⚙️ API Layer<br/>Express.js Server<br/>(RESTful APIs)"]
    
    subgraph Services["🔧 Business Logic Layer"]
        Auth["🔐 Auth Service"]
        Student["👨‍🎓 Student Service"]
        Teacher["👨‍🏫 Teacher Service"]
        Attendance["📋 Attendance Service"]
        Fee["💳 Fee Service"]
        Exam["📝 Exam Service"]
        Project["📚 Project Service"]
        Payroll["💰 Payroll Service"]
        Report["📊 Report Service"]
    end
    
    Middleware["🛡️ Middleware Layer<br/>Authentication, Authorization<br/>Error Handling, Validation"]
    
    Database["💾 MongoDB<br/>(NoSQL Database)<br/>Multiple Collections"]
    
    Cache["⚡ Cache Layer<br/>(Redis - Optional)<br/>Session Management"]
    
    External["🌍 External Services<br/>Email Notifications<br/>Payment Gateway<br/>File Storage"]
    
    Client -->|HTTP/REST| API
    API --> Middleware
    Middleware --> Services
    Services --> Database
    Services -.->|Cache| Cache
    API -.-> External
    
    style Client fill:#FF9999,stroke:#CC0000,stroke-width:2px,color:#fff
    style API fill:#99CCFF,stroke:#0066CC,stroke-width:2px,color:#fff
    style Services fill:#99FF99,stroke:#009900,stroke-width:2px,color:#000
    style Middleware fill:#FFCC99,stroke:#FF9900,stroke-width:2px,color:#000
    style Database fill:#CC99FF,stroke:#6600CC,stroke-width:2px,color:#fff
    style Cache fill:#FFE699,stroke:#FFCC00,stroke-width:2px,color:#000
    style External fill:#FF99CC,stroke:#FF0066,stroke-width:2px,color:#fff
```

---

## 7. USER ROLES & PERMISSION MATRIX

**File**: `07_roles_permissions.png`

```mermaid
graph TB
    Admin["👨‍💼 ADMIN<br/>━━━━━━━━━━━<br/>✓ Full System Access<br/>✓ User Management<br/>✓ Role Assignment<br/>✓ System Configuration<br/>✓ Reports & Analytics<br/>✓ Audit Logs"]
    
    Teacher["👨‍🏫 TEACHER<br/>━━━━━━━━━━━<br/>✓ Mark Attendance<br/>✓ Upload Grades<br/>✓ Conduct Exams<br/>✓ View Assigned Classes<br/>✓ Access Student Reports<br/>✓ Submit Payroll Info"]
    
    Student["👨‍🎓 STUDENT<br/>━━━━━━━━━━━<br/>✓ View Timetable<br/>✓ Check Attendance<br/>✓ View Grades<br/>✓ Pay Fees Online<br/>✓ Submit Projects<br/>✓ Download Certificates"]
    
    Parent["👨‍👩‍👧 PARENT<br/>━━━━━━━━━━━<br/>✓ View Child Progress<br/>✓ Check Attendance<br/>✓ View Grades<br/>✓ Pay Fees<br/>✓ Communicate Teacher<br/>✓ Receive Notifications"]
    
    Staff["👨‍💼 STAFF<br/>━━━━━━━━━━━<br/>✓ View Payroll<br/>✓ Submit Attendance<br/>✓ Access Dashboard<br/>✓ View Salary Components<br/>✓ Update Profile<br/>✓ View Reports"]
    
    System["🔄 CORE SYSTEM"]
    
    System -->|User Authentication| Admin
    System -->|User Authentication| Teacher
    System -->|User Authentication| Student
    System -->|User Authentication| Parent
    System -->|User Authentication| Staff
    
    Admin -->|Manages| Teacher
    Admin -->|Manages| Student
    Admin -->|Manages| Staff
    Admin -->|Manages| System
    
    Teacher -->|Interacts| Student
    Student -->|Connected| Parent
    
    style Admin fill:#FF6B6B,stroke:#CC0000,stroke-width:2px,color:#fff
    style Teacher fill:#45B7D1,stroke:#0084B0,stroke-width:2px,color:#fff
    style Student fill:#4ECDC4,stroke:#0B9A9A,stroke-width:2px,color:#fff
    style Parent fill:#FFB6C1,stroke:#FF69B4,stroke-width:2px,color:#fff
    style Staff fill:#DDA15E,stroke:#AA6633,stroke-width:2px,color:#fff
    style System fill:#96CEB4,stroke:#5FA081,stroke-width:2px,color:#000
```

---

## 🚀 How to Use These Codes

### Export as SVG:
1. Visit [mermaid.live](https://mermaid.live)
2. Paste code from above
3. Click "Download SVG" button
4. Save file with appropriate name

### Export as PNG:
1. Use mermaid.live and click "Download PNG"
2. Or use VS Code with Mermaid extension
3. Right-click diagram → "Save as image"

### Modify Diagrams:
- Edit colors by changing hex codes (e.g., `fill:#FF6B6B`)
- Change text in quoted strings
- Adjust connections by modifying arrows
- Add/remove entities or relationships

---

**All diagrams are ready for professional PDF integration!**
