const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(firstname, lastname, email, password) 
                       values(${user.firstname}, '${user.lastname}', '${user.email}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end();
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end();
})
client.connect();