// 安装ws模块
// npm install ws
// 新建index.js文件

// 导入ws模块
const WebSocket = require('ws');

// 新建一个WebSocketServerconst
wss = new WebSocket.Server({ port: 3000 });

// 服务器监听连接事件
wss.on('connection', ws => {
    var brEle = '<br>';

    // 服务器监听消息事件 
    ws.on('message', msg => {
        console.log('服务器收到: ', msg);
        if (msg == '客户端发出的测试探针') {
            ws.send('服务器与客户端探针测试完毕' + brEle);
            return '';
        }
        ws.send('服务器已保存了输入的信息: ' + msg + brEle);
    });

    // 服务器向客户端发送消息
    ws.send('服务器端发出的测试探针: ' + new Date() + brEle);

    // 每10秒发送一次推送.
    setInterval(() => {
        ws.send('服务器最新消息: ' + new Date() + brEle);
    }, 10000);
});
