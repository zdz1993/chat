var http = require("http"),
    cheerio = require("cheerio");
var url = "http://www.alloyteam.com/";
var data = "";
// 创建一个请求
var req = http.request(url, function(res){
    // 设置显示编码
    res.setEncoding("utf8");
    // 数据是 chunked 发送，意思就是一段一段发送过来的
    // 我们使用 data 给他们串接起来
    res.on('data', function(chunk){
        data += chunk;
    });
    // 响应完毕时间出发，输出 data
    res.on('end', function(){
        // dealData(data);
        console.log(data);
    });
});
// 发送请求
req.end();