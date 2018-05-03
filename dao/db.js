'use strict'

const mongoose = require('mongoose');
const config = require('../config/mongodb');

mongoose.connect(config.url, config.options);

const db = mongoose.connection;
console.log('连接数据库');
db.on('error', function(error) {
    console.error('数据库连接失败' + error);
    mongoose.disconnect();
});

db.once('open', function() {
  return console.log('数据库连接成功');
});


module.exports = db;