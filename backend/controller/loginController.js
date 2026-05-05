const userModel = require("./../model/UserModel");
const bycrypt = require('bcryptjs');
const jwttoken = require("jsonwebtoken");
exports.userLogin = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const userExist = await userModel.findOne({email:email, is_deleted:0});
        
        if(!userExist){
            return res.status(401).json({message:' Email not found'});
        }
        const dbpassword = userExist.password;
        const comparePwd = await bycrypt.compare(password,dbpassword);
        if(!comparePwd){
            return res.status(401).json({message:' Invalid password'});
        }
        const token = jwttoken.sign(
            { userId: userExist._id },        // payload
            process.env.JWT_SECRET,      // secret key
            { expiresIn: '1h' } 
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,      // ⚠️ true in production (HTTPS)
            sameSite: 'lax',    // or 'strict'
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        return res.status(200).json({
            message: "Login successful",
            token
        });
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    
}
