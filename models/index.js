'use strict';
const mongoose = require('mongoose');
const config = require('../config.js');
const db = process.env.db === 'remote' ? config.db.remote : config.db.local;

mongoose.connect(db, {}, function (err) {
    if (err) {
      console.log("数据库连接失败：" + err);
      process.exit(1);
    }else{
      console.log("数据库连接：" + db);
    }
});

require('./account.js');
require('./access.js');
require('./backend.js');

module.exports = {
  Account: mongoose.model('Account'),
  Backend: mongoose.model('Backend'),
  Access: mongoose.model('Access')
}
