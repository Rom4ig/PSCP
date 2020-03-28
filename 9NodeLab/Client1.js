let http = require('http');

let options = {
    host: 'localhost',
    path: '/information',
    port: 3000,
    method: 'GET'
}
const req = http.request(options, (res) => {
    console.log('http.request: response= ', res.statusCode);
    console.log('http.request: statusMessage= ', res.statusMessage);
    console.log('http.request: socket.remoteAddress= ', req.socket.remoteAddress);
    console.log('http.request: res.socket.remotePort= ', req.socket.remotePort);

    let data = '';
    res.on('data', (chunk) => {
        console.log('http.request: data: body=', data += chunk.toString('utf-8'));
    });
    res.on('end', () => {
        console.log('http.request: end: body=', data);
    });
});
req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});
req.end();