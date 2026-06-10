const {Router} = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

const upload = multer({storage:storage});

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

        return res.render('blog',{
            user:req.user,
            blog
        });
    }catch(err){
        console.error('Error loading blog',err);
        return res.redirect('/');
    }
});

router.post('/addblog',upload.single('coverImage'),async(req,res)=>{
    if(!req.user){
        return res.redirect('/user/signin');
    }

    try{
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
        return res.redirect('/blog/addblog');
    }
});

module.exports=router;
