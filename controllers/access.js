'use strict';
const proxy = require('../proxy/');
const Access = proxy.Access;
const parse = require('co-body');

/**
 * [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_access = function *(next) {
  let account = this.session.user.id;
  let access = yield Access.get_access({account: account});
  access.forEach((item) => {
    item._doc.name = item.backend.name || '';
    item._doc.path = item.backend.path || '';
  });
  this.body = {
    data: access,
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
    let data = yield Access.get_one(post_data);
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
