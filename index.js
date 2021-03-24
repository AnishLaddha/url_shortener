const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')
const { json } = require('body-parser');
const mongoose = require('mongoose');
const URL = require("./models/url.js")

const app = express();
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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
