var http =      require('http');
var fs =        require('fs');
var url =       require('url');
const express = require ('express');
const app =     express();


http.createServer(function (req,res)
{
    if(url.parse(req.url).pathname==='/api/name')
  {
      if(req.method==='GET')
      {
      res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
      res.end('Khoroshko Egor');
      }
      else
      { 
          response.end('Send Get Request');
      }
  }
    if(url.parse(req.url).pathname==='/XMLHttpRequest')  
    {
      let html = fs.readFileSync('./XMLHttpRequest.html');
      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
      res.end(html);
    }
}).listen(5000);

console.log('Server Running at http://localhost:5000/');