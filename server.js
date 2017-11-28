const express=require('express');
// const MongoStore = require('connect-mongo')(session);
const http=require('http');
const WebSocket=require('ws');
const appPORT=process.env.PORT || 8080;
const app=express();

const server=http.createServer(app);
const wss=new WebSocket.Server({server: server});
server.listen(appPORT);

function randHex() { return parseInt(Math.floor(Math.random()*255)).toString(16); }

function rIn() { return Math.floor(Math.random()*255); }

function randomRGB() {
  // return `#${randHex()}${randHex()}${randHex()}`;
  return `rgba(${rIn()},${rIn()},${rIn()},1.0)`;
}

function randomString(idx) {
  return ['marmot','comet','test','other','curious','animals'][idx];
}

let clientColors={};
let clientNames={};

wss.broadcast = function broadcast(data, sendingClient) {
  wss.clients.forEach(function each(client) {
    if (client._ultron.id!==sendingClient) { client.send(data); }
  });
};

wss.on('connection', function connection(client) {
  console.log('new connection client: ',client._ultron.id);
  clientColors[client._ultron.id]=randomRGB();
  clientNames[client._ultron.id]=randomString(client._ultron.id);
  if (client.readyState === client.OPEN) {
    client.on('message', function incoming(message) {
      if (message) {
        message=JSON.parse(message);
        console.log(message);
      }
      switch(message.action) {
        case 'newClient': client.send(JSON.stringify({msg:'oheythere'})); break;
        case 'moving': wss.broadcast(JSON.stringify(message),client._ultron.id); break;
        case 'freeze':
          wss.broadcast(
            JSON.stringify(
              Object.assign(message,{clientName:clientNames[client._ultron.id], color:clientColors[client._ultron.id]})),
              client._ultron.id
            ); break;
        case 'unfreeze': wss.broadcast(JSON.stringify(message),client._ultron.id); break;
        case 'delete': wss.broadcast(JSON.stringify(message),client._ultron.id); break;
        default: wss.broadcast(JSON.stringify(message),client._ultron.id); break;
      }
    });
  }
});
