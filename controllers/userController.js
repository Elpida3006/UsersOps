const { Router } = require('express');
const router = Router();
const userServise = require('../services/userServise');
const config = require('../config/config');
const isLogged = require('../middlewares/check-auth');
const User = require('../models/User')

// ** 1. User creation: test:OK


router.post('/register', userServise.postRegister);

// ** 2. User login:

router.post('/login', userServise.postLogin);


// ** 3. User update:
router.put('/update/:username', userServise.updateUser);

// ** 4.  User deletion:

router.delete('/unregister', userServise.deleteUser);


// ** 5.  User data
router.get('/user/:username', userServise.getUser);


// ** 6 test data

router.get('/users', (req, res, err) => {
    User.find()
        .then((users) => res.send(users))
        .catch( err => {throw new Error('Something went wrong')})


});




module.exports = router;