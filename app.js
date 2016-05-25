'use strict';
const koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const app = koa();
const session = require('koa-session');
const Account = require('./controllers/account.js');
const Backend = require('./controllers/backend.js');
const Access = require('./controllers/access.js');
const auth = require('./middlewares/auth.js');

app.keys = ['niufgaigafdsiufsallgh'];
app.use(session(app));

app.use(function *(next) {
  const start = new Date;
  yield next;
  this.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  this.set('Access-Control-Allow-Headers','Content-Type');
  this.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
  this.set('Access-Control-Allow-Credentials', true);
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.post('/zeus/login', Account.login);



/**
 * 人员管理
 * @param  {[type]} '/zeus/accounts'     [description]
 * @param  {[type]} Account.get_accounts [description]
 * @return {[type]}                      [description]
 */
router.get('/zeus/accounts', auth.auth, Account.get_accounts)
  .post('/zeus/accounts', Account.add_account)
  .put('/zeus/accounts/:id', Account.update_account);

/**
 * 接入平台管理
 * @param  {[type]} '/zeus/backends'     [description]
 * @param  {[type]} Backend.get_backends [description]
 * @return {[type]}                      [description]
 */
router.get('/zeus/backends', Backend.get_backends)
  .post('/zeus/backends', Backend.add_backend)
  .put('/zeus/backends/:id', Backend.update_backend)
  .delete('/zeus/backends/:id', Backend.delete_backends);

router.get('/zeus/access', Access.get_access)
  .post('/zeus/access', Access.add_access)
  .delete('/zeus/access/:id', Access.delete_access);


// 使用路由，启动服务
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
console.log('now listening on http://localhost:3000');
