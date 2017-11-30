var MongoClient = require('mongodb').MongoClient;
let db;
let W;
let dbUrl=process.env.PROD_DB||'mongodb://localhost:27017/';

function connect(callback) {
  if (db===undefined) {
    MongoClient.connect(dbUrl, function(err, database){
      if(err) { return callback(err) };
      db=database;
      callback(null, db);
    });
  }
  else { callback(null, db); }
}

connect(function(d){ });

exports.saveRoom = function(D, cb) {
  if (!D.data) { cb('THERE IS NO DATA BEING SENT', null); }
  db.collection("rooms").update({room:D.room}, {room:D.room, data:D.data, createdOn: new Date()}, {upsert:true},
  function(err, data) { cb(err, data); });
}

exports.loadRoom = function(name, cb) {
  db.collection("rooms").find({room:name}).toArray(function(err,data){
    cb(err, data);
  });
}
