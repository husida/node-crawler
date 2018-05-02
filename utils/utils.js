const crypto = require('crypto');

let utils= {

}


utils.Md5 = function (password){
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
}

module.exports = utils;