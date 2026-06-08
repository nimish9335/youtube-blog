const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/youtube_blog').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
});

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('./public')));

const userRoutes = require('./routes/user');

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.get('/',(req,res)=>{
    res.render('home');
});
app.use('/user',userRoutes);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
