const { Router } = require('express');

const userController = require('./controllers/userController')
const router = Router();

router.use('/', userController);

router.get('*', (req, res) => {
    res.send('404 Page Not Found');
});

module.exports = router;