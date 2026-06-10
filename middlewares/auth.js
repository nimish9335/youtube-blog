const { verifytoken } = require('../services/authentication');

function checkforauthentication(cookiesname){
    return function(req,res,next){
        const tokencookieval = req.cookies[cookiesname];
        if(!tokencookieval){
            return next();
        }
        try{
            const userpayload=verifytoken(tokencookieval);
            req.user=userpayload;
        }catch(err){}
        return next();
    }
}

module.exports = {
    checkforauthentication
}
