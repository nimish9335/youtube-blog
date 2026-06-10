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
        const token=await User.matchPassword(email,password);
        res.cookie('token',token);
        res.redirect('/');
    } catch (error) {
        return res.render('signin',{error:error.message});
    }
});

router.post('/signup',async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;
        const user=await User.create({name:fullname,email,password});
        res.redirect('/');
    } catch (error) {
        return res.render('signup',{error:error.message});
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
});

module.exports=router;