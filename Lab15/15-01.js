const MongoClient = require("mongodb").MongoClient;
const http = require('http');
const url = require('url');
const connectionString = "mongodb+srv://Romka:qwerty228@cluster0-pna65.mongodb.net/test?retryWrites=true&w=majority";
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
/*mongoClient.connect().then(()=>{
    // взаимодействие с базой данных
    const db = mongoClient.db("BSTU");
    const collection = db.collection("faculty");
    mongoClient.close();
});*/
let writeHttp405 = (req, res) => {
    res.statusCode = 405;
    res.statusMessage = 'Use another method';
    res.end('Use another method');
};
let http_handler = (req, res) => {
    if (req.method === 'GET') {
        if (url.parse(req.url).pathname === '/api/faculties') {
            mongoClient.connect(function (err, client) {

                if (err) {
                    return console.log(err);
                }
                // взаимодействие с базой данных
                console.log(client);
                const db = client.db("BSTU");
                const collection = db.collection("faculty");
                collection.find().toArray(function (err, results) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(results));
                    return mongoClient.close();
                });
            });
        }
        else if (url.parse(req.url).pathname === '/api/pulpits') {
            mongoClient.connect(function (err, client) {

                if (err) {
                    return console.log(err);
                }
                // взаимодействие с базой данных
                const db = client.db("BSTU");
                const collection = db.collection("pulpit");
                collection.find().toArray(function (err, results) {
                    mongoClient.close();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(results));
                    return mongoClient.close();
                });
            });
        }
        else writeHttp405(req, res);
    }
    else if (req.method === 'POST') {
        if (url.parse(req.url).pathname === '/api/faculties') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                let result2 = JSON.parse(body);
                mongoClient.connect(function (err, client) {

                    if (err) {
                        return console.log(err);
                    }
                    // взаимодействие с базой данных
                    const db = client.db("BSTU");
                    const collection = db.collection("faculty");
                    collection.insertOne(result2, function (err, result) {
                        if (err) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(`{"error":3,"messager":"${err}"}`);
                            return console.log(err);
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result.ops));
                        return mongoClient.close();
                    });
                });
            });
        }
        else if (url.parse(req.url).pathname === '/api/pulpits') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                let result2 = JSON.parse(body);
                mongoClient.connect(function (err, client) {

                    if (err) {
                        return console.log(err);
                    }
                    // взаимодействие с базой данных
                    const db = client.db("BSTU");
                    const collection = db.collection("pulpit");
                    collection.insertOne(result2, function (err, result) {
                        if (err) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(`{"error":3,"messager":"${err}"}`);
                            return console.log(err);
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result.ops));
                        return mongoClient.close();
                    });
                });
            });
        }
        else writeHttp405(req, res);
    }
    else if (req.method === 'PUT') {
        if (url.parse(req.url).pathname === '/api/faculties') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                let result2 = JSON.parse(body);
                mongoClient.connect(function (err, client) {

                    if (err) {
                        return console.log(err);
                    }
                    // взаимодействие с базой данных
                    const db = client.db("BSTU");
                    const collection = db.collection("faculty");
                    collection.findOneAndUpdate({ faculty: result2.faculty }, { $set: { faculty_name: result2.faculty_name } },
                        {
                            returnOriginal: false
                        }, function (err, result) {
                            if (err) {
                                return console.log(err);
                            }
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            if (result.value != null) {
                                res.end(JSON.stringify(result.value));
                            }
                            else res.end(`{"error":2,"message":"Такого кода факультета для обновления не существует"}`);
                            return mongoClient.close();
                        });
                });
            });
        }
        else if (url.parse(req.url).pathname === '/api/pulpits') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                let result2 = JSON.parse(body);
                mongoClient.connect(function (err, client) {

                    if (err) {
                        return console.log(err);
                    }
                    // взаимодействие с базой данных
                    const db = client.db("BSTU");
                    const collection = db.collection("pulpit");
                    collection.findOneAndUpdate({ pulpit: result2.pulpit }, { $set: { pulpit_name: result2.pulpit_name, faculty: result2.faculty } },
                        {
                            returnOriginal: false
                        }, function (err, result) {
                            if (err) {
                                return console.log(err);
                            }
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            if (result.value != null) {
                                res.end(JSON.stringify(result.value));
                            }
                            else res.end(`{"error":2,"message":"Такого кода кафедры для обновления не существует"}`);
                            return mongoClient.close();
                        });
                });
            });
        }
        else writeHttp405(req, res);
    }
    else if (req.method === 'DELETE') {
        console.log(url.parse(req.url).pathname);
        if (url.parse(req.url).pathname.search('\/api\/faculties\/[A-z]+') !== (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let o = r[3];
            console.log(o);
            mongoClient.connect(function (err, client) {

                if (err) {
                    return console.log(err);
                }
                // взаимодействие с базой данных
                const db = client.db("BSTU");
                const collection = db.collection("faculty");
                collection.findOneAndDelete({ faculty: o }, function (err, result) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    if (result.value != null) {
                        res.end(JSON.stringify(result.value));
                    }
                    else res.end(`{"error":1,"message":"Такого факультета для удаления не существует"}`);
                    return mongoClient.close();
                });
            });

        }
        else if (url.parse(req.url).pathname.search('\/api\/pulpits\/[A-z]+') !== (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let o = r[3];
            mongoClient.connect(function (err, client) {

                if (err) {
                    return console.log(err);
                }
                // взаимодействие с базой данных
                const db = client.db("BSTU");
                const collection = db.collection("pulpit");
                collection.findOneAndDelete({ pulpit: o }, function (err, result) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    if (result.value != null) {
                        res.end(JSON.stringify(result.value));
                    }
                    else res.end(`{"error":1,"message":"Такого кода кафедры для удаления не существует"}`);
                    return mongoClient.close();
                });
            });
        }
        else writeHttp405(req, res);
    }
}
http.createServer(function (req, res) {
    http_handler(req, res);
}).listen(3000);