'use strict'

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