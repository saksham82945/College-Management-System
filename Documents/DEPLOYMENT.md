# 🚀 Deployment Guide - College Management System

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository with latest code
- ✅ Render account ([render.com](https://render.com))
- ✅ MongoDB Atlas account ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

---

## 📋 Step 1: Setup MongoDB Atlas

### 1.1 Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Build a Database"**
3. Choose **FREE M0** cluster
4. Select region closest to your Render region (e.g., Singapore)
5. Create cluster (takes 3-5 minutes)

### 1.2 Configure Network Access
1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Confirm

### 1.3 Create Database User
1. Go to **Database Access** → **Add New Database User**
2. Authentication Method: **Password**
3. Username: `admin` (or your choice)
4. Password: **Generate secure password** (save it!)
5. Database User Privileges: **Atlas admin**
6. Add User

### 1.4 Get Connection String
1. Click **Connect** on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Copy connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/college-management?retryWrites=true&w=majority`

---

## 📋 Step 2: Deploy Backend to Render

### 2.1 Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select: `College-Management-System`

### 2.2 Configure Service
Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | `college-management-backend` |
| **Region** | Singapore (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/college-management?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=https://college-management-frontend.onrender.com
LOG_LEVEL=info
MAX_FILE_SIZE=52428800
PORT=5000
```

> **⚠️ Important**: 
> - Generate strong random secrets for JWT keys (use: `openssl rand -base64 32`)
> - Replace MongoDB URI with your actual connection string
> - Update `FRONTEND_URL` after deploying frontend

### 2.4 Create Service
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Check logs for errors
4. Note your backend URL: `https://college-management-backend.onrender.com`

---

## 📋 Step 3: Deploy Frontend to Render

### 3.1 Update API URL
Before deploying, update the API base URL:

**File**: `frontend/src/services/API_BASE_URL.ts`
```typescript
export const API_BASE_URL = 
  import.meta.env.MODE === 'production'
    ? 'https://college-management-backend.onrender.com/api'
    : 'http://localhost:5000/api';
```

Commit and push this change.

### 3.2 Create Static Site
1. Go to Render Dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect same GitHub repository
4. Select: `College-Management-System`

### 3.3 Configure Static Site
Fill in:

| Field | Value |
|-------|-------|
| **Name** | `college-management-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3.4 Add Environment Variables
```bash
VITE_API_URL=https://college-management-backend.onrender.com/api
```

### 3.5 Create Static Site
1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Your site URL: `https://college-management-frontend.onrender.com`

---

## 📋 Step 4: Update Backend with Frontend URL

1. Go to backend service in Render
2. Navigate to **Environment** tab
3. Update `FRONTEND_URL` to: `https://college-management-frontend.onrender.com`
4. Save changes (triggers redeploy)

---

## 🧪 Step 5: Test Deployment

### 5.1 Backend Health Check
Visit: `https://college-management-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

### 5.2 Frontend Access
1. Visit: `https://college-management-frontend.onrender.com`
2. Landing page should load
3. Open DevTools → Console (should have no errors)

### 5.3 Login Test
1. Click **Login**
2. Use credentials from seed data:
   - **Admin**: `admin@lnmi.edu` / `admin123`
   - **Student**: `student@lnmi.edu` / `student123`
3. Should redirect to dashboard

### 5.4 Full Integration
1. Navigate through different pages
2. Check Network tab - API calls should succeed
3. Test CRUD operations (add a student, etc.)

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails
**Error**: `npm install failed`

**Solution**:
- Check `package.json` is correct
- Ensure all dependencies are listed
- Check build logs for specific errors

### Issue 2: Backend Crashes on Start
**Error**: `Application failed to respond`

**Solution**:
- Check MongoDB connection string is correct
- Verify all required environment variables are set
- Check logs: `https://dashboard.render.com` → Service → Logs

### Issue 3: CORS Errors
**Error**: `Access-Control-Allow-Origin` in browser

**Solution**:
- Verify `FRONTEND_URL` in backend env vars
- Check backend CORS configuration includes frontend URL
- Redeploy backend after changes

### Issue 4: MongoDB Connection Failed
**Error**: `MongoNetworkError` or `MongooseServerSelectionError`

**Solution**:
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Ensure database user has correct permissions

### Issue 5: 404 on Frontend Routes
**Error**: Refresh gives 404

**Solution**:
- Ensure "Rewrite Rules" is set up (already in `render.yaml`)
- All routes should rewrite to `/index.html`

### Issue 6: Environment Variables Not Working
**Solution**:
- Frontend: Must prefix with `VITE_`
- Backend: No prefix needed
- Redeploy after changing env vars

---

## 🔄 Redeployment

### Automatic (Recommended)
Push to `main` branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```
Render auto-deploys on every push!

### Manual
1. Go to Render Dashboard
2. Select service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 📊 Monitoring

### View Logs
- Dashboard → Service → **Logs** tab
- Real-time log streaming
- Check for errors or warnings

### Performance
- Free tier sleeps after 15 min inactivity
- First request after sleep takes ~30s
- Upgrade to paid plan for always-on

---

## 🎯 Next Steps

After successful deployment:
1. ✅ Set up custom domain (optional)
2. ✅ Configure email notifications
3. ✅ Set up monitoring/alerts
4. ✅ Run seed data to populate database
5. ✅ Share URLs with team

---

## 📞 Support

If you encounter issues:
1. Check Render status: [status.render.com](https://status.render.com/)
2. Review logs in Render Dashboard
3. MongoDB Atlas support: [support.mongodb.com](https://support.mongodb.com/)
4. Render Community: [community.render.com](https://community.render.com/)

---

## 🔗 Quick Links

- **Backend**: `https://college-management-backend.onrender.com`
- **Frontend**: `https://college-management-frontend.onrender.com`
- **Render Dashboard**: `https://dashboard.render.com`
- **MongoDB Atlas**: `https://cloud.mongodb.com`

---

**✨ Congratulations! Your College Management System is now live!** 🎉
