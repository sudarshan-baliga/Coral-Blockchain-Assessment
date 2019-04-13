var express = require('express');
var router = express.Router();
var checkUserExist = require("../lib/checkUserExists");
var connection = require('../lib/db');


router.post("/insertUser", async function (req, res) {
    console.log("add user request", req.body);
    let query = "";
    let userExists = await checkUserExist(req.body.email);
    if (!userExists) {
        query = "INSERT INTO userData(userName, emailId, phoneNo, password, dateTime) VALUES(?,?,?,?,NOW())";
        userData = [req.body.userName, req.body.email, req.body.phone, req.body.password];
    }
    else {
        query = "UPDATE userData set userName = ?, phoneNo = ?, password = ?, dateTime = NOW() WHERE emailId = ?";
        userData = [req.body.userName, req.body.phone, req.body.password, req.body.email];
    }
    console.log(userData);
    connection.query(query, userData, function (error, results, fields) {
        console.log(results);
        if (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'There was a problem',
            });
        }
        else {
            let message = "";
            if (userExists) {
                message = `User ${req.body.email} exists updated the user data`;
                if (results["affectedRows"] == 1) {
                    res.status(200).send(
                        {
                            success: true,
                            message: message,
                            data: userData
                        }
                    )
                }
            }
            else {
                message = `Added ${req.body.email} to data base`;
                if (results["affectedRows"] == 1) {
                    res.status(201).send(
                        {
                            success: true,
                            message: message,
                            data: userData
                        }
                    )
                }
            }
        }
    });
    //   
});

module.exports = router;