const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('/ 여기로 들어왔다구')
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  console.log('/ redirect해서 room id를 프론트로 넘긴다구')
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  console.log('socket도 백엔드에서는 처리됬다구')
  console.log(socket.nsp.name)
  socket.on('join-room', (roomId, userId) => {
    console.log('방들어가는 순간이라구')
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    console.log('방들어가고 뿌린 이후니?')

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)