# YouTube Blog - AWS Deployment Guide

## Overview
This is a secure Node.js/Express blog application with MongoDB integration. It includes authentication, blog management, comments, and modern design.

## Security Features Implemented
✅ **Helmet** - Security headers  
✅ **Input Validation** - Using express-validator  
✅ **XSS Protection** - HTML escaping with escape()  
✅ **JWT with Expiration** - 7-day token lifetime  
✅ **Secure Cookies** - HttpOnly, SameSite, Secure flags  
✅ **CORS Configuration** - For AWS deployment  
✅ **File Upload Validation** - Size and MIME type checks  
✅ **Password Hashing** - PBKDF2 with salt  
✅ **Environment Variables** - No hardcoded secrets  

## Local Development Setup

### Prerequisites
- Node.js >= 18
- MongoDB running locally or MongoDB Atlas
- npm

### Installation
```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your values
# MONGODB_URI should point to your MongoDB instance
# JWT_SECRET should be a long random string (min 32 chars)

# Start development server
npm run dev
```

The application will run on `http://localhost:8000`

## AWS Deployment

### Option 1: Deploy to AWS EC2

1. **Launch EC2 Instance**
   - Use Amazon Linux 2 or Ubuntu 22.04
   - Open ports: 80 (HTTP), 443 (HTTPS), 8000 (Node app)
   - Add security group rules

2. **Setup Environment**
   ```bash
   # Connect to instance via SSH
   ssh -i your-key.pem ec2-user@your-instance-ip
   
   # Update system
   sudo yum update -y  # Amazon Linux
   # OR
   sudo apt update && sudo apt upgrade -y  # Ubuntu
   
   # Install Node.js
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs  # Amazon Linux
   # OR
   sudo apt install -y nodejs  # Ubuntu
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   
   # Clone your repository
   git clone your-repo-url
   cd youtube_blog
   ```

3. **Deploy Application**
   ```bash
   # Install dependencies
   npm install --production
   
   # Create .env file
   nano .env
   # Add your production environment variables
   
   # Start app with PM2
   pm2 start index.js --name "youtube-blog"
   pm2 startup
   pm2 save
   ```

4. **Setup Reverse Proxy (Nginx)**
   ```bash
   # Install Nginx
   sudo yum install -y nginx
   
   # Create config file
   sudo nano /etc/nginx/conf.d/youtube-blog.conf
   ```
   
   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:8000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```
   
   ```bash
   # Enable and start Nginx
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

5. **Setup SSL Certificate (Free with Let's Encrypt)**
   ```bash
   # Install Certbot
   sudo yum install -y certbot python3-certbot-nginx
   
   # Generate certificate
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 2: Deploy to AWS Elastic Beanstalk

1. **Prepare Application**
   ```bash
   # Create .ebignore file (in project root)
   echo "node_modules/\n.git/\n.vscode/" > .ebignore
   ```

2. **Deploy with EB CLI**
   ```bash
   # Install EB CLI
   pip install awsebcli --upgrade --user
   
   # Initialize EB app
   eb init -p "Node.js 18 running on 64bit Amazon Linux 2" youtube-blog
   
   # Create environment
   eb create youtube-blog-env
   
   # Set environment variables
   eb setenv NODE_ENV=production MONGODB_URI=your-url JWT_SECRET=your-secret
   
   # Deploy
   eb deploy
   ```

### Option 3: Deploy to AWS App Runner

1. **Push code to GitHub/ECR**
   ```bash
   # Push to GitHub repository
   git push origin main
   ```

2. **Create App Runner Service**
   - Go to AWS App Runner console
   - Connect GitHub repository
   - Select branch to deploy
   - Configure environment variables
   - Deploy

## Environment Variables for Production

```env
NODE_ENV=production
PORT=8000

# MongoDB Atlas (recommended for AWS)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube_blog

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-256-bit-random-string

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Optional: AWS S3 for uploads
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

## Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Follow: https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod

# Connection string: mongodb://localhost:27017/youtube_blog
```

### MongoDB Atlas (Recommended for AWS)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add IP address to whitelist
5. Use connection string in `MONGODB_URI` env variable

## Performance Optimization

1. **Enable Gzip Compression**
   - Add to index.js after app creation:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Use CDN for Static Assets**
   - Upload images to AWS CloudFront or S3
   - Update image URLs in templates

3. **Cache Strategy**
   - Use Redis for session storage (optional)
   - Add cache headers to static assets

4. **Database Optimization**
   - Add indexes to MongoDB collections
   - Use connection pooling

## Monitoring & Logging

1. **Use AWS CloudWatch**
   - Configure log groups
   - Set up alarms for errors

2. **PM2 Monitoring**
   ```bash
   pm2 install pm2-logrotate
   pm2 logs youtube-blog
   ```

3. **Application Logs**
   - All errors are logged to console
   - Use CloudWatch or ELK stack in production

## Maintenance

### Update Application
```bash
# Pull latest changes
git pull

# Install new dependencies
npm install --production

# Restart with PM2
pm2 restart youtube-blog
```

### Database Backups
- Enable automatic backups in MongoDB Atlas
- OR use AWS Backup for EC2 instances

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000
# Kill process
kill -9 PID
```

### MongoDB Connection Failed
- Check connection string in .env
- Verify MongoDB is running
- Check firewall rules
- Verify IP whitelist (MongoDB Atlas)

### High Memory Usage
```bash
# Check memory usage
pm2 monit

# Restart app
pm2 restart youtube-blog
```

## Cost Estimation (AWS)

- **EC2**: $0.0116/hour (t2.micro) = ~$8.50/month
- **MongoDB Atlas**: Free tier (up to 512MB)
- **Data Transfer**: First 1GB free/month
- **Total**: ~$9-15/month for basic setup

## Support & Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
