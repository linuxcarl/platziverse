'use strict'
if (process.env.NODE_ENV !== 'production') require('longjohn')
const {parsePayload, pipe, handleFatalError} = require('./utils')
const config = require('./config')
const agentFixtures = require('./tests/fixtures/agent')
module.exports = {
    config,
    parsePayload,
    pipe,
    handleFatalError,
    agentFixtures
}