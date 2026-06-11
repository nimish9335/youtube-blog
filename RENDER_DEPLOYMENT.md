# Deploy YouTube Blog to Render (Free)

Render is the easiest way to deploy your Node.js blog for **FREE**. This guide walks you through it.

## 📋 Prerequisites

1. **GitHub Account** - Already have code pushed to GitHub ✅
2. **Render Account** - Sign up at https://render.com (FREE)
3. **MongoDB Atlas Account** - MongoDB database (FREE tier available)

## 🚀 Step-by-Step Deployment

### Step 1: Set up MongoDB Atlas (Database)

**1.1 Create MongoDB Atlas Account**
- Go to https://www.mongodb.com/cloud/atlas
- Click "Sign Up" and create account
- Verify your email

**1.2 Create Cluster**
- Click "Create a Deployment"
- Choose "Build a free cluster"
- Select your preferred region (closer to your users)
- Cluster name: `youtube-blog`
- Click "Create"

**1.3 Get Connection String**
- Click "Connect" on your cluster
- Choose "Drivers"
- Copy the connection string
- Replace `<username>` and `<password>` with your credentials
- Example: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/youtube_blog`

### Step 2: Deploy on Render

**2.1 Connect GitHub**
- Go to https://render.com (login if needed)
- Click "New +" → "Web Service"
- Click "Connect account" next to GitHub
- Authorize Render to access your GitHub
- Select your `youtube_blog` repository

**2.2 Configure Web Service**
- **Name**: `youtube-blog`
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

**2.3 Add Environment Variables**
Click "Advanced" and add these variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/youtube_blog
JWT_SECRET=your_super_secure_random_string_min_32_chars
CORS_ORIGIN=https://your-app.onrender.com
```

To generate a secure JWT_SECRET, run this in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**2.4 Deploy**
- Click "Create Web Service"
- Wait 2-5 minutes for deployment
- You'll get a URL like: `https://youtube-blog-xxxxx.onrender.com`

✅ **Your app is live!**

## 📱 Test Your Live App

1. Visit `https://youtube-blog-xxxxx.onrender.com`
2. Sign up with email and password
3. Create a blog post
4. Add comments
5. Everything should work! 🎉

## 🔄 Automatic Deployments

Every time you push to GitHub:
```bash
git push origin main
```

Render will **automatically redeploy** your app. No manual steps needed!

## 📊 Monitor Your App

**In Render Dashboard:**
- Click your service
- **Logs** tab - See console output & errors
- **Metrics** tab - View CPU, memory, requests
- **Events** tab - See deployment history

## ⚠️ Important Notes

### Free Tier Limitations
- ✅ 750 hours/month (runs 24/7 for ~31 days)
- ✅ Limited to 256MB RAM
- ⚠️ Spins down after 15 min of inactivity (5-10 sec to wake up)
- ⚠️ Uploaded images stored locally (lost on redeploy)

### Fixing Image Loss on Redeploy
For production, use cloud storage (optional):

**Option 1: Use MongoDB to Store Images**
- Convert images to Base64
- Store in MongoDB
- Trade-off: Larger database

**Option 2: Use AWS S3 / Cloudinary (Paid)**
- External image hosting
- More reliable
- Small cost (~$2-5/month)

**Current Solution (Acceptable for MVP):**
- Images uploaded to local server
- Redeployed weekly
- User uploads fresh images as needed

## 🆘 Troubleshooting

### App Not Starting
```
Check Render logs for errors:
Render Dashboard → Logs
```

### Connection to MongoDB Failed
- Verify `MONGODB_URI` in Render environment
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
- Test connection string locally first

### Site Takes Long Time to Load
- Normal on free tier (wakes up from sleep)
- Upgrade to paid plan to keep always-on

### Environment Variables Not Updating
- Redeploy manually:
  - Click "Manual Deploy" in Render dashboard
  - Select "Deploy latest commit"

## 📈 Upgrading Later

If you need more power:
- Click "Settings" → "Plan"
- Change to Starter ($7/month) or higher
- No data loss, immediate upgrade

## 🎯 Next Steps

1. ✅ Connect GitHub to Render
2. ✅ Set up MongoDB Atlas
3. ✅ Deploy web service
4. ✅ Test your app
5. ✅ Share with friends!

## 📞 Support

**Render Support:** https://render.com/docs  
**MongoDB Support:** https://docs.mongodb.com  
**Node.js Help:** https://nodejs.org/en/docs/

---

**You're all set!** Your YouTube Blog is now live on Render 🚀
