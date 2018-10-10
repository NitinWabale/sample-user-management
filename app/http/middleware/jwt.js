var koaJwt = require('koa-jwt');
const config = require('../../config');

module.exports = jwt;

function jwt() {
    const secret = config.SECREATE;
    return koaJwt({ secret}).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/token/validate'
        ]
    });
}
