const express = require('express');
const State = require('./State');


const HOST = 'localhost';
const PORT = 5000;

const app = express();
const state = new State();

app.get('/', (request, response) => {
    response.end(`<h1>${state.getState().currentState}</h1>`);
});
app.listen(PORT, HOST, () => {
    const URL = `http://${HOST}:${PORT}`;
    console.log('Listening on ' + URL);
    state.printState();
});

state.listen();