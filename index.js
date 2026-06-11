require('./config/env');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { checkforauthentication } = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

const Blog = require('./models/blog');

const app = express();
const port = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube_blog';

if(isProduction && !process.env.MONGODB_URI){
    throw new Error('MONGODB_URI environment variable is required');
}

// Connect to MongoDB
mongoose.connect(mongoUri).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
    process.exit(1);
});

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors({
    origin: isProduction ? process.env.CORS_ORIGIN || '*' : '*',
    credentials: true
}));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.set('trust proxy',1);

app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(express.json({limit:'10mb'}));
app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkforauthentication('token'));

app.get('/',async(req,res)=>{
    try{
        const blogs = await Blog.find().populate('author').sort({createdAt:-1});
        return res.render('home',{
            user:req.user,
            blogs
        });
    }catch(err){
        console.error('Error loading blogs',err);
        return res.render('home',{
            user:req.user,
            blogs:[]
        });
    }
});
app.use('/user',userRoutes);
app.use('/blog',blogRoutes);

// 404 Handler
app.use((req,res)=>{
    res.status(404).render('404',{user:req.user});
});

// Error Handler Middleware
app.use((err,req,res,next)=>{
    console.error('Error:',err);
    const status = err.status || 500;
    const message = isProduction ? 'Internal Server Error' : err.message;
    res.status(status).render('error',{
        user:req.user,
        status,
        message
    });
});

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
