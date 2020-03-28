var http = require('http');
var url = require('url');
var fs = require('fs');
let stat=require('./m07-01')('./static');
let writeHTTP405=(res)=>{
	res.statusCode = 405;
	res.statusMessage = 'Use another method';
	res.end('Use another method');
}
let http_handler=(req,res)=>
{
	if(req.method=='GET'){
	if(stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
	else if(stat.isStatic('css', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
	else if(stat.isStatic('js', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
	else if(stat.isStatic('png', req.url)) stat.sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
	else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
	else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/json; charset=utf-8'});
	else if(stat.isStatic('xml', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/xml; charset=utf-8'});
	else if(stat.isStatic('mp4', req.url)) stat.sendFile(req,res, {'Content-Type': 'video/mp4; charset=utf-8'});
	else stat.writeHTTP404(res);
	}
	else writeHTTP405(res);
}
http.createServer(function (req, res){
		if(url.parse(req.url).pathname === '/html'){
			let html= fs.readFileSync('./static/index.html');
			res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
		}
		else if(url.parse(req.url).pathname === '/jquery'){
			let jquery= fs.readFileSync('./static/jquery.js');
			res.writeHead(200,{'Content-Type': 'text/javascript; charset=utf-8'});
			res.end(jquery);
		}
		else
		{
			http_handler(req,res);
		}
}).listen(5000);
//let server = http.createServer();
//server.listen(5000).on('request',http_handler);