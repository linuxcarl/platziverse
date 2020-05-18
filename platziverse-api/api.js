'use strict'

const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('platziverse-db')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const { config } = require('platziverse-utils')
const api = asyncify(express.Router())

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    Agent = services.Agent
    Metric = services.Metric
  }
  next()
})

api.get('/agents', auth(config.auth) , async (req, res, next) => {

  const {user} = req
  if(!user || !user.username){
    return next(new Error('Not authorized'))
  }

  let agents = []
  try {
    if(user.admin)
      agents = await Agent.findConnected()
    else
      agents = await Agent.findByUsername(user.username)
  } catch (e) {
    return next(e)
  }

  res.send(agents)
})

api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug(`request to /agent/${uuid}`)

  let agent
  try {
    agent = await Agent.findByUuid(uuid)
  } catch (e) {
    return next(e)
  }
  if (!agent) {
    return next(new Error(`Agent no found with uuid: ${uuid}`))
  }
  res.send(agent)
})

/** 
 * exmpla de payload de token
 * https://jwt.io/
 * {
    "permissions":[
        "metrics:read"
    ],
    "username": "CARLOS",
    "admin": true,
    "name":"carlos" 
  }
*/
api.get('/metrics/:uuid', auth(config.auth), guard.check('metrics:read'), async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /metrics/${uuid}`)

  let metrics = []
  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})
api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params
  debug(`request to /metrics/${uuid}/${type}`)

  let metrics
  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    return next(e)
  }
  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics no found with uuid: ${uuid} and type: ${type}`))
  }
  return res.send(metrics)
})

module.exports = api
