var mysql = require("mysql");
var config = require("../lib/config");

var connection = mysql.createConnection(
    {
        host: config.host,
        user: config.mySqlUser,
        password: config.mySqlPass,
        database: config.mySqlDb
    }
);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('successfully connected to mysql as id ' + connection.threadId);
});

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      console.log("mysql connection closed automatically")                      
    } else {                                      
      throw err;
    }
  });

module.exports = connection;