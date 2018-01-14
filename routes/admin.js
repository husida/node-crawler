'use strict';

const express = require('express');
const Admin = require('../controller/admin.js');

const router = express.Router();

router.post('/regist', Admin.regist);
router.post('/login', Admin.login);

module.exports = router

