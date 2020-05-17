'use strict'

const debug = require('debug')
const express = require('express')

const api = express.Router()

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
