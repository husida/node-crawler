'use strict'

const mongoose = require('mongoose');
const MongooseDao = require('../dao/mongooseDao')
const dayjs = require('dayjs');
const uuidv1 = require('uuid/v1');

const Schema =mongoose.Schema;

const adminSchema = new Schema({
	userName: {type: String, required: true},
	password: {type: String, required: true},
	salt: String,
	id:{type: String, default: uuidv1()},
	createTime: {type: String, default:dayjs().format('YYYY-MM-DD HH:mm:ss')},
	status: {type: Number, default: 4},  //1:超级管理员  2:普通管理员 3:会员 4:普通用户
	avatar: {type: String, default: 'default.jpg'}
})

// 用户是否存在
adminSchema.methods.isExist = function(cb) {
	var query;
	query = {
		userName: this.userName
	};
	return this.model('admin').findOne(query, cb);
};

const adminModel = mongoose.model('admin', adminSchema);

var dao = new MongooseDao(adminModel);

module.exports = dao;