#!/usr/bin/env node

/**
 * Environment Variables Helper for Render Deployment
 * 
 * This script helps generate secure environment variables for your Render deployment.
 * Run: node scripts/generate-render-env.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Environment Variables for Render Deployment\n');
console.log('='.repeat(70));

// Generate secure random strings
function generateSecret(length = 32) {
    return crypto.randomBytes(length).toString('base64');
}

console.log('\n📋 BACKEND ENVIRONMENT VARIABLES');
console.log('-'.repeat(70));

console.log(`
# Copy these to Render Backend Environment Variables:

NODE_ENV=production

# MongoDB Atlas (Replace with YOUR connection string!)
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.xxxxx.mongodb.net/college-management?retryWrites=true&w=majority

# JWT Secrets (Pre-generated for you)
JWT_SECRET=${generateSecret()}
JWT_REFRESH_SECRET=${generateSecret()}
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Frontend URL (Update after deploying frontend!)
FRONTEND_URL=https://your-frontend-name.onrender.com

# Other Settings
LOG_LEVEL=info
MAX_FILE_SIZE=52428800
PORT=5000
`);

console.log('\n📋 FRONTEND ENVIRONMENT VARIABLES');
console.log('-'.repeat(70));

console.log(`
# Copy to Render Frontend Environment Variables:

# Backend API URL (Update with YOUR backend URL!)
VITE_API_URL=https://your-backend-name.onrender.com/api/v1
`);

console.log('\n⚠️  IMPORTANT REMINDERS:');
console.log('-'.repeat(70));
console.log('1. Replace MONGODB_URI with your MongoDB Atlas connection string');
console.log('2. Replace your-frontend-name with your actual Render frontend service name');
console.log('3. Replace your-backend-name with your actual Render backend service name');
console.log('4. Keep JWT_SECRET and JWT_REFRESH_SECRET secure - don\'t share them!');
console.log('\n✅ Save these values in a secure password manager!\n');

console.log('💡 TIP: You can re-run this script to generate new JWT secrets\n');
