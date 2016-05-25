'use strict';
const mongoose = require('mongoose');
const md5 = require('../utils/').md5;
const Schema = mongoose.Schema;
const account = new Schema({
  name: {
    type: String
  },
  level: {
    type: Number
  },
  password: {
    type: String,
    default: md5('123456')
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  sex: {
    type: String
  }
});

mongoose.model('Account', account);
