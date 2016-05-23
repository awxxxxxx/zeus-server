'use strict';

const models = require('../models/');
const Account = models.Account;

/**
 * 增加帐号
 * @param  {[type]} account [description]
 * @return {[type]}         [description]
 */
exports.add_account = (account) => {
  const new_account = new Account(account);
  return new_account.save();
};

/**
 * [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
exports.get_accounts = (query) => {
  return Account.find(query).exec();
};

/**
 * [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
exports.get_account = (query) => {
  return Account.findOne(query).exec();
};

/**
 * [description]
 * @param  {[type]} query [description]
 * @param  {[type]} info  [description]
 * @return {[type]}       [description]
 */
exports.update_account = (query, info) => {
  return Account.update(query, info).exec();
}
