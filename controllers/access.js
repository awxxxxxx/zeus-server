'use strict';
const proxy = require('../proxy/');
const Access = proxy.Access;
const parse = require('co-body');

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_accesss = function *(next) {
  let accesss = yield Access.get_accesss({});
  this.body = {
    data: accesss,
    msg:'success'
  }
};

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.add_access = function *(next) {
  try {
    let post_data = yield parse(this);
    let result = yield Access.add_access(post_data);
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
exports.delete_access = function *(next) {
  try {
    let query = {
      _id: this.params.id
    }
    let result = yield Access.delete_access(query);
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
