# 🚀 Quick Start Deployment Checklist

Follow these steps in order. Check off each step as you complete it.

---

## ✅ **Step 1: Setup MongoDB Atlas** (10 minutes)

### 1.1 Create Account
- [ ] Go to: https://www.mongodb.com/cloud/atlas/register
- [ ] Sign up with **Google** or **GitHub** (recommended)
- [ ] Verify your email

### 1.2 Create Free Cluster
- [ ] Click **"Build a Database"**
- [ ] Select **"M0 FREE"** tier (0 cost)
- [ ] Choose provider: **AWS**
- [ ] Region: **Singapore (ap-southeast-1)** or closest to you
- [ ] Cluster Name: `college-cluster` (or keep default)
- [ ] Click **"Create"** (takes 3-5 minutes)

### 1.3 Configure Network Access
- [ ] Go to **"Network Access"** in left sidebar
- [ ] Click **"Add IP Address"**
- [ ] Click **"Allow Access from Anywhere"** button
- [ ] It will auto-fill: `0.0.0.0/0`
- [ ] Click **"Confirm"**

### 1.4 Create Database User
- [ ] Go to **"Database Access"** in left sidebar 
- [ ] Click **"Add New Database User"**
- [ ] Authentication: **Password**
- [ ] Username: `collegeadmin`
- [ ] Password: Click **"Autogenerate Secure Password"** → **COPY AND SAVE THIS!**
- [ ] Database User Privileges: **Read and write to any database**
- [ ] Click **"Add User"**

### 1.5 Get Connection String
- [ ] Go back to **"Database"** (left sidebar)
- [ ] Click **"Connect"** button on your cluster
- [ ] Choose **"Drivers"**
- [ ] Driver: **Node.js**, Version: **5.5 or later**
- [ ] Copy the connection string (looks like):
  ```
  mongodb+srv://collegeadmin:<password>@college-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- [ ] **Replace** `<password>` with your actual password from step 1.4
- [ ] **Add database name** at the end:
  ```
  mongodb+srv://collegeadmin:YOUR_PASSWORD@college-cluster.xxxxx.mongodb.net/college-management?retryWrites=true&w=majority
  ```
- [ ] **SAVE THIS CONNECTION STRING** - You'll need it for Render!

**MongoDB Atlas Setup Complete!** ✅

---

## ✅ **Step 2: Deploy Backend to Render** (15 minutes)

### 2.1 Create Render Account
- [ ] Go to: https://dashboard.render.com/register
- [ ] Sign up with **GitHub** (recommended - enables auto-deploy)
- [ ] Authorize Render to access your GitHub

### 2.2 Connect Repository
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect to **GitHub repository**: `College-Management-System`
- [ ] Click **"Connect"**

### 2.3 Configure Backend Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `college-backend` |
| **Region** | `Singapore` (or same as MongoDB) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 2.4 Add Environment Variables
Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these one by one (click "Add Environment Variable" for each):

```bash
# 1. Node Environment
NODE_ENV=production

# 2. MongoDB (PASTE YOUR CONNECTION STRING FROM STEP 1.5!)
MONGODB_URI=mongodb+srv://collegeadmin:YOUR_PASSWORD@college-cluster.xxxxx.mongodb.net/college-management?retryWrites=true&w=majority

# 3. JWT Secrets (generate random strings)
JWT_SECRET=d8f4h3j9k2l5m6n7p1q4r8s2t5u9v3w6x0y2z5a7b3c6
JWT_REFRESH_SECRET=k9m2n5p1q8r3s7t2u6v9w3x0y4z7a1b5c8d2e6f9g3h7

# 4. JWT Expiration
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# 5. Frontend URL (UPDATE THIS IN STEP 3!)
FRONTEND_URL=https://college-frontend.onrender.com

# 6. Other Settings
LOG_LEVEL=info
MAX_FILE_SIZE=52428800
PORT=5000
```

**⚠️ Important Notes:**
- Replace `YOUR_PASSWORD` in `MONGODB_URI` with your actual password
- Generate strong random secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET`
- You'll update `FRONTEND_URL` after deploying frontend in Step 3

### 2.5 Deploy Backend
- [ ] Click **"Create Web Service"**
- [ ] Wait for deployment (5-10 minutes)
- [ ] Check logs for errors – should say "MongoDB connected successfully"
- [ ] **COPY YOUR BACKEND URL**: `https://college-backend.onrender.com`

