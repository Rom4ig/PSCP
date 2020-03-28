
let fs = require('fs');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:4000/wsserver');
ws.on('open', () => {
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let wfile = fs.createWriteStream(`./File.txt`);
    duplex.pipe(wfile);
});