const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')
const { json } = require('body-parser');
const mongoose = require('mongoose');
const shortID = require('shortid');
const URL = require("./models/url.js")

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var mongoDB = 'mongodb://localhost/url_short';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("connected?"));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
    res.render('index', {sid: ""})
});
app.get('/:id', async function(req, res) {
    const redir_url = await URL.findOne({ shortUrl: req.params.id })
    if (redir_url == null) return res.sendStatus(404)

    redir_url.clicks++
    await redir_url.save()
    res.redirect(redir_url.longUrl)
});

// app.get('/stats/:id', async function(req,res){
//     const url_stats = await URL.findOne({shortUrl: req.params.id})
//     if (url_stats == null) return res.sendStatus(404)


// })

app.post('/', async function(req, res) {
    let sid = shortID.generate()
    console.log(sid)
    await URL.create({
        longUrl: req.body.user_url,
        shortUrl: sid,
    });
    res.render('index', {sid: sid});

});
app.listen(3000, function() {
    console.log('listening on port:3000');
});
