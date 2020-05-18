'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const db = require('platziverse-db')
const { agentFixtures } = require('platziverse-utils')

let sandbox = null
let server = null
let dbStub = null
let AgentStub = {}
let MetricStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  AgentStub.findConnected = sandbox.stub()
  AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected))

  const api = proxyquire('../api', {
    'platziverse-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
// prueba del tipo callback cb
// https://github.com/avajs/ava/blob/master/docs/03-assertions.md
test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')// url de la petición
    .expect(200)// Código http de respuesta
    .expect('Content-type', /json/)// espero que tenga la palabra json
    .end((err, res) => {
      t.falsy(err, 'Should not return an error')// en caso de error
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(agentFixtures.connected)
      t.deepEqual(body, expected, 'Response body should be the expected')// esperamos un objeto vacio
      t.end()// esta funcion solo aplica con las pruebas tipo callback
    })
})
/*
RETO PARA IMPLEMENTAR PRUEBAS
*/
test.serial.todo('/api/agent/:uuid')
test.serial.todo('/api/agent/:uuid - not found')

test.serial.todo('/api/metrics/:uuid')
test.serial.todo('/api/metrics/:uuid - not found')

test.serial.todo('/api/metrics/:uuid/:type')
test.serial.todo('/api/metrics/:uuid/:type - not found')
