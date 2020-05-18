# platziverse-mqtt

## `agent/connected`

``` js
{
  agent: {
    uuid, // auto generar
    username, // definir por configuración
    name, // definir por configuración
    hostname, // obtener del sistema operativo
    pid // obtener del proceso
  }
}
```

## `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}
```

## `agent/message`

``` js
{
  agent,
  metrics: [
    {
      type,
      value
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
## example insert data from terminal
  mqtt pub -t 'agent/message' -m '{"agent": {"uuid": "yyx", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzi" }, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp", "value": "33"}]}'
 mqtt pub -t 'agent/message' -m '{"agent": {"uuid": "car1", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzi" }, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp", "value": "33"}]}'
mqtt pub -t 'agent/message' -m '{"agent": {"uuid": "car2", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzi" }, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp", "value": "33"}]}'
mqtt pub -t 'agent/message' -m '{"agent": {"uuid": "car3", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzi" }, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp", "value": "33"}]}'
mqtt pub -t 'agent/message' -m '{"agent": {"uuid": "car4", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzi" }, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp", "value": "33"}]}'

 // connect to db in terminal
 psql -U platzi platziverse
```