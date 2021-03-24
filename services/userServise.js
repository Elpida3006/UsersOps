const getJWT = require('../utils/getJWT');
// const { validationResult } = require('express-validator')
const { jwtSecret, authCookieName } = require('../config/config')
  const {errorHandler} = require('../middlewares/global-error-handler')
const User = require('../models/User')


// ** 1. User creation: test:OK

function postRegister(req, res, err) {
    const { firstname, lastname, address, country, email, phone, username, password, rePassword} = req.body;
   //: firstname, lastname, address, country, email, phone, username, password, 
    User.create(req.body)
        .then((createdUser) => {

            res.status(201)
                .send(createdUser);
        })
        .catch(errorHandler)
        //  .catch( err => {throw new Error('Something went wrong')})
 
}

// ** 2. User login: test:OK

function postLogin(req, res, next) {
    const { username, password } = req.body;
    // console.log(req.body);
    console.log({username});
 
    User.findOne({username})
        .then(user => {
        console.log(`Your username is find!!!`);
        console.log(user.username);
            return Promise.all([
                user,
                user ? user.comparePasswords(password, next) : errorHandler()
            ])
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong username or password' });
                return;
            }

            const token = getJWT.createToken(user._id);


            res
                .status(200)
                .cookie(authCookieName, token, { httpOnly: true }, { maxAge: 360000000 })
            
                .send(user)
                //    .send(user, token);
        })
        // .catch(errorHandler);
         .catch( err => {throw new Error('Wrong username')})
}

// ** 3. User update: test:OK
function updateUser(req, res, next) {
    let userUsername = req.params.username
  const {firstname, lastname, address, country, email, phone } = req.body;
// console.log(userUsername);
// console.log(req.body);
   
 User.findOneAndUpdate({ username: userUsername }, {firstname, lastname, address, country, email, phone})
    .then(updatedUser => {
        res
        .status(204)
        .send(updatedUser);
    })
    .catch(errorHandler);
//  .catch( err => {throw new Error('Something went wrong')})

}


// ** 4.  User deletion:  test:OK
function deleteUser(req, res, next) {
    const { username, password } = req.body;
// console.log(req);
// console.log(res);
    User.findOneAndDelete({ username })
        .then((removedUser) => res
        .status(202)
        .send(removedUser))
        //    .send({ message: 'You are Unregister!' })
        .catch(errorHandler);
     
    
     
    // res
    //     .clearCookie(authCookieName)
    //     .status(202)
    //     .send({ message: 'You are Unregister!' })
    //     // .catch( err => {throw new Error('Something went wrong')})
    //     .catch(errorHandler);

}
// ** 5.  User data test:OK

function getUser(req, res, err) {
    const username = req.params.username
    User.find({username :username})
            .then((user) => res
            .status(200)
            .send(user))
            .catch(errorHandler)
            // .catch( err => {throw new Error('Wrong username. Please fill your username correct!')})
        } 
module.exports = {
  
    postRegister,
    postLogin,
    updateUser,
    deleteUser,
    getUser,
}