const express = require('express');
const {createUser, me, userList, chatList} = require('./../controller/userController');
const route = express.Router();
const upload = require('./../middleware/upload');
route.post('/create', upload.single('profile_pic'),createUser);
route.get('/me', me);
route.get('/list', userList);
route.get('/messages/:roomId', chatList);
module.exports = route;