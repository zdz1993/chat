//引入nodejs的包
var ws = require('nodejs-websocket');
var http = require("http");
var fs = require("fs");
var nicknameArray = [];

var server = ws.createServer(function(connection) {
    connection.nickname = null
    connection.on("text", function(str) {
        if (connection.nickname === null) {
            connection.nickname = str;
            nicknameArray.push(connection.nickname);
            broadcast(JSON.stringify({ str: nicknameArray, type: "detail" }));
        } else
            broadcast(JSON.stringify({ str: "[" + connection.nickname + "] " + str, type: "content" }));
    })

    connection.on("close", function() {
        broadcast(connection.nickname)
    })

})
server.listen(8080)

function broadcast(str) {
    server.connections.forEach(function(connection) {
        connection.sendText(str)
    })
}