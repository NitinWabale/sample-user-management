const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const srcFile = __filename;
const tokenService = require('../../core/token/tokenService');

class TokenController extends KoaRouter {
    /**
     * Executes an action from the request body
     */
    async create(context) {
        console.log('executing create token');
        try {
            if (!context.request.body) {
                return;
            }
            context.response.body = await tokenService.create(context.request.body);
            console.log('finished executing create token');
        } catch (error) {
            context.body = error.message;
            context.throw(error);
        }
    }

    /**
     * Executes an action from the request body
     */
    async validate(context) {
        try {
            if (!context.request.body) {
                return;
            }
            const { token} = context.request.body;
            const result = await tokenService.validate(token);
            if(!result) {
                const error = new Error('Invalid token');
                context.body = error.message;
                context.response.status = 400;
                //context.throw(error);
            } else {
                context.body = 'Token validated successfully.'
                context.response.status = 200;
            }
         } catch (error) {
            context.body = error.message;
            context.throw(error);
        }
    }

    /**
     * Executes an action from the request body
     */
    async revoke(context) {
        try {
            if (!context.request.body) {
                return;
            }
            const { status, id } = context.request.body;
            context.response.body = await tokenService.revoke(status, id);
        } catch (error) {
            context.body = error.message;
            context.throw(error);
        }
    }

    /**
     * Executes an action from the request body
     */
    async all(context) {
        try {
            if (!context.request.body) {
                return;
            }
            context.response.body = await tokenService.all();
        } catch (error) {
            context.body = error.message;
            context.throw(error);
        }
    }
}

// expose as singleton
module.exports = new TokenController();
