'use strict'
const express = require('express');
const svgCaptcha = require('svg-captcha');

const router = express.Router();
router.get('/captcha', (req, res, next) => {
    var captcha = svgCaptcha.create();
	res.type('svg');
	res.status(200).send(captcha.data);
})

module.exports = router;