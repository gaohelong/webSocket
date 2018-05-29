const Koa = require('koa');
const app = new Koa();
const socket = require('http').createServer(app.callback());
const io = require('socket.io')(socket);

// 聊天总人数.
let num = 0;

// 连接.
io.on('connection', function(socket) {
    // 第几位聊天用户.
    socket.send(`你是第${++num}位加入聊天室的用户`);
    let username = `用户${num}`;

    // 给除了自己以外的客户端广播消息.
    socket.broadcast.emit("message", { msg: `<div style="color: red;">请注意 ${username} 加入聊天!<div>` });

    // 服务器监听消息事件.
    socket.on('message', msg => {
        console.log(msg);
        broadcast(`<div>${username}: ${msg}</div>`);
    });

    // 断开.
    socket.on('disconnect', (reason) => {
        console.log(reason);
        socket.disconnect(true);
    });

    // 自定义事件.
    socket.emit('emitCustom', { msg: 'emit custom!' });

    // 自定义事件及客户端回调函数.
    socket.emit('ferret', 'ferret!', (data) => {
        console.log('ferret:', data);
    } );
});

// 广播.
let broadcast = (msg) => {
    io.sockets.emit('message', msg);
}

socket.listen(3000);
