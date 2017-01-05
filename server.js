var express = require('express');
var app = express();
var validUrl = require('valid-url');

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

app.listen(8080,function(){
    console.log('server listening on port 8080');
})