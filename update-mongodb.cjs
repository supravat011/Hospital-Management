# Quick MongoDB Atlas Connection Update Script
# Run this after you get your connection string from MongoDB Atlas

# Usage: 
# 1. Replace YOUR_CONNECTION_STRING_HERE with your actual MongoDB Atlas connection string
# 2. Run this script: node update - mongodb.cjs

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, 'server', '.env');

// REPLACE THIS with your MongoDB Atlas connection string
const MONGODB_URI = 'YOUR_CONNECTION_STRING_HERE';

// Read current .env file
let envContent = fs.readFileSync(envPath, 'utf8');

// Update MongoDB URI
envContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${MONGODB_URI}`
);

// Write back to .env
fs.writeFileSync(envPath, envContent);

console.log('✅ MongoDB connection string updated successfully!');
console.log('📝 Updated file: server/.env');
console.log('🚀 You can now start the server with: npm run server');
