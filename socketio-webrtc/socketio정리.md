# Socketio

---

> https://www.npmjs.com/package/socket.io
>
> (시큐어 코딩 참고)

- `connection`: 클라이언트랑 발생하는 이벤트
- `dissconnecting`을 쓰게 되면 쉽게 socket의 정보를 알 수 있지만 `disconnection`은 알 수없음
- `error` : 에러 발생했을 때 이벤트



**Socket** Object

=> `socket.id`, `socket.rooms` , `socket.handshake`

- id, rooms(어느 방엔 들어가 있는지)
-  handshake (query, host, url, user-agent(어디서 접속했는지 알 수 있음), cookie) => **http와 관련된 정보를 가지고 있음**

**room**

- socket.broadcast.emit(...) // 챗서버에 접속한 모든이에게 (방 무관, 나 제외)

- socket.broadcast.to('roomId').emit(...) // 이 roomId 방에서 나를 제외한 모두에게!!
- io.to('roomId').emit(...); // 이 roomId 방 모두에게(나 포함)!! => 나한테도 메시지올 수 도 있음



## 1. 간단한 chat 구현

- 최초 연결시 기본방(default room) 자동 join 
- 특정 방 조인 / 나가기 기능 
- 조인된 방 사람들에게 메시지 보내기 
- 귓속말

### Express에서  io 서버 접속

```js
// Express 앱 서버
const app = require('express')();
// http 서버를 express로 서버 만들고
const server = require('http').createServer(app);
// express로 이루어진 http서버를 io서버에 포함시킨다
// 그래서 웹 기능 / 채팅 기능을 한번에 쓰는 것으로 이해함
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(3000);
```

### index.js

```js
//7000번 포트로 씀
//util log는 시간이 나옴
const server = app.listen(7000, function(){
    console.log("Express's started on port 7000");
});

// 위의 7000번 포트를 io서버도 같이 씀
const io = require('socket.io').listen(server, {
  log: false,
    // 이걸 해줘야 url이 달라도 들어올 수 있음
  origins: '*:*',
    // 안 줘도 상관없긴 한데, 클라이언트 살아 있는지 확인하려고 
  pingInterval: 3000,
  pingTimeout: 5000
});

// 모든 socket's'  => 모든 클라이언트가 socket과 연결되어있을 때
io.sockets.on('connection', (socket, opt) => {
    // 접속했을 때 message를 보냄
  socket.emit('message', {msg: 'Welcome ' + socket.id});
   // socket이 room에 들어가는 로직
    // fn은 클라이언트에서 데이터뿐만 아니라 함수까지 다 넘겨줄 수 있음
  socket.on('join', function(roomId,/*userid*/,fn) {
      // join 되고나서 callback 함수
    socket.join(roomId, function() {
      // socket.userid = userid;
      util.log("Join", roomId, Object.keys(socket.rooms));
      // fn있을 경우 실행하세요~
      if (fn)
        fn();
    });
  });  
  // 나가는 로직
  socket.on('leave', function(roomId, fn) {
    util.log("leave>>", roomId, socket.id)
    socket.leave(roomId, function() {
      // 넘어오는 함수 있으면 실행하겟지
      if (fn)
        fn();
    });
  });    
	
  // 방목록을 알려주는 것
  socket.on('rooms', function(fn) {
    if (fn)
      fn(Object.keys(socket.rooms));
  });    
    
  // client에서 메시지를 보냈다
  // 넘어오는 내용은 다음과 같다
  // data : {room: 'roomid', msg:'msg..내용'}
  socket.on('message', (data, fn) => {
      	//socket.rooms => 들어가 있는 방목록 => 이거를 통해서 메시지를 주고 받고 함
       	// {roomId: [socket1, socket2]} => 이런식으로 방번호가 적혀있음
      	// Object.keys(socket.rooms) => 방 번호들이 나옴
      util.log("message>>", data.msg, Object.keys(socket.rooms));
      
      // 상대방의 말도 받을 수 있는 거임
      // 나를 제외한 모두에게
      // message를 발생시킨 방에서 room.id를 통해 방을 인식하고 
      // message 이벤트를 통해 room에 온 메시지를 뿌린다 나빼고
      socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});
      
      // fn있을 때만 처리하도록 이런거 로직처리잘하자
      if (fn)
       	fn(data.msg);
  });	
    
   // 정보을 얻어 무언가를 처리하려면 disconnect이 아니라 disconnecting을 해야함
  socket.on('disconnecting', function(data) {
    // 어떤애가 나갔는지 
    util.log("disconnecting>>", socket.id, Object.keys(socket.rooms))
  });
    
  socket.on('disconnect', function(data) {
    util.log("disconnect>>", socket.id, Object.keys(socket.rooms))
  });    
  socket.on('message-for-one', (socketid, msg, fn) => {
    // socket.broadcast.to(socketid).emit('message', {msg: msg});
    // 해당인간의 방한테 보내는듯
    socket.to(socketid).emit('message', {msg: msg});
  });
  });
```

