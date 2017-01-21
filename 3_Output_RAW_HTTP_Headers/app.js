var express = require('express')

var app = express();

app.use(function(req, res, next) {
    req.rawBody = "";
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function() {
        next();
    });
});

app.get('/', function(req, res) {
    var id = req.param('id');
    console.log('rawHeaders: ' + req.rawHeaders); // JSON rawHeaders
    res.send(JSON.stringify(req.rawHeaders)); // JSON response
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})