const URL = "/user"

export function insertUsr(userData) {
    let reqUrl = URL + "/insertUser";
    let body = {
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
    };
    return new Promise((resolve, reject) => {
        fetch(reqUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            res.json().then(json => {
                resolve(json);
            });
        }).catch(err => {
            console.log(err);
            reject("error in comunicating with server");
        })
    });
}

export function searchUser(userData) {
    let reqUrl = URL + "/searchUser";
    let body = {
        email: userData.email,
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
                resolve(json);
            });
        }).catch(err => {
            console.log(err);
            reject("error in comunicating with server");
        })
    });
}
