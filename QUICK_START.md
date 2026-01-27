# Quick Start Guide - College Management System

Get up and running in 5 minutes! ⚡

## Prerequisites Check ✓

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running locally or cloud connection
- [ ] Git (optional)

## 1️⃣ Start Backend (5 min)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected successfully
```

## 2️⃣ Start Frontend (2 min)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 234 ms
➜  Local:   http://localhost:5173/
```

## 3️⃣ Access Application

Open browser: **http://localhost:5173**

## 4️⃣ Create Admin Account

**First Run:** Create an admin user for testing

```bash
# Use the registration endpoint
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@college.edu",
    "password": "Admin@123",
    "fullName": "Admin User",
    "phone": "9876543210",
    "roleName": "ADMIN"
  }'
```

Or use the signup form in the app.

## 5️⃣ Login & Explore

1. Go to http://localhost:5173/login
2. Enter credentials:
   - Email: `admin@college.edu`
   - Password: `Admin@123`
3. Click "Sign In"

## 📊 Explore Features

### Available Modules
- ✅ **Dashboard** - Overview & statistics
- ✅ **Students** - Manage student records
- ✅ **Teachers** - Manage teacher profiles
- ✅ **Books** - Library management
- ✅ **Fees** - Financial tracking
- ✅ **Attendance** - Mark attendance
- ✅ **Exams** - Exam management
- ✅ **Payroll** - Salary management

## 🔧 Useful Commands

### Backend
```bash
npm run dev      # Start with hot reload
npm run build    # Build for production
npm start        # Run production build
npm test         # Run tests
npm run lint     # Check code style
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
npm run lint     # Check code style
```

## 🐛 Troubleshooting

### Issue: Port 5000 already in use
```bash
# Find process using port 5000 (Windows)
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

### Issue: MongoDB connection error
```bash
# Check MongoDB is running
# For local: mongod should be running
# For Atlas: Update MONGODB_URI in .env
```

### Issue: CORS Error
```bash
# Make sure FRONTEND_URL in backend/.env matches your frontend URL
FRONTEND_URL=http://localhost:5173
```

### Issue: Module not found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 Next Steps

1. **Read Full Documentation**: [README.md](./README.md)
2. **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. **API Documentation**: [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)
4. **Features & Roadmap**: [FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md)

## 🎯 Common Tasks

### Create a Student
1. Login as Admin
2. Click "Students" in sidebar
3. Click "Add Student" button
4. Fill form and submit

### Add a Teacher
1. Login as Admin
2. Click "Teachers" in sidebar
3. Click "Add Teacher" button
4. Fill form and submit

### Process Payment
1. Go to Finance module
2. Select student
3. Click "Pay Fee"
4. Enter amount and payment method
5. Submit

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@college.edu | Admin@123 |

(Create more users through registration)

## 📡 API Testing

### Using cURL
```bash
# Login
TOKEN=$(curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"Admin@123"}' \
  | jq -r '.data.tokens.accessToken')

# Get Students
curl http://localhost:5000/api/v1/students \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman
1. Import collection from `docs/postman-collection.json`
2. Set `baseUrl` to `http://localhost:5000/api/v1`
3. Login to get token
4. Use token in Bearer authentication
5. Test endpoints

## 🏗️ Project Structure

```
backend/          ← API Server (port 5000)
  src/
    models/       ← Database schemas
    controllers/  ← Business logic
    routes/       ← API endpoints
    middleware/   ← Auth & validation

frontend/         ← React App (port 5173)
  src/
    components/   ← Reusable components
    pages/        ← Page components
    services/     ← API client
    store/        ← State management
```

## ⚙️ Configuration Files

### Backend Configuration
- `backend/.env` - Environment variables
- `backend/tsconfig.json` - TypeScript config
- `backend/package.json` - Dependencies

### Frontend Configuration
- `frontend/.env` - Environment variables (optional)
- `frontend/vite.config.ts` - Vite config
- `frontend/tailwind.config.js` - Tailwind config
- `frontend/package.json` - Dependencies

## 📝 Important Files

| File | Purpose |
|------|---------|
| README.md | Main documentation |
| SETUP_GUIDE.md | Detailed setup |
| PROJECT_SUMMARY.md | Project overview |
| FEATURES_CHECKLIST.md | Features & roadmap |
| docs/API_DOCUMENTATION.md | API reference |

## 🚀 Quick Deployment

### Deploy Backend to Heroku
```bash
cd backend
heroku create college-management-api
heroku config:set MONGODB_URI=<your-mongodb-url>
git push heroku main
```

### Deploy Frontend to Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

## 💡 Pro Tips

1. **Use MongoDB Compass** for visual database management
2. **Keep tokens in localStorage** - They're automatically managed
3. **Use React DevTools** to debug state
4. **Check browser console** for API errors
5. **Postman** is great for API testing before using it in frontend

## 🎓 Learning Resources

- Backend: [Express.js Docs](https://expressjs.com/)
- Frontend: [React Docs](https://react.dev/)
- Database: [MongoDB Docs](https://docs.mongodb.com/)
- API: [RESTful API Design](https://restfulapi.net/)

## 📞 Quick Help

**Issue?** Check these files in order:
1. Error message in console
2. SETUP_GUIDE.md (Troubleshooting section)
3. Project logs
4. Check that all services are running

## ✨ You're All Set!

Your College Management System is now running! 🎉

**Next:**
- Explore the dashboard
- Create test data
- Review documentation
- Customize for your needs

---

**Happy Coding!** 🚀

*For detailed information, refer to the complete documentation.*
