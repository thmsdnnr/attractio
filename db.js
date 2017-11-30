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

//word lists are tied to word list names
/*
word list:
  WORDS []String
  NUMWORDS num
  SOURCE String
  AUTHOR String
  TAGS: []String
*/

//right now don't exclude duplicates
//can save word lists and can save boards with positions

//one room has: one owner, one board, one wordlist
//can share with friends

//if you created a board, you can enable/disable shared editing
//if you created a board, you can limit actions other users can perform on your movable board:
// ->read (view board as it moves in real-time)
// ->write (add elements/delete elements)
//->maybe delete elements w/ timer, or can only delete + create a certain #
// ->execute (delete elements, reset board entirely)

/*Word Lists*/
exports.saveRoom = function(D, cb) {
  if (!D.data) {
    cb('THERE IS NO DATA BEING SENT', null);
  }
  db.collection("rooms").update({room:D.room}, {room:D.room, data:D.data, createdOn: new Date()}, {upsert:true},
  function(err, data) { cb(err, data); });
}

exports.loadRoom = function(name, cb) {
  db.collection("rooms").find({room:name}).toArray(function(err,data){
    cb(err, data);
  });
}

exports.saveWordList = function(data, cb) {
  const createdOn=new Date();
  const { words, numWords, source, author, tags } = data;
  db.collection("wordLists").insert({name, words, numWords, source, author, tags, createdOn}, function(err,data){
    if(!err) { cb(data); }
    else { cb(false); }
  });
}

exports.getWordList = function(data,cb) {
  db.collection("wordLists").find({name:data.name}).sort({createdOn:-1}).toArray(function(err, docs) {
  if(!err) { (docs.length) ? cb(docs) : cb(false); }
  });
}
