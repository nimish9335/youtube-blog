# YouTube Blog Application

A modern, secure Node.js blogging platform built with Express.js and MongoDB. Features user authentication, blog creation, and community comments.

## 🎯 Features

- **User Authentication**
  - Secure signup/login with JWT tokens
  - PBKDF2 password hashing with salt
  - 7-day token expiration
  - HttpOnly secure cookies

- **Blog Management**
  - Create and publish blog posts
  - Upload cover images (5MB limit)
  - Rich text content support
  - Author attribution

- **Community Features**
  - Add comments to blogs
  - View comments with author info
  - Real-time comment updates

- **Security**
  - Helmet.js security headers
  - Input validation & sanitization
  - XSS protection
  - CSRF protection
  - SQL injection prevention
  - Rate limiting ready

- **Modern UI**
  - Responsive design
  - Beautiful gradient backgrounds
  - Smooth animations
  - Mobile-optimized

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd youtube_blog

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your values
# Edit .env and add:
# - MONGODB_URI (MongoDB connection string)
# - JWT_SECRET (long random string, min 32 chars)

# Start development server
npm run dev
```

Visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
youtube_blog/
├── config/
│   └── env.js           # Environment configuration
├── middlewares/
│   └── auth.js          # Authentication middleware
├── models/
│   ├── user.js          # User schema & authentication
│   ├── blog.js          # Blog schema
│   └── comment.js       # Comment schema
├── routes/
│   ├── user.js          # Auth routes
│   └── blog.js          # Blog routes
├── services/
│   └── authentication.js # JWT token management
├── views/               # EJS templates
│   ├── home.ejs
│   ├── signup.ejs
│   ├── signin.ejs
│   ├── blog.ejs
│   ├── addblog.ejs
│   ├── error.ejs
│   ├── 404.ejs
│   └── partials/        # Reusable templates
├── public/
│   ├── css/style.css    # Styles
│   └── images/
├── index.js             # Application entry point
├── package.json
└── .env.example         # Environment template
```

## 🔐 Security Features

- ✅ Helmet.js for security headers
- ✅ express-validator for input validation
- ✅ HTML escaping to prevent XSS
- ✅ JWT with 7-day expiration
- ✅ Secure HttpOnly cookies
- ✅ Password hashing with PBKDF2
- ✅ CORS configuration for AWS
- ✅ File upload validation (size & MIME type)
- ✅ Environment-based configuration
- ✅ Error handling middleware

## 📝 API Endpoints

### Authentication
- `GET /user/signin` - Signin page
- `POST /user/signin` - Login user
- `GET /user/signup` - Signup page
- `POST /user/signup` - Create account
- `GET /user/logout` - Logout user

### Blogs
- `GET /` - Home page (all blogs)
- `GET /blog/:id` - View single blog
- `GET /blog/addblog` - Create blog page
- `POST /blog/addblog` - Create blog
- `POST /blog/addcomment/:id` - Add comment

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `public/css/style.css`:
```css
:root {
    --app-primary: #3182ce;       /* Change primary color */
    --app-primary-dark: #2c5282;
    --app-primary-light: #63b3ed;
}
```

### Modify Layout
- Update EJS templates in `views/`
- Edit CSS in `public/css/style.css`
- Update navigation in `views/partials/nav.ejs`

## 🌐 Deployment

### Deploy to Render (FREE & EASY)
For detailed step-by-step instructions, see [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

**Quick Start:**
1. Push code to GitHub ✅ (already done)
2. Sign up at https://render.com (FREE)
3. Connect GitHub repository
4. Set environment variables
5. Deploy in 2 clicks!

Your app will be live in 2-5 minutes with a URL like: `https://youtube-blog-xxxxx.onrender.com`

Render is perfect for this project because:
- ✅ FREE tier with 750 hours/month
- ✅ Auto-deploy from GitHub on every push
- ✅ Automatic SSL/HTTPS certificate
- ✅ No credit card needed
- ✅ Easy to upgrade later if needed

## 🔧 Environment Variables

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/youtube_blog

# JWT
JWT_SECRET=your_secure_random_string_min_32_chars

# CORS
CORS_ORIGIN=http://localhost:8000
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **ejs** - Template engine
- **multer** - File uploads
- **helmet** - Security headers
- **express-validator** - Input validation
- **cors** - CORS middleware
- **dotenv** - Environment variables

## 🧪 Development

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Run Tests
```bash
# Manual testing
npm run dev
# Visit http://localhost:8000
# Test signup, login, create blog, add comment
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
# Windows: mongod
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/youtube_blog
```

### Port 8000 Already in Use
```bash
# Find and kill process
lsof -i :8000
kill -9 <PID>
```

### JWT Secret Error
```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Add to .env
JWT_SECRET=<generated-secret>
```

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  salt: String,
  profileImage: String,
  role: String (USER/ADMIN),
  timestamps: true
}
```

### Blog
```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  coverImage: String,
  timestamps: true
}
```

### Comment
```javascript
{
  content: String,
  blog: ObjectId (ref: Blog),
  author: ObjectId (ref: User),
  timestamps: true
}
```

## 📄 License

MIT License - Feel free to use this project

## 👨‍💻 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ for the blogging community**
