const http = require('http');
const url =require('url');
const fs = require('fs');
let fact=(k)=>{return(k<3?k:fact(k-1)*k);}

http.createServer(function (request,response) {
    if(url.parse(request.url).pathname==='/fact')
    {
    	if(typeof url.parse(request.url,true).query.k != undefined)
    	{
	   let k=parseInt(url.parse(request.url,true).query.k)
	   if(Number.isInteger(k))
	   {
		response.writeHead(200, {'Content-type':'application/json;charset=utf-8'});
	 	response.end(JSON.stringify({k:k, fact:fact(k)}));
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
