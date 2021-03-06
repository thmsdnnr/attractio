const WebSocket=require('ws');
const dQueries=require('./db.rooms.js');
const UTILS=require('./utils.js');

exports.initServer = (server, dbCon) => {
  const dbActionsToIgnore=['emptyRoom','newClient','lapsedClient','freeze','moving'];
  const Db=dQueries(dbCon);
  let clientID=0;
  let clients={}; //map of clientID to WS Client Object, Client Name, and Client Color
  let rooms={}; //map of roomID to an array of clientIDs joined to room

  const sendPrivateMessage = (msg, recClient) => {
    let C=clients[recClient].obj;
    if (C) { C.sendMsg(msg); }
    else { return false; }
  };

  let wss=new WebSocket.Server({server: server});
  wss.broadcast = function broadcast(data, room, sendingClient) {
    rooms[room].forEach(function(clientID) {
      if (clientID!==sendingClient) {
        let client=clients[clientID].obj;
        if (client&&client.readyState===client.OPEN) { client.sendMsg(data); }
        else { //client ID is stale, remove from rooms
          rooms[room] = remove(rooms[room],clientID);
        }
      }
    });
  };

  function heartbeat() { this.isAlive = true; }
  const interval = setInterval(function ping() {
    Object.keys(clients).forEach(function each(clientID) {
      let client = clients[clientID];
      let cObj=client.obj;
      if (cObj.isAlive === false) { terminateClient(client); }
      cObj.isAlive=false;
      cObj.ping('', false, true);
      });
    }, UTILS.$.wsPingInterval);

  function terminateClient(client) {
    let cObj=client.obj;
    let CUID=client.id;
    cObj.terminate();
    let R=cObj._CURRENT_ROOM;
    if (R && rooms[R]) { rooms[R]=UTILS.remove(rooms[R],CUID); }
    delete clients[CUID];
  }

  wss.on('connection', function connection(client) {
    client.isAlive = true;
    client.on('pong', heartbeat.bind(client));
    clientID++;
    let CUID=clientID;
    clients[clientID]={obj: client, color:UTILS.randomRGB(), name:UTILS.randomString(CUID), id:clientID};
    if (client.readyState===client.OPEN) {
      client.sendMsg = function(message) { //Server Message Bus
        // console.log('server sent msg to client', JSON.stringify(message).slice(0,100), CUID);
        let payload=JSON.stringify(message);
        client.send(payload);
      };
      client.on('message', function incoming(message) {
        if (!message) { return false; }
        message=JSON.parse(message);
        if (client._CURRENT_ROOM&&message.data) {
          let R=client._CURRENT_ROOM;
          rooms[R]=UTILS.promote(rooms[R], CUID);
        }
        // console.log('server received message from client', JSON.stringify(message).slice(0,100));
        if (!dbActionsToIgnore.includes(message.action)) {
          Db.saveRoom({room:message.room, data:message.data}, function(err, data) {
            ;
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
                let urls=[UTILS.randomURL(), UTILS.randomURL(), UTILS.randomURL()];
                client.sendMsg({action:'roomFull', data:urls}); return false;
              }
              sendPrivateMessage({action:'requestCurrentState'},rooms[R][0]);
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
            rooms[R] = rooms[R] ? rooms[R].concat(CUID) : [CUID];
            client.sendMsg({msg:'Hello New Client', id:clientID});
            break;
          case 'moving': wss.broadcast(message,message.room,CUID); break;
          case 'freeze': wss.broadcast(Object.assign(message,{clientName:clients[CUID].name, color:clients[CUID].color}),message.room, CUID); break;
          case 'unfreeze': wss.broadcast(message,message.room,CUID); break;
          case 'delete': wss.broadcast(message,message.room,CUID); break;
          default: wss.broadcast(message,message.room,CUID); break;
        }
      });
    }
    client.on('close', function close() { terminateClient(clients[CUID]); });
  });
}
