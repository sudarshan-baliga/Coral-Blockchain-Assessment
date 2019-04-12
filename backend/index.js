var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var api = require("./api");


//enable cross origin request during developement
app.use(cors());
//to get the body from post request which is a asynchronous process
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//redirect the requests to api
app.use("/", api);
app.use(express.static("./build"));

//listen for the requests
app.listen(3001, () => {
    console.log('listening at 3001');
});