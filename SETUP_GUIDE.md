# Setup & Installation Guide

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **MongoDB**: v4.4 or higher
  - Local installation: [MongoDB Community](https://docs.mongodb.com/manual/installation/)
  - Or use MongoDB Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: For version control ([Download](https://git-scm.com/))

## Quick Start

### Step 1: Clone or Extract Project

```bash
# If cloning from Git
git clone <repository-url>
cd College\ Management

# Or if you have the project files, navigate to the project directory
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# - Update MongoDB connection string
# - Set JWT secrets
# - Configure email (optional)
# - Add payment gateway keys if needed
```

#### Backend .env Configuration

```env
# Database
MONGODB_URI=mongodb://localhost:27017/college-management
MONGODB_TEST_URI=mongodb://localhost:27017/college-management-test

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Email (Gmail example - use app-specific password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# File Upload
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# The frontend will automatically proxy API requests to http://localhost:5000
```

### Step 4: Start Services

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Application will start on http://localhost:5173
```

### Step 5: Access Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Initial Setup & Seed Data

### Create Default Admin User

```bash
# Access MongoDB
mongo

# Use the database
use college-management

# Create a test user (You can do this via the API instead)
```

Or use the registration endpoint to create users:

```bash
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

### Create Test Users

**Student:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@college.edu",
    "password": "Student@123",
    "fullName": "John Student",
    "phone": "9876543211",
    "roleName": "STUDENT"
  }'
```

**Teacher:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@college.edu",
    "password": "Teacher@123",
    "fullName": "Jane Teacher",
    "phone": "9876543212",
    "roleName": "TEACHER"
  }'
```

## MongoDB Setup

### Local MongoDB

#### Windows
1. Download MongoDB Community from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will run as a service
4. Connect via `mongodb://localhost:27017`

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or manual start
mongod --config /usr/local/etc/mongod.conf
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongodb

# Enable on boot
sudo systemctl enable mongodb
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/college-management
```

## Database Verification

### Check MongoDB Connection

```bash
# Connect to MongoDB
mongo

# List databases
show dbs

# Use college-management database
use college-management

# Check collections
show collections

# Sample query
db.users.find().limit(5)
```

## Build for Production

### Backend Build

```bash
cd backend

# Build TypeScript
npm run build

# Output: dist/ folder

# Start production server
NODE_ENV=production npm start
```

### Frontend Build

```bash
cd frontend

# Build React app
npm run build

# Output: dist/ folder

# Preview build locally
npm run preview
```

## Deployment

### Deploy Backend

#### Option 1: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create college-management-api

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

#### Option 2: Railway, Render, or AWS
- Follow their documentation for Node.js deployment
- Set environment variables in their dashboard
- Connect your GitHub repository for auto-deployment

### Deploy Frontend

#### Option 1: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

#### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages
```bash
# Update vite.config.ts with base path
npm run build
# Deploy dist/ folder to GitHub Pages
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
1. Check if MongoDB is running
2. Verify connection string in `.env`
3. If using MongoDB Atlas, whitelist your IP

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Verify CORS middleware is configured correctly

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### JWT Token Issues

**Error:** `Invalid token` or `Token expired`

**Solution:**
- Clear localStorage in browser: `localStorage.clear()`
- Check JWT_SECRET is consistent
- Verify token expiry settings

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests (Cypress)
```bash
cd frontend
npm install --save-dev cypress
npx cypress open
```

## Development Tools

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Thunder Client (API testing)
- MongoDB for VS Code
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### Postman Collection

Import `docs/postman-collection.json` in Postman for API testing.

## Environment Variables Summary

### Backend
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| MONGODB_URI | Yes | - | MongoDB connection URL |
| JWT_SECRET | Yes | - | JWT signing secret |
| PORT | No | 5000 | Server port |
| NODE_ENV | No | development | Environment mode |

### Frontend
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| VITE_API_URL | No | http://localhost:5000/api/v1 | API base URL |

## Next Steps

1. **Explore API**: Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. **Customize**: Modify components and pages as needed
3. **Add Features**: Extend functionality using the modular structure
4. **Testing**: Write tests for your components and services
5. **Deploy**: Deploy to your preferred platform

## Support & Help

- Check the main [README.md](../README.md)
- Review API documentation
- Check error logs in console
- Create issues on GitHub for bugs

## Performance Tips

1. **Use React DevTools**: Monitor component renders
2. **Enable Code Splitting**: Lazy load routes and components
3. **Optimize Images**: Compress and use appropriate formats
4. **Database Indexing**: Add indexes for frequently queried fields
5. **Caching**: Implement Redis for session and data caching

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Set strong database password
- [ ] Enable CORS for specific origins only
- [ ] Sanitize user inputs
- [ ] Use environment variables for sensitive data
- [ ] Enable rate limiting
- [ ] Regular security updates

## Useful Commands

```bash
# Backend
npm run dev          # Development mode with hot reload
npm run build        # Build for production
npm start            # Production mode
npm test             # Run tests

# Frontend
npm run dev          # Development mode
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run ESLint

# Git
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

Enjoy building your College Management System! 🎓
