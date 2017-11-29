// 安装ws模块
// npm install ws
// 新建index.js文件

// 导入ws模块
const WebSocket = require('ws');

// 导入fs模块
const fs = require('fs');

// 导入path模块
const path = require('path');

// 新建一个WebSocketServerconst
wss = new WebSocket.Server({ port: 3000 });

// 服务器监听连接事件
wss.on('connection', ws => {
    // 服务器监听消息事件 
    ws.on('message', msg => {
        console.log('服务器收到: ', msg);
        // if (msg == '客户端发出的测试探针') {
        //     ws.send('服务器与客户端探针测试完毕' + brEle);
        //     return '';
        // }

        var filePath = path.resolve(__dirname, 'chatRecord.txt');

        // 打开chatRecord, 没有则创建.
        var chatRecord = fs.open(filePath, 'a+', (err, fd) => {
            // console.log(err, fd);
        });
        
        // 写入文件内容.
        fs.appendFileSync(filePath, msg + '<br>', { encoding: 'utf-8' });

        // 读取文件内容.
        var content = fs.readFileSync(filePath, { encoding: 'utf-8' });

        // 返回文件内容.
        ws.send(content);

        wss.broadcast(ws, content);
    });

    // 服务器向客户端发送消息
    // ws.send('服务器端发出的测试探针: ' + new Date() + brEle);

    // 每10秒发送一次推送.
    // setInterval(() => {
    //     ws.send('服务器最新消息: ' + new Date() + brEle);
    // }, 10000);
});

//广播  
wss.broadcast = function broadcast(ws, content) {
    wss.clients.forEach(function each(client) {
        // if (typeof client.user != "undefined") {
            client.send(content);
        // }  
    });  
}; 
