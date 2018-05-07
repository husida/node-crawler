'use strict';
const express = require('express')
const error = require('./error.js');
const admin = require('./admin');
const utils = require('./utils');

var router = express.Router();


/* GET home page. */
const index = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = app => {
  app.use('/', index);
  app.use('/admin', admin);
  app.use('/utils', utils)
  app.use(error);
}