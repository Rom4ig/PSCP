const net = require('net');
const fs = require('fs');
let HOST = '0.0.0.0';
let PORT = 40000;
net.createServer((sock) => {
    console.log('Server Connected: ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data', (data) => {
        console.log('Server DATA: ', sock.remoteAddress + ':' + data);
        sock.write('ECHO ' + data);
    });
    sock.on('close', (data) => {
        console.log("Server closed: ", sock.remoteAddress + ' ' + sock.remotePort);
    })
}).listen(PORT, HOST);
console.log('TCP-сервер ' + HOST + ':' + PORT);