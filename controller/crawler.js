'use strict'

const BaseController = require('./baseController');

class Crawler extends BaseController {
    startBookCrawler(req, res, next) {
        
        res.send(super.setResult(0, '启动成功'));
        return;
    }
}

module.exports = new Crawler();