var http = require('http');
var url = require('url');
var fs = require('fs');
const {send} = require('19102019lab6');
const sendmail=require('sendmail')({silent:true,
    smtpHost: 'localhost',});
http.createServer(function (request, response){
    if(url.parse(request.url).pathname === '/send')
    {
        send("<h1>Hello</h1>");
        response.end('OK');
    }
    else response.end('<h1>Not support</h1>');
}).listen(5000);