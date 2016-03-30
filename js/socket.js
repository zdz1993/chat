//引入nodejs的包
var ws = require('nodejs-websocket');
var http = require("http");
var fs = require("fs");
var nicknameArray = [];

var server = ws.createServer(callback)

function callback(connection) {
    connection.nickname = null
    connection.on("text", function(str) {
        if (connection.nickname === null) {
            connection.nickname = str;
            nicknameArray = [];
            server.connections.forEach(function(item) {
                nicknameArray.push(item.nickname);
            })
            broadcast(JSON.stringify({ str: nicknameArray, type: "detail" }));
        } else
            broadcast(JSON.stringify({ str: "[" + connection.nickname + "]" + str, type: "content" }));
    })

    connection.on("close", function(res) {
        nicknameArray = [];
        server.connections.forEach(function(item) {
            nicknameArray.push(item.nickname);
        })
        broadcast(JSON.stringify({ str: nicknameArray, type: "detail" }));
    })
    connection.on("error", function(e) {
        console.log(e);
    })

}
server.listen(8080)

function broadcast(str) {
    server.connections.forEach(function(connection) {
        // nicknameArray.push(connection.nickname);
        // nicknameArray = unique1(nicknameArray);
        connection.sendText(str)
    })
}

// function unique(array) {
//     var n = []; //一个新的临时数组
//     //遍历当前数组
//     for (var i = 0; i < array.length; i++) {
//         //如果当前数组的第i已经保存进了临时数组，那么跳过，
//         //否则把当前项push到临时数组里面
//         if (n.indexOf(array[i]) == -1) n.push(array[i]);
//     }
//     return n;
// }
