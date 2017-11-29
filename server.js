const express=require('express');
// const MongoStore = require('connect-mongo')(session);
const path=require('path');
const http=require('http');
const WebSocket=require('ws');
const appPORT=process.env.PORT || 8080;
const app=express();
const Db=require('./db.js');
let ADJS=["divine","elegant","classy","winning","winsome","comely","luring","pretty","radiant","siren","angelic","sublime","refined","lovable","darling","magical","sweet"];;
let ANIMALS=["zebra","cat","gazelle","raccoon","yak","otter","hyena","puma"];
app.use('/static',express.static(path.join(__dirname,'/static')));

const server=http.createServer(app);
const wss=new WebSocket.Server({server: server});
server.listen(appPORT);

function randHex() { return parseInt(Math.floor(Math.random()*255)).toString(16); }

function rIn() { return Math.floor(Math.random()*255); }

function rArr(arr) {
  return arr[Math.floor(Math.random()*(arr.length-1))];
}

function randomRGB() {
  // return `#${randHex()}${randHex()}${randHex()}`;
  return `rgba(${rIn()},${rIn()},${rIn()},1.0)`;
}

function randomString(idx) { //TODO client names
  return rArr(ADJS)+" "+rArr(ANIMALS);
  // return ['marmot','comet','test','other','curious','animals'][idx];
}

const remove = (arr, ele) => arr.filter(e=>e!==ele);

let clientID=0;
let clients=[]; //map of clientID to WS Client Object
let clientColors={};
let clientNames={};
let rooms={}; //map of roomID to an array of clientIDs joined to room

app.get('/t/:p', function(req,res) {
  console.log(req.params.p);
  // res.end(JSON.stringify({msg:'done'}));
  res.sendFile(path.join(__dirname+'/index.html'));
});

wss.broadcast = function broadcast(data, room, sendingClient) { //TODO "rooms" based on word sets
  rooms[room].forEach(function(clientID) {
    if (clientID!==sendingClient) {
      let client=clients[clientID];
      if (client&&client.readyState===client.OPEN) { client.send(data); }
      else {
        //client ID is stale, remove from rooms
        console.log('clean id', rooms, rooms[room]);
        rooms[room] = remove(rooms[room],clientID);
        console.log('clean id', clientID);
      }
    }
  });
};

wss.on('connection', function connection(client) {
  clientID++;
  let CUID=clientID;//client._ultron.id;
  clients[clientID]=client;
  // clients.push({id:clientID, client:client, room:room});
  console.log('new connection client: ',CUID);
  clientColors[CUID]=randomRGB();
  clientNames[CUID]=randomString(CUID);
  if (client.readyState===client.OPEN) {
    client.on('message', function incoming(message) {
      if (message) {
        message=JSON.parse(message);
        console.log(message);
      }
      if (!['hydrate','newClient','freeze','moving'].includes(message.action)) {
        Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
          console.log(data.result,'saveroom');
        });
      }
      switch(message.action) {
        case 'stateUpdate':
          console.log('serverstateupdate msg data',message.data);
          if (!message.data.length) { break; }
          else {
            wss.broadcast(JSON.stringify({action:'hydrate',data:message.data}),message.room, CUID);
            Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
            console.log(data.result,'saveroom');
          });
        }
          // console.log(message);
          break;
        case 'newClient':
          //see if room name exists in the dB
          //if so, push room data
          //else don't.
          client._CURRENT_ROOM=message.room;
          if (rooms[message.room]&&rooms[message.room].length) { //request room state from current client and update Db
            console.log('m',rooms[message.room])
            wss.broadcast(JSON.stringify({action:'requestCurrentState'}), message.room, null); //TODO request from most recent client with an action
          }
          else { //no one in the room, get last state from Db
            Db.loadRoom(message.room, function(err, data) {
              console.log(err);
              console.log('load room');
                if (data.length) {
                  data=data[0];
                  client.send(JSON.stringify({action:'hydrate',data:data}));
                } else { //new room entirely make client owner
                  client.send(JSON.stringify({action:'newRoom'}));
                }
            });
          }
          //add client to room
          rooms[message.room] ? rooms[message.room].push(clientID) : rooms[message.room]=[clientID];
          client.send(JSON.stringify({msg:'oheythere', id:clientID}));
          break;
        case 'moving': wss.broadcast(JSON.stringify(message),message.room,CUID); break;
        case 'freeze':
          wss.broadcast(
            JSON.stringify(
              Object.assign(message,{clientName:clientNames[CUID], color:clientColors[CUID]})),
              message.room, CUID
            ); break;
        case 'unfreeze': wss.broadcast(JSON.stringify(message),message.room,CUID); break;
        case 'delete': wss.broadcast(JSON.stringify(message),message.room,CUID); break;
        default: wss.broadcast(JSON.stringify(message),message.room,CUID); break;
      }
    });
  }
  client.on('close', function close() {
  		 console.log(CUID,"DISCONNECTED");
       console.log('room',rooms[client._CURRENT_ROOM]);
       rooms[client._CURRENT_ROOM]=remove(rooms[client._CURRENT_ROOM],CUID);
       console.log('room',rooms[client._CURRENT_ROOM]);
       delete clients[CUID];
  	});
});
