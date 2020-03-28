var http =require('http');
var fs= require('fs');
let bound='ZFM'
let body=`--${bound}\r\n`;
body+='Content-Disposition:form-data; name="file"; Filename="MyFile.png"\r\n';
body+='Content-Type:application/octet-stream\r\n\r\n';
let path=`/UploadFile`;
console.log(path);
let options= {
    host: 'localhost',
    path: path,
    port: 3000,
    method:'POST',
    headers:
    {'Content-Type':'multipart/form-data; boundary='+bound}
}
const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(chunk) =>
    {
        console.log('http.request: data: body=', data+=chunk.toString('utf-8'));
    });
    res.on('end',()=>{ console.log('http.request: end: body=', data);
    }); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.write(body);
let stream = new fs.ReadStream("fc5f3d47-8bb5-42d6-bc79-185433bd8ea9.png");
stream.on('data',(chunk)=>
{
    req.write(chunk);
    console.log(Buffer.byteLength(chunk));
});
stream.on('end',()=>{
    req.end(`\r\n--${bound}--\r\n`);
});