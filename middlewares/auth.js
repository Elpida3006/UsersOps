const { authCookieName, authHeaderName, jwtSecret } = require('../config/config');
const { verifyToken } = require('../utils/getJWT');
const User = require('../models/User')


module.exports = (req, res, next) => {
 
    const token = req.cookies[authCookieName] || req.headers[authHeaderName] || "";

    if (!token) { next(); return; }

    verifyToken(token)
        .then(({ _id }) => User.findOne({ _id }))
        .then(({ username, _id }) => {

            req.user = { username, _id };
        
            res.locals.isLogged = Boolean(req.user);
         
            next();
        })
        .catch(e => next(e));


};