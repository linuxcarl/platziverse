'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const soketio = require('socket.io')
const express = require('express')
const proxy = require('./proxy')
const chalk = require('chalk')
const PlatziverseAgent = require('platziverse-agent')
const { pipe, handleFatalError } = require('platziverse-utils')

const port = process.env.PORT || 8099
const app = express()
const server = http.createServer(app)
const io = soketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

//Socket.io / WebSockets
io.on('connect', socket =>{
    debug(`Connected ${socket.id}`)

    pipe(agent, socket)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(
    `${chalk.green('[PlatziVerse-web]')} server listening on http://localhost:${port}`
  )
  agent.connect()
})