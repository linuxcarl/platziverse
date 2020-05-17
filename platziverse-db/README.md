# platziverse-db

## Usage

``` js
const setupDatabase = require('platziverse-db')

setupDabase(config).then(db => {
  const { Agent, Metric } = db

}).catch(err => console.error(err))

## Notes

command in terminal conect to postgres: 
  postgres  psql -U platzi platziverse
```