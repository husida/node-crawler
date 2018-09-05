const request = require('request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

request('http://www.zxcs8.com/sort/23', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.

    if(error) {
        console.log('error', error);
        return;
    }

    let $ = cheerio.load(body);
    // $('#pleft>dl>dt>a')
    
    let pList = $('#plist');
    let pListData = [];
    let p1 = '';
    let p2 = '';
    let p3 = '';
    pList.each(function(i, elem) {
        // console.log(i);
        p1 = $(this).children().first().text().replace(/\n|\t|\s/g,'')
        p2 = $(this).find('.des').text().replace(/\n|\t|\s/g,'')
        p3 = $(this).children().last().text().replace(/\n|\t|\s/g,'')
        pListData.push({
            title: p1.match(/《(\S*)》/)[1],
            abstarct: p2,
            info:p3
        });
    });

  fs.writeFile(path.join(__dirname,'./pListData.json'),JSON.stringify(pListData),(err) =>{
      if(err) {
        console.log('写入失败');
        return;
      }
      console.log('写入成功过');
  })
});