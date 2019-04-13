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
    fetch(reqUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        console.log("res", body, res);
    }).catch(err => {
        console.log("err", body, err);
    })
}