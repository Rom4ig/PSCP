var http = require('http');
var fs = require('fs');
var url =require('url');

http.createServer(function (request,response) {
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
        else
        { 
            response.end('Пошлите GET запрос');
        }
    }
    else
    {
        response.end('Перейдите на /png');
    }
}).listen(5000);