# mongo - vue - socket

---

## server.js 

```js
// 애플리케이션은 express에요
// express() 랑 같은 뜻
const app = require("express")();
// 애플리케이션을 http로 사용할꺼에요
// http().Server(express())
const http = require("http").Server(app);
// http프로토콜의 애플리케이션을 socket.io랑 같이사용할꺼에요
// socket.io(http) = socket.io(http.Server(express()))
const io = require("socket.io")(http);
// mongo 모듈이에요
const mongoose = require("mongoose");
let users = [];
let messages = [];

// 그리고 mongodb 서버에 chatapp이라는 이름으로 연결함
// **default port:27017
mongoose.connect("mongodb://localhost:27017/chatapp");

// mongo로 스키마 만들고
const ChatSchema = mongoose.Schema({
	username: String,
	msg: String
});

// chat이라는 모델을 만드는 이를 위의 스키마로 만듬
// mongodb 모델안에는 chat이라는 모델로 두고 변수로 ChatModel로 선언함
const ChatModel = mongoose.model("chat", ChatSchema);

// 로그 
ChatModel.find((err, result) => {
    // 예외처리문
	if (err) throw err;

	messages = result;
});

// port를 연결한거 그냥 보여주는거
http.listen(process.env.PORT || 3000, () => {
	console.log("Listening on port %s", process.env.PORT || 3000);
});
```



## 이제 Socket 로직을 짜보자

### 1. 먼저 백 엔드에서 연결되었는 지를 확인한다

- **server.js**

```js
io.on("connection", socket => {
    // 프론트에서 localhost:3000으로 socket이 연결이 된 vue로 실행하게 될 경우 들어오는 것 같다
    // 그니까 새로운 사람이 들어왔다고 생각하면 될듯
	console.log('연결됬니')
    // 연결이 됬다면 loggedIn이라는 이벤트로 프론트 요청이 갈 것이고
    // 이를 프론트에서 loggedIn으로 받는다
    // 위에 정의해놓은 users와 messages의 리스트를 보낸다
	socket.emit('loggedIn', {
		users: users.map(s => s.username),
		messages: messages
	});

});
```



### 2. 프론트의  `APP.vue`에서  socket를 연결해보자

- #### App.vue

- `script` 부분만 살펴보자(이것도 로직마다 잘라서 붙일꺼임)

- `mounted` 부터 실행될 것이다

```js
<script>
    // client 측을 위한 socket이다
import io from 'socket.io-client';
// 채팅은 아래의 component에서 구현할 것이다
import ChatRoom from './components/ChatRoom';

export default {
	name: 'app',
	components: {
		ChatRoom
	},
	data: function () {
		return {
			username: "",
            // 어떤 port에 client socket을 연결해줄껀지
			socket: io("http://localhost:3000"),
			messages: [],
			users: []
		}
	},
	methods: {
		joinServer: function () {
            // loggedIn이라는 이벤트가 백 엔드 측에서 왔다
			this.socket.on('loggedIn', data => {
                // 넘어온 데이터를 담아서
				this.messages = data.messages;
				this.users = data.users;
                // 새로운 user가 들어왔다는 정보를 newuser 이벤트로 지금 들어온 username를 보내버린다
				this.socket.emit('newuser', this.username);
			});

			this.listen();
		},
    },
    //
    mounted: function () {
        // 들어가자마자 유저명을 받는다
        // username를 백으로 넘겨주기 위해 할당하고 default는 Anonymous이다
        this.username = prompt("What is your username?", "Anonymous");
		
        if (!this.username) {
            this.username = "Anonymous";
        }
	 	// 그리고 바로 joinServer()의 method를 실행한다
        this.joinServer();
    }    
</script>
```



### 3.  newuser를 백에서 처리해보자

- **server.js**

```js
	socket.on('newuser', username => {
        // log에 잘 도착했는지 확인하자
		console.log(`${username} has arrived at the party.`);
        // socket으로 담겨져 있는 username를 담아주고
		socket.username = username;
		
        // backend에도 username를 users를 통해 추가해준다
		users.push(socket);
		
       	// socket으로 담은 정보를 해당 이벤트로 다시 리턴
        // 아직 로직 처리 중이고 들어오지 않은 거다
		io.emit('userOnline', socket.username);
	});
```



### 4. 프론트에서  온라인 중인 유저를 담아주자

- **App.vue**

```js
listen: function () {
			this.socket.on('userOnline', user => {
				this.users.push(user);
			});
```



#### 5. 이제 채팅을 쳐보자

- Vuex 안쓰고 했으니 이해좀
- prop - emit으로 처리할 것이다
- `App.vue`의 하위 컴포넌트인 `ChatRoom.vue` 에 채팅창 및 입력창을 만들것임
- SCSS는 뺌

````js
<template>
	<div class="chat-window">
		<div class="messages">
			<div class="message" v-for="message in messages" v-bind:key="message._id">
				<div class="username">{{message.username}}</div>
				<div class="message-text">{{message.msg}}</div>
			</div>
		</div>
		<form class="input-container" v-on:submit="sendMessage">
			<input type="text" v-model="msg">
			<button v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'chatroom',
        // 메시지를 받을 array를 받아내림
	props: ['messages'],
	data: function () {
		return {
			msg: ""
		}
	},
	methods: {
		sendMessage: function () {
			if (!this.msg) {
				alert("Please enter a message");
				return;
			}
			// 메시지가 들어오면 메시지를 담아 위로 emit 하고
            // 초기화한다
			this.$emit('sendMessage', this.msg);
			this.msg = "";
		}
	}
}
</script>
````

- `App.vue`에서  `sendMessage` 로 `socket`을 통해  쏜다

- **`App.vue`** 

```js
		sendMessage: function (message) {
            // this.msg가 message로 담겨 들어옴
            // 그 메시지를 다시 소켓으로 보낸다
			this.socket.emit('msg', message);
		}
```

- **server.js**

```js
	socket.on('msg', msg => {
        // ChatModel에 인스턴스를 새로 생성하여 저장하고
		let message = new ChatModel({
			username: socket.username,
			msg: msg
		});

		message.save((err, result) => {
			if (err) throw err;
			
            // 저장한 데이터를 
			messages.push(result);
			// 사람과 대화 내용을 다시 msg라는 이벤트로 프론트에 보냄
			io.emit('msg', result);
		});
	});
```

- 다시 `App.vue`

```js
		listen: function () {
			this.socket.on('userOnline', user => {
				this.users.push(user);
			});
			this.socket.on('msg', message => {
                // 로컬에 그 대화 내용과 유저를 담고
                // Chat.vue에서 가져오니까 대화내용은 살아있다
				this.messages.push(message);
			});
		},
```

