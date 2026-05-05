const jwtlibrary = require("jsonwebtoken");
const middlewareauth = (req, res, next)=>{
    try {
        
        const frontToken = req.headers.authorization?.split(" ")[1];
        const cookieToken = req.cookies?.token;
        const authToken = frontToken || cookieToken;
        if(!authToken){
            return res.status(500).json({message: 'Invalid token'});
        }
        const verify_token = jwtlibrary.verify(authToken,process.env.JWT_SECRET);
        req.user = verify_token;
        next();
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
module.exports = middlewareauth;