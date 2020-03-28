const http = require('http');
const url =require('url');
const fs = require('fs');
let chunk ='norm';
http.createServer(function (request,response) {
	response.contentType='text/html';
	response.end(chunk);
}).listen(5000);
process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
let chunk2=null;
while ((chunk2 = process.stdin.read()) !=null){
	if	(chunk2.trim() == 'exit') {process.exit(0);}
	else if  (chunk2.trim() =='norm' ||chunk2.trim() =='stop' ||chunk2.trim() =='test'||chunk2.trim() =='idle') { process.stdout.write(chunk+'-->'+chunk2); chunk=chunk2;}
	else process.stdout.write(chunk2);
}
});
