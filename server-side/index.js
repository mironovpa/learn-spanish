const http = require('http');
const mysql = require('mysql');
const md5 = require('md5');
// const cron = require('node-cron');
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;


let ipsArray = [];
const SESSION_TIME = 120000; // MS  = 2 Mins

function sortArray (a, b) {
    return b.score - a.score;
}
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    switch(req.url) {
        case "/": case "/index": {
            res.statusCode = 200;
            res.end('Main Page!');
            break;
        }
        case "/stats": {
            connection.query(`SELECT * FROM users`, (err, data) => {
                if(err) return console.log(err);
                else {
                    const total_scores_array = data.map(el => {
                        const {name, total_score} = el;
                        return {
                            name,
                            score: total_score
                        }
                    }),
                        today_scores_array = data.map(el => {
                            const {name, today_score} = el;
                            return {
                                name,
                                score: today_score
                            }
                        });
                    res.statusCode = 200;
                    res.end(JSON.stringify([
                        total_scores_array.sort(sortArray).slice(0,10),
                        today_scores_array.sort(sortArray).slice(0,10),
                    ]));
                }
            });
            break;
        }
        case "/online": {
            const ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null);
            if(ipsArray.filter((el) => el.ip === ip).length > 0) {
                let elementID = -1;
                ipsArray.map((el, idx) => {
                    if(el.ip === ip) {
                        elementID = idx;
                    }
                });
                ipsArray = [
                    ...ipsArray.slice(0, elementID),
                    { ip, timeout: +new Date() + SESSION_TIME },
                    ...ipsArray.slice(elementID + 1)
                ]
            } else {
                ipsArray.push({ip, timeout: +new Date() + SESSION_TIME });
            }
            console.log(ipsArray);
            res.end(JSON.stringify(ipsArray.length));
            break;
        }
        case "/login": {
            let data;
            req.on('data', chunk => {
                data = JSON.parse(`${chunk}`);
                console.log(data);
                connection.query(`SELECT * FROM users WHERE name = '${data.login}'`, (err, response) => {
                    if(err) console.log(err);
                    else {
                        if(response.length === 0) {
                            connection.query(`INSERT INTO users (name, mail, token) VALUES ('${data.login}', '${data.email}', '${md5(data.login+data.email)}')`, (err, response_) => {
                                if(err) console.log(err);
                                else {
                                    res.end(JSON.stringify({status: "ok", login: data.login, email: data.email, points: 0, token: md5(`${data.login}${data.email}`)}));
                                }
                            })
                        } else {
                            if(response[0].mail === data.email) {
                                res.end(JSON.stringify({status: "ok", login: data.login, email: data.email, points: response[0].total_score, token: md5(`${data.login}${data.email}`)}));
                            } else {
                                res.end(JSON.stringify({status: "fail", reason: "EMAIL_INCORRECT"}));
                            }
                        }
                    }
                })
            });
            break;
        }
        case "/checklogin": {
            let data;
            req.on('data', (chunk) => {
                data = JSON.parse(`${chunk}`);
                if(data) {
                    connection.query(`SELECT * FROM users WHERE token = '${data}'`, (err, response) => {
                        if(err) return console.log(err);
                        else {
                            if(response.length) {
                                res.end(JSON.stringify({status: true, name: response[0].name, email: response[0].mail, points: response[0].total_score}));
                            } else {
                                res.end(JSON.stringify({status: false}));
                            }
                        }
                    })
                } else {
                    res.end(JSON.stringify({status: false}));
                }
            })
            break;
        }
        case "/setpoints": {
            let data;
            req.on('data', (chunk) => {
                data = JSON.parse(`${chunk}`);
                if(data) {
                    connection.query(`SELECT * FROM users WHERE token = '${data.token}'`, (err, response) => {
                        if(err) return console.log(err);
                        else {
                            if(response.length === 1) {
                                connection.query(`UPDATE users SET total_score = ${response[0].total_score + data.points}, today_score = ${response[0].today_score + data.points} WHERE token = '${data.token}'`,
                                    (err, response_) => {
                                    if(err) console.log(err);
                                    else {
                                        res.end(JSON.stringify({status: true, points: response[0].total_score + data.points}));
                                    }
                                })



                            } else {
                                res.end(JSON.stringify({status: false}));
                            }
                        }
                    })
                } else {
                    res.end(JSON.stringify({status: false}));
                }
            })
            break;
        }
        case "/feedback": {
            let data;
            req.on('data', (chunk) => {
                data = JSON.parse(`${chunk}`);
                if(data) {
                    connection.query(`INSERT INTO messages (name, text) VALUES ('${data.name}', '${data.text}')`, (err, response) => {
                        if(err) console.log(err);
                        else {
                            res.end(JSON.stringify({status: true}));
                        }
                    })
                }
            })
            break;
        }
        default: {
            res.statusCode = 404;
            res.end("not found");
        }
    }
});

setInterval(() => {
    const date = +new Date();
    ipsArray = ipsArray.filter((el) => el.timeout > date);
}, 1000);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const connection = mysql.createConnection(
    {
        host: "",
        user: "",
        password: "",
        database: ""
    }
);

connection.connect((err) => {
    if(err) console.log(err);
    else console.log("Connected!");
});

// cron.schedule(`0 0 * * *`, function () {
//     console.log(`Running Cron Job`);
//     connection.query(`UPDATE users SET today_score = 0`);
// });

