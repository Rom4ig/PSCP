var http = require('http');
var fs = require('fs');
var url =require('url');

http.createServer(function (request,response) {
    if(url.parse(request.url).pathname==='/html')
    {
    let html = fs.readFileSync('./index.html');
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
    else
    {
        response.end();
    }
}).listen(5000);