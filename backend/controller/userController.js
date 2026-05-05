const express = require('express');
const bycrypt = require('bcryptjs');
const userModel = require('./../model/UserModel');
exports.createUser = async (req, res)=>{
    
    try{
        const {name, email, password} = req.body;
        const isExist = await userModel.findOne({email: email, is_deleted: false});
        if(isExist){
            return res.status(409).json({message: 'Email already exist'});
        }
        const salt = await bycrypt.genSalt(10);
        const hashedpwd = await bycrypt.hash(password,salt);
        const userObject = new userModel({
            name: name,
            email: email,
            password: hashedpwd
        });
        const saveUser = await userObject.save();
        return res.status(201).json({message: 'Contact saved successfully', data:saveUser});
    }catch(err){
        return res.status(500).json({message: err.message});
//         const stackLine = err.stack.split('\n')[1]; // first error line
//   console.log(stackLine);

//   return res.status(500).json({
//     message: err.message,
//     location: stackLine
//   });
    }
    
}

exports.me = async(req, res)=>{
    try{
        const userId = req.user.userId;
        const user = await userModel.findById(userId).select("-password");
        res.json(user);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    
}