const express = require('express');
const {createUser, me} = require('./../controller/userController');
const route = express.Router();
route.post('/create', createUser);
route.get('/me', me);
module.exports = route;