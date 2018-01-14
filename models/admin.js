'use strict'

const mongoose = require('mongoose');
const MongooseDao = require('../dao/MongooseDao')

const Schema =mongoose.Schema;

const adminSchema = new Schema({
	name: String,
	password: String,
	id: Number,
	createTime: String,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:超级管理员  2:普通管理员 
	avatar: {type: String, default: 'default.jpg'}
})

const adminModel = mongoose.model('admin', adminSchema);

var dao = new MongooseDao(adminModel);

module.exports = dao;