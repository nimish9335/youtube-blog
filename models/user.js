const crypto = require("crypto");
const {Schema,model}=require('mongoose');
const {createtokenforuser}=require('../services/authentication');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:'images/image.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
},{
    timestamps:true
});
// Hash the password before saving the user
userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password'))return next();
    
    const salt=crypto.randomBytes(16).toString('hex');
    const hashpassword=crypto.pbkdf2Sync(user.password,salt,1000,64,'sha512').toString('hex');

    user.password=hashpassword;
    user.salt=salt;
    next();
});
// Static method to match password and create token
userSchema.static('matchPassword',async function(email,password){
    const user=await this.findOne({email});
    if(!user)throw new Error('User not found');

    const hashpassword=crypto.pbkdf2Sync(password,user.salt,1000,64,'sha512').toString('hex');
    if(hashpassword===user.password){
        const token=createtokenforuser(user);
        return token;
    }else{
        throw new Error('Username or password is incorrect');
    }
});

const User=model('User',userSchema);

module.exports=User;
