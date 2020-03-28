const fs = require('fs');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:6000');
let k = 0;

ws.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let rfile = fs.createReadStream(`./download/file${++k}.txt`);
    rfile.pipe(duplex);
});
