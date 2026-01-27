# API Documentation - College Management System

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

All endpoints (except `/auth/login` and `/auth/register`) require JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "9876543210",
  "roleName": "STUDENT"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "63f5c4a1b8c2d9e8f7a6b5c4",
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

---

### 2. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": "63f5c4a1b8c2d9e8f7a6b5c4",
      "email": "user@example.com",
      "fullName": "John Doe",
      "roles": ["STUDENT"]
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

---

### 3. Refresh Token
**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

---

## Student Endpoints

### 1. Get All Students (Paginated)
**Endpoint:** `GET /students?page=1&size=25&classId=xxx&status=active`

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `size` (integer): Records per page (default: 25)
- `classId` (string): Filter by class ID
- `status` (string): Filter by status

**Response (200):**
```json
{
  "data": {
    "total": 150,
    "page": 1,
    "size": 25,
    "students": [
      {
        "id": "63f5c4a1b8c2d9e8f7a6b5c4",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "rollNo": "ENG-001",
        "class": "Class 10 A",
        "section": "A",
        "status": "active"
      }
    ]
  }
}
```

---

### 2. Get Student by ID
**Endpoint:** `GET /students/:id`

**Response (200):**
```json
{
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "rollNo": "ENG-001",
    "class": "Class 10 A",
    "section": "A",
    "dateOfBirth": "2008-05-15",
    "guardianInfo": {
      "fatherName": "James Doe",
      "motherName": "Jane Doe",
      "fatherPhone": "9876543211"
    },
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "status": "active"
  }
}
```

---

### 3. Create Student
**Endpoint:** `POST /students` (ADMIN only)

**Request Body:**
```json
{
  "email": "newstudent@example.com",
  "password": "password123",
  "fullName": "Jane Doe",
  "phone": "9876543210",
  "rollNo": "ENG-002",
  "classId": "63f5c4a1b8c2d9e8f7a6b5c4",
  "section": "A",
  "dateOfBirth": "2008-06-20",
  "guardianInfo": {
    "fatherName": "John Doe",
    "motherName": "Jane Doe"
  },
  "address": {
    "street": "456 Oak St",
    "city": "New York",
    "state": "NY"
  }
}
```

**Response (201):**
```json
{
  "message": "Student created successfully",
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4",
    "rollNo": "ENG-002"
  }
}
```

---

### 4. Update Student
**Endpoint:** `PATCH /students/:id` (ADMIN only)

**Request Body:**
```json
{
  "phone": "9876543215",
  "section": "B"
}
```

**Response (200):**
```json
{
  "message": "Student updated successfully",
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4"
  }
}
```

---

### 5. Delete Student
**Endpoint:** `DELETE /students/:id` (ADMIN only)

**Response (200):**
```json
{
  "message": "Student deleted successfully"
}
```

---

## Teacher Endpoints

### 1. Get All Teachers
**Endpoint:** `GET /teachers?page=1&size=25`

**Response (200):**
```json
{
  "data": {
    "total": 50,
    "page": 1,
    "size": 25,
    "teachers": [
      {
        "id": "63f5c4a1b8c2d9e8f7a6b5c4",
        "name": "Mr. Smith",
        "email": "smith@example.com",
        "phone": "9876543210",
        "employeeNo": "EMP-001",
        "department": "Science",
        "joiningDate": "2020-01-15"
      }
    ]
  }
}
```

---

### 2. Create Teacher
**Endpoint:** `POST /teachers` (ADMIN only)

**Request Body:**
```json
{
  "email": "teacher@example.com",
  "password": "password123",
  "fullName": "Mr. Johnson",
  "phone": "9876543210",
  "employeeNo": "EMP-002",
  "joiningDate": "2023-01-15",
  "department": "Mathematics",
  "qualifications": [
    {
      "degree": "B.Sc",
      "specialization": "Mathematics",
      "university": "State University",
      "year": 2015
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Teacher created successfully",
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4",
    "employeeNo": "EMP-002"
  }
}
```

---

## Book Endpoints

### 1. Get All Books
**Endpoint:** `GET /books?page=1&size=25`

**Response (200):**
```json
{
  "data": {
    "total": 500,
    "page": 1,
    "size": 25,
    "books": [
      {
        "id": "63f5c4a1b8c2d9e8f7a6b5c4",
        "isbn": "978-0134494166",
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "publisher": "Prentice Hall",
        "copiesTotal": 10,
        "copiesAvailable": 8
      }
    ]
  }
}
```

---

### 2. Create Book
**Endpoint:** `POST /books` (ADMIN only)

**Request Body:**
```json
{
  "isbn": "978-0134685274",
  "title": "Effective Java",
  "author": "Joshua Bloch",
  "publisher": "Addison-Wesley",
  "copiesTotal": 5,
  "category": "Programming"
}
```

**Response (201):**
```json
{
  "message": "Book created successfully",
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4",
    "isbn": "978-0134685274"
  }
}
```

---

## Finance Endpoints

### 1. Get Student Fees
**Endpoint:** `GET /finance/student/:studentId`

**Response (200):**
```json
{
  "data": {
    "fees": [
      {
        "id": "63f5c4a1b8c2d9e8f7a6b5c4",
        "feeTypeId": {
          "_id": "63f5c4a1b8c2d9e8f7a6b5c5",
          "name": "Tuition Fee",
          "amount": 50000
        },
        "amountDue": 50000,
        "amountPaid": 0,
        "dueDate": "2024-01-31",
        "status": "unpaid"
      }
    ],
    "totalPending": 50000
  }
}
```

