'use strict';
const proxy = require('../proxy/');
const Backend = proxy.Backend;
const parse = require('co-body');

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_backends = function *(next) {
  let backends = yield Backend.get_backends({});
  this.body = {
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
}
