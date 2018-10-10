const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('cors');
const jwt = require('./middleware/jwt');
const usersController = require('./controller/usersController');
const router = require('./router');
const errorHandler = require('../utils/errorHandler');

/**
 * Start the server;
 * @param {Number} [port] the port the server will listen on; exposed for testing purposes. Defaults to 80
 * @returns {*}
 */
function listen(port) {
    const koaApp = new Koa();
    // koaApp.use(cors());
    koaApp.use(bodyParser());

    // use JWT auth to secure the api
    koaApp.use(jwt());
    
    // global error handler
    // koaApp.use(errorHandler);
    koaApp.use(router.routes);
    return koaApp.listen(4000, function () {
        console.log('Server listening ....');
    });
}

module.exports = { listen };