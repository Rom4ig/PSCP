var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./m04-02');
var db = new data.DB();
var Date1 = null;
var Date2 = null;
var numberCommit = null;
var numberCommit2 = null;
var numberRequest = null;
var numberRequest2 = null;
db.on('GET', (req, res) => {
    console.log('DB.GET');
    res.end(JSON.stringify(db.get()));
});
db.on('POST', (req, res) => {
    console.log('DB.POST');
    req.on('data', data => {
        let r = JSON.parse(data);
        console.log(r);
        db.post(r);
        res.end(JSON.stringify(r));
    });
});
db.on('PUT', (req, res) => {
    console.log('DB.PUT');
    req.on('data', data => {
        let r = JSON.parse(data);
        console.log(r);
        db.put(r);
        res.end(JSON.stringify(r));
    });
});
db.on('DELETE', (req, res) => {
    console.log('DB.DELETE');
    req.on('data', data => {
        let s = JSON.parse(data);
        let k = db.delete(s.id);
        res.end(JSON.stringify(k));
    });
});

var server = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/api/db') {
        numberRequest++;
        db.emit(request.method, request, response);
    }
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./04-02.html');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(html);
    }
    if (url.parse(request.url).pathname === '/api/ss') {
        console.log("api/ss");
        response.end(JSON.stringify("{start:" + Date1 + ",finish:" + Date2 + ",request:" + numberRequest2 + ",commit:" + numberCommit2 + "}"));
    }
}).listen(5000);
process.stdin.setEncoding('utf-8');
var s;
var f;
var n;
process.stdin.on('readable', () => {
    let chunk2 = null;
    let chunk;
    while ((chunk2 = process.stdin.read()) != null) {
        chunk = chunk2.split(' ');
        if (chunk[0].trim() == 'sd') {

            if (chunk[1] != undefined) {
                s = setTimeout(() => { server.close(); }, chunk[1].trim() * 1000);
            }
            else { clearTimeout(s); }
        }
        else if (chunk[0].trim() == 'sc') {
            if (chunk[1] != undefined) {
                f = setInterval(() => { db.commit(); numberCommit++; }, chunk[1].trim() * 1000);
                f.unref();
            }
            else { clearInterval(f); }
        }
        else if (chunk[0].trim() == 'ss') {
            Date1 = new Date();
            numberCommit = 0;
            numberCommit2 = 0;
            numberRequest = 0;
            numberRequest2 = 0;
            if (chunk[1] != undefined) {
                n = setTimeout(() => {
                    Date2 = new Date();
                    numberCommit2 = numberCommit;
                    numberRequest2 = numberRequest;
                }, chunk[1].trim() * 1000);
                n.unref();
            }
            else { clearTimeout(n); }
        }
    }
});