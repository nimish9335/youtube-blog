# 📁 Project Structure

```
youtube_blog/
├── config/
│   └── env.js              # Environment configuration (dotenv)
│
├── middlewares/
│   └── auth.js             # JWT authentication middleware
│
├── models/                 # Database schemas
│   ├── user.js            # User model (signup/login)
│   ├── blog.js            # Blog post model
│   └── comment.js         # Comment model
│
├── routes/                 # API endpoints
│   ├── user.js            # Auth routes (signin/signup/logout)
│   └── blog.js            # Blog routes (create/read/comment)
│
├── services/
│   └── authentication.js   # JWT token management
│
├── public/                 # Static files
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── images/
│   │   ├── image.png      # Default image
│   │   └── uploads/       # User uploaded images (git ignored)
│   └── js/                # Client-side scripts (if any)
│
├── views/                  # EJS templates
│   ├── home.ejs           # Homepage (all blogs)
│   ├── signin.ejs         # Login page
│   ├── signup.ejs         # Register page
│   ├── blog.ejs           # Single blog view
│   ├── addblog.ejs        # Create blog page
│   ├── 404.ejs            # 404 error page
│   ├── error.ejs          # General error page
│   └── partials/
│       ├── head.ejs       # Head section (CSS, title)
│       ├── nav.ejs        # Navigation bar
│       └── scripts.ejs    # Footer scripts
│
├── index.js               # Main application entry point
├── package.json           # Dependencies & scripts
├── package-lock.json      # Locked dependencies
├── render.yaml            # Render deployment config
├── .env.example           # Environment variables template
├── .gitignore             # Files to ignore in Git
├── README.md              # Project documentation
├── QUICKSTART.md          # Quick start guide
├── RENDER_DEPLOYMENT.md   # Deployment instructions
└── PROJECT_STRUCTURE.md   # This file

```

## 📊 File Summary

| Category | Purpose |
|----------|---------|
| **config/** | Configuration files |
| **middlewares/** | Express middleware functions |
| **models/** | MongoDB schemas |
| **routes/** | API endpoint definitions |
| **services/** | Business logic |
| **public/** | Static CSS, images, client JS |
| **views/** | EJS HTML templates |

## 🔐 Security Files

- ✅ `.env.example` - Template for sensitive variables
- ✅ `.gitignore` - Excludes .env, node_modules, images
- ✅ `package.json` - All dependencies with versions

## 📝 Documentation Files

- ✅ `README.md` - Complete project overview
- ✅ `QUICKSTART.md` - Quick start guide
- ✅ `RENDER_DEPLOYMENT.md` - Deployment guide
- ✅ `PROJECT_STRUCTURE.md` - This file

## 🚀 Deployment Files

- ✅ `render.yaml` - Render deployment configuration
- ✅ `.env.example` - Environment template

---

**Everything is organized and ready to deploy!** ✨
