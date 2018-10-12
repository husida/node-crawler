const request = require('request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const urls = require('../config/urls');

// request('http://www.zxcs8.com/sort/23', function (error, response, body) {
// //   console.log('error:', error); // Print the error if one occurred
// //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// //   console.log('body:', body); // Print the HTML for the Google homepage.

//     if(error) {
//         console.log('error', error);
//         return;
//     }

//     let $ = cheerio.load(body);
//     // $('#pleft>dl>dt>a')
    
//     let pList = $('#plist');
//     let pListData = [];
//     let p1 = '';
//     let p2 = '';
//     let p3 = '';
//     pList.each(function(i, elem) {
//         // console.log($(this).children().last().text());
//         p1 = $(this).children().first().text().replace(/\n|\t|\s/g,'')
//         p2 = $(this).find('.des').text().replace(/\n|\t|\s/g,'')
//         p3 = $(this).children().last().text().replace(/\n|\t|\s/g,'')
//         pListData.push({
//             id: $(this).find('.vw').attr('href').match(/\/([\d]+)/)[1],
//             title: p1.match(/《(\S*)》/)[1],
//             author: p1.match(/作者：(\S*)/)[1],
//             size: p2.match(/【TXT大小】：(\S*)【内容简介】/)[1],
//             summary: p2.match(/【内容简介】：(\S*)/)[1],
//             type: $(this).children().last().find('a').first().text(),
//             time: $(this).children().last().text().match(/时间：(\S*\s\S*)查看全文/)[1],
//             href:$(this).find('.vw').attr('href'),
//             abstarct: p2
//         });
//     });

//   fs.writeFile(path.join(__dirname,'./pListData.json'),JSON.stringify(pListData),(err) =>{
//       if(err) {
//         console.log('写入失败');
//         return;
//       }
//       console.log('写入成功过');
//   })
// });

const getRealDownUrl = (url) => {
    let promise =new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(error) reject('');
            let $ = cheerio.load(body)
            let downfileUrl = $('.downfile a').eq(0).attr('href');
            resolve(downfileUrl);
        })
    })
    return promise;
}

const requestDetail = (url) => {

    let promise =new Promise((resolve, reject) => {
        request(url, async (error, response, body) => {
            if(error) reject({});
            let $ = cheerio.load(body)
            let picUrl = $('#content a img').attr('src');
            let picName = picUrl.slice(picUrl.lastIndexOf('/')+1);
            request(picUrl).pipe(fs.createWriteStream(path.join(urls.downPicUrl, picName)));
            let downfileUrl =await getRealDownUrl($('.filetit a').attr('href'));
            let fileRarName = downfileUrl.slice(downfileUrl.lastIndexOf('/')+1);
            request(downfileUrl).pipe(fs.createWriteStream(path.join(urls.downRarUrl, fileRarName)));
            resolve({
                pic: picName,
                fileRarName: fileRarName
            });
        })
    })
    return promise;
}


const getPicDown = async (url) => {
    let data = await requestDetail(url);
    console.log(data);
}
getPicDown('http://www.zxcs8.com/post/11190');