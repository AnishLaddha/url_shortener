const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')
const { json } = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
    res.sendFile(__dirname+"/index.html");
});
app.get('/:id', function(req, res) {
    res.send('id: '+req.params.id);
});
app.post('/', function(req, res) {
    res.send(req.body.user_url)
    console.log(req.body);
});
app.listen(3000, function() {
    console.log('listening on port:3000');
});
