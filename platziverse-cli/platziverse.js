#!/usr/bin/env node
// #!/usr/bin/env node indicamos que este archivo lo podremos ejecutar con ese binario
// hay que dar permisos al script con chmod +x platziverse.js
'use strict'

/* eslint new-cap: "off" */

const blessed = require('blessed')
const contrib = require('blessed-contrib')
const PlatziverseAgent = require('platziverse-agent')

// console.log(process.argv)//muestra los argumentos enviados y las rutas de ejecion del script

const agent = new PlatziverseAgent()
const screen = blessed.screen()
const agents = new Map()
const agentMetrics = new Map()

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

function renderData(){
    const treeData = {}
    for(let [uuid, val] of agents){
        const title = `${val.name} -(${val.pid})`
        treeData[title] ={
            uuid,
            agent: true,
            children:{}
        }
    }
    tree.setData({
        extended: true,
        children: treeData
    })
    screen.render()
}
agent.on('agent/disconnected', payload =>{
    const {uuid} = payload.agent

    if(agents.has(uuid)){
        agents.delete(uuid)
        agentMetrics.delete(uuid)
    }
    renderData()
})
agent.on('agent/connected', payload => {
    const { uuid } = payload.agent
    if(!agents.has(uuid)){
        agents.set(uuid, payload.agent)
        agentMetrics.set(uuid,{})
    }
    renderData()
})

// definir combinacion de teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})
agent.connect()
screen.render()
