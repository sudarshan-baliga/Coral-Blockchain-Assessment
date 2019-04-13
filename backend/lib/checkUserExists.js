checkUserExists = (email) => {
    var query = "select * from userData where emailid = ?";
    let connection = require("./db.js");
    return new Promise((resolve, reject) => {
        connection.query(query, [email], (error, results, fields) => {
            // connection.end();
            if (error) {
                console.log(error);
                reject({});
            }
            else {
                console.log(results);
                if (results.length == 0)
                    resolve({});
                resolve(results[0]);
            }
        });
    });
}

module.exports = checkUserExists;