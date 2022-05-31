
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });
app.use(express.static('public'));

function calltochange() {
  ws.send('change');
}

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Hello New Client, this connection works i guess.');
  
  setInterval(calltochange, 1000);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', function(req, res){
  res.sendFile('index.html');
}); 




server.listen(3000, () => console.log(`Listening on port`))