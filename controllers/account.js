'use strict';
const proxy = require('../proxy/');
const Account = proxy.Account;
const parse = require('co-body');
const md5 = require('../utils/').md5;

/**
 * login
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.login = function *(next) {
  let post = yield parse(this);
  post.password = md5(post.password);
  const data = yield Account.get_account({name: post.name, password: post.password});
  if (data) {
    let user = {
      name: data.name,
      level: data.level,
      sex: data.sex,
      id: data._id
    }
    this.session.user = user;
    this.body = {
      status: 0,
      data: user,
      msg: 'success'
    }
  } else {
    this.body = {
      status: 1,
      data: {},
      msg: '用户名或密码错误'
    }
  }
}

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_accounts = function *(next) {
  let accounts = yield Account.get_accounts({});
  this.body = {
    data: accounts,
    msg:'success'
  }
};

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.add_account = function *(next) {
  try {
    let post_data = yield parse(this);
    let result = yield Account.add_account(post_data);
    this.body = {
      data: result,
      msg: 'success'
    }
  } catch(e) {
    this.status = 500;
    this.body = {
      error: e,
      msg: 'error'
    }
  }
};

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update_account = function *(next) {
  try {
    let post_data = yield parse(this);
    let query = {
      _id: this.params.id
    }
    let result = yield Account.update_account(query, post_data);
    this.body = {
      data: result,
      msg: 'success'
    }
  } catch (e) {
    this.status = 500;
    this.body = {
      error: e,
      msg: 'error'
    }
  }
}