### 이제 한번 Front 쪽 로직을 만들어보자

- 해당 강의에서는 `public`에 `chat-client`를 만들어줌
- 우선 JQURY로 하는데 뒤에 Vue로 변환 할꺼임 로직만 이해

```html
<h1>Chat Client <strong id="myid" class="red"></strong></h1>
  <div id="rooms"></div>
  <div>
    <input type="text" id="roomid" value="room1">
      <!--해당-->
    <button onclick="joinRoom()">Join</button>
  </div>

  <hr>

  <div id="status" class="red"></div>

  <div id="list">
  </div>

  <div>
    <input type="text" id="msg" value="hi~">
    <button onclick="send()" id="btnSend">Send</button>
  </div>

  <div>
    <input type="text" id="socketid" value="">
    <button onclick="sendOne()">귓속말</button>
  </div>


<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>

<!--socket io cdn으로 socketio를 사용할 수 있게 불러옴-->
<script src="/socket.io/socket.io.js"></script>
<script>
// 방장의 아이디 => 곧 방 id ?
var square = 'square';
    // 현재 접속된 방 아이디 (주의: 초기 값 셋팅하면 join시 초기값 방을 나오므로 null setting!!)    
var joinedRoom = null;  
    // 7000port로 쓰는 대로 쓸꺼고
 var socket = io('http://localhost:7000');
 socket.on('connect', function(){
     console.log("connected")
     
     // 연결됬으면 Join 하세요 아래에 있음
     makeJoin(square);

     // 들어갓다면 들어갓다고 나옴
     $('#status').text("Joined : " + joinedRoom)
     
     // client에서 방목록을 볼 수 있도록
     displayRooms();
 });
 
 
 socket.on('message', function(data){
     console.log("message>>", data)
     let msg = data.msg;
     
     // 위에 대화 목록을 더해준
     // 서버에서 id 값을 보내줌
     $('#list').append(`<div><strong>${msg}</strong></div>`);
     
     // 접속했을 때 index.js에 이렇게 적혀 있다
     // socket.emit('message', {msg: 'Welcome ' + socket.id});
     if (msg && msg.startsWith('Welcome ')) {
          let myid = msg.substring(msg.lastIndexOf(' ') + 1);
         // 그러면 접속아이디를 한번 #myid div태그에 value 값을 넣어줌
          $('#myid').text(myid);
        }     
 });
 socket.on('disconnect', function(){
 	console.log("disconnected!!");
     // 끊기면 끊켯다고나옴
     $('#status').text("disconnected")
 });
 function send() {
     let msg = $('#msg').val();
     // 이거를 Backend에서 받을 때 message로 받으면 뒤에 있는 함수는 fn으로 들어가서 넘겨줌
 socket.emit('message', {room: joinedRoom, msg: msg}, function(ret) {
     console.log("message.callback" , ret);
     // back의 보내주고 
     $('#list').append(`<div>나: ${msg}</div>`);
 });
 }
  // 방들어가는 function
  function joinRoom() {
    // roodid라는 id값을 가진 input의 value로 roomid를 찾음
    let roomid = $('input#roomid').val();
    // room number null일경우?
    if (!roomid) {
      alert('Input the room-id to join!!');
      return;
    }
    console.log("joinRoom>>", roomid)
	
    //join 하세요
    makeJoin(roomid);
  }    
    
  // 들어간다는 느낌보다는 가상의 방으로 갑자기 들어간 느낌
  // 치면 없어 그래서 만들어 그렇게 생각해
  function makeJoin(roomid) {
    console.log("makeJoin>>", roomid)
    // index.js에서 fn에 받을 arrow function
    socket.emit('join', roomid, () => {
      console.log("joinedRoom>>", joinedRoom)
      // 지금 처음 들어오면 나만의 방으로 들어옴
      // 근데 지금 로직에서 방을 어떻게보면 이동하는 거니까 
      // 상단에 방 아이디를 나가주는 걸 적어야하고 
      // 지금 들어온 방에 대하여 id값을 할당해야함
      socket.emit('leave', joinedRoom);
      joinedRoom = roomid;
      // 그리고 들어간 방을 적어준다 그렇게보면됨
      $('#status').text("Joined : " + joinedRoom)
      displayRooms();
    });
  }

    function displayRooms() {
    socket.emit('rooms', function(rooms) {
      console.log("rooms>>", rooms)
      $('#rooms').text(rooms);
    });
  }
    
   function sendOne() {
    // 귓속말 할 id인듯 
    let socketid = $('#socketid').val();
    if (!socketid) return alert("Input the socketid!!");

    socket.emit("message-for-one", socketid, "귓속말:" + $('#msg').val());
  }   
```

