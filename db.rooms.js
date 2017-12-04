module.exports = function(dbCon) {
  let Db={
    saveRoom: function (D, cb) {
      if (!D.data) { cb('THERE IS NO DATA BEING SENT', null); }
      dbCon.collection("rooms").update({room:D.room}, {room:D.room, data:D.data, lastUpdate: new Date()}, {upsert:true},
      function(err, data) { return cb(err, data); });
    },
    loadRoom: function (name, cb) {
      dbCon.collection("rooms").find({room:name}).toArray(function(err,data){
        return cb(err, data);
      });
    }
  };
  return Db;
};
