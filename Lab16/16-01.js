const fs = require("fs");
const http = require('http')
const {graphql, buildSchema} = require('graphql');
const {DB, resolver} = require('./16-01db.js');
const schema = buildSchema(fs.readFileSync('./16-01.gql').toString());
const sql = require('mssql');
const dbConfig = require('./dbconfig.js');

async function init() {
    try {
        // Create a connection pool which will later be accessed via the
        // pool cache as the 'default' pool.
        //await sql.ConnectionPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('init() error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        // Get the pool from the pool cache and close it when no
        // connections are in use, or force it closed after 10 seconds
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file
        await oracledb.getPool().close(10);
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);
let http_handler = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let result2 = JSON.parse(body);
        console.log(`query - ${result2.query}`);
        console.log(`variables - ${result2.variables}`);
        if (result2.query) {
            console.log('Test');
            graphql(schema, result2.query, resolver, DB, result2.variables)
                // .catch((err) => {
                //     console.log(err)
                // })
                .then((response) => {
                    console.log(`RESPONSE = ${JSON.stringify(response)}`);
                    console.log(response.data);
                    let result = response.data;
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                })
        }
        if (result2.mutation) {
            graphql(schema, result2.mutation, resolver, DB, result2.variables)
                .catch((err) => {
                    console.log(err)
                })
                .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    let result = response.data;
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                })
        }
    });
}
init();
var server = http.createServer(function (req, res) {
    http_handler(req, res);
}).listen(3000);