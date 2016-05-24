'use strict';

const models = require('../models/');
const Backend = models.Backend;

/**
 * 增加帐号
 * @param  {[type]} Backend [description]
 * @return {[type]}         [description]
 */
exports.add_backend = (backend) => {
  const new_backend = new Backend(backend);
  return new_backend.save();
};

/**
 * [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
exports.get_backends = (query) => {
  return Backend.find(query).exec();
};

/**
 * [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
exports.get_backend = (query) => {
  return Backend.findOne(query).exec();
}

exports.delete_backends = (query) => {
  return Backend.remove(query);
}

/**
 * [description]
 * @param  {[type]} query [description]
 * @param  {[type]} info  [description]
 * @return {[type]}       [description]
 */
exports.update_backend = (query, info) => {
  return Backend.update(query, info).exec();
}
