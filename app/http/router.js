const koaRouter = require('koa-router');
const usersController = require('./controller/usersController');
const tokenController = require('./controller/tokenController');


class Router {
  constructor() {
    this._koaRouter = koaRouter()
      .post('/users/register', usersController.register.bind(this))
      .post('/users/authenticate', usersController.authenticate.bind(this))
      .post('/token/create', tokenController.create.bind(this))
      .post('/token/validate', tokenController.validate.bind(this))
      .get('/token/All', tokenController.all.bind(this))
      .patch('/token/revoke', tokenController.revoke.bind(this))
  }

  get routes() {
    return this._koaRouter.routes();
  }
}

// expose as singleton
module.exports = new Router();