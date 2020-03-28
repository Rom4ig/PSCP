let fs = require('fs');
let n = 0;
let count = 0;
const WebSocket = require('ws');
const wsserver = new WebSocket.Server({port: 4000, host: 'localhost', path: '/wsserver'});

function heartbeat() {
    this.isAlive = true;
}

wsserver.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
});
wsserver.on('error', (e) => {
    console.log('ws server error', e);
});
console.log(`ws server: host:${wsserver.options.host}, port: ${wsserver.options.port}, path:${wsserver.options.path}`);
setInterval(function ping() {
    count = 0;
    wsserver.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        else count++;
        ws.isAlive = false;
        ws.ping('');
    });
    console.log('Connections:', count);
}, 5000);
setInterval(function send() {
    wsserver.clients.forEach(function each(ws) {
        ws.send(`11-03 server: ${n}`);
        n++;
    });
}, 15000);