const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltFactor = 5;

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },
    roleId: String
});

userSchema.methods.setPassword = (password, callback) => {

    bcrypt.hash(password, saltFactor, (err, hash) => {
        if(err) 
            return err;

        callback(hash);
    });
    
};

module.exports = mongoose.model('user', userSchema, 'users');
