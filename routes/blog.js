const {Router} = require('express');
const Blog = require('../models/blog');
const Comment=require('../models/comment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {body,validationResult} = require('express-validator');

const router = Router();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = path.resolve('./public/images/uploads');
        fs.mkdirSync(uploadPath,{recursive:true});
        cb(null,uploadPath);
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        const ext=path.extname(file.originalname);
        cb(null,file.fieldname+'-'+uniqueSuffix+ext);
    }
});

const upload = multer({
    storage:storage,
    limits:{fileSize: 5 * 1024 * 1024},
    fileFilter: (req,file,cb) => {
        const allowedMimes = ['image/jpeg','image/png','image/gif','image/webp'];
        if(allowedMimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Validation middleware
const validateTitle = body('title').trim().escape().isLength({min:3,max:200});
const validateContent = body('content').trim().escape().isLength({min:10});

router.get('/addblog',(req,res)=>{
    if(!req.user){
        return res.redirect('/user/signin');
    }

    res.render('addblog',{
        user:req.user
    });
});

router.get('/:id',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('author');
        if(!blog){
            return res.redirect('/');
        }

        const comments=await Comment.find({blog:blog.id})
            .populate('author')
            .sort({createdAt:-1});

        return res.render('blog',{
            user:req.user,
            blog,
            comments
        });
    }catch(err){
        console.error('Error loading blog',err);
        return res.redirect('/');
    }
});

router.post('/addblog',
    upload.single('coverImage'),
    validateTitle,
    validateContent,
    async(req,res)=>{
    if(!req.user){
        return res.redirect('/user/signin');
    }

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('addblog',{user:req.user,error:'Invalid input'});
        }

        const {title,content}=req.body;

        const blog = await Blog.create({
            coverImage:req.file ? `/images/uploads/${req.file.filename}` : undefined,
            title,
            content,
            author:req.user.id
        });

        return res.redirect(`/blog/${blog.id}`);
    }catch(err){
        console.error('Error creating blog',err);
        return res.render('addblog',{user:req.user,error:err.message});
    }
});

router.post('/addcomment/:id',
    body('content').trim().escape().isLength({min:1,max:5000}),
    async(req,res)=>{
    if(!req.user){
        return res.redirect('/user/signin');
    }

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.redirect(`/blog/${req.params.id}`);
        }

        const {content}=req.body;
        if(!content){
            return res.redirect(`/blog/${req.params.id}`);
        }

        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.redirect('/');
        }

        await Comment.create({
            content,
            blog:blog.id,
            author:req.user.id
        });

        return res.redirect(`/blog/${blog.id}`);
    }catch(err){
        console.error('Error creating comment',err);
        return res.redirect(`/blog/${req.params.id}`);
    }
});

module.exports=router;
