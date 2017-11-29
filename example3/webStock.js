// 安装ws模块
// npm install ws
// 新建index.js文件

// 导入ws模块
const WebSocket = require('ws');

// 导入fs模块
const fs = require('fs');

// 导入path模块
const path = require('path');

// 总人数.
let num = 0;

// 新建一个WebSocketServerconst
wss = new WebSocket.Server({ port: 3000 });

// 服务器监听连接事件
wss.on('connection', ws => {
    // 第几位聊天用户.
    ws.send('你是第' + (++num) + '位');

    // 加入聊天.
    wss.broadcast(ws, '<div style="color: red;">请注意有用户加入聊天!<div>');

    // 服务器监听消息事件 
    ws.on('message', msg => {
        console.log('服务器收到: ', msg);
        // if (msg == '客户端发出的测试探针') {
        //     ws.send('服务器与客户端探针测试完毕' + brEle);
        //     return '';
        // }

        var filePath = path.resolve(__dirname, 'chatRecord.txt');

        // 打开chatRecord, 没有则创建.
        fs.open(filePath, 'a+', (err, fd) => {});

        // 写入文件内容.
        fs.appendFileSync(filePath, msg + '<br>', { encoding: 'utf-8' });

        msg = '用户: ' + msg + '<br>';

        // 返回文件内容.
        // ws.send(msg);

        // 广播.
        wss.broadcast(ws, msg);

        // console.log(ws.readyState);
    });

    // 服务器向客户端发送消息
    // ws.send('服务器端发出的测试探针: ' + new Date() + brEle);

    // 每10秒发送一次推送.
    // setInterval(() => {
    //     ws.send('服务器最新消息: ' + new Date() + brEle);
    // }, 10000);

    // 退出聊天  
    ws.on('close', function() {  
        try {
            wss.broadcast(ws, '<div style="color: yellow;">请注意有用户退出的聊天!<div>');
        } catch(e) {
            console.log('刷新页面了');
        }
    });
});

//广播  
wss.broadcast = function broadcast(ws, msg) {
    wss.clients.forEach(function each(client) {
        // if (typeof client.user != "undefined") {
            client.send(msg);
        // }
    });
}; 
