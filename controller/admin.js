'use strict'

const AdminModel = require('../models/admin');

class Admin{

    async login(req, res, next) {
       
    }

    async regist(req, res, next) {
        AdminModel.create({"username":"sss","password":"password"}, () =>{
            res.json({msg:'成功'});
        });
    }
}

module.exports = new Admin();