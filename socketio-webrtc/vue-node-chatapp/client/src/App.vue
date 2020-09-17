<template>
	<div id="app">
		<div class="room">
			<input v-model="roomName" type="text">
			<button @click="GoRoom">버튼</button>
		</div>
		<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Username: {{ username }}</p>
			<p class="online">Online: {{ users.length }}</p>
		</div>
		<ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
	</div>
</template>


<script>
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';

export default {
	name: 'app',
	components: {
		ChatRoom
	},
	data: function () {
		return {
			username: "",
			socket: io("http://localhost:3000"),
			messages: [],
			users: [],
			roomName:"",
		}
	},
	methods: {
		joinServer: function () {
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.users = data.users;
				this.socket.emit('newuser', this.username);
			});

			this.listen();
		},
		listen: function () {
			this.socket.on('userOnline', user => {
				this.users.push(user);
			});
			this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
				console.log("귓속말",message);
			});
		},
		sendMessage: function (message) {
			console.log("sendmessagez",message);

			this.socket.emit('msg', message);
		},
		GoRoom() {
    	this.socket.emit('join', this.roomName);	
		console.log(this.roomName)
		}
		// namespace(nsp) {
		// 	const namespace = io('/namespace' + nsp);
		// 	namespace.on('news', (data) => {
		// 		console.log(data.hello);
		// 	})

		// }
	},
	mounted: function () {
		this.username = prompt("What is your username?", "Anonymous");

		if (!this.username) {
			this.username = "Anonymous";
		}

		this.joinServer();
	}
}
</script>

<style lang="scss">
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}
</style>
