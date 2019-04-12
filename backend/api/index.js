var express = require("express");
var router = express.Router();
var bus = require("./bus");
var db = require("../lib/db");


router.get("/", function (req, res) {
    res.send({ success: true });
});

//redirect the requests to respective file
router.use("/bus", bus);

module.exports = router;