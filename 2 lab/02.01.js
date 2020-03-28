var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    switch (pathname) {
        case '/html': {
            let html = fs.readFileSync('./01.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
            break;
        case '/png': {
            const fname = './kek.png';
            let png = null;
            fs.stat(fname, (err, stat) => {
                if (err) {
                    console.log('error:', err);
                } else {
                    png = fs.readFileSync(fname);
                    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': stat.size});
                    res.end(png, 'binary');
                }
            })
        }
            break;
        case '/api/name': {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Роман Грунковский');
        }
            break;
        case '/xmlhttprequest': {
            let html = fs.readFileSync('./xmlhttprequest.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
            break;
        case '/fetch': {
            let html = fs.readFileSync('./fetch.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
            break;
        case '/jquery': {
            let html = fs.readFileSync('./jquery.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
            break;
    }
}).listen(3000);