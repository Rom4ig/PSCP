var http = require('http');
var fs = require('fs');
var url =require('url');

http.createServer(function (request,response) {
    if(url.parse(request.url).pathname==='/api/name')
    {
        if(request.method==='GET')
        {
        response.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
        response.end('Кулак Вячеслав Олегович');
        }
        else
        { 
            response.end('Пошлите GET запрос');
        }
    }
    else
    {
        response.end('Перейдите на ./api/name');
    }
}).listen(5000);