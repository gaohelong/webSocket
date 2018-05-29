const Koa = require('koa');
const app = new Koa();
const socket = require('http').createServer(app.callback());
const io = require('socket.io')(socket);

// 总人数.
let num = 0;

// 连接.
io.on('connection', function(socket) {
    // 第几位聊天用户.
    socket.send(`你是第${++num}位`);
});

socket.listen(3000);
