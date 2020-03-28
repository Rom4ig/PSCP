var http = require('http');
var fs = require('fs');
var url =require('url');
http.createServer(function (request,response) {
    if(url.parse(request.url).pathname==='/jquery')
    {
    let html = fs.readFileSync('./jquery.html');
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
    if(url.parse(request.url).pathname==='/fetch')
    {
    let html = fs.readFileSync('./fetch.html');
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
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
    if(url.parse(request.url).pathname==='/png')
    {
            if(request.method==='GET')
        {
        let fname='./pic.png';
        let png=null;
        fs.stat(fname,(err,stat)=>{
            if(err){console.log('error:',err);}
            else
            {
                png = fs.readFileSync(fname);
                response.writeHead(200,{'Content-Type': 'image/png',
                'Content-Length':stat.size});
                response.end(png,'binary');
            }
        })
        }
    }
     if(url.parse(request.url).pathname==='/html')
    {
    let html = fs.readFileSync('./index.html');
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
    if(url.parse(request.url).pathname==='/XMLHttpRequest')
    {
    let html = fs.readFileSync('./XMLHttpRequest.html');
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
}).listen(5000);