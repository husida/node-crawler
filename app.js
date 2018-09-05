'use strict'

const fs = require('fs');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./dao/db');

const routes = require('./routes');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags : 'a'}); 
app.use(logger('dev'));
app.use(logger('combined', {stream : accessLog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


routes(app);
app.use('/users', users);




module.exports = app;
