const JWT=require('jsonwebtoken');

const secretKey='your_secret_key';

function createtokenforuser(user){
    const payload={
        id:user._id,
        name:user.name,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    };
    const token= JWT.sign(payload,secretKey);
    return token;
}

function verifytoken(token){
    const payload=JWT.verify(token,secretKey);
    return payload;
}

module.exports={
    createtokenforuser,
    verifytoken
}
