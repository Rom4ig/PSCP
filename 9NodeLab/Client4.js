var http = require('http');
let parms = JSON.stringify(
    {
        "__comment": "Запрос.Лабораторная работа 8/10",
        "x": 1,
        "y": 2,
        "s": "Сообщение",
        "m": ["a", "b", "c", "d"],
        "o": {"surname": "Грунковский", "name": "Роман"}
    }
);
let path = `/JSON`;
console.log(path);
let options = {
    host: 'localhost',
    path: path,
    port: 3000,
    method: 'POST',
    headers:
        {
            'content-type': 'application/json', 'accept': 'application/json'
        }
}
const req = http.request(options, (res) => {
    console.log('http.request: statusCode: ', res.statusCode);
    let data = '';
    res.on('data', (chunk) => {
        console.log('http.request: data: body=', data += chunk.toString('utf-8'));
    });
    res.on('end', () => {
        console.log('http.request: end: body=', data);
        console.log('http.request: end: parse(body)=', JSON.parse(data));
    });
});
req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});
req.write(parms);
req.end();