#!/usr/bin/env node
// #!/usr/bin/env node indicamos que este archivo lo podremos ejecutar con ese binario
// hay que dar permisos al script con chmod +x platziverse.js
'use strict'

/* eslint new-cap: "off" */

const blessed = require('blessed')
const contrib = require('blessed-contrib')

// console.log(process.argv)//muestra los argumentos enviados y las rutas de ejecion del script

const screen = blessed.screen()

// componente del grid
const grid = new contrib.grid({
  rows: 1,
  cols: 4,
  screen
})
// componente arbol
const tree = grid.set(0, 0, 1, 1, contrib.tree, {
  label: 'Connected Agents'
})
// component de la linea
const line = grid.set(0, 1, 1, 3, contrib.line, {
  label: 'Metric',
  showLegend: true,
  minY: 0,
  xPadding: 5
})
// definir combinacion de teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})
screen.render()
