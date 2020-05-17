'use strict'

const test = require('ava')
const request = require('supertest')

const server = require('../server')

//prueba del tipo callback cb
//https://github.com/avajs/ava/blob/master/docs/03-assertions.md
test.serial.cb('/api/agents', t => {
    request(server)
        .get('/api/agents')//url de la petición
        .expect(200)//Código http de respuesta
        .expect('Content-type', /json/)// espero que tenga la palabra json
        .end((err, res) => {
            t.falsy(err, 'Should not return an error')//en caso de error
            t.deepEqual(res.body,{},'Response body should be the expected')//esperamos un objeto vacio
            t.end()//esta funcion solo aplica con las pruebas tipo callback
        })
})