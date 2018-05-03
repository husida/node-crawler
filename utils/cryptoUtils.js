const crypto = require('crypto');

let utils= {

}

/**
 * @description md5加密
 * @param {any} text 
 * @returns 
 */
utils.md5 = function (text) {
    if(text && typeof text !== 'string'){
        text = text.toString();
    }
    return crypto.createHash('md5').update(text, 'utf8').digest('hex');
};

/**
 * @description 随机salt
 * @returns 
 */
utils.getRandomSalt = function (){
    return Math.random().toString().slice(2, 8);
}

/**
 * @description 加盐加密
 * @param {any} password 
 * @param {any} salt 
 * @returns 
 */
utils.cryptMd5Pwd = function (password, salt) {
    if(salt) {
        password = '' + password + salt;
    }
    return this.md5(password);
}


/**
 * @description md5加密对比
 * @param {any} password 原始密码
 * @param {any} cryptoedPwd 加密后的密码
 * @param {any} salt 可选加'盐'
 * @returns 
 */
utils.compareMd5Pwd = function (password, cryptoedPwd, salt) {
    if (salt) {
        password  ='' + password + salt;
    }
    let md5Pwd = this.md5(password);
    return md5Pwd === cryptoedPwd;
}

module.exports = utils;