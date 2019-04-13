const URL = "http://localhost:3001/user"

export function insertUsr(userData) {
    let reqUrl = URL + "/insertUser";
    let body = {
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
    };
    console.log("body", body);
    return new Promise((resolve, reject) => {
        fetch(reqUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            res.json().then(json => {
                console.log(json);
                resolve(json);
            });
        }).catch(err => {
            err.json().then(json => {
                console.log(json);
                reject(json);
            });
        })
    });
}