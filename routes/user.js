const {Router} = require('express');
const User = require('../models/user');
const {body,validationResult} = require('express-validator');

const router = Router();
const authCookieOptions={
    httpOnly:true,
    sameSite:'lax',
    secure:process.env.NODE_ENV==='production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Validation middleware
const validateEmail = body('email').isEmail().normalizeEmail();
const validatePassword = body('password').isLength({min:6}).trim().escape();
const validateFullname = body('fullname').trim().escape();

router.get('/signin',(req,res)=>{
    res.render('signin',{error:null});
});

router.get('/signup',(req,res)=>{
    res.render('signup',{error:null});
});

router.post('/signin',
    validateEmail,
    validatePassword,
    async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('signin',{error:'Invalid email or password format'});
        }

        const {email,password}=req.body;
        if(!email || !password){
            return res.render('signin',{error:'Email and password are required'});
        }

        const token=await User.matchPassword(email.toLowerCase(),password);
        res.cookie('token',token,authCookieOptions);
        res.redirect('/');
    } catch (error) {
        return res.render('signin',{error:error.message});
    }
});

router.post('/signup',
    validateFullname,
    validateEmail,
    validatePassword,
    async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('signup',{error:'Invalid input format'});
        }

        const {fullname,email,password}=req.body;
        if(!fullname || !email || !password){
            return res.render('signup',{error:'All fields are required'});
        }

        if(password.length < 6){
            return res.render('signup',{error:'Password must be at least 6 characters'});
        }

        await User.create({
            name:fullname,
            email:email.toLowerCase(),
            password
        });

        const token=await User.matchPassword(email.toLowerCase(),password);
        res.cookie('token',token,authCookieOptions);
        res.redirect('/');
    } catch (error) {
        if(error.code===11000){
            return res.render('signup',{error:'This email is already registered'});
        }
        return res.render('signup',{error:error.message});
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token',authCookieOptions);
    res.redirect('/');
});

module.exports=router;
