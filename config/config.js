const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3003,
        dbConnectionString: 'mongodb://localhost:27017/users2021',
        base: 'users2021',
        origin: 'http://localhost:3003',
        authCookieName: 'auth_cookie',
        authHeaderName: 'auth',
        jwtSecret: 'secret',
        saltRounds: 10
    },
    production: {
        port: 80,
    }
}

module.exports = config[env];