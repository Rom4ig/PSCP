var http = require('http');
var url = require('url');
var fs = require('fs');
var ws = require('ws');

const httpserver=require('http').createServer((req,res)=>
{
	if(req.method=='GET' && req.url=='/start'){
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
		res.end(require('fs').readFileSync('./09-01.html'));
	}
	else
	{
		res.writeHead(400);
		res.end(400);
	}
});
httpserver.listen(3000)
console.log('ws server: 3000');

let k=0;
const WebSocket=require('ws');
const wsserver=new WebSocket.Server({port:4000,host:'localhost',path:'/wsserver'})
wsserver.on('connection',(ws)=>{
	ws.on('message',message=>{
		console.log(`Receivved message=>${message}`)
	})
	setInterval(()=>{ws.send(`server:${++k}`)},5000);
})
wsserver.on('error',(e)=>{console.log('ws server error',e)});
console.log(`ws server: host:${wsserver.options.host},port:${wsserver.options.port},path:${wsserver.options.path}`);
