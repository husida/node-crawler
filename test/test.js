const cryptoUtils = require('../utils/cryptoUtils');

let oriPwd = 123456;
// console.log(`原始密码${oriPwd}`);

// let pwd = cryptoUtils.md5(oriPwd);
// console.log(`不加盐${pwd}`);

let salt = cryptoUtils.getRandomSalt();
let password = cryptoUtils.cryptMd5Pwd(oriPwd, salt);
console.log(`盐${salt}`);
console.log(`加盐后${password}`);

// console.log(cryptoUtils.compareMd5Pwd(oriPwd,'e10adc3949ba59abbe56e057f20f883e'));
console.log(cryptoUtils.compareMd5Pwd(oriPwd,'a56fc211b5be28de07a4018f1ddcfda4s',779647));

// 原始密码123456
// 不加盐e10adc3949ba59abbe56e057f20f883e
// 盐390260
// 加盐后 299ea7e8dc26594390e388d9bf892a9f
