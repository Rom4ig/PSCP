var http = require ('http');

var server = http.createServer (function(req,res){
	let b = '';
	req.on('data',str=>{b+=str;})
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	req.on('end', ()=>res.end(
	'<!DOCTYPE html> <html><head></head>'+
	'<body>'+
	'<h1>Структура запроса</h1>'+
	'<h2>Метод</h2>'+req.method+ '</br>'+
	'<h2>Запрос</h2>'+req.url+ '</br>'+
	'<h2>Http версия</h2>'+req.httpVersion+ '</br></body></html>'
	)
	)
}).listen(3000);
console.log ('Great');