const fs = require('fs');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000');
ws.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let rfile = fs.createReadStream(`./report.txt`);
    rfile.pipe(duplex);
});
