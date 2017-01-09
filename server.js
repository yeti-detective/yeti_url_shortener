var express = require('express');
var app = express();
var validUrl = require('valid-url');

var mongo = require("mongodb").MongoClient;
var db;
var urlRegister;

mongo.connect('mongodb://quote-app:Quote-App@ds157278.mlab.com:57278/yetis_first_db', function(err, database){
    if(err) throw err;
    db = database;
    
    app.listen(8080,function(){
        console.log('server listening on port 8080');
    });
    db.collection('urls').find({}, {_id: 0, master: 1}).toArray((err, result) => {
        if(err) return console.log(err);
        console.log(result);
    })
    
});

app.get("/:input", function(req, res){
    if (Boolean(parseInt(req.params.input))){
        res.send(req.params.input);
    }
});

app.get('/http:\//:url', function(req, res){
    if(Boolean(validUrl.isUri('http://' + req.params.url))){
        res.send("Mongo time");
    }
});

app.get('/https:\//:urlSSH', function(req, res){
    if(Boolean(validUrl.isUri('https://' + req.params.urlSSH))){
        res.send("Mongo time");
    }
});

app.get('*', function(req, res){
    res.send('Add a URL as an argument to the web address');
});

