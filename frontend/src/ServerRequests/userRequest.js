const URL = "localhost:30001"


let addUser = function (userData) {
    let reqUrl = URL + "/addUser";
    let body = {};
    fetch(reqUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: body
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}