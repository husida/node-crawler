'use strict'

const BaseController = require('./baseController');
const adminModel = require('../models/admin');
const cryptoUtils = require('../utils/cryptoUtils')

class Admin extends BaseController{
  
    async login(req, res, next) {
        const {userName = '', password = '', verificationCode = ''} = req.body;
        if(userName === '') {
            res.send(super.setResult(0,'用户名不能为空'));
            return;
        } else if (password === '') {
            res.send(super.setResult(0,'密码不能为空'));
            return;
        } else if(verificationCode === '') {
            res.send(super.setResult(0, '验证码不能为空'));
            return;
        }

        adminModel.findOne({userName: userName}, (err, admin) => {
            console.log(admin);
            if (!admin) {
                res.send(super.setResult(0, '用户名错误'));
                return;
            }

            let validPwd = cryptoUtils.compareMd5Pwd(password, admin.password, admin.salt);
            if(!validPwd) {
                res.send(super.setResult(0, '密码错误'));
                return;
            }
        });

    }

    async regist(req, res, next) {
        const {userName = '', password = '', status = ''} = req.body;
        if(userName === '') {
            res.send(super.setResult(0,'用户名不能为空'));
            return;
        } else if (password === '') {
            res.send(super.setResult(0,'密码不能为空'));
            return;
        }

        adminModel.findOne({userName: userName}, (err, admin) => {
          
            if(admin){
                res.send(super.setResult(0,'该用户已存在'));
            } else {
                let salt = cryptoUtils.getRandomSalt();
                let md5Pwd = cryptoUtils.cryptMd5Pwd(password,salt);
                adminModel.create({
                    userName: userName,
                    password: md5Pwd,
                    salt: salt,
                    status: status
                }, (err) =>{
                    if (err) {
                        res.send(super.setResult(0,'注册用户失败'))
                    } else {
                        res.send(super.setResult(1,'注册成功'))
                    }
                });
                
            }
        })
    }
}

module.exports = new Admin();