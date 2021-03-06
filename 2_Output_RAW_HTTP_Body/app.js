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

app.post('/', function(req, res) {
    var id = req.param('id');
    console.log('rawBody: ' + req.rawHeaders); // JSON rawHeaders
    console.log('rawBody: ' + req.rawBody); // JSON rawBody
    res.send(JSON.stringify(req.rawHeaders) + JSON.stringify(req.rawBody)); // JSON response
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})