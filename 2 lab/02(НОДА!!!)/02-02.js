var http = require('http');
var fs   = require('fs');

http.createServer(function (req,res){

    const fname = './02-02.png';

    fs.stat(fname, (err, stat)=>{
        if(err){
            console.log('error', err);}
        else {
            png = fs.readFile(fname, (err,data)=>{
                res.contentType='image/jpeg';
                res.contentLength=stat.size;
                res.end(data, 'binary');
            });
        }
    });
}).listen(5000);

console.log('Server Running at http://localhost:5000/');