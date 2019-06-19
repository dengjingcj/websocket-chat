var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.of('my-room').on('connection', (client) => {
    client.join('room');
    // 监听消息订阅
    client.on('subscribeToMsg', (name) => {
        io.of('my-room').in('room').emit('message', {
            type: 'info',
            author: 'admin',
            content: `${name} 上线了`
        });
    });
    // 接收到客户端发过来的消息
    client.on('clientSendMsg', msg => {
        console.log(msg);
        io.of('my-room').in('room').emit('message', msg);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);