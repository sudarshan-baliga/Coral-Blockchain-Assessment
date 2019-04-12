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

module.exports = connection;