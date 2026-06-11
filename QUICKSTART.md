# 🚀 YouTube Blog - Quick Start Guide

## Local Development (5 minutes)

### 1. Install & Setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - Add these values:
# PORT=8000
# MONGODB_URI=mongodb://localhost:27017/youtube_blog
# JWT_SECRET=your_secret_key_min_32_chars_long_2024
```

### 2. Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Use MongoDB Atlas (Cloud)
# Skip this if using local MongoDB
```

### 3. Run App
```bash
npm run dev
```

**Visit:** http://localhost:8000 ✨

---

## Deploy to Render (2 minutes)

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Connect Render
- Go to https://render.com
- Sign up (FREE)
- Click "New +" → "Web Service"
- Connect your GitHub repository

### 3. Configure Environment
Add these variables in Render dashboard:
```
NODE_ENV=production
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<random 32+ char string>
CORS_ORIGIN=<your render domain URL>
```

### 4. Deploy
Click "Create Web Service" and wait 2-5 minutes ✅

**Your app is live!** 🎉

---

## Features

✅ User Authentication (Sign up/Login)  
✅ Create & Publish Blogs  
✅ Add Comments  
✅ Modern Beautiful UI  
✅ Fully Secure (Helmet.js, JWT, Input Validation)  

---

## Useful Commands

```bash
# Development
npm run dev                # Start with auto-reload

# Production
npm start                  # Start server

# Testing
curl http://localhost:8000 # Test if running
```

---

## 📞 Need Help?

**For Render Deployment:** See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)  
**For Full Documentation:** See [README.md](./README.md)  
**Setup Issues:** Check `.env` file has all required variables  

---

## 🎯 Next Steps

1. ✅ Run locally: `npm run dev`
2. ✅ Sign up & create blog post
3. ✅ Push to GitHub: `git push origin main`
4. ✅ Deploy to Render: Follow deployment guide
5. ✅ Share link with friends!

---

**Happy Blogging! 📝**
