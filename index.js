const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const options = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
}

const io = socketIo(server, options)

function onConnect (socket) {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('message', message => {
    io.emit('message', message)
  })
}

io.on('connection', onConnect)

const port = 3001

function onListen () {
  console.log(`Listening on ${port}`)
}

// Start the app
server.listen(port, onListen)
