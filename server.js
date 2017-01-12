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
        urlRegister = parseInt(result[0].master);
        console.log(urlRegister);
    })
    
});

app.get("/:input", function(req, res){
    if (Boolean(parseInt(req.params.input))){
        db.collection('urls').find({"key": req.params.input}).toArray(err, (result) => {
            res.redirect(result[0].url);    
        })
        
    }
});

app.get('/http:\//:url', function(req, res){
    if(Boolean(validUrl.isUri('http://' + req.params.url))){
        var shrtn = {"key": urlRegister, "url": 'http://' + req.params.url};
        db.collection('urls').save(shrtn);
        
        db.collection('urls').updateOne(
            {"master": urlRegister},
            { $set: {"master": parseInt(urlRegister)+1} }
        );
        
        urlRegister++;
        db.collection('urls').find({"key": urlRegister - 1}, {_id: 0, master: 1}).toArray((err, result) => {
            if(err) return console.log(err);
            res.send(result);
        });
    }
});

app.get('/https:\//:urlSSH', function(req, res){
    if(Boolean(validUrl.isUri('https://' + req.params.url))){
        res.send({"key": urlRegister, "url": req.params.url});
        /*
        db.collection('urls').save({"key": urlRegister, "url": 'https://' + req.params.url});
        db.collection('urls').updateOne(
            {"master": urlRegister},
            { $set: {"master": parseInt(urlRegister)+1} }
        );*/
        urlRegister++;
        db.collection('urls').find({"key": urlRegister}, {_id: 0, master: 1}).toArray((err, result) => {
            if(err) return console.log(err);
            res.send(result);
        });
        
    }
});

app.get('*', function(req, res){
    res.send('Add a URL as an argument to the web address');
});

