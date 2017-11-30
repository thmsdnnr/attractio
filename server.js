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
  if (req.params.p.match(/[^a-z0-9]/gi)) {
    res.end('Hey, sorry but you can only use numbers 0-9 and letters A-Z in a room name (along with hyphens). Try again?');
  } else {
  res.sendFile(path.join(__dirname+'/index.html'));
  }
});

wss.broadcast = function broadcast(data, room, sendingClient) { //TODO "rooms" based on word sets
  if (rooms[room]!==undefined) {
    rooms[room].forEach(function(clientID) {
      if (clientID!==sendingClient) {
        let client=clients[clientID];
        if (client&&client.readyState===client.OPEN) { client.sendMsg(data); }
        else { //client ID is stale, remove from rooms
          rooms[room] = remove(rooms[room],clientID);
        }
      }
    });
  }
};

wss.on('connection', function connection(client) {
  clientID++;
  let CUID=clientID;
  clients[clientID]=client;
  clientColors[CUID]=randomRGB();
  clientNames[CUID]=randomString(CUID);
  if (client.readyState===client.OPEN) {
    client.sendMsg = function(message) {
      console.log('server sent msg to client', message, CUID);
      let payload=JSON.stringify(message);
      client.send(payload);
    };
    client.on('message', function incoming(message) {
      console.log('server received message from client', message);
      //TODO buggy as hell
      if (message) { message=JSON.parse(message); }
      if (!['hydrate','newClient','freeze','moving','stateUpdate'].includes(message.action)) {
        console.log('the message', message);
        Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
          console.log('saved room with data');
        });
      }
      switch(message.action) {
        case 'stateUpdate':
          if (!message.data.length) { break; }
          else {
            wss.broadcast({action:'hydrate',data:message.data},message.room, CUID);
            Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
              console.log('saved room with data');
            });
          }
        break;
        case 'emptyRoom':
          //client sent back message that there are no words in the room, so we reset the room
          console.log('empty room');
          client.sendMsg({action:'newRoom'});
        break;
        case 'newClient':
          //see if room name exists in the dB 1) if so, push room data 2) else don't.
          client._CURRENT_ROOM=message.room; //TODO requesting current state from client vs saving in Db directly
          if (rooms[message.room]&&rooms[message.room].length) { //request room state from current client and update Db
            console.log('request state from client');
            //TODO get away from requesting from client or, if you do, only ask from a good and current client
            wss.broadcast({action:'requestCurrentState'}, message.room, null); //TODO request from most recent client with an action
          }
          else { //no one in the room, get last state from Db
            console.log('get last state from db');
            Db.loadRoom(message.room, function(err, data) {
              console.log(data);
                if (data.length&&data[0].data) {
                  client.sendMsg({action:'hydrate',data:data[0].data});
                } else { //new room entirely, make client owner
                  client.sendMsg({action:'newRoom'});
                }
            });
          }
          //add client to room
          rooms[message.room] ? rooms[message.room].push(clientID) : rooms[message.room]=[clientID];
          client.sendMsg({msg:'oheythere', id:clientID});
          break;
        case 'moving': wss.broadcast(message,message.room,CUID); break;
        case 'freeze': wss.broadcast(Object.assign(message,{clientName:clientNames[CUID], color:clientColors[CUID]}),message.room, CUID); break;
        case 'unfreeze': wss.broadcast(message,message.room,CUID); break;
        case 'delete': wss.broadcast(message,message.room,CUID); break;
        default: wss.broadcast(message,message.room,CUID); break;
      }
    });
  }
  client.on('close', function close() {
       if (client._CURRENT_ROOM && rooms[client._CURRENT_ROOM]) {
         rooms[client._CURRENT_ROOM]=remove(rooms[client._CURRENT_ROOM],CUID);
       }
       delete clients[CUID];
  	});
});
