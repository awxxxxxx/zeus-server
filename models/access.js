'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const access = new Schema({
  backend: {
    type: Schema.Types.ObjectId, ref: 'Backend'
  },
  account: {
    type: Schema.Types.ObjectId, ref: 'Account'
  }
});

mongoose.model('Access', access);
