const net = require('net');
const fs = require('fs');
let HOST = '127.0.0.1';
let PORT = 3000;
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Client connected:', client.remoteAddress + ' ' + client.remotePort);
    let readFileStream = fs.createReadStream('./file1.txt');
    readFileStream.pipe(client);
});