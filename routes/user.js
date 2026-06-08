const {Router} = require('express');
const User = require('../models/user');

const router = Router();

router.get('/signin',(req,res)=>{
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signin',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.matchPassword(email,password);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/signup',async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;
        const user=await User.create({name:fullname,email,password});
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports=router;