const http = require('http');
const url =require('url');
const fs = require('fs');
let fact=(k)=>{return(k<3?k:fact(k-1)*k);}
function Fact(n,cb)
{
    this.ka=n;
    this.ffact=fact;
    this.fac=cb;
    this.calc=()=>{process.nextTick(()=>{this.fac(null,this.ffact(this.ka));});}
}
http.createServer(function (request,response) {
    if(url.parse(request.url).pathname==='/fact')
    {
    	if(typeof url.parse(request.url,true).query.k != undefined)
    	{
	   let k=parseInt(url.parse(request.url,true).query.k)
	   if(Number.isInteger(k))
	   {
        response.writeHead(200, {'Content-type':'application/json;charset=utf-8'});
        let fac=new Fact(k,(err,result)=>{response.end(JSON.stringify({k:k, fact:result}));});
        fac.calc();
	   }
	}
    }
    if(url.parse(request.url).pathname==='/')
    {
    let html = fs.readFileSync('./fetch.html');
	response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    response.end(html);
    }
}).listen(5000);
