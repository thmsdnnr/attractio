const express=require('express');
const path=require('path');
const http=require('http');
const WebSocket=require('ws');
const appPORT=process.env.PORT || 8080;
const app=express();
const Db=require('./db.js');
let ADJS=["divine","elegant","classy","winning","winsome","comely","luring","pretty","radiant","siren","angelic","sublime","refined","lovable","darling","magical","sweet"];;
let ANIMALS=["zebra","cat","gazelle","raccoon","yak","otter","hyena","puma"];
app.use('/static',express.static(path.join(__dirname,'/static')));

let URL_ADJS=["elastic","elated","elfin","elite","enchanted","endurable","exuberant","exultant","fabulous","fearless","fierce","hallowed","immense","jazzy","lavish","luxuriant","lyrical","melodic","nimble","oceanic","optimal","placid","quirky","sassy","savory","spiffy","swanky","ultra"];

const server=http.createServer(app);
const wss=new WebSocket.Server({server: server});
server.listen(appPORT);

function randHex() { return parseInt(Math.floor(Math.random()*255)).toString(16); }

function rIn() { return Math.floor(Math.random()*255); }

function rArr(arr) {
  return arr[Math.floor(Math.random()*(arr.length-1))];
}

const randomURL=()=>rArr(ADJS)+"-"+rArr(URL_ADJS)+"-"+rArr(ANIMALS);

function randomRGB() {
  return `rgba(${rIn()},${rIn()},${rIn()},1.0)`;
}

function randomString(idx) {
  return rArr(ADJS)+" "+rArr(ANIMALS);
}

const remove = (arr, ele) => {
  if (!(arr&&Array.isArray(arr))||(!(ele&&Number.isInteger(ele)))) { return null; }
  return arr.indexOf(ele)!==-1 ? arr.filter(e=>e!==ele) : null;
}
const promote = (arr, ele) => {
  if (!arr||!ele) { return false; }
  if (arr.length===1) { return arr; }
  let idx = arr.indexOf(ele);
  return (idx!==-1) ? [ele].concat(arr.slice(0,idx),arr.slice(idx+1)) : arr;
}

let clientID=0;
let clients={}; //map of clientID to WS Client Object
let clientColors={};
let clientNames={};
let rooms={}; //map of roomID to an array of clientIDs joined to room
app.get('/:p', function(req,res) {
  if (req.params.p.match(/[^a-z0-9-]/gi)) { return false; }
  else { res.sendFile(path.join(__dirname+'/index.html')); }
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname+'/usage.html')));

wss.broadcast = function broadcast(data, room, sendingClient) { //TODO "rooms" based on word sets
  rooms[room].forEach(function(clientID) {
    if (clientID!==sendingClient) {
      let client=clients[clientID];
      if (client&&client.readyState===client.OPEN) { client.sendMsg(data); }
      else { //client ID is stale, remove from rooms
        rooms[room] = remove(rooms[room],clientID);
      }
    }
  });
};

function sendPrivateMessage(msg, recClient) {
  let C=clients[recClient];
  if (C) { C.sendMsg(msg); }
  else { return false; }
}

wss.on('connection', function connection(client) {
  clientID++;
  let CUID=clientID;
  clients[clientID]=client;
  clientColors[CUID]=randomRGB();
  clientNames[CUID]=randomString(CUID);
  if (client.readyState===client.OPEN) {
    client.sendMsg = function(message) { //Server Message Bus
      // console.log('server sent msg to client', JSON.stringify(message).slice(0,100), CUID);
      let payload=JSON.stringify(message);
      client.send(payload);
    };
    client.on('message', function incoming(message) {
      //when we receive a message from a client, put them at the beginning of the clients array for that room.
      if (!message) { return false; }
      message=JSON.parse(message);
      if (client._CURRENT_ROOM&&message.data) {
        let R=client._CURRENT_ROOM;
        rooms[R]=promote(rooms[R], CUID);
      }
      // console.log('server received message from client', JSON.stringify(message).slice(0,100));
      if (!['hydrate','newClient','freeze','moving','stateUpdate'].includes(message.action)) {
        Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
        });
      }
      switch(message.action) {
        case 'stateUpdate':
          if (!message.data.length) { break; }
          else {
            wss.broadcast({action:'rehydrate',data:message.data}, message.room, CUID);
            Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
              ;
            });
          }
        break;
        case 'emptyRoom': client.sendMsg({action:'newRoom'}); break;
        case 'newClient':
          let R=message.room;
          client._CURRENT_ROOM=R;
          if (rooms[R]&&rooms[R].length) {
            if (rooms[R].length>2) {
              let urls=[randomURL(), randomURL(), randomURL()];
              client.sendMsg({action:'roomFull', data:urls}); return false;
            }
            /*We request the state from the client with the most recent activity in the room
            that also has data: we Promote the client ID to the front of a queue each action */
            sendPrivateMessage({action:'requestCurrentState'},rooms[R][0]);
            //TODO need to have a thing to do in case no response is given: setTimeout to dB call or call next up client
          }
          else { //no one in the room, get last state from Db
            Db.loadRoom(message.room, function(err, data) {
                if (data.length&&data[0].data) {
                  client.sendMsg({action:'hydrate',data:data[0].data});
                } else { //new room entirely
                  client.sendMsg({action:'newRoom'});
                }
            });
          }
          //add client to room
          rooms[R] = rooms[R] ? rooms[R].concat(CUID) : [CUID];
          client.sendMsg({msg:'Hello New Client', id:clientID});
          break;
        case 'lapsedClient':
          // console.log('lapsed client'); //TODO better lapsed client handling
          client._CURRENT_ROOM=R;
          if (rooms[R]&&rooms[R].length) {
            sendPrivateMessage({action:'requestCurrentState'},rooms[R][0]);
            //TODO need to have a thing to do in case no response is given
          }
          else { //no one in the room, get last state from Db
            Db.loadRoom(message.room, function(err, data) {
                if (data.length&&data[0].data) {
                  client.sendMsg({action:'hydrate',data:data[0].data});
                } else { //new room entirely, make client owner
                  client.sendMsg({action:'newRoom'});
                }
            });
          }
          rooms[R] = rooms[R] ? rooms[R].concat(CUID) : [CUID];
          client.sendMsg({msg:'Hello New Client', id:clientID});
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
    let R=client._CURRENT_ROOM;
       if (R && rooms[R]) { rooms[R]=remove(rooms[R],CUID); }
       delete clients[CUID];
  	});
});
