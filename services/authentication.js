require('../config/env');
const JWT=require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';
const secretKey=process.env.JWT_SECRET;

if(!secretKey){
    throw new Error('JWT_SECRET environment variable is required');
}

function createtokenforuser(user){
    const payload={
        id:user._id,
        name:user.name,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    };
    const token= JWT.sign(payload,secretKey,{expiresIn:'7d'});
    return token;
}

function verifytoken(token){
    try{
        const payload=JWT.verify(token,secretKey);
        return payload;
    }catch(err){
        throw new Error('Invalid or expired token');
    }
}

module.exports={
    createtokenforuser,
    verifytoken
}
