'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const backend = new Schema({
  name: {
    type: String
  },
  ename: {
    type: String
  },
  path: {
    type: String
  },
  count: {
    type: Number
  }
});

backend.index({ename: 1}, {unique: true});
mongoose.model('Backend', backend);
