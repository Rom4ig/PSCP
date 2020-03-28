var http = require('http');
var fs   = require('fs');

http.createServer(function (req, res){

    let html = fs.readFileSync('./02-01.html');
    res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
    res.end(html);

}).listen(5000);

console.log('Server running ar http://localhost:5000/');