### 2.6 Test Backend
- [ ] Open: `https://college-backend.onrender.com/health`
- [ ] Should return: `{"status":"OK","message":"Server is running"}`

**Backend Deployed!** ✅

---

## ✅ **Step 3: Deploy Frontend to Render** (10 minutes)

### 3.1 Create Static Site
- [ ] Go to Render Dashboard
- [ ] Click **"New +"** → **"Static Site"**
- [ ] Select same GitHub repository

### 3.2 Configure Frontend
| Setting | Value |
|---------|-------|
| **Name** | `college-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3.3 Add Environment Variable
Click **"Advanced"** → **"Environment Variables"**:

```bash
# Replace with YOUR backend URL from Step 2.5
VITE_API_URL=https://college-backend.onrender.com/api/v1
```

### 3.4 Deploy Frontend
- [ ] Click **"Create Static Site"**
- [ ] Wait for deployment (3-5 minutes)
- [ ] **COPY YOUR FRONTEND URL**: `https://college-frontend.onrender.com`

**Frontend Deployed!** ✅

---

## ✅ **Step 4: Final Configuration** (5 minutes)

### 4.1 Update Backend with Frontend URL
- [ ] Go to Render Dashboard → **Backend Service**
- [ ] Click **"Environment"** tab
- [ ] Find `FRONTEND_URL` variable
- [ ] **Update** to: `https://college-frontend.onrender.com` (your actual URL)
- [ ] Click **"Save Changes"** (triggers auto-redeploy)

### 4.2 Wait for Redeploy
- [ ] Wait 2-3 minutes for backend to redeploy
- [ ] Check logs again - should still show "MongoDB connected"

**Configuration Complete!** ✅

---

## ✅ **Step 5: Test Your Deployment!** (5 minutes)

### 5.1 Access Frontend
- [ ] Open: `https://college-frontend.onrender.com`
- [ ] Landing page should load properly
- [ ] No console errors (F12 → Console)

### 5.2 Test Login
- [ ] Click **"Login"** button
- [ ] Use test credentials:
  - Email: `admin@lnmi.edu`
  - Password: `admin123`
- [ ] Should redirect to Dashboard

### 5.3 Test Features
- [ ] Navigate to **Students** page
- [ ] Navigate to **Teachers** page
- [ ] Navigate to **Timetable** page
- [ ] All pages should load without errors

### 5.4 Check API Calls
- [ ] Open DevTools (F12) → **Network** tab
- [ ] Refresh the page
- [ ] API calls should show `200 OK` status
- [ ] No CORS errors

---

## 🎉 **DEPLOYMENT COMPLETE!**

### Your Live URLs:
- **Frontend**: `https://college-frontend.onrender.com`
- **Backend API**: `https://college-backend.onrender.com`
- **Database**: MongoDB Atlas (M0 Free Cluster)

### Share These Credentials:
Default login credentials (from seed data):
- **Admin**: `admin@lnmi.edu` / `admin123`
- **Student**: `student@lnmi.edu` / `student123`
- **Teacher**: `teacher@lnmi.edu` / `teacher123`

---

## ⚠️ Important Notes

### Free Tier Limitations:
- **Backend** sleeps after 15min inactivity → first request takes ~30s
- **Frontend** doesn't sleep (always fast)
- **MongoDB** M0 tier: 512MB storage (enough for 1000s of students)

### To Keep Backend Awake:
Use a service like **Cron-job.org** or **UptimeRobot** to ping:
```
https://college-backend.onrender.com/health
```
Every 10 minutes.

---

## 🐛 Common Issues

### "MongoDB connection failed"
- Check Network Access (0.0.0.0/0)
- Verify connection string password
- Check database user permissions

### CORS errors
- Verify `FRONTEND_URL` in backend env vars
- Ensure both services are deployed

### "Build failed"
- Check build logs in Render
- Verify package.json is correct
- Try manual deploy

---

## 🔄 Future Updates

To deploy new changes:
1. Push to GitHub main branch
2. Render auto-deploys (if connected via GitHub)
3. Or click "Manual Deploy" in Render dashboard

---

**Need help?** Check DEPLOYMENT.md for detailed troubleshooting!
