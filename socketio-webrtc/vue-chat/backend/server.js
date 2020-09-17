const app = require('express')();
const server = require('http').createServer(app);
// socket server로 설정
const io = require('socket.io')(server,{
    pingTimeout: 1000,
});


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get('/', function(req, res) {
    res.sendFile('Hellow Chating App Server');
});

//connection event handler
// socket 연결했을 때
io.on('connection' , function(socket) {
    console.log('Connect from Client: '+ socket)

    socket.on('hello', function(data){
        console.log('hello from Client: '+data)
    });
    // 클리이언트로 부터 'chat' 이라는 이벤트명을 사용해 메세지를 전달받습니다. 

    socket.on('chat', function(data){
        console.log('message from Client: '+data.message)

        const rtnMessage = {
            message: data.message
        };

        // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage);
    });


})

server.listen(3000, function() {
    console.log('socket io server listening on port 3000')
})