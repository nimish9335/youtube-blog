const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { checkforauthentication } = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

const Blog = require('./models/blog');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/youtube_blog').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
});

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({extended:true}));
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

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
