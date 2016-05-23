'use strict';
const koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const app = koa();
const Account = require('./controllers/account.js');
const Backend = require('./controllers/backend.js');

app.use(function *(next) {
  const start = new Date;
  yield next;
  this.set('Access-Control-Allow-Origin', '*');
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

/**
 * 人员管理
 * @param  {[type]} '/zeus/accounts'     [description]
 * @param  {[type]} Account.get_accounts [description]
 * @return {[type]}                      [description]
 */
router.get('/zeus/accounts', Account.get_accounts)
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
  .put('/zeus/backends/:id', Backend.update_backend);

// 使用路由，启动服务
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
console.log('now listening on http://localhost:3000');
