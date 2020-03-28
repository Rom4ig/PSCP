const express = require ('express');
const app = express();

app.get('/api/name', (req,res)=>{

    res.send('Roman Grunkovski');
});

app.listen(3000, function (){

    console.log('Running');
});