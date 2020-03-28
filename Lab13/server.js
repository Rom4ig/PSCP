const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {
    socket.on('data', data => {
        let writeFileStream = fs.createWriteStream('./file2.txt');
        writeFileStream.write(data);
        console.log('From client: ' + data);
    });

    socket.on('close', () => {
        console.log('Server closed')
    });
});

server.listen(3000, () => {
    console.log(`Listening to 3000`);
});