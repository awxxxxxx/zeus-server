'use strict';
const proxy = require('../proxy/');
const Backend = proxy.Backend;
const Access = proxy.Access;
const parse = require('co-body');

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_backends = function *(next) {
  let backends = yield Backend.get_backends({});
  this.body = {
    status: 0,
    data: backends,
    msg:'success'
  }
};

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.add_backend = function *(next) {
  try {
    let post_data = yield parse(this);
    let result = yield Backend.add_backend(post_data);
    this.body = {
      status: 0,
      data: result,
      msg: 'success'
    }
  } catch(e) {
    let msg = '服务器错误，请稍后重试';
    if (e.code === 11000) {
      msg = '英文名称不能重复';
    }
    this.body = {
      status: 3,
      error: e,
      msg: msg
    }
  }
};

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update_backend = function *(next) {
  try {
    let post_data = yield parse(this);
    let query = {
      _id: this.params.id
    }
    let result = yield Backend.update_backend(query, post_data);
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
};

exports.delete_backends = function *() {
  try {
    let query = {
      _id: this.params.id
    }
    let res = yield Access.delete_access({ backend: {$in:[this.params.id]}});
    let result = yield Backend.delete_backends(query);
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
