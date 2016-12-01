var fs = require('fs');
const config = require('./config');

var express = require('express');
var app = express();
app.use(express.static('res'));

const EOL = require('os').EOL;
var body = '';

function getActiveWeapon(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (obj[prop].state != "holstered") {
                return obj[prop];
            }
        }
    }
}

function teamName(teamcode) {
    if (teamcode == "T") {
        return "Terrorist";
    }
    if (teamcode == "CT") {
        return "Counter-Terrorist";
    } else {
        return "unassigned";
    }
}

var logString = "";
var oldlog;




app.get('/overlay', (req, res) => {
    //res.set('Content-Type', 'text/html');
    res.sendFile(__dirname + '/overlay.html');
});
app.get('/', (req, res) => {
//  res.send('leave this place');
  res.sendStatus(418);
});
var options = {
    root: __dirname + '/res/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

var payload;
var packedload;
app.post('/animestate', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    req.on('data', (data) => {
        payload = JSON.parse(data);
        packedload = data;
        // console.log(payload);
    })
    res.end(packedload);
});
app.listen(80);

console.log('Listening at http://' + config.host + ':' + config.port);

// theres some choke if you have high CPU usage btw
process.on('uncaughtException', function (err) {
  console.log(err);
})
