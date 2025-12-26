# 🚀 Quick Deployment Reference

## Step-by-Step Checklist

### 1️⃣ MongoDB Atlas Setup
- [ ] Create free cluster at mongodb.com/cloud/atlas
- [ ] Create database user with password
- [ ] Allow access from anywhere (0.0.0.0/0)
- [ ] Copy connection string

### 2️⃣ Deploy Backend to Render
- [ ] Go to render.com → New Web Service
- [ ] Connect GitHub repo
- [ ] Root Directory: `server`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add environment variables (see below)
- [ ] Copy backend URL after deployment

### 3️⃣ Deploy Frontend to Vercel
- [ ] Go to vercel.com → New Project
- [ ] Import GitHub repo
- [ ] Framework: Vite
- [ ] Build: `npm run vercel-build`
- [ ] Output: `dist`
- [ ] Add `VITE_API_URL` environment variable
- [ ] Deploy

### 4️⃣ Update CORS
- [ ] Update `CORS_ORIGIN` in Render with Vercel URL
- [ ] Redeploy backend

---

## 📋 Environment Variables

### Render (Backend)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hospital-management
JWT_SECRET=random_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-app.vercel.app
MAX_FILE_SIZE=5242880
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🔗 Important URLs

After deployment, save these:
- Frontend: `https://__________.vercel.app`
- Backend: `https://__________.onrender.com`
- Health Check: `https://__________.onrender.com/api/health`

---

## ✅ Verification

1. Visit frontend URL
2. Try login/signup
3. Check browser console (no errors)
4. Test creating appointment

---

## 🆘 Quick Fixes

**CORS Error?**
→ Update CORS_ORIGIN in Render to match Vercel URL

**Backend not responding?**
→ Check Render logs, verify MongoDB connection

**Frontend blank?**
→ Check VITE_API_URL in Vercel environment variables

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`
