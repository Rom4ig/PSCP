const fs = require('fs');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 6000, host: 'localhost'});
wss.on('connection', (ws) => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let wfile = fs.createWriteStream(`./file1.txt`);
    duplex.pipe(wfile);
});
