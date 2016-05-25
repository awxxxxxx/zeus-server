'use strict';

exports.auth = function *(next) {
  if (!this.session.user) {
    this.status = 403;
    return this.body = {
      status: 2,
      body: {},
      msg: '请登录'
    }
  }
  yield next;
}
