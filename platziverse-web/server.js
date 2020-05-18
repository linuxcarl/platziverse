'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const soketio = require('socket.io')
const express = require('express')
const chalk = require('chalk')
const platziverseAgent = require('platziverse-utils')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = soketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))

//Socket.io / WebSockets
io.on('connect', socket =>{
    debug(`Connected ${socket.id}`)

    socket.on('agent/message', payload =>{
        socket.emit('agent/message', payload)
    })
    socket.on('agent/connected', payload =>{
        socket.emit('agent/connected', payload)
    })
    socket.on('agent/disconnected', payload =>{
        socket.emit('agent/disconnected', payload)
    })
})


function handleFatalError (err) {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
  console.error(err.message)
  process.exit(1)
}
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(
    `${chalk.green('[PlatziVerse-web]')} server listening on http://localhost:${port}`
  )
  agent.connect()
})
