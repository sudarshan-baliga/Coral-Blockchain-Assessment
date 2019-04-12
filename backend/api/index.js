var express = require("express");
var router = express.Router();
var user = require("../api/user.js");


router.get("/", function (req, res) {
    res.send({ success: true });
});

//redirect the requests to respective file
router.use("/user", user);

module.exports = router;