'use strict'

const mongoose = require('mongoose');
const config = require('../config/mongodb');

mongoose.connect(config.url, config.options);

const db = mongoose.connection;

db.on('error', function(error) {
    console.error('数据库连接失败' + error);
    mongoose.disconnect();
});

db.once('openUri', function() {
  return console.log('数据库连接成功');
});


module.exports = db;