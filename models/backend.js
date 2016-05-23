'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const backend = new Schema({
  name: {
    type: String
  },
  path: {
    type: String
  },
  count: {
    type: Number
  }
});

mongoose.model('Backend', backend);
