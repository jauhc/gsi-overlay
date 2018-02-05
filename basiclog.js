const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const config = require('./config');

const EOL = require('os').EOL;
var body = '';
const port = 1489;
const host = 'localhost';

const wss = new WebSocket.Server({ port: 3232 });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    setInterval(() => {
        ws.send(body);
    }, 15);
});

server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        //console.log("Handling POST request...");
        res.writeHead(200, { 'Content-Type': 'text/html' });

        body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            //console.log("POST payload: " + body);
            res.end('');
        });
    }
    else {
        console.log("Not expecting other request types...");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

process.on('uncaughtException', function (err) {
    console.log(err);
})
