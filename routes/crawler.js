'use strict'

const express = require('express');
const Crawler = require('../controller/crawler')

const router = express.Router();

router.post('/startBookCrawler', Crawler.startBookCrawler)

module.exports = router;