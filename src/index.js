const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')
const socket = require('socket.io')

const app = express()
const port = process.env.DB_PORT || 3003

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use(xss())
app.use(helmet())
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api/v1', routerNavigation)
app.use('/api', express.static('src/uploads'))

// Socket.io configuration=================
const server = require('http').createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/socket.io'
})

let listUserOnline = []

io.on('connection', (socket) => {
  console.log('Socket.io Connect !')

  socket.on('connectServer', ({ userId }) => {
    if (!listUserOnline.includes(userId)) {
      listUserOnline.push(userId)
    }
    io.emit('listUserOnline', listUserOnline)
    socket.join(userId)
  })
  socket.on('disconnectServer', ({ userId }) => {
    listUserOnline = listUserOnline.filter((el) => el !== userId)
    io.emit('listUserOnline', listUserOnline)
    socket.leave(userId)
  })
  socket.on('joinRoom', ({ room, oldRoom }) => {
    if (oldRoom) {
      socket.leave(oldRoom)
    } else {
      socket.join(room)
    }
    // socket.broadcast.to(data.room).emit('message', {
    //   username: '[BOT]',
    //   message: `${data.username} join this Chat`
    // })
  })
  socket.on('sendMessage', (data) => {
    io.to(data.roomChat).emit('message', data)
  })
  socket.on('notifMessage', (data) => {
    socket.broadcast.to(data.receiverId).emit('notifMessage', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data)
  })
})

server.listen(port, () => {
  console.log(`Express app is listen on port ${port} !`)
})
