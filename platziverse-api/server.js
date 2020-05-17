'use strict'

const debug = require('debug')('platziverse:api')
const http = require('http')
const chalk = require('chalk')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

//Express error handler
app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`)
    if(err.message.match(/not found/)){
        return res.status(404).send({error: err.message})
    }
    res.status(500).send({error: err.message})
})

function handleFatalError(err){
    console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
    console.error(err.message)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[Platziverse-api]')} server listening on port ${port}`)
})
