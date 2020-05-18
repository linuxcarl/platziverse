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
const agent = new platziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))

//Socket.io / WebSockets
io.on('connect', socket =>{
    debug(`Connected ${socket.id}`)

    socket.on('agent/message', payload =>{
        console.log(payload)
    })
    setInterval(() => {
        socket.emit('agent/message',{agent:'Que onda browser! se va hacer o no se va hacer!'})
    }, 4000);
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
