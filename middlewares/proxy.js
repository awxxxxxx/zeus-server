'use strict';
const proxy = require('koa-proxy');
const Backend = require('../proxy/backend.js');

exports.proxy = function *(next) {
  let urls = this.request.url.split('/');
  const ename = urls[3];
  let target = '/' + urls.slice(4, urls.length).join('/');
  const backend = yield Backend.get_backend({ename: ename});
  yield proxy({host: backend.host, url: target});
}
