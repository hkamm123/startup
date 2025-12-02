const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({noServer: true});

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), ws: ws };
    connections.push(connection);

    ws.on('message', function message(data) {
      console.log('ws message received by server'); //TODO: remove
      console.log(data) // TODO: remove
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          console.log('sending message from server') // TODO: remove
          c.ws.send(data);
        }
      });
    });

    wss.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });
  });
}

module.exports = { peerProxy };