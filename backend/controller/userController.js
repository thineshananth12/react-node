const express = require('express');
const bycrypt = require('bcryptjs');
const userModel = require('./../model/UserModel');
const MessageModel = require('./../model/MessageModel');
exports.createUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const isExist = await userModel.findOne({email: email, is_deleted: false});
        if(isExist){
            return res.status(409).json({message: 'Email already exist'});
        }
        const salt = await bycrypt.genSalt(10);
        const hashedpwd = await bycrypt.hash(password,salt);
        const profilePic =
            req.file ? req.file.filename : null;
        const userObject = new userModel({
            name: name,
            email: email,
            password: hashedpwd,
            profile_pic: profilePic
        });
        const saveUser = await userObject.save();
        return res.status(201).json({message: 'Contact saved successfully', data:saveUser});
    }catch(err){
        return res.status(500).json({message: err.message});
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
exports.userList = async(req, res)=>{
    try{
        const {status=1, page=1, limit=10, searchTerm} = req.query;
       
        const setpage = (page-1)>=0?(page-1):1;
        const skip = (setpage*limit)+1;
        const totalRecords  = await userModel.countDocuments({is_deleted:status});
        const userList  = await await userModel.find({is_deleted:status,
        ...(searchTerm && {
            name: {
            $regex: searchTerm,
            $options: 'i',
            },
        })}).sort({createdAt: -1}).skip(skip)
        .limit(limit);
        res.status(201).json({
            success: true,
            data: userList,
            pagination: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
                limit,
                skip
            },
        });
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
exports.chatList = async(req, res)=>{
    try {
        const messages = await MessageModel.find({
            roomId: req.params.roomId
        }).sort({ createdAt: 1 });
        res.json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

