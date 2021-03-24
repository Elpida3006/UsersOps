const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const saltRounds = config.saltRounds;

const userSchema = new mongoose.Schema({

    id: mongoose.Types.ObjectId,

    firstname: {
        type: String,
        required: true,
        unique: false,
        minlength: [1, 'Please fill the input'],
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        minlength: [1, 'Please fill the input'],
    },
    address: {
        type: String,
        required: true,
        unique: false,
        minlength: [1, 'Please fill the input'],
    },
    country: {
        type: String,
        required: true,
        unique: false,
        minlength: [1, 'Please fill the input'],
        },
    email: {
        type: String,
        required: true,
        unique: [true, 'this email arlredy exist'],
        minlength: [1, 'Please fill the input'],
        // validate: `http || https`
        validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email']
    },
    phone: {
        type: Number,
        required: true,
        unique: false,
        minlength: [1, 'Please fill the input'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [1, 'Please fill the input'],
    },
    password: {
        type: String,
        required: true,
        unique: false,
        // maxlength: ,
        minlength: [1, 'Please fill the input'],
    },
 

});
//value pairs and if any key is missing or any data is empty, 
//for example email is null, undefined or ‘’, an error should be returned
//  : required: true, / or minlength: 1

//test in Postman {
//     {
//         "firstname": "",
//         "lastname": "",
//         "address": "",
//         "country": "",
//         "email":"",
//         "phone":"",
//         "username":"",
//         "password": ""
//     }
// }
userSchema.methods.comparePasswords = function(providedPassword) {
    //callback or  Promise,because it's  async operation
    return new Promise((resolve, reject) => {
        bcrypt.compare(providedPassword, this.password, function(err, result) {
            if (err) { reject(err); return; }
            resolve(result);
        
        });
    });
};

userSchema.pre('save', function(done) {

    const user = this;

    if (!user.isModified('password')) {
        done();
        return;
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { done(err); return; }
   
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { done(err); return; }
            user.password = hash;
            //if it's a new user , or user is changed password (hashing password)
            done();
        });
    });
});
module.exports = mongoose.model('User', userSchema);