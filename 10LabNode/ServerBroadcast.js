const WebSocket=require('ws');
const wss=new WebSocket.Server({port:4000, host:'localhost',path:'/broadcast'});
console.log('1');
wss.on('connection',(ws)=>{
	ws.on('message',(data)=>{
		wss.clients.forEach((client)=>{
			if(client.readyState===WebSocket.OPEN) client.send('server: '+data);
		});
	});
});
