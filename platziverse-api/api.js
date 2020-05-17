'use strict'

const debug = require('debug')
const express = require('express')
const db = require('platziverse-db')
const {config} = require('platziverse-utils')

const api = express.Router()

let services, Agent, metrics

api.use('*',(req, res, next) => {

})

api.get('/agents', (req, res) => {
  res.send({})
})

api.get('/agent/:uuid', (req, res, next) => {
  const { uuid } = req.params

  if (uuid !== 'yyy'){
      return next(new Error('Agent no found'))
  }
  res.send({ uuid })
})

api.get('/metrics/:uuid/:type', (req, res) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})

module.exports = api
