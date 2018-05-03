'use strict'

const AdminModel = require('../models/admin');
const cryptoUtils = require('../utils/cryptoUtils')

class Admin{

    async login(req, res, next) {
       
    }

    async regist(req, res, next) {
        const {userName, password, status} = req.body;
        console.log(req.body);
        if(userName === '') {
            res.send({
                code: 0,
                msg: '用户名不能为空'
            })
            return;
        } else if (password === '') {
            res.send({
                code: 0,
                msg: '密码不能为空'
            })
            return;
        }

        AdminModel.findOne({'userName':userName}, (err, admin) => {
          
            if(admin){
                res.send({
                    code: 0,
                    msg: '该用户已存在',
                })
            } else {
                let salt = cryptoUtils.getRandomSalt();
                let md5Pwd = cryptoUtils.cryptMd5Pwd(password,salt);
                AdminModel.create({
                    userName: userName,
                    password: md5Pwd,
                    salt: salt,
                    status: status
                }, (err) =>{
                    if (err) {
                        res.send({
                            code: 0,
                            msg: '注册用户失败',
                        })
                    } else {
                        res.send({
                            code: 1,
                            msg: '注册成功',
                        })
                    }
                   
                });
                
            }
        })
       
        
       
    }

    
}

module.exports = new Admin();