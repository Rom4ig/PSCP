var http =require('http');
const fs=require('fs');
const file=fs.createWriteStream('fc5f3d47-8bb5-42d6-bc79-185433bd8ea9.png');
let options= {
    host: 'localhost',
    path: '/-s4N61JLp7lPvaS7SPXu6qqk.png',
    port: 3000,
    method:'GET'
}
const req = http.request(options,(res)=> {
    res.pipe(file);
}); 
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.end();