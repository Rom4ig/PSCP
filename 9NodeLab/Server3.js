let http = require('http');
let url=require('url');
let qs=require('querystring');

let fs=require('fs');

let handler=(req,res)=>{
	if(req.method=='GET'){

	res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
	res.end(fs.readFileSync('./07-03.html'));
	}
	else if(req.method=='POST'){
		let result='';
		req.on('data',(data)=>{result+=data;})
		req.on('end',()=>{
			result+='<br/>';
			let o=qs.parse(result)
			for(let key in o) { result+=`${key}=${o[key]}<br/>`}
			
	res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
	res.write('<h1>Url-params</h1>');
		res.end(result);
			});
	}
	else{
		res.writeHead(200,{'COntent-Type': 'text/html;charset=utf-8'});
		res.end('for other http-methods not so');
		}
}

let server=http.createServer();
server.listen(3000, (v)=>{console.log('server.listen(3000)')})
.on('error',(e)=>{console.log('server.listen(3000): error ',e.code)})
.on('request',handler)

		