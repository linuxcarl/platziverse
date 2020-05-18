'use strict'

module.exports = {
  db:{
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: (s) => console.log(s)
  },
  auth:{
    secret: process.env.SECRET || 'platzi'
  }
}