var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./m04-02');

var db=new data.DB();
db.on('GET', (req,res)=>{console.log('DB.GET'); 
res.end(JSON.stringify(db.get()));});
db.on('POST',(req,res)=>{console.log('DB.POST');
req.on('data',data=>{
    let r = JSON.parse(data);
    console.log(r);
    db.post(r);
    res.end(JSON.stringify(r));
    });
});
db.on('PUT',(req,res)=>{console.log('DB.PUT');
req.on('data',data=>{
    let r = JSON.parse(data);
    console.log(r);
    db.put(r);
    res.end(JSON.stringify(r));
    });});
db.on('DELETE',(req,res)=>{console.log('DB.DELETE');
req.on('data',data=>{
    let s = JSON.parse(data);
    let k= db.delete(s.id);
    res.end(JSON.stringify(k));
    });});

http.createServer(function (request, response){
    if(url.parse(request.url).pathname === '/api/db'){
        db.emit(request.method,request,response);
    }
    if(url.parse(request.url).pathname === '/'){
        let html= fs.readFileSync('./04-02.html');
        response.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
}).listen(5000);