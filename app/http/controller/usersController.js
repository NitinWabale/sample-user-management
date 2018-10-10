const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const srcFile = __filename;
const userService = require('../../core/users/userService');

class UsersController extends KoaRouter {
    /**
     * Executes an action from the request body
     */
    async register(context) {
        console.log('executing register');
        try {
            if (!context.request.body) {
                return;
            }
            context.response.body = await userService.create(context.request.body);
        } catch (error) {
            console.log(error);
            console.log(context);
            context.body = error.message;
            context.throw(error);
        }
    }

    /**
 * Executes an action from the request body
 */
    async authenticate(context, next) {
        try {
            if (!context.request.body) {
                return;
            }
            const { username, password } = context.request.body;
            context.response.body = await userService.authenticate(username, password);
         } catch (error) {
            context.body = error.message;
            context.throw(error);
        }
    }
}

// expose as singleton
module.exports = new UsersController();
