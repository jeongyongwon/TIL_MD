# JS - WebRTC

---

### 1. 우선 Package.json 생성 / 필요한 라이브러리 설치

```bash
npm init
npm i express ejs socket.io uuid
npm i -dev nodemon
npm i -g peer
```

#### 	uuid란 ?

​    => 네트워크 상에서 고유성이 보장되는 id를 만들기 위한 표준규약

​	=> https://www.huskyhoochu.com/what-is-uuid/

####   

#### ejs : nodejs의 템플릿 엔진 

#### peer  : webRTC를 쉽게 구현하도록 도와줌

```bash
peerjs --port 3001  
```



## 2. server.js를 생성하고 초기설정을 해준다

```js
const express = require('express') // express로 사용하기
const app = express() // app 서버를 express로 돌림
const server = require('http').Server(app) // http로 서버를 돌림
const io = require('socket.io')(server) // io서버를 위의 서버와 같이함
// 랜덤한 아이디가 생성됨
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

//localhost:3000를 실행하고 보면 Url에 랜덤함 uuid가 붙어있음
app.get('/', (req, res) => {
   // uuid을 가진 url에 redirect함
  res.redirect(`/${uuidV4()}`)
})

// 그리고 redirect했을 때
app.get('/:room', (req, res) => {
 // roomId key값으로 방 번호를 가지고 같이 넘겨주고
 // local의 console에서 확인할 수 있다
 // 위의 uuidV4 값과 roomId 값은 같다
  res.render('room', { roomId: req.params.room })
})

server.listen(3000)
```





## 3. /views/room.ejs를 만들줌

- **ejs문법이 생소할 수 있으나 NodeJS에 유용하다고 함**

```JS
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script>
    const ROOM_ID = "<%= roomId %>"
	
  </script>
// peer js를 사용할 수 있는 cdn
  <script defer src="https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js"></script>
// socketio를 사용할 수 있는 cdn
  <script src="/socket.io/socket.io.js" defer></script>
// public 폴더에 있는 거 불러옴
  <script src="script.js" defer></script>
  <title>Document</title>
  <style>
    #video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-auto-rows: 300px;
    }
    
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <div id="video-grid"></div>
</body>
</html>
```



## 4. public 폴더 안에서 script.js를 만들어준다. 그리고 server.js 아래에도 socket.io 내용을 추가해준다

### script.js

```js
const socket = io('/')

socket.emit('join-room', ROOM_ID, id)

socket.on('user-connected', userId => {
    // Backend 유저 Id 넘어와서 보여줄꺼다 새로 접속한
    console.log('User connected:' + userId)
})
```



### server.js (위의 내용에 추가)

```js
io.on('connection', socket => {
   // front 측에서 join-room으로 parameter에 값을 담아 넘어오고
  socket.on('join-room', (roomId, userId) => {
    // 받을 room 값으로 들여보낸다
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
        // 해당 roomId에 있는 모든 인간들에게 이벤트와 userId를 뿌린다
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)
```



### Script.js

```js
const socket = io('/')
// 임의의 peer를 만드는 듯
const myPeer = new Peer(undefined, {
    // url은 
  host: '/',
  port: '3001'
})

//peer port로 열리면
myPeer.on('open', id => {
    // 보내는 로직 변경
  socket.emit('join-room', ROOM_ID, id)
})
//socket.emit('join-room', ROOM_ID, id)

socket.on('user-connected', userId => {
    // Backend 유저 Id 넘어와서 보여줄꺼다 새로 접속한
    ///
    console.log('User connected:' + userId)
})
```

> - **추가설명을 하자면 위의 uuid로 만든건 방ID, 그리고 각 사람마다 고유 userId가 있다**
>
> - server.js에 있는 **'/' 에 들어갔을 때** uuid를 랜덤으로 생성해서 **'/{:roomId}' redirect**를 시킨다 (시작하자마자 => 방을 만든다) + 이 때 그사람의 고유 userid 값도 생김(콘솔로확인함)
> - **io 로직을 보면서 다음을 이해해보자**
>
> ```js
> io.on('connection', socket => {
> 
>   /*connect은 서버가 연결되있긴 때문에 새로 세션을 열면
>   자동으로 들어가진다
>   생각해보면 script.js에서 io('/')라고 정의했고 들어오자마자 '/'로 들어오니까 그거를 백 엔드로 'join-room' 이벤트로 보낼 것이다
>   
>   그때 RoomId와 userId를 담아서 보냈다
>   */
>   socket.on('join-room', (roomId, userId) => {
>     socket.join(roomId)
>     socket.to(roomId).broadcast.emit('user-connected', userId)
> 
>     socket.on('disconnect', () => {
>       socket.to(roomId).broadcast.emit('user-disconnected', userId)
>     })
>   })
> })
> ```

### video를 생성할 태그와 비디오화면을 추가할 태그를 잡는다

```js
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const myVideo = document.createElement('video')
// 내 비디오는 마이크 시작하자마자 끄고 시작함
// 그러나 다른사람이 들어왔을 땐 아니다
myVideo.muted = true


navigator.mediaDevices.getUserMedia({
    // 브라우저 자체에 가지고 있는 옵션이고 우리가 접근할 수 있는듯
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
    	
  socket.on('user-connected', userId => {
        console.log('User connected:' + userId)
        connectToNewUser(userId, stream)
 })    
.....
function addVideoStream(video, stream) {
  video.srcObject = stream
    // data가 loaded 되면 이벤트 실행인 거 같고
  video.addEventListener('loadedmetadata', () => {
     // 비디오 재생하는 부분 같고
    video.play()
  })
  // 태그에다 더하는 것 같고
  videoGrid.append(video)
}
```

