
const {errorHandler} = require('./global-error-handler');

module.exports = function isLogged(shouldBeAuthenticated) {
    //тук си сетваме правата дали да ни допуска като екшън

    return function(req, res, next) {
     
        const isNotAuthWhenAuthIsRequired =
            shouldBeAuthenticated && !req.user;
        if (
            (isNotAuthWhenAuthIsRequired) ||
            (!shouldBeAuthenticated && req.user)
        ) {
            res.redirect(isNotAuthWhenAuthIsRequired ? errorHandler() : 'true');
            return;
        }
        next();
    };
};