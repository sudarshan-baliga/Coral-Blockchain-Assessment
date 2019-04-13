checkUserExists = (email) => {
    var query = "select userName from userData where emailid = ?";
    let connection = require("./db.js");
    return new Promise((resolve, reject) => {
        connection.query(query, [email], (error, results, fields) => {
            // connection.end();
            if (error) {
                console.log(error);
                reject(false);
            }
            else {
                console.log(results.length);
                if (results.length == 0)
                    resolve(false);
                resolve(true);
            }
        });
    });
}

module.exports = checkUserExists;