---

### 2. Process Payment
**Endpoint:** `POST /finance/pay`

**Request Body:**
```json
{
  "studentId": "63f5c4a1b8c2d9e8f7a6b5c4",
  "feeTypeId": "63f5c4a1b8c2d9e8f7a6b5c5",
  "amount": 50000,
  "paymentMethod": "credit_card",
  "transactionRef": "TXN-12345"
}
```

**Response (201):**
```json
{
  "message": "Payment processed successfully",
  "data": {
    "paymentId": "63f5c4a1b8c2d9e8f7a6b5c4",
    "receiptId": "63f5c4a1b8c2d9e8f7a6b5c6",
    "receiptNo": "RCP-abc12345"
  }
}
```

---

### 3. Get Receipt
**Endpoint:** `GET /finance/receipt/:id`

**Response (200):**
```json
{
  "data": {
    "receiptNo": "RCP-abc12345",
    "totalAmount": 50000,
    "paidAt": "2024-01-20",
    "paymentMethod": "credit_card",
    "feeDetails": [
      {
        "feeTypeId": "63f5c4a1b8c2d9e8f7a6b5c5",
        "amount": 50000
      }
    ]
  }
}
```

---

## Attendance Endpoints

### 1. Mark Attendance
**Endpoint:** `POST /attendance/mark` (TEACHER, ADMIN)

**Request Body:**
```json
{
  "classId": "63f5c4a1b8c2d9e8f7a6b5c4",
  "subjectId": "63f5c4a1b8c2d9e8f7a6b5c5",
  "date": "2024-01-20",
  "attendanceEntries": [
    {
      "studentId": "63f5c4a1b8c2d9e8f7a6b5c6",
      "status": "present",
      "remarks": ""
    },
    {
      "studentId": "63f5c4a1b8c2d9e8f7a6b5c7",
      "status": "absent",
      "remarks": "Sick leave"
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Attendance marked successfully",
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4"
  }
}
```

---

### 2. Get Attendance Report
**Endpoint:** `GET /attendance/report?studentId=xxx&classId=xxx&startDate=2024-01-01&endDate=2024-01-31`

**Response (200):**
```json
{
  "data": {
    "records": [
      {
        "date": "2024-01-20",
        "attendanceEntries": [
          {
            "studentId": "63f5c4a1b8c2d9e8f7a6b5c6",
            "status": "present"
          }
        ]
      }
    ],
    "stats": {
      "totalClasses": 20,
      "present": 18,
      "absent": 2,
      "late": 0
    }
  }
}
```

---

## Payroll Endpoints

### 1. Get Salary Sheet
**Endpoint:** `GET /payroll/sheet?month=January&year=2024` (ADMIN only)

**Response (200):**
```json
{
  "data": {
    "month": "January",
    "year": 2024,
    "salaries": [
      {
        "id": "63f5c4a1b8c2d9e8f7a6b5c4",
        "teacherId": "63f5c4a1b8c2d9e8f7a6b5c5",
        "basicSalary": 50000,
        "totalEarnings": 55000,
        "totalDeductions": 5000,
        "netSalary": 50000,
        "status": "approved"
      }
    ],
    "totalSalaries": 1
  }
}
```

---

### 2. Get Payslip
**Endpoint:** `GET /payroll/payslip/:id`

**Response (200):**
```json
{
  "data": {
    "id": "63f5c4a1b8c2d9e8f7a6b5c4",
    "teacherId": "63f5c4a1b8c2d9e8f7a6b5c5",
    "month": "January",
    "year": 2024,
    "basicSalary": 50000,
    "earnings": [],
    "deductions": [],
    "netSalary": 50000,
    "status": "paid"
  }
}
```

---

### 3. Process Monthly Salary
**Endpoint:** `POST /payroll/process` (ADMIN only)

**Request Body:**
```json
{
  "month": "January",
  "year": 2024
}
```

**Response (201):**
```json
{
  "message": "Monthly salaries processed successfully",
  "data": {
    "count": 50,
    "month": "January",
    "year": 2024
  }
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "errorCode": "ERROR_CODE"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| NO_TOKEN | 401 | No authentication token provided |
| INVALID_TOKEN | 401 | Invalid or expired token |
| UNAUTHORIZED | 403 | User doesn't have permission |
| STUDENT_NOT_FOUND | 404 | Student record not found |
| TEACHER_NOT_FOUND | 404 | Teacher record not found |
| BOOK_NOT_FOUND | 404 | Book record not found |
| INTERNAL_ERROR | 500 | Internal server error |

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** 
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 99`
  - `X-RateLimit-Reset: 1234567890`

---

## Testing with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Students
curl -X GET http://localhost:5000/api/v1/students \
  -H "Authorization: Bearer <access_token>"

# Create Student
curl -X POST http://localhost:5000/api/v1/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"email":"student@example.com","fullName":"John",...}'
```

---

## Postman Collection

Import the Postman collection from `docs/postman-collection.json` for easier API testing.

---

## Pagination

All list endpoints support pagination with default values:
- Default page: 1
- Default size: 25
- Maximum size: 100

Example:
```
GET /students?page=2&size=50
```

---

## Sorting & Filtering

Some endpoints support sorting and filtering. Check specific endpoint documentation for available filters.

---

For more information, contact the development team or check the GitHub repository.
