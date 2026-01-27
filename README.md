# College Management System - MERN Stack

A comprehensive College Management System built with MongoDB, Express, React, and Node.js.

## Project Overview

This is a full-stack application designed to manage all aspects of a college, including students, teachers, staff, library, fees, attendance, exams, timetables, payroll, and reporting.

### Key Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, Teacher, Student, Staff)
- Token refresh mechanism

✅ **Core Modules**
- Student Management (CRUD operations, profiles, academic history)
- Teacher Management (assignment, qualifications, salary)
- Staff Management
- Library Management (books, loans, fines)
- Fee Management (invoices, payments, receipts)
- Attendance Tracking (manual and bulk upload)
- Exam Management (scheduling, marks entry, results)
- Timetable Management (view and edit)
- Payroll Management (salary calculation, disbursement)
- Notifications & Alerts
- Reporting & Analytics

✅ **Technical Features**
- RESTful API design
- MongoDB for data persistence
- Responsive UI with Tailwind CSS
- Server-side pagination
- Input validation and error handling
- Rate limiting and security middleware
- Structured logging

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: JavaScript (ES6+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, cors, rate-limit
- **Validation**: Joi

### Frontend
- **Library**: React 18
- **Language**: JavaScript (ES6+)
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: React Query, Axios
- **Forms**: Formik + Yup
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Icons**: Lucide React

## Project Structure

```
College Management/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   ├── validators/      # Input validators
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Entry point
│   ├── package.json
│   ├── jsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── docs/
    └── API_DOCUMENTATION.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# - MongoDB connection string
# - JWT secrets
# - Email configuration
# - Payment gateway keys

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/college-management

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Payment Gateway
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token

### Students
- `GET /api/v1/students` - Get all students (paginated)
- `GET /api/v1/students/:id` - Get student details
- `POST /api/v1/students` - Create new student
- `PATCH /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student

### Teachers
- `GET /api/v1/teachers` - Get all teachers
- `POST /api/v1/teachers` - Create teacher
- `PATCH /api/v1/teachers/:id` - Update teacher

### Finance
- `GET /api/v1/fees/students/:id` - Get student fees
- `POST /api/v1/fees/pay` - Pay fees
- `GET /api/v1/receipts/:id` - Get receipt

### Attendance
- `POST /api/v1/attendance/mark` - Mark attendance
- `GET /api/v1/attendance/report` - Get attendance report

### Exams
- `GET /api/v1/exams` - Get exams
- `POST /api/v1/exams` - Create exam
- `POST /api/v1/exam-results` - Submit marks

### Payroll
- `GET /api/v1/payroll/salary/:id` - Get salary details
- `POST /api/v1/payroll/process` - Process monthly payroll

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  fullName: String,
  phone: String,
  status: String,
  avatar: String,
  lastLogin: Date,
  roleAssignments: [{
    roleId: ObjectId (ref: Role),
    scopeId: ObjectId,
    assignedAt: Date,
    assignedBy: ObjectId
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Students Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  rollNo: String (unique),
  enrollmentYear: Number,
  classId: ObjectId (ref: Class),
  section: String,
  dateOfBirth: Date,
  guardianInfo: {
    fatherName: String,
    motherName: String,
    phones: String[]
  },
  address: {
    street: String,
    city: String,
    state: String,
    pinCode: String
  },
  status: String,
  academicRecords: [{
    examId: ObjectId,
    marks: Number,
    grade: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

### Backend Tests
```bash
cd backend
npm run test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Deployment

### Backend Deployment (Heroku/Railway)
```bash
cd backend
npm run build
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```

## Security Considerations

✅ **Implemented**
- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control
- CORS configuration
- Rate limiting
- Helmet security headers
- Input validation

⚠️ **To Implement**
- HTTPS enforcement
- CSRF protection
- XSS prevention
- SQL injection prevention
- API request signing
- PII encryption at rest
- Audit logging

## Performance Optimization

- Database indexing on frequently queried fields
- Server-side pagination for large datasets
- Response caching strategy
- Lazy loading of components
- Code splitting in React
- Database connection pooling

## Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts
- [ ] WhatsApp integration
- [ ] Video conferencing for online classes
- [ ] Mobile app (React Native)
- [ ] AI-powered exam proctoring
- [ ] Advanced analytics dashboard
- [ ] Integration with payment gateways
- [ ] Document management system
- [ ] Multi-language support (i18n)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and questions, please create an issue on GitHub or contact the development team.

## License

MIT License - feel free to use this project for your college management needs.
