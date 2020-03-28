const express = require ('express');
const app = express();

app.get('/api/name', (req,res)=>{

    res.send('Egor Khoroshko');
});

app.listen(5000, function (){

    console.log('Running');
});