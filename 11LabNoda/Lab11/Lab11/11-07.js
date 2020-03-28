const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port: 4000, host: "localhost"});
server.register('A', (params) => {
    console.log('Event A: ', params.message);
});
server.register('B', (params) => {
    console.log('Event B: ', params.message);
});
server.register('C', (params) => {
    console.log('Event C: ', params.message);
});
