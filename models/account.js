'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = new Schema({
  name: {
    type: String
  },
  level: {
    type: Number
  },
  password: {
    type: String
  },
  sex: {
    type: String
  }
});

mongoose.model('Account', account);
