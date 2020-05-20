'use strict'
if (process.env.NODE_ENV !== 'production') require('longjohn')
const PlatziverseAgent = require('../')

const agent = new PlatziverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 1000,
  mqtt: {
    host: 'mqtt://localhost:1813'
  }
})

agent.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallback (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

agent.connect()

// This agent only
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)

//other agents
agent.on('agent/connected', handler)
agent.on('agent/disconnected', handler)
agent.on('agent/message', handler)

function handler (payload) {
  console.log(payload)
}

//setTimeout(() => agent.disconnect(), 20000)
