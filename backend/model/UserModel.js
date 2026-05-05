const mongodb = require("mongoose");
const UserModel = new mongodb.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 50,
        default: null
    },
    email: {
        required: true,
        type: String,
        maxlength: 254,
        default: null 
    },
    password: {
        required: true,
        type: String,
        maxlength: 254,
        default: null
    },
    is_deleted:{
        required: true,
        type: Boolean,
        default: 0
    },
    created_by: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updated_by: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deleted_by: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
},{ timestamps: true});

module.exports = mongodb.model('User',UserModel);