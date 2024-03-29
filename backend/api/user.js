var express = require('express');
var router = express.Router();
var checkUserExist = require("../lib/checkUserExists");
var connection = require('../lib/db');

router.post("/insertUser", async function (req, res) {
    console.log("add user request", req.body);
    let query = "";
    let errorInUserCheck = false;
    let userExists = false;
    try {
        let searchUser = await checkUserExist(req.body.email);
        if (searchUser["emailId"] == req.body.email)
            userExists = true;
    }
    catch (err) {
        errorInUserCheck = true;
    }
    if (errorInUserCheck) {
        res.status(500).send({
            success: false,
            message: 'Internal server error. There was an error in checking user existance in database',
        });
    }
    else {
        if (!userExists) {
            query = "INSERT INTO userData(userName, emailId, phoneNo, password, dateTime) VALUES(?,?,?,?,NOW())";
            userData = [req.body.userName, req.body.email, req.body.phone, req.body.password];
        }
        else {
            query = "UPDATE userData set userName = ?, phoneNo = ?, password = ?, dateTime = NOW() WHERE emailId = ?";
            userData = [req.body.userName, req.body.phone, req.body.password, req.body.email];
        }
        connection.query(query, userData, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: 'Internal server error. There was an error in inserting or updating in the database',
                });
            }
            else {
                let message = "";
                if (userExists) {
                    message = `User ${req.body.email} already exists in the database so, updated the user data`;
                    res.send(
                        {
                            success: true,
                            message: message,
                            data: userData
                        }
                    )
                }
                else {
                    message = `Added new user ${req.body.email} to data base`;
                    res.send(
                        {
                            success: true,
                            message: message,
                            data: userData
                        }
                    )
                }
            }
        });
    }
});


router.post("/searchUser", async function (req, res) {
    console.log("search user request", req.body);
    let userExists = false;
    let userData = {};
    let errorInUserCheck = false;
    try {
        let searchUser = await checkUserExist(req.body.email);
        if (searchUser["emailId"] == req.body.email) {
            userExists = true;
            userData = searchUser;
        }
    }
    catch (err) {
        errorInUserCheck = true;
    }
    if (errorInUserCheck) {
        res.status(500).send({
            success: false,
            message: 'Internal server error. There was an error in checking user existance in database',
        });
    }
    else {
        if (!userExists) {
            res.status(200).send({
                success: true,
                message: 'User does not exists in database',
                exists: false
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: 'User exists in the  database',
                data: userData,
                exists: true
            });
        }
    }
});



module.exports = router;