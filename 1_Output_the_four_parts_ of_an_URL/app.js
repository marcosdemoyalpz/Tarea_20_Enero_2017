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
    console.log('\n');
    console.log('Protocol: ' + req.protocol); // your JSON
    console.log('Hostname: ' + req.hostname); // your JSON
    console.log('Port: ' + req.get('host').split(':')[1]); // your JSON
    console.log('Path: ' + req.path); // your JSON    
    res.send('protocol: ' + req.protocol + "," + 'hostname: ' + req.hostname + "," + 'Port: ' + req.get('host').split(':')[1] + "," + 'path: ' + req.path);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})