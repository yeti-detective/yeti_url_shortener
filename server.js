var express = require('express');
var app = express();
var validUrl = require('valid-url');

app.get("/short/:url", function(req, res){
    var url = req.params.url;
    res.send(url);
});

app.get('*', function(req, res){
    res.send('Add a URL as n argument to the web address');
});

app.listen(8080,function(){
    console.log('server listening on port 8080');
})