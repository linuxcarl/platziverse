'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

const args = process.argv.slice();
async function setup () {
  console.log(args)
  if(!args.includes('-y') && !args.includes('--yes')){
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database? are you sure?'
      }
    ])
    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }else{
    return console.log('...')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: (s) => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[FATAL ERROR!!]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
