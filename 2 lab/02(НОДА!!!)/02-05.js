var http =      require('http');
var fs =        require('fs');
var url =       require('url');

http.createServer(function (req,res)
{
    if(url.parse(req.url).pathname==='/fetch')
    {
    let html = fs.readFileSync('./fetch.html');
    res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    res.end(html);
    }
    if(url.parse(req.url).pathname==='/api/name')
  {
      if(req.method==='GET')
      {
      res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
      res.end('Khoroshko Egor');
      }
      else
      { 
          response.end('Send Get Request');
      }
  }
    
}).listen(5000);

console.log('Server Running at http://localhost:5000